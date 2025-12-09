const Reservation = require('../models/reservation');

exports.getMyReservations = (req, res) => {
  Reservation.getByUserId(req.user.id, (err, reservations) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations:', err);
      return res.status(500).render('errors/500', {
        title: 'Erreur serveur',
        error: 'Impossible de récupérer vos réservations'
      });
    }

    // Si la requête vient d'une API (Accept: application/json), retourner du JSON
    if (req.accepts('json') && !req.accepts('html')) {
      return res.json({ reservations });
    }

    // Sinon, rendre la vue HTML
    res.render('user/mes-reservations', {
      title: 'Mes réservations',
      reservations: reservations
    });
  });
};

exports.getReservationsBySalle = (req, res) => {
  const { salleId } = req.params;
  
  Reservation.getBySalleId(salleId, (err, reservations) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ reservations });
  });
};

exports.createReservation = (req, res) => {
  const { salle_id, date_debut, date_fin, motif } = req.body;
  
  if (!salle_id || !date_debut || !date_fin) {
    return res.status(400).json({ 
      error: 'Salle, date de début et date de fin requis' 
    });
  }
  
  if (new Date(date_fin) <= new Date(date_debut)) {
    return res.status(400).json({ 
      error: 'La date de fin doit être après la date de début' 
    });
  }
  
  const data = {
    user_id: req.user.id,
    salle_id,
    date_debut,
    date_fin,
    motif
  };
  
  Reservation.create(data, function(err) {
    if (err) {
      if (err.message.includes('déjà réservée')) {
        return res.status(409).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erreur lors de la réservation' });
    }
    
    res.status(201).json({ 
      message: 'Réservation créée',
      id: this.lastID 
    });
  });
};

exports.cancelReservation = (req, res) => {
  const { id } = req.params;
  
  Reservation.cancel(id, req.user.id, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l\'annulation' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    
    res.json({ message: 'Réservation annulée' });
  });
};

exports.getAllReservations = (req, res) => {
  Reservation.getAll((err, reservations) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ reservations });
  });
};
