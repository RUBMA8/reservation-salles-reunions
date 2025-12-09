const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../middleware/auth');
const Salle = require('../models/salle');
const Reservation = require('../models/reservation');

router.use(ensureAdmin);

router.get('/salles', async (req, res) => {
  Salle.getAllAdmin((err, salles) => {
    if (err) {
      return res.status(500).render('errors/500', { error: err });
    }
    
    res.render('admin/salles', {
      title: 'Gestion des Salles',
      salles
    });
  });
});

router.get('/salles/ajouter', (req, res) => {
  res.render('admin/ajouter-salle', {
    title: 'Ajouter une Salle'
  });
});

router.get('/salles/modifier/:id', (req, res) => {
  const { id } = req.params;

  Salle.getById(id, (err, salle) => {
    if (err || !salle) {
      return res.status(404).render('errors/404');
    }

    res.render('admin/modifier-salle', {
      title: 'Modifier la Salle',
      salle
    });
  });
});

router.get('/reservations', (req, res) => {
  Reservation.getAll((err, reservations) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations:', err);
      return res.status(500).render('errors/500', {
        title: 'Erreur serveur',
        error: 'Impossible de récupérer les réservations'
      });
    }

    res.render('admin/reservations', {
      title: 'Toutes les réservations',
      reservations
    });
  });
});

module.exports = router;
