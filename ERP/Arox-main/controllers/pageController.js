const logger = require('../utils/logger');

const pageController = {
  /** GET /login, /, or /signup */
  login(req, res) {
    // Only auto-redirect on root '/' when already authenticated.
    // Visiting '/login' or '/signup' will ALWAYS open the login page directly.
    if (req.user && req.path === '/' && !req.query.login) {
      if (req.user.role === 'admin' || req.user.role === 'super_admin') {
        return res.redirect('/admin/dashboard');
      }
      if (['employee', 'trainer', 'staff'].includes(req.user.role)) {
        return res.redirect('/employee/dashboard');
      }
      return res.redirect('/student/dashboard');
    }
    
    const initialMode = (req.query.mode === 'signup' || req.path === '/signup') ? 'signup' : 'login';
    const initialRole = ['student', 'employee', 'admin'].includes(req.query.role) ? req.query.role : 'student';

    res.render('website/login', {
      layout: false,
      title: 'Atideto Technologies ERP — Login',
      initialMode,
      initialRole
    });
  },

  /** GET /signup /register */
  signup(req, res) {
    req.query.mode = 'signup';
    return pageController.login(req, res);
  },

  /** Error page */
  error(req, res) {
    res.status(404).render('website/error', {
      layout: false,
      title: 'Page Not Found - Atideto Technologies ERP',
      code: 404,
      message: 'The page you are looking for does not exist or has been moved.',
      user: req.user || { first_name: 'User', last_name: '', role: 'guest' }
    });
  }
};

module.exports = pageController;
