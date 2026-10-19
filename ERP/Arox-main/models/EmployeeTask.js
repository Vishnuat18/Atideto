const { getDb } = require('../config/database');

class EmployeeTask {
  static findAll(filters = {}) {
    const db = getDb();
    let sql = `
      SELECT t.*,
             l.title as lead_title,
             u1.first_name as assignee_first_name, u1.last_name as assignee_last_name,
             u2.first_name as assigner_first_name, u2.last_name as assigner_last_name
      FROM employee_tasks t
      LEFT JOIN leads l ON t.lead_id = l.id
      LEFT JOIN users u1 ON t.assigned_to = u1.id
      LEFT JOIN users u2 ON t.assigned_by = u2.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.assigned_to) {
      sql += ` AND t.assigned_to = ?`;
      params.push(filters.assigned_to);
    }

    if (filters.status && filters.status !== 'all') {
      sql += ` AND t.status = ?`;
      params.push(filters.status);
    }

    if (filters.priority && filters.priority !== 'all') {
      sql += ` AND t.priority = ?`;
      params.push(filters.priority);
    }

    if (filters.category && filters.category !== 'all') {
      sql += ` AND t.category = ?`;
      params.push(filters.category);
    }

    if (filters.search) {
      sql += ` AND (t.title LIKE ? OR t.description LIKE ?)`;
      const term = `%${filters.search}%`;
      params.push(term, term);
    }

    sql += ` ORDER BY CASE WHEN t.status = 'completed' THEN 2 ELSE 1 END, t.due_date ASC, t.created_at DESC`;

    return db.prepare(sql).all(...params);
  }

  static findById(id) {
    const db = getDb();
    return db.prepare(`
      SELECT t.*,
             l.title as lead_title,
             u1.first_name as assignee_first_name, u1.last_name as assignee_last_name,
             u2.first_name as assigner_first_name, u2.last_name as assigner_last_name
      FROM employee_tasks t
      LEFT JOIN leads l ON t.lead_id = l.id
      LEFT JOIN users u1 ON t.assigned_to = u1.id
      LEFT JOIN users u2 ON t.assigned_by = u2.id
      WHERE t.id = ?
    `).get(id);
  }

  static create(data) {
    const db = getDb();
    const res = db.prepare(`
      INSERT INTO employee_tasks (
        title, description, assigned_to, assigned_by, lead_id, priority, status, category, due_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.title,
      data.description || '',
      data.assigned_to,
      data.assigned_by || null,
      data.lead_id || null,
      data.priority || 'medium',
      data.status || 'todo',
      data.category || 'client_outreach',
      data.due_date || null
    );

    return { id: res.lastInsertRowid, ...data };
  }

  static updateStatus(id, status) {
    const db = getDb();
    const completed_at = status === 'completed' ? new Date().toISOString() : null;
    db.prepare(`
      UPDATE employee_tasks 
      SET status = ?, 
          completed_at = ?,
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(status, completed_at, id);
    return this.findById(id);
  }

  static update(id, data) {
    const db = getDb();
    const existing = this.findById(id);
    if (!existing) return null;

    db.prepare(`
      UPDATE employee_tasks SET
        title = ?,
        description = ?,
        priority = ?,
        status = ?,
        category = ?,
        due_date = ?,
        assigned_to = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.title !== undefined ? data.title : existing.title,
      data.description !== undefined ? data.description : existing.description,
      data.priority !== undefined ? data.priority : existing.priority,
      data.status !== undefined ? data.status : existing.status,
      data.category !== undefined ? data.category : existing.category,
      data.due_date !== undefined ? data.due_date : existing.due_date,
      data.assigned_to !== undefined ? data.assigned_to : existing.assigned_to,
      id
    );

    return this.findById(id);
  }

  static delete(id) {
    const db = getDb();
    return db.prepare('DELETE FROM employee_tasks WHERE id = ?').run(id);
  }

  static getStats(employeeId = null) {
    const db = getDb();
    let where = employeeId ? 'WHERE assigned_to = ?' : '';
    const params = employeeId ? [employeeId] : [];

    const rows = db.prepare(`SELECT status, COUNT(*) as count FROM employee_tasks ${where} GROUP BY status`).all(...params);
    const stats = { total: 0, todo: 0, in_progress: 0, review: 0, completed: 0, pending: 0 };
    rows.forEach(r => {
      stats[r.status] = Number(r.count);
      stats.total += Number(r.count);
    });
    stats.pending = stats.todo + stats.in_progress + stats.review;
    return stats;
  }
}

module.exports = EmployeeTask;
