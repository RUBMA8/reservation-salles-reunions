const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const db = require('../config/database');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.render('home', {
    title: 'Accueil'
  });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  if (req.user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  }

  const stats = {
    mesReservations: 0,
    sallesDisponibles: 0
  };

  // Compter les réservations de l'utilisateur
  db.get('SELECT COUNT(*) as count FROM reservations WHERE user_id = ? AND statut = ?',
    [req.user.id, 'active'],
    (err, row) => {
      if (!err && row) {
        stats.mesReservations = row.count;
      }

      // Compter les salles disponibles
      db.get('SELECT COUNT(*) as count FROM salles WHERE disponible = 1', (err, row) => {
        if (!err && row) {
          stats.sallesDisponibles = row.count;
        }

        res.render('user/dashboard', {
          title: 'Mon tableau de bord',
          stats: stats
        });
      });
    }
  );
});

router.get('/admin/dashboard', ensureAdmin, (req, res) => {
  // Récupérer les statistiques
  const stats = {
    totalSalles: 0,
    reservationsActives: 0,
    totalUsers: 0
  };

  // Compter les salles
  db.get('SELECT COUNT(*) as count FROM salles', (err, row) => {
    if (!err && row) {
      stats.totalSalles = row.count;
    }

    // Compter les réservations actives
    db.get('SELECT COUNT(*) as count FROM reservations WHERE statut = ?', ['active'], (err, row) => {
      if (!err && row) {
        stats.reservationsActives = row.count;
      }

      // Compter les utilisateurs
      db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (!err && row) {
          stats.totalUsers = row.count;
        }

        // Rendre la vue avec les statistiques
        res.render('admin/dashboard', {
          title: 'Administration',
          stats: stats
        });
      });
    });
  });
});

// Redirection pour compatibilité avec les liens du header
router.get('/mes-reservations', ensureAuthenticated, (req, res) => {
  res.redirect('/reservations/mes-reservations');
});

module.exports = router;
