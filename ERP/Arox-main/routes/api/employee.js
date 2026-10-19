const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/auth');
const roleGuard = require('../../middleware/roleGuard');
const employeeController = require('../../controllers/employeeController');

router.use(authenticate);
router.use(roleGuard('employee', 'trainer', 'staff', 'admin', 'super_admin'));

// Clients
router.post('/clients', employeeController.createClient);
router.put('/clients/:id', employeeController.updateClient);

// Leads
router.post('/leads', employeeController.createLead);
router.put('/leads/:id/stage', employeeController.updateLeadStage);
router.put('/leads/:id', employeeController.updateLead);

// Follow-ups
router.post('/follow-ups', employeeController.createFollowUp);
router.put('/follow-ups/:id/complete', employeeController.completeFollowUp);

// Tasks
router.post('/tasks', employeeController.createTask);
router.put('/tasks/:id/status', employeeController.updateTaskStatus);

module.exports = router;
