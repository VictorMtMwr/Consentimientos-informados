function requireAdminSession(req, res, next) {
  const esp = String(req.session?.especialidad || '').trim().toLowerCase();
  if (esp === 'admin') return next();
  return res.status(403).json({
    error: 'Solo usuarios con especialidad administrador pueden usar esta acci\u00f3n',
    code: 'FORBIDDEN_ADMIN'
  });
}

module.exports = requireAdminSession;
