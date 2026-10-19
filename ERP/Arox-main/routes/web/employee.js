const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/auth');
const roleGuard = require('../../middleware/roleGuard');
const employeeController = require('../../controllers/employeeController');

// All employee routes require authentication and staff/trainer/employee or admin access
router.use(authenticate);
router.use(roleGuard('employee', 'trainer', 'staff', 'admin', 'super_admin'));

// Overview & Dashboard
router.get('/', (req, res) => res.redirect('/employee/dashboard'));
router.get('/dashboard', employeeController.dashboard);

// Employee CRM & Work Modules
router.get('/clients', employeeController.clients);
router.get('/find-clients', (req, res) => res.redirect('/employee/clients'));

router.get('/leads', employeeController.leads);

router.get(['/follow-ups', '/followups'], employeeController.followUps);

router.get('/tasks', employeeController.tasks);

router.get('/performance', employeeController.performance);

// Student Assistance / Inquiries
router.get('/students', employeeController.students);
router.get('/attendance', (req, res) => res.redirect('/admin/generators/attendance'));

// Settings & Profile
router.get('/profile', employeeController.profile);
router.get('/settings', (req, res) => res.redirect('/employee/profile'));

module.exports = router;
