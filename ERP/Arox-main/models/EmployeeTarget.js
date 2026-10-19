const { getDb } = require('../config/database');

class EmployeeTarget {
  static getByEmployeeAndMonth(employeeId, month, year) {
    const db = getDb();
    let target = db.prepare(`
      SELECT * FROM employee_targets 
      WHERE employee_id = ? AND month = ? AND year = ?
    `).get(employeeId, month, year);

    if (!target) {
      // Default targets if none explicitly set yet
      target = {
        employee_id: employeeId,
        month,
        year,
        leads_target: 30,
        revenue_target: 200000,
        followups_target: 80,
        rating: 4.5,
        manager_feedback: 'Target tracking active for this period.'
      };
    }
    return target;
  }

  static setTarget(data) {
    const db = getDb();
    const existing = db.prepare(`
      SELECT id FROM employee_targets 
      WHERE employee_id = ? AND month = ? AND year = ?
    `).get(data.employee_id, data.month, data.year);

    if (existing) {
      db.prepare(`
        UPDATE employee_targets SET
          leads_target = ?,
          revenue_target = ?,
          followups_target = ?,
          rating = ?,
          manager_feedback = ?
        WHERE id = ?
      `).run(
        data.leads_target || 30,
        data.revenue_target || 200000,
        data.followups_target || 80,
        data.rating || 4.5,
        data.manager_feedback || '',
        existing.id
      );
      return { id: existing.id, ...data };
    } else {
      const res = db.prepare(`
        INSERT INTO employee_targets (
          employee_id, month, year, leads_target, revenue_target, followups_target, rating, manager_feedback
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        data.employee_id,
        data.month,
        data.year,
        data.leads_target || 30,
        data.revenue_target || 200000,
        data.followups_target || 80,
        data.rating || 4.5,
        data.manager_feedback || ''
      );
      return { id: res.lastInsertRowid, ...data };
    }
  }

  static getPerformanceMetrics(employeeId, month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
    const db = getDb();
    const target = this.getByEmployeeAndMonth(employeeId, month, year);

    // Actual leads created
    const leadsCreated = db.prepare(`
      SELECT COUNT(*) as c FROM leads 
      WHERE assigned_to = ?
    `).get(employeeId)?.c || 0;

    // Actual leads won and revenue
    const wonStats = db.prepare(`
      SELECT COUNT(*) as c, SUM(deal_value) as rev 
      FROM leads 
      WHERE assigned_to = ? AND stage = 'won'
    `).get(employeeId);

    const leadsWon = wonStats?.c || 0;
    const actualRevenue = wonStats?.rev || 0;

    // Actual follow-ups completed
    const followupsCompleted = db.prepare(`
      SELECT COUNT(*) as c FROM follow_ups 
      WHERE employee_id = ? AND status = 'completed'
    `).get(employeeId)?.c || 0;

    // Tasks completed
    const tasksCompleted = db.prepare(`
      SELECT COUNT(*) as c FROM employee_tasks 
      WHERE assigned_to = ? AND status = 'completed'
    `).get(employeeId)?.c || 0;

    const totalTasks = db.prepare(`
      SELECT COUNT(*) as c FROM employee_tasks 
      WHERE assigned_to = ?
    `).get(employeeId)?.c || 0;

    // Conversion rate
    const conversionRate = leadsCreated > 0 
      ? ((leadsWon / leadsCreated) * 100).toFixed(1) 
      : 0;

    // Percentages of target
    const leadsPercent = target.leads_target > 0 
      ? Math.min(Math.round((leadsCreated / target.leads_target) * 100), 100) 
      : 0;
    const revenuePercent = target.revenue_target > 0 
      ? Math.min(Math.round((actualRevenue / target.revenue_target) * 100), 100) 
      : 0;
    const followupsPercent = target.followups_target > 0 
      ? Math.min(Math.round((followupsCompleted / target.followups_target) * 100), 100) 
      : 0;

    // Overall Score (weighted)
    const overallScore = Math.round((leadsPercent * 0.3) + (revenuePercent * 0.5) + (followupsPercent * 0.2));

    return {
      target,
      leadsCreated: Number(leadsCreated),
      leadsWon: Number(leadsWon),
      actualRevenue: Number(actualRevenue),
      followupsCompleted: Number(followupsCompleted),
      tasksCompleted: Number(tasksCompleted),
      totalTasks: Number(totalTasks),
      conversionRate: Number(conversionRate),
      leadsPercent,
      revenuePercent,
      followupsPercent,
      overallScore,
      rating: target.rating || 4.8,
      manager_feedback: target.manager_feedback
    };
  }

  static getLeaderboard() {
    const db = getDb();
    const employees = db.prepare(`
      SELECT id, first_name, last_name, email 
      FROM users 
      WHERE role_id IN (1, 2, 4)
    `).all();

    return employees.map(emp => {
      const metrics = this.getPerformanceMetrics(emp.id);
      return {
        id: emp.id,
        name: `${emp.first_name || ''} ${emp.last_name || ''}`.trim(),
        email: emp.email,
        ...metrics
      };
    }).sort((a, b) => b.overallScore - a.overallScore);
  }
}

module.exports = EmployeeTarget;
