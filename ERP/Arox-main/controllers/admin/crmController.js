const { Client, Lead, FollowUp, EmployeeTask, EmployeeTarget, User, Student, Course } = require('../../models');
const logger = require('../../utils/logger');
const { getDb } = require('../../config/database');

const crmController = {
  /**
   * GET /admin/clients
   */
  async clients(req, res) {
    try {
      const { search, industry, location, status, assigned_to } = req.query;

      const clients = Client.findAll({
        search,
        industry,
        location,
        status,
        assigned_to
      });

      const stats = Client.getStats();
      const employees = User.findAll().filter(u => [1, 2, 4].includes(u.role_id) || ['admin', 'super_admin', 'trainer', 'staff', 'employee'].includes(u.role_name));

      res.render('admin/clients/index', {
        layout: 'layouts/admin',
        title: 'Client Directory - Admin ERP',
        pageTitle: 'Client Management',
        currentPath: '/admin/clients',
        user: req.user,
        clients,
        stats,
        employees,
        filters: { search, industry, location, status, assigned_to }
      });
    } catch (error) {
      logger.error('Admin clients error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/admin',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load clients in admin panel.',
        user: req.user
      });
    }
  },

  /**
   * GET /admin/leads
   */
  async leads(req, res) {
    try {
      const { search, stage, priority, source, assigned_to, view = 'kanban' } = req.query;

      const leads = Lead.findAll({
        search,
        stage,
        priority,
        source,
        assigned_to
      });

      const pipelineStats = Lead.getPipelineStats(assigned_to);
      const allClients = Client.findAll();
      const employees = User.findAll().filter(u => [1, 2, 4].includes(u.role_id) || ['admin', 'super_admin', 'trainer', 'staff', 'employee'].includes(u.role_name));

      const kanbanLeads = {
        new: leads.filter(l => l.stage === 'new'),
        contacted: leads.filter(l => l.stage === 'contacted'),
        discussion: leads.filter(l => l.stage === 'discussion'),
        proposal: leads.filter(l => l.stage === 'proposal'),
        won: leads.filter(l => l.stage === 'won'),
        lost: leads.filter(l => l.stage === 'lost')
      };

      res.render('admin/leads/index', {
        layout: 'layouts/admin',
        title: 'Manage Leads - Admin ERP',
        pageTitle: 'Leads & Sales Pipeline',
        currentPath: '/admin/leads',
        user: req.user,
        leads,
        kanbanLeads,
        pipelineStats,
        clients: allClients,
        employees,
        activeView: view,
        filters: { search, stage, priority, source, assigned_to }
      });
    } catch (error) {
      logger.error('Admin leads error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/admin',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load leads in admin panel.',
        user: req.user
      });
    }
  },

  /**
   * GET /admin/follow-ups
   */
  async followUps(req, res) {
    try {
      const { employee_id, tab = 'all' } = req.query;

      const followUps = FollowUp.findAll({
        employee_id,
        filter: tab
      });

      const stats = FollowUp.getStats(employee_id);
      const employees = User.findAll().filter(u => [1, 2, 4].includes(u.role_id) || ['admin', 'super_admin', 'trainer', 'staff', 'employee'].includes(u.role_name));
      const allLeads = Lead.findAll();
      const allClients = Client.findAll();

      res.render('admin/follow-ups/index', {
        layout: 'layouts/admin',
        title: 'Team Follow-ups - Admin ERP',
        pageTitle: 'Follow-up Communications',
        currentPath: '/admin/follow-ups',
        user: req.user,
        followUps,
        stats,
        employees,
        leads: allLeads,
        clients: allClients,
        activeTab: tab,
        filters: { employee_id }
      });
    } catch (error) {
      logger.error('Admin follow-ups error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/admin',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load follow-ups in admin panel.',
        user: req.user
      });
    }
  },

  /**
   * GET /admin/tasks
   */
  async tasks(req, res) {
    try {
      const { assigned_to, status = 'all', priority, category, search } = req.query;

      const tasks = EmployeeTask.findAll({
        assigned_to,
        status,
        priority,
        category,
        search
      });

      const stats = EmployeeTask.getStats(assigned_to);
      const employees = User.findAll().filter(u => [1, 2, 4].includes(u.role_id) || ['admin', 'super_admin', 'trainer', 'staff', 'employee'].includes(u.role_name));
      const allLeads = Lead.findAll();

      res.render('admin/tasks/index', {
        layout: 'layouts/admin',
        title: 'Employee Tasks - Admin ERP',
        pageTitle: 'Employee Tasks & Assignments',
        currentPath: '/admin/tasks',
        user: req.user,
        tasks,
        stats,
        employees,
        leads: allLeads,
        activeStatus: status,
        filters: { assigned_to, priority, category, search }
      });
    } catch (error) {
      logger.error('Admin tasks error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/admin',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load employee tasks.',
        user: req.user
      });
    }
  },

  /**
   * GET /admin/performance
   */
  async performance(req, res) {
    try {
      const leaderboard = EmployeeTarget.getLeaderboard();
      const employees = User.findAll().filter(u => [1, 2, 4].includes(u.role_id) || ['admin', 'super_admin', 'trainer', 'staff', 'employee'].includes(u.role_name));
      const pipelineStats = Lead.getPipelineStats();

      res.render('admin/performance/index', {
        layout: 'layouts/admin',
        title: 'Employee Performance & KPIs - Admin ERP',
        pageTitle: 'Employee Performance',
        currentPath: '/admin/performance',
        user: req.user,
        leaderboard,
        employees,
        pipelineStats
      });
    } catch (error) {
      logger.error('Admin performance error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/admin',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load performance metrics.',
        user: req.user
      });
    }
  },

  /**
   * POST /admin/performance/targets
   */
  async setTarget(req, res) {
    try {
      const { employee_id, month, year, leads_target, revenue_target, followups_target, rating, manager_feedback } = req.body;
      const target = EmployeeTarget.setTarget({
        employee_id: parseInt(employee_id),
        month: parseInt(month) || (new Date().getMonth() + 1),
        year: parseInt(year) || new Date().getFullYear(),
        leads_target: parseInt(leads_target) || 30,
        revenue_target: parseFloat(revenue_target) || 200000,
        followups_target: parseInt(followups_target) || 80,
        rating: parseFloat(rating) || 4.5,
        manager_feedback: manager_feedback || ''
      });
      res.json({ success: true, message: 'Performance targets updated!', target });
    } catch (e) {
      logger.error('setTarget error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * GET /admin/settings
   */
  async settings(req, res) {
    try {
      const appConfig = require('../../config/app');
      res.render('admin/settings/index', {
        layout: 'layouts/admin',
        title: 'Settings - Admin ERP',
        pageTitle: 'System Settings',
        currentPath: '/admin/settings',
        user: req.user,
        config: appConfig
      });
    } catch (error) {
      logger.error('Admin settings error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/admin',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load settings.',
        user: req.user
      });
    }
  },

  /**
   * GET /admin/profile
   */
  async profile(req, res) {
    try {
      const user = User.findById(req.user.id);
      res.render('admin/profile/index', {
        layout: 'layouts/admin',
        title: 'Admin Profile - Atideto Technologies ERP',
        pageTitle: 'My Profile',
        currentPath: '/admin/profile',
        user: req.user,
        profile: user
      });
    } catch (error) {
      logger.error('Admin profile error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/admin',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load profile.',
        user: req.user
      });
    }
  }
};

module.exports = crmController;
