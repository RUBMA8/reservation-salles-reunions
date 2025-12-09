const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

// Route principale pour afficher la page de réservations
router.get('/', ensureAuthenticated, (req, res) => {
  res.redirect('/reservations/mes-reservations');
});

router.get('/mes-reservations', ensureAuthenticated, reservationsController.getMyReservations);
router.get('/salle/:salleId', ensureAuthenticated, reservationsController.getReservationsBySalle);
router.post('/', ensureAuthenticated, reservationsController.createReservation);
router.delete('/:id', ensureAuthenticated, reservationsController.cancelReservation);

router.get('/all', ensureAdmin, reservationsController.getAllReservations);

module.exports = router;
