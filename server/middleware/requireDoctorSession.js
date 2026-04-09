function requireDoctorSession(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: 'Sesi\u00f3n de m\u00e9dico requerida', code: 'AUTH_REQUIRED' });
}

module.exports = requireDoctorSession;
