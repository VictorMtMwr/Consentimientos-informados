const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { findByUsername, buildNombreCompleto } = require('../repositories/usersConsentRepo');

function sessionUserPayload(user) {
  const nombre = buildNombreCompleto(user) || user.username;
  return {
    username: user.username,
    nombre,
    tipoDocumento: String(user.tipo_documento || '').trim(),
    numeroDocumento: String(user.numero_documento || '').trim(),
    nombres: String(user.nombres || '').trim(),
    apellidos: String(user.apellidos || '').trim(),
    registroMedico: String(user.registro_medico || '').trim(),
    especialidad: String(user.especialidad || '').trim()
  };
}

router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contrase\u00f1a son requeridos' });
    }
    const user = await findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Usuario o contrase\u00f1a incorrectos' });
    }
    const payload = sessionUserPayload(user);
    req.session.userId = user.id;
    req.session.username = payload.username;
    req.session.nombre = payload.nombre;
    req.session.nombres = payload.nombres;
    req.session.apellidos = payload.apellidos;
    req.session.registroMedico = payload.registroMedico;
    req.session.especialidad = payload.especialidad;
    req.session.tipoDocumento = payload.tipoDocumento;
    req.session.numeroDocumento = payload.numeroDocumento;
    res.json({
      ok: true,
      user: payload
    });
  } catch (err) {
    console.error('[API] POST /auth/login', err);
    res.status(500).json({ error: 'Error al iniciar sesi\u00f3n', detail: err.message });
  }
});

router.post('/auth/logout', (req, res) => {
  if (!req.session) return res.json({ ok: true });
  req.session.destroy((err) => {
    if (err) {
      console.error('[API] POST /auth/logout', err);
      return res.status(500).json({ error: 'No se pudo cerrar sesi\u00f3n' });
    }
    res.clearCookie('ci.sid', { path: '/' });
    res.json({ ok: true });
  });
});

router.get('/auth/me', (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'No autenticado', code: 'AUTH_REQUIRED' });
  }
  res.json({
    user: {
      username: req.session.username,
      nombre: req.session.nombre,
      tipoDocumento: req.session.tipoDocumento || '',
      numeroDocumento: req.session.numeroDocumento || '',
      nombres: req.session.nombres || '',
      apellidos: req.session.apellidos || '',
      registroMedico: req.session.registroMedico || '',
      especialidad: req.session.especialidad || ''
    }
  });
});

module.exports = router;
