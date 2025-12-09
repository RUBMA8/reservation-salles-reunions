const bcrypt = require('bcrypt');
const db = require('../config/database');

exports.register = async (req, res) => {
  const { nom, prenom, email, password, confirmPassword } = req.body;

  if (!nom || !prenom || !email || !password) {
    return res.render('auth/register', {
      title: 'Inscription',
      error: 'Tous les champs sont requis',
      nom, prenom, email
    });
  }

  if (password !== confirmPassword) {
    return res.render('auth/register', {
      title: 'Inscription',
      error: 'Les mots de passe ne correspondent pas',
      nom, prenom, email
    });
  }

  if (password.length < 6) {
    return res.render('auth/register', {
      title: 'Inscription',
      error: 'Le mot de passe doit contenir au moins 6 caractères',
      nom, prenom, email
    });
  }

  try {
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, existingUser) => {
      if (err) {
        console.error(err);
        return res.render('auth/register', {
          title: 'Inscription',
          error: 'Erreur serveur',
          nom, prenom, email
        });
      }

      if (existingUser) {
        return res.render('auth/register', {
          title: 'Inscription',
          error: 'Cet email est déjà utilisé',
          nom, prenom, email
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.run(
        'INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)',
        [nom, prenom, email, hashedPassword],
        function(err) {
          if (err) {
            console.error(err);
            return res.render('auth/register', {
              title: 'Inscription',
              error: 'Erreur lors de l\'inscription',
              nom, prenom, email
            });
          }

          res.redirect('/auth/login?registered=1');
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.render('auth/register', {
      title: 'Inscription',
      error: 'Erreur serveur',
      nom, prenom, email
    });
  }
};
