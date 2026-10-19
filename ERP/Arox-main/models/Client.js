const { getDb } = require('../config/database');

class Client {
  static findAll(filters = {}) {
    const db = getDb();
    let sql = `
      SELECT c.*, u.first_name as assignee_first_name, u.last_name as assignee_last_name
      FROM clients c
      LEFT JOIN users u ON c.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.search) {
      sql += ` AND (c.company_name LIKE ? OR c.contact_person LIKE ? OR c.email LIKE ? OR c.phone LIKE ?)`;
      const term = `%${filters.search}%`;
      params.push(term, term, term, term);
    }

    if (filters.industry && filters.industry !== 'all') {
      sql += ` AND c.industry = ?`;
      params.push(filters.industry);
    }

    if (filters.location && filters.location !== 'all') {
      sql += ` AND c.location = ?`;
      params.push(filters.location);
    }

    if (filters.status && filters.status !== 'all') {
      sql += ` AND c.status = ?`;
      params.push(filters.status);
    }

    if (filters.assigned_to) {
      sql += ` AND c.assigned_to = ?`;
      params.push(filters.assigned_to);
    }

    sql += ` ORDER BY c.created_at DESC`;

    return db.prepare(sql).all(...params);
  }

  static findById(id) {
    const db = getDb();
    return db.prepare(`
      SELECT c.*, u.first_name as assignee_first_name, u.last_name as assignee_last_name
      FROM clients c
      LEFT JOIN users u ON c.assigned_to = u.id
      WHERE c.id = ?
    `).get(id);
  }

  static create(data) {
    const db = getDb();
    const count = db.prepare('SELECT COUNT(*) as c FROM clients').get()?.c || 0;
    const client_code = data.client_code || `CLI-${1000 + Number(count) + 1}`;

    const res = db.prepare(`
      INSERT INTO clients (
        client_code, company_name, contact_person, email, phone,
        industry, location, company_size, website, requirements, status, assigned_to
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      client_code,
      data.company_name,
      data.contact_person,
      data.email,
      data.phone,
      data.industry || 'IT & Software',
      data.location || 'Chennai',
      data.company_size || '11-50',
      data.website || '',
      data.requirements || '',
      data.status || 'prospect',
      data.assigned_to || null
    );

    return { id: res.lastInsertRowid, client_code, ...data };
  }

  static update(id, data) {
    const db = getDb();
    const existing = this.findById(id);
    if (!existing) return null;

    db.prepare(`
      UPDATE clients SET
        company_name = ?,
        contact_person = ?,
        email = ?,
        phone = ?,
        industry = ?,
        location = ?,
        company_size = ?,
        website = ?,
        requirements = ?,
        status = ?,
        assigned_to = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.company_name !== undefined ? data.company_name : existing.company_name,
      data.contact_person !== undefined ? data.contact_person : existing.contact_person,
      data.email !== undefined ? data.email : existing.email,
      data.phone !== undefined ? data.phone : existing.phone,
      data.industry !== undefined ? data.industry : existing.industry,
      data.location !== undefined ? data.location : existing.location,
      data.company_size !== undefined ? data.company_size : existing.company_size,
      data.website !== undefined ? data.website : existing.website,
      data.requirements !== undefined ? data.requirements : existing.requirements,
      data.status !== undefined ? data.status : existing.status,
      data.assigned_to !== undefined ? data.assigned_to : existing.assigned_to,
      id
    );

    return this.findById(id);
  }

  static delete(id) {
    const db = getDb();
    return db.prepare('DELETE FROM clients WHERE id = ?').run(id);
  }

  static getStats(employeeId = null) {
    const db = getDb();
    let sql = 'SELECT status, COUNT(*) as count FROM clients';
    const params = [];
    if (employeeId) {
      sql += ' WHERE assigned_to = ?';
      params.push(employeeId);
    }
    sql += ' GROUP BY status';
    
    const rows = db.prepare(sql).all(...params);
    const stats = { total: 0, prospect: 0, contacted: 0, partner: 0, closed: 0 };
    rows.forEach(r => {
      stats[r.status] = Number(r.count);
      stats.total += Number(r.count);
    });
    return stats;
  }
}

module.exports = Client;
