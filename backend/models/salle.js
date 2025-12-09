const db = require('../config/database');

class Salle {
  static getAll(callback) {
    db.all('SELECT * FROM salles WHERE disponible = 1 ORDER BY nom', callback);
  }
  
  static getAllAdmin(callback) {
    db.all('SELECT * FROM salles ORDER BY nom', callback);
  }
  
  static getById(id, callback) {
    db.get('SELECT * FROM salles WHERE id = ?', [id], callback);
  }
  
  static create(data, callback) {
    const { nom, capacite, equipements, description } = data;
    db.run(
      'INSERT INTO salles (nom, capacite, equipements, description) VALUES (?, ?, ?, ?)',
      [nom, capacite, equipements, description],
      callback
    );
  }
  
  static update(id, data, callback) {
    const { nom, capacite, equipements, description, disponible } = data;
    db.run(
      'UPDATE salles SET nom=?, capacite=?, equipements=?, description=?, disponible=? WHERE id=?',
      [nom, capacite, equipements, description, disponible, id],
      callback
    );
  }
  
  static delete(id, callback) {
    db.run('DELETE FROM salles WHERE id = ?', [id], callback);
  }
}

module.exports = Salle;
