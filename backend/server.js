const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

// Import des configurations
require('./config/database'); // Init database
require('./config/passport'); // Config Passport

const app = express();

// ========================================
// SÉCURITÉ & MIDDLEWARE
// ========================================

// Helmet - Sécurité HTTP headers
app.use(helmet({
  contentSecurityPolicy: false, // Désactivé pour dev
}));

// Compression
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://votre-domaine.com' 
    : 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// ========================================
// HANDLEBARS CONFIGURATION
// ========================================

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    formatDate: function(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ========================================
// SESSION & PASSPORT
// ========================================

app.use(session({
  store: new SQLiteStore({
    db: 'sessions.db',
    dir: './'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 heures
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware global pour passer l'utilisateur aux vues
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.appName = process.env.APP_NAME;
  next();
});

// ========================================
// ROUTES
// ========================================

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/reservations', require('./routes/reservations'));
app.use('/salles', require('./routes/salles'));
app.use('/admin', require('./routes/admin'));

// Route de test
app.get('/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'API fonctionne!',
    user: req.user || 'Non connecté',
    timestamp: new Date()
  });
});

// ========================================
// Gestion des erreurs
// ========================================

// 404
app.use((req, res) => {
  res.status(404).render('errors/404', {
    title: 'Page non trouvée',
    layout: 'main'
  });
});

// Erreur serveur
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err.stack);
  res.status(500).render('errors/500', {
    title: 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err : {},
    layout: 'main'
  });
});

// ========================================
// DÉMARRAGE SERVEUR
// ========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('========================================');
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌍 Environement: ${process.env.NODE_ENV}`);
  console.log('========================================');
});

module.exports = app;
