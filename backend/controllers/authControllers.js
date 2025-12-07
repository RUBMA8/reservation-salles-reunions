const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');



const dbPath = path.resolve(__dirname, '../database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur connexion BDD:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connecté à SQLite');
    initDatabase();
  }
});

function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('❌ Erreur création table users:', err);
      } else {
        console.log('✅ Table users créée');
        createDefaultAdmin();
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS salles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        capacite INTEGER NOT NULL,
        equipements TEXT,
        description TEXT,
        disponible BOOLEAN DEFAULT 1,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('❌ Erreur création table salles:', err);
      } else {
        console.log('✅ Table salles créée');
        insertSampleSalles();
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        salle_id INTEGER NOT NULL,
        date_debut DATETIME NOT NULL,
        date_fin DATETIME NOT NULL,
        motif TEXT,
        statut TEXT DEFAULT 'active' CHECK(statut IN ('active', 'annulee', 'terminee')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (salle_id) REFERENCES salles(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) {
        console.error('❌ Erreur création table reservations:', err);
      } else {
        console.log('✅ Table reservations créée');
      }
    });
  });
}

async function createDefaultAdmin() {
  db.get('SELECT id FROM users WHERE email = ?', ['admin@lacite.ca'], async (err, user) => {
    if (!user) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      db.run(
        'INSERT INTO users (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, ?)',
        ['Admin', 'System', 'admin@lacite.ca', hashedPassword, 'admin'],
        (err) => {
          if (err) {
            console.error('❌ Erreur création admin:', err);
          } else {
            console.log('✅ Compte admin créé: admin@lacite.ca / Admin123!');
          }
        }
      );
    }
  });
}

function insertSampleSalles() {
  const sampleSalles = [
    { nom: 'Salle A101', capacite: 30, equipements: 'Projecteur, Tableau blanc', description: 'Salle de cours standard' },
    { nom: 'Salle B205', capacite: 50, equipements: 'Projecteur, Système audio, Climatisation', description: 'Grande salle de conférence' },
    { nom: 'Lab Informatique C302', capacite: 20, equipements: '20 PC, Projecteur', description: 'Laboratoire informatique' },
    { nom: 'Salle D103', capacite: 15, equipements: 'Tableau blanc, Écran TV', description: 'Petite salle de réunion' },
    { nom: 'Auditorium E001', capacite: 200, equipements: 'Projecteur, Système audio professionnel, Scène', description: 'Grand auditorium pour événements' }
  ];

  db.get('SELECT COUNT(*) as count FROM salles', (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare('INSERT INTO salles (nom, capacite, equipements, description) VALUES (?, ?, ?, ?)');
      sampleSalles.forEach(salle => {
        stmt.run(salle.nom, salle.capacite, salle.equipements, salle.description);
      });
      stmt.finalize();
      console.log('✅ Salles d\'exemple insérées');
    }
  });
}

module.exports = db;
