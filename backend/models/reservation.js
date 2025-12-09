const db = require('../config/database');

class Reservation {
  static getByUserId(userId, callback) {
    db.all(
      `SELECT r.*, s.nom as salle_nom, s.capacite 
       FROM reservations r 
       JOIN salles s ON r.salle_id = s.id 
       WHERE r.user_id = ? AND r.statut = 'active'
       ORDER BY r.date_debut DESC`,
      [userId],
      callback
    );
  }
  
  static getBySalleId(salleId, callback) {
    db.all(
      'SELECT * FROM reservations WHERE salle_id = ? AND statut = "active"',
      [salleId],
      callback
    );
  }
  
  static checkAvailability(salleId, dateDebut, dateFin, callback) {
    db.get(
      `SELECT COUNT(*) as count FROM reservations 
       WHERE salle_id = ? 
       AND statut = 'active'
       AND (
         (date_debut <= ? AND date_fin >= ?) OR
         (date_debut <= ? AND date_fin >= ?) OR
         (date_debut >= ? AND date_fin <= ?)
       )`,
      [salleId, dateDebut, dateDebut, dateFin, dateFin, dateDebut, dateFin],
      (err, row) => {
        if (err) return callback(err);
        callback(null, row.count === 0);
      }
    );
  }
  
  static create(data, callback) {
    const { user_id, salle_id, date_debut, date_fin, motif } = data;
    
    this.checkAvailability(salle_id, date_debut, date_fin, (err, available) => {
      if (err) return callback(err);
      
      if (!available) {
        return callback(new Error('Salle déjà réservée pour ce créneau'));
      }
      
      db.run(
        'INSERT INTO reservations (user_id, salle_id, date_debut, date_fin, motif) VALUES (?, ?, ?, ?, ?)',
        [user_id, salle_id, date_debut, date_fin, motif],
        callback
      );
    });
  }
  
  static cancel(id, userId, callback) {
    if (userId) {
      db.run(
        'UPDATE reservations SET statut = "annulee" WHERE id = ? AND user_id = ?',
        [id, userId],
        callback
      );
    } else {
      // Admin or no user filter: allow cancelling by id only
      db.run(
        'UPDATE reservations SET statut = "annulee" WHERE id = ?',
        [id],
        callback
      );
    }
  }
  
  static getAll(callback) {
    db.all(
      `SELECT r.*, 
              u.nom as user_nom, u.prenom as user_prenom, u.email as user_email,
              s.nom as salle_nom
       FROM reservations r
       JOIN users u ON r.user_id = u.id
       JOIN salles s ON r.salle_id = s.id
       ORDER BY r.date_debut DESC`,
      callback
    );
  }
}

module.exports = Reservation;
