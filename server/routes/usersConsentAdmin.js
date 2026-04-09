const express = require('express');
const router = express.Router();
const requireDoctorSession = require('../middleware/requireDoctorSession');
const requireAdminSession = require('../middleware/requireAdminSession');
const adminRepo = require('../repositories/usersConsentAdminRepo');

router.use(requireDoctorSession);
router.use(requireAdminSession);

function toPublicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    tipoDocumento: row.tipo_documento || '',
    numeroDocumento: row.numero_documento || '',
    nombres: row.nombres || '',
    apellidos: row.apellidos || '',
    registroMedico: row.registro_medico || '',
    nombre: row.nombre || '',
    especialidad: row.especialidad || '',
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null
  };
}

router.get('/admin/users', async (_req, res) => {
  try {
    const rows = await adminRepo.listUsers();
    res.json({ users: rows.map(toPublicUser) });
  } catch (err) {
    console.error('[API] GET /admin/users', err);
    res.status(500).json({ error: 'Error al listar usuarios', detail: err.message });
  }
});

router.post('/admin/users', async (req, res) => {
  try {
    const {
      username,
      password,
      tipoDocumento,
      numeroDocumento,
      nombres,
      apellidos,
      registroMedico,
      especialidad
    } = req.body;
    const row = await adminRepo.createUser({
      username,
      password,
      tipo_documento: tipoDocumento,
      numero_documento: numeroDocumento,
      nombres,
      apellidos,
      registro_medico: registroMedico,
      especialidad
    });
    res.status(201).json({ user: toPublicUser(row) });
  } catch (err) {
    if (err.message === 'username_password_required') {
      return res.status(400).json({ error: 'Usuario y contrase\u00f1a son requeridos' });
    }
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Ese nombre de usuario ya existe' });
    }
    console.error('[API] POST /admin/users', err);
    res.status(500).json({ error: 'Error al crear usuario', detail: err.message });
  }
});

router.delete('/admin/users/:username', async (req, res) => {
  try {
    const username = String(req.params.username || '').trim();
    if (!username) return res.status(400).json({ error: 'Usuario requerido' });
    const ok = await adminRepo.deleteUserByUsername(username, req.session.username);
    if (!ok) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ ok: true });
  } catch (err) {
    if (err.message === 'cannot_delete_self') {
      return res.status(400).json({ error: 'No puede eliminar su propia cuenta' });
    }
    console.error('[API] DELETE /admin/users/:username', err);
    res.status(500).json({ error: 'Error al eliminar', detail: err.message });
  }
});

router.patch('/admin/users/:username/password', async (req, res) => {
  try {
    const username = String(req.params.username || '').trim();
    const { newPassword } = req.body;
    if (!username) return res.status(400).json({ error: 'Usuario requerido' });
    const ok = await adminRepo.setPassword(username, newPassword);
    if (!ok) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ ok: true });
  } catch (err) {
    if (err.message === 'password_too_short') {
      return res.status(400).json({ error: 'La contrase\u00f1a debe tener al menos 4 caracteres' });
    }
    console.error('[API] PATCH password', err);
    res.status(500).json({ error: 'Error al actualizar contrase\u00f1a', detail: err.message });
  }
});

module.exports = router;
