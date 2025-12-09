const Salle = require('../models/salle');

exports.getAllSalles = (req, res) => {
  Salle.getAll((err, salles) => {
    if (err) {
      console.error('Erreur lors de la récupération des salles:', err);
      return res.status(500).render('errors/500', {
        title: 'Erreur serveur',
        error: 'Impossible de récupérer les salles'
      });
    }

    // Si la requête vient d'une API (Accept: application/json), retourner du JSON
    if (req.accepts('json') && !req.accepts('html')) {
      return res.json({ salles });
    }

    // Sinon, rendre la vue HTML
    res.render('user/salles', {
      title: 'Liste des salles',
      salles: salles
    });
  });
};

exports.getSalleById = (req, res) => {
  const { id } = req.params;
  Salle.getById(id, (err, salle) => {
    if (err) {
      console.error('Erreur lors de la récupération de la salle:', err);
      return res.status(500).render('errors/500', {
        title: 'Erreur serveur',
        error: 'Impossible de récupérer la salle'
      });
    }
    if (!salle) {
      return res.status(404).render('errors/404', {
        title: 'Salle non trouvée'
      });
    }

    // Si la requête vient d'une API (Accept: application/json), retourner du JSON
    if (req.accepts('json') && !req.accepts('html')) {
      return res.json({ salle });
    }

    // Sinon, rendre la vue HTML
    res.render('user/salle-detail', {
      title: salle.nom,
      salle: salle
    });
  });
};

exports.createSalle = (req, res) => {
  const { nom, capacite, equipements, description } = req.body;
  
  if (!nom || !capacite) {
    return res.status(400).json({ error: 'Nom et capacité requis' });
  }
  
  Salle.create(req.body, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la création' });
    }
    res.status(201).json({ 
      message: 'Salle créée',
      id: this.lastID 
    });
  });
};

exports.updateSalle = (req, res) => {
  const { id } = req.params;
  
  Salle.update(id, req.body, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la modification' });
    }
    res.json({ message: 'Salle mise à jour' });
  });
};

exports.deleteSalle = (req, res) => {
  const { id } = req.params;
  
  Salle.delete(id, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
    res.json({ message: 'Salle supprimée' });
  });
};
