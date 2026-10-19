const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/pageController');
const { optionalAuth } = require('../../middleware/auth');

// Root entry point:
// If authenticated, automatically redirects to respective dashboard.
// If not authenticated, renders the Apple-style Login/Signup portal.
router.get('/', optionalAuth, (req, res) => {
  if (req.user) {
    if (['admin', 'super_admin'].includes(req.user.role)) {
      return res.redirect('/admin/dashboard');
    }
    if (['employee', 'trainer', 'staff'].includes(req.user.role)) {
      return res.redirect('/employee/dashboard');
    }
    return res.redirect('/student/dashboard');
  }
  return pageController.login(req, res);
});

// All legacy website routes redirect to /login
router.get(['/about', '/about.html', '/contact', '/contact.html', '/apply', '/apply.html', 
            '/services', '/services.html', '/courses', '/courses.html', '/training', 
            '/internships', '/internships.html', '/course/:slug'], (req, res) => {
  res.redirect('/login');
});

// Certificate Verification Tool
router.get('/verify-certificate', (req, res) => res.redirect('/cert/index.html'));

// ERP Login & Signup Portal
router.get('/login', optionalAuth, pageController.login);
router.get('/signup', optionalAuth, pageController.signup);
router.get('/register', (req, res) => res.redirect('/signup'));

// Logout route: clears cookie session and immediately returns to login page
router.get('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.redirect('/login');
});

module.exports = router;
