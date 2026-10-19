const { Client, Lead, FollowUp, EmployeeTask, EmployeeTarget, User, Student, Course } = require('../models');
const logger = require('../utils/logger');
const { getDb } = require('../config/database');

const employeeController = {
  /**
   * GET /employee/dashboard
   */
  async dashboard(req, res) {
    try {
      const employeeId = req.user.id;
      const todayDate = new Date().toISOString().split('T')[0];

      // KPI data
      const clientStats = Client.getStats(employeeId);
      const pipelineStats = Lead.getPipelineStats(employeeId);
      const followUpStats = FollowUp.getStats(employeeId);
      const taskStats = EmployeeTask.getStats(employeeId);
      const performance = EmployeeTarget.getPerformanceMetrics(employeeId);

      // Today's Follow-ups
      const todayFollowUps = FollowUp.findAll({
        employee_id: employeeId,
        filter: 'today'
      });

      // Priority Tasks
      const pendingTasks = EmployeeTask.findAll({
        assigned_to: employeeId,
        status: 'todo'
      }).slice(0, 5);

      // Recent Leads
      const recentLeads = Lead.findAll({
        assigned_to: employeeId
      }).slice(0, 5);

      res.render('employee/dashboard', {
        layout: 'layouts/employee',
        title: 'Employee Dashboard - Atideto Technologies ERP',
        pageTitle: 'Dashboard Overview',
        currentPath: '/employee/dashboard',
        user: req.user,
        clientStats,
        pipelineStats,
        followUpStats,
        taskStats,
        performance,
        todayFollowUps,
        pendingTasks,
        recentLeads
      });
    } catch (error) {
      logger.error('Employee dashboard error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/employee',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load employee dashboard.',
        user: req.user
      });
    }
  },

  /**
   * GET /employee/clients
   */
  async clients(req, res) {
    try {
      const employeeId = req.user.id;
      const { search, industry, location, status } = req.query;

      const clients = Client.findAll({
        search,
        industry,
        location,
        status
      });

      const stats = Client.getStats();

      res.render('employee/clients', {
        layout: 'layouts/employee',
        title: 'Find & Manage Clients - Atideto Technologies ERP',
        pageTitle: 'Find Clients',
        currentPath: '/employee/clients',
        user: req.user,
        clients,
        stats,
        filters: { search, industry, location, status }
      });
    } catch (error) {
      logger.error('Employee clients error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/employee',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load client directory.',
        user: req.user
      });
    }
  },

  /**
   * GET /employee/leads
   */
  async leads(req, res) {
    try {
      const employeeId = req.user.id;
      const { search, stage, priority, source, view = 'kanban' } = req.query;

      const leads = Lead.findAll({
        search,
        stage,
        priority,
        source,
        assigned_to: employeeId
      });

      const pipelineStats = Lead.getPipelineStats(employeeId);
      const allClients = Client.findAll();

      // Group leads by stage for Kanban view
      const kanbanLeads = {
        new: leads.filter(l => l.stage === 'new'),
        contacted: leads.filter(l => l.stage === 'contacted'),
        discussion: leads.filter(l => l.stage === 'discussion'),
        proposal: leads.filter(l => l.stage === 'proposal'),
        won: leads.filter(l => l.stage === 'won'),
        lost: leads.filter(l => l.stage === 'lost')
      };

      res.render('employee/leads', {
        layout: 'layouts/employee',
        title: 'Manage Leads & Pipeline - Atideto Technologies ERP',
        pageTitle: 'Manage Leads',
        currentPath: '/employee/leads',
        user: req.user,
        leads,
        kanbanLeads,
        pipelineStats,
        clients: allClients,
        activeView: view,
        filters: { search, stage, priority, source }
      });
    } catch (error) {
      logger.error('Employee leads error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/employee',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load leads pipeline.',
        user: req.user
      });
    }
  },

  /**
   * GET /employee/follow-ups
   */
  async followUps(req, res) {
    try {
      const employeeId = req.user.id;
      const { tab = 'today' } = req.query;

      const followUps = FollowUp.findAll({
        employee_id: employeeId,
        filter: tab
      });

      const stats = FollowUp.getStats(employeeId);
      const myLeads = Lead.findAll({ assigned_to: employeeId });
      const myClients = Client.findAll();

      res.render('employee/follow-ups', {
        layout: 'layouts/employee',
        title: 'Follow-up Communications - Atideto Technologies ERP',
        pageTitle: 'Follow-ups',
        currentPath: '/employee/follow-ups',
        user: req.user,
        followUps,
        stats,
        leads: myLeads,
        clients: myClients,
        activeTab: tab
      });
    } catch (error) {
      logger.error('Employee follow-ups error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/employee',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load follow-up schedules.',
        user: req.user
      });
    }
  },

  /**
   * GET /employee/tasks
   */
  async tasks(req, res) {
    try {
      const employeeId = req.user.id;
      const { status = 'all', priority, category, search } = req.query;

      const tasks = EmployeeTask.findAll({
        assigned_to: employeeId,
        status,
        priority,
        category,
        search
      });

      const stats = EmployeeTask.getStats(employeeId);
      const myLeads = Lead.findAll({ assigned_to: employeeId });

      res.render('employee/tasks', {
        layout: 'layouts/employee',
        title: 'My Tasks - Atideto Technologies ERP',
        pageTitle: 'Tasks & To-Dos',
        currentPath: '/employee/tasks',
        user: req.user,
        tasks,
        stats,
        leads: myLeads,
        activeStatus: status,
        filters: { priority, category, search }
      });
    } catch (error) {
      logger.error('Employee tasks error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/employee',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load employee tasks.',
        user: req.user
      });
    }
  },

  /**
   * GET /employee/performance
   */
  async performance(req, res) {
    try {
      const employeeId = req.user.id;
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const metrics = EmployeeTarget.getPerformanceMetrics(employeeId, currentMonth, currentYear);
      const pipelineStats = Lead.getPipelineStats(employeeId);
      const followUpStats = FollowUp.getStats(employeeId);
      const taskStats = EmployeeTask.getStats(employeeId);

      // Recent closed leads
      const wonDeals = Lead.findAll({
        assigned_to: employeeId,
        stage: 'won'
      });

      res.render('employee/performance', {
        layout: 'layouts/employee',
        title: 'Performance & KPI Metrics - Atideto Technologies ERP',
        pageTitle: 'My Performance',
        currentPath: '/employee/performance',
        user: req.user,
        metrics,
        pipelineStats,
        followUpStats,
        taskStats,
        wonDeals
      });
    } catch (error) {
      logger.error('Employee performance error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/employee',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load performance metrics.',
        user: req.user
      });
    }
  },

  /**
   * GET /employee/students
   */
  async students(req, res) {
    try {
      const db = getDb();
      const students = db.prepare(`
        SELECT 
          s.id, s.student_id, s.first_name, s.last_name, s.email, s.phone,
          s.college, s.department, s.year_of_study, s.status,
          c.title as course_title, c.batch_name
        FROM students s
        LEFT JOIN registrations r ON r.student_id = s.id
        LEFT JOIN courses c ON r.course_id = c.id
        ORDER BY s.first_name ASC
      `).all() || [];

      res.render('employee/students', {
        layout: 'layouts/employee',
        title: 'Students & Batches - Atideto Technologies ERP',
        pageTitle: 'Students Directory',
        currentPath: '/employee/students',
        user: req.user,
        students
      });
    } catch (error) {
      logger.error('Employee students error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/employee',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load student directory.',
        user: req.user
      });
    }
  },

  /**
   * GET /employee/profile
   */
  async profile(req, res) {
    try {
      const employeeId = req.user.id;
      const user = User.findById(employeeId);
      const metrics = EmployeeTarget.getPerformanceMetrics(employeeId);

      res.render('employee/profile', {
        layout: 'layouts/employee',
        title: 'My Profile - Atideto Technologies ERP',
        pageTitle: 'My Profile',
        currentPath: '/employee/profile',
        user: req.user,
        profile: user,
        metrics
      });
    } catch (error) {
      logger.error('Employee profile error:', error);
      res.status(500).render('website/error', {
        layout: 'layouts/employee',
        title: 'Error - Atideto Technologies ERP',
        code: 500,
        message: 'Failed to load employee profile.',
        user: req.user
      });
    }
  },

  // ============================================
  // API ACTIONS (POST / PUT / DELETE)
  // ============================================

  /**
   * POST /api/employee/clients
   */
  async createClient(req, res) {
    try {
      const data = {
        ...req.body,
        assigned_to: req.body.assigned_to || req.user.id
      };
      const client = Client.create(data);
      res.json({ success: true, message: 'Client added successfully!', client });
    } catch (e) {
      logger.error('createClient error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * PUT /api/employee/clients/:id
   */
  async updateClient(req, res) {
    try {
      const client = Client.update(req.params.id, req.body);
      res.json({ success: true, message: 'Client updated successfully!', client });
    } catch (e) {
      logger.error('updateClient error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * POST /api/employee/leads
   */
  async createLead(req, res) {
    try {
      const data = {
        ...req.body,
        assigned_to: req.body.assigned_to || req.user.id
      };
      const lead = Lead.create(data);
      res.json({ success: true, message: 'Lead added to pipeline!', lead });
    } catch (e) {
      logger.error('createLead error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * PUT /api/employee/leads/:id/stage
   */
  async updateLeadStage(req, res) {
    try {
      const { stage } = req.body;
      const lead = Lead.updateStage(req.params.id, stage);
      res.json({ success: true, message: `Lead moved to ${stage}`, lead });
    } catch (e) {
      logger.error('updateLeadStage error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * PUT /api/employee/leads/:id
   */
  async updateLead(req, res) {
    try {
      const lead = Lead.update(req.params.id, req.body);
      res.json({ success: true, message: 'Lead updated successfully!', lead });
    } catch (e) {
      logger.error('updateLead error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * POST /api/employee/follow-ups
   */
  async createFollowUp(req, res) {
    try {
      const data = {
        ...req.body,
        employee_id: req.body.employee_id || req.user.id
      };
      const followUp = FollowUp.create(data);
      res.json({ success: true, message: 'Follow-up scheduled successfully!', followUp });
    } catch (e) {
      logger.error('createFollowUp error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * PUT /api/employee/follow-ups/:id/complete
   */
  async completeFollowUp(req, res) {
    try {
      const { outcome, notes } = req.body;
      const followUp = FollowUp.complete(req.params.id, outcome, notes);
      res.json({ success: true, message: 'Follow-up logged as completed!', followUp });
    } catch (e) {
      logger.error('completeFollowUp error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * POST /api/employee/tasks
   */
  async createTask(req, res) {
    try {
      const data = {
        ...req.body,
        assigned_to: req.body.assigned_to || req.user.id,
        assigned_by: req.user.id
      };
      const task = EmployeeTask.create(data);
      res.json({ success: true, message: 'Task created successfully!', task });
    } catch (e) {
      logger.error('createTask error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  },

  /**
   * PUT /api/employee/tasks/:id/status
   */
  async updateTaskStatus(req, res) {
    try {
      const { status } = req.body;
      const task = EmployeeTask.updateStatus(req.params.id, status);
      res.json({ success: true, message: `Task status updated to ${status}`, task });
    } catch (e) {
      logger.error('updateTaskStatus error:', e);
      res.status(500).json({ success: false, message: e.message });
    }
  }
};

module.exports = employeeController;
