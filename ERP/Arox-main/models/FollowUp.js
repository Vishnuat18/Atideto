const { getDb } = require('../config/database');

class FollowUp {
  static findAll(filters = {}) {
    const db = getDb();
    let sql = `
      SELECT f.*,
             l.title as lead_title, l.contact_name as lead_contact, l.company_name as lead_company,
             c.company_name as client_company, c.contact_person as client_contact,
             u.first_name as employee_first_name, u.last_name as employee_last_name
      FROM follow_ups f
      LEFT JOIN leads l ON f.lead_id = l.id
      LEFT JOIN clients c ON f.client_id = c.id
      LEFT JOIN users u ON f.employee_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.employee_id) {
      sql += ` AND f.employee_id = ?`;
      params.push(filters.employee_id);
    }

    if (filters.status && filters.status !== 'all') {
      sql += ` AND f.status = ?`;
      params.push(filters.status);
    }

    if (filters.type && filters.type !== 'all') {
      sql += ` AND f.type = ?`;
      params.push(filters.type);
    }

    if (filters.lead_id) {
      sql += ` AND f.lead_id = ?`;
      params.push(filters.lead_id);
    }

    if (filters.filter === 'today') {
      sql += ` AND date(f.scheduled_at) = date('now')`;
    } else if (filters.filter === 'upcoming') {
      sql += ` AND date(f.scheduled_at) > date('now') AND f.status = 'scheduled'`;
    } else if (filters.filter === 'overdue') {
      sql += ` AND datetime(f.scheduled_at) < datetime('now') AND f.status = 'scheduled'`;
    } else if (filters.filter === 'completed') {
      sql += ` AND f.status = 'completed'`;
    }

    sql += ` ORDER BY f.scheduled_at ASC`;

    return db.prepare(sql).all(...params);
  }

  static findById(id) {
    const db = getDb();
    return db.prepare(`
      SELECT f.*,
             l.title as lead_title, l.contact_name as lead_contact, l.company_name as lead_company,
             c.company_name as client_company, c.contact_person as client_contact,
             u.first_name as employee_first_name, u.last_name as employee_last_name
      FROM follow_ups f
      LEFT JOIN leads l ON f.lead_id = l.id
      LEFT JOIN clients c ON f.client_id = c.id
      LEFT JOIN users u ON f.employee_id = u.id
      WHERE f.id = ?
    `).get(id);
  }

  static create(data) {
    const db = getDb();
    const res = db.prepare(`
      INSERT INTO follow_ups (
        lead_id, client_id, employee_id, title, type, scheduled_at, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.lead_id || null,
      data.client_id || null,
      data.employee_id,
      data.title,
      data.type || 'phone_call',
      data.scheduled_at,
      data.status || 'scheduled',
      data.notes || ''
    );

    // If associated with a lead, update next_followup_date on the lead
    if (data.lead_id) {
      try {
        db.prepare('UPDATE leads SET next_followup_date = ? WHERE id = ?').run(data.scheduled_at, data.lead_id);
      } catch (e) {}
    }

    return { id: res.lastInsertRowid, ...data };
  }

  static complete(id, outcome, outcomeNotes = '') {
    const db = getDb();
    const existing = this.findById(id);
    if (!existing) return null;

    const mergedNotes = outcomeNotes 
      ? (existing.notes ? `${existing.notes}\n[Outcome Note]: ${outcomeNotes}` : outcomeNotes)
      : existing.notes;

    db.prepare(`
      UPDATE follow_ups SET
        status = 'completed',
        outcome = ?,
        notes = ?,
        completed_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(outcome || 'interested', mergedNotes, id);

    return this.findById(id);
  }

  static reschedule(id, newScheduledAt, notes = '') {
    const db = getDb();
    db.prepare(`
      UPDATE follow_ups SET
        scheduled_at = ?,
        status = 'rescheduled',
        notes = CASE WHEN ? != '' THEN notes || '\n[Rescheduled]: ' || ? ELSE notes END
      WHERE id = ?
    `).run(newScheduledAt, notes, notes, id);
    return this.findById(id);
  }

  static delete(id) {
    const db = getDb();
    return db.prepare('DELETE FROM follow_ups WHERE id = ?').run(id);
  }

  static getStats(employeeId = null) {
    const db = getDb();
    let whereEmployee = employeeId ? 'WHERE employee_id = ?' : '';
    const params = employeeId ? [employeeId] : [];

    const total = db.prepare(`SELECT COUNT(*) as c FROM follow_ups ${whereEmployee}`).get(...params)?.c || 0;
    
    let todaySql = `SELECT COUNT(*) as c FROM follow_ups WHERE date(scheduled_at) = date('now')`;
    if (employeeId) todaySql += ` AND employee_id = ?`;
    const today = db.prepare(todaySql).get(...params)?.c || 0;

    let overdueSql = `SELECT COUNT(*) as c FROM follow_ups WHERE datetime(scheduled_at) < datetime('now') AND status = 'scheduled'`;
    if (employeeId) overdueSql += ` AND employee_id = ?`;
    const overdue = db.prepare(overdueSql).get(...params)?.c || 0;

    let completedSql = `SELECT COUNT(*) as c FROM follow_ups WHERE status = 'completed'`;
    if (employeeId) completedSql += ` AND employee_id = ?`;
    const completed = db.prepare(completedSql).get(...params)?.c || 0;

    return {
      total: Number(total),
      today: Number(today),
      overdue: Number(overdue),
      completed: Number(completed)
    };
  }
}

module.exports = FollowUp;
