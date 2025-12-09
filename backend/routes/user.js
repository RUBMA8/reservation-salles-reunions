const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const Salle = require('../models/salle');
const Reservation = require('../models/reservation');

router.use(ensureAuthenticated);

router.get('/salles', (req, res) => {
  Salle.getAll((err, salles) => {
    if (err) {
      return res.status(500).render('errors/500', { error: err });
    }
    
    res.render('user/salles', {
      title: 'Salles Disponibles',
      salles
    });
  });
});

router.get('/salles/:id', (req, res) => {
  const { id } = req.params;
  
  Salle.getById(id, (err, salle) => {
    if (err || !salle) {
      return res.status(404).render('errors/404');
    }
    
    res.render('user/salle-detail', {
      title: salle.nom,
      salle
    });
  });
});

router.get('/mes-reservations', (req, res) => {
  Reservation.getByUserId(req.user.id, (err, reservations) => {
    if (err) {
      return res.status(500).render('errors/500', { error: err });
    }
    
    res.render('user/mes-reservations', {
      title: 'Mes Réservations',
      reservations
    });
  });
});

module.exports = router;
