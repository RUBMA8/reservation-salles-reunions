function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  
  if (req.path.startsWith('/api/')) {
    return res.status(401).json({ error: 'Non authentifié' });
  }
  
  req.session.returnTo = req.originalUrl;
  res.redirect('/auth/login');
}

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  
  if (req.path.startsWith('/api/')) {
    return res.status(403).json({ error: 'Accès refusé - Admin requis' });
  }
  
  res.status(403).render('errors/403', {
    title: 'Accès refusé',
    message: 'Vous devez être administrateur pour accéder à cette page.'
  });
}

function ensureGuest(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  next();
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  ensureGuest
};
