const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { ensureGuest } = require('../middleware/auth');

router.get('/login', ensureGuest, (req, res) => {
  res.render('auth/login', {
    title: 'Connexion',
    error: req.query.error,
    registered: req.query.registered
  });
});

router.get('/register', ensureGuest, (req, res) => {
  res.render('auth/register', {
    title: 'Inscription'
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login?error=1'
}));

router.post('/register', authController.register);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
