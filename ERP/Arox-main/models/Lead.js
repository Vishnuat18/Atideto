const { getDb } = require('../config/database');

class Lead {
  static findAll(filters = {}) {
    const db = getDb();
    let sql = `
      SELECT l.*, 
             c.company_name as client_company_name, c.contact_person as client_contact,
             u.first_name as assignee_first_name, u.last_name as assignee_last_name
      FROM leads l
      LEFT JOIN clients c ON l.client_id = c.id
      LEFT JOIN users u ON l.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.search) {
      sql += ` AND (l.title LIKE ? OR l.contact_name LIKE ? OR l.company_name LIKE ? OR l.email LIKE ? OR l.lead_id LIKE ?)`;
      const term = `%${filters.search}%`;
      params.push(term, term, term, term, term);
    }

    if (filters.stage && filters.stage !== 'all') {
      sql += ` AND l.stage = ?`;
      params.push(filters.stage);
    }

    if (filters.priority && filters.priority !== 'all') {
      sql += ` AND l.priority = ?`;
      params.push(filters.priority);
    }

    if (filters.source && filters.source !== 'all') {
      sql += ` AND l.source = ?`;
      params.push(filters.source);
    }

    if (filters.assigned_to) {
      sql += ` AND l.assigned_to = ?`;
      params.push(filters.assigned_to);
    }

    sql += ` ORDER BY l.created_at DESC`;

    return db.prepare(sql).all(...params);
  }

  static findById(id) {
    const db = getDb();
    return db.prepare(`
      SELECT l.*, 
             c.company_name as client_company_name, c.contact_person as client_contact,
             u.first_name as assignee_first_name, u.last_name as assignee_last_name
      FROM leads l
      LEFT JOIN clients c ON l.client_id = c.id
      LEFT JOIN users u ON l.assigned_to = u.id
      WHERE l.id = ?
    `).get(id);
  }

  static create(data) {
    const db = getDb();
    const count = db.prepare('SELECT COUNT(*) as c FROM leads').get()?.c || 0;
    const year = new Date().getFullYear();
    const lead_id = data.lead_id || `LEAD-${year}-${String(Number(count) + 1).padStart(3, '0')}`;

    const res = db.prepare(`
      INSERT INTO leads (
        lead_id, client_id, title, contact_name, company_name, email, phone,
        source, stage, priority, deal_value, expected_close_date, assigned_to,
        notes, next_followup_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      lead_id,
      data.client_id || null,
      data.title,
      data.contact_name,
      data.company_name || '',
      data.email || '',
      data.phone || '',
      data.source || 'inbound',
      data.stage || 'new',
      data.priority || 'medium',
      parseFloat(data.deal_value) || 0,
      data.expected_close_date || null,
      data.assigned_to || null,
      data.notes || '',
      data.next_followup_date || null
    );

    return { id: res.lastInsertRowid, lead_id, ...data };
  }

  static updateStage(id, stage) {
    const db = getDb();
    db.prepare(`
      UPDATE leads 
      SET stage = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(stage, id);
    return this.findById(id);
  }

  static update(id, data) {
    const db = getDb();
    const existing = this.findById(id);
    if (!existing) return null;

    db.prepare(`
      UPDATE leads SET
        title = ?,
        contact_name = ?,
        company_name = ?,
        email = ?,
        phone = ?,
        source = ?,
        stage = ?,
        priority = ?,
        deal_value = ?,
        expected_close_date = ?,
        assigned_to = ?,
        notes = ?,
        next_followup_date = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.title !== undefined ? data.title : existing.title,
      data.contact_name !== undefined ? data.contact_name : existing.contact_name,
      data.company_name !== undefined ? data.company_name : existing.company_name,
      data.email !== undefined ? data.email : existing.email,
      data.phone !== undefined ? data.phone : existing.phone,
      data.source !== undefined ? data.source : existing.source,
      data.stage !== undefined ? data.stage : existing.stage,
      data.priority !== undefined ? data.priority : existing.priority,
      data.deal_value !== undefined ? parseFloat(data.deal_value) || 0 : existing.deal_value,
      data.expected_close_date !== undefined ? data.expected_close_date : existing.expected_close_date,
      data.assigned_to !== undefined ? data.assigned_to : existing.assigned_to,
      data.notes !== undefined ? data.notes : existing.notes,
      data.next_followup_date !== undefined ? data.next_followup_date : existing.next_followup_date,
      id
    );

    return this.findById(id);
  }

  static delete(id) {
    const db = getDb();
    return db.prepare('DELETE FROM leads WHERE id = ?').run(id);
  }

  static getPipelineStats(employeeId = null) {
    const db = getDb();
    let sql = `
      SELECT stage, COUNT(*) as count, SUM(deal_value) as total_value
      FROM leads
    `;
    const params = [];
    if (employeeId) {
      sql += ` WHERE assigned_to = ?`;
      params.push(employeeId);
    }
    sql += ` GROUP BY stage`;

    const rows = db.prepare(sql).all(...params);
    const stages = {
      new: { count: 0, value: 0 },
      contacted: { count: 0, value: 0 },
      discussion: { count: 0, value: 0 },
      proposal: { count: 0, value: 0 },
      won: { count: 0, value: 0 },
      lost: { count: 0, value: 0 }
    };

    let totalDeals = 0;
    let totalPipelineValue = 0;
    let wonValue = 0;

    rows.forEach(r => {
      if (stages[r.stage]) {
        stages[r.stage].count = Number(r.count);
        stages[r.stage].value = Number(r.total_value) || 0;
      }
      totalDeals += Number(r.count);
      if (r.stage !== 'lost') {
        totalPipelineValue += Number(r.total_value) || 0;
      }
      if (r.stage === 'won') {
        wonValue += Number(r.total_value) || 0;
      }
    });

    const conversionRate = totalDeals > 0 ? ((stages.won.count / totalDeals) * 100).toFixed(1) : 0;

    return {
      stages,
      totalDeals,
      totalPipelineValue,
      wonValue,
      conversionRate
    };
  }
}

module.exports = Lead;
