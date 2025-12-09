const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./database');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return done(err);
      }
      
      if (!user) {
        return done(null, false, { message: 'Email incorrect.' });
      }

      try {
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          return done(null, false, { message: 'Mot de passe incorrect.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.get('SELECT id, nom, prenom, email, role FROM users WHERE id = ?', [id], (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
