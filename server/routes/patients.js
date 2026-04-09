const express = require('express');
const router = express.Router();
const patientsRepo = require('../repositories/patientsRepo');
const requireDoctorSession = require('../middleware/requireDoctorSession');

router.get('/patients', requireDoctorSession, async (_req, res) => {
  try {
    const data = await patientsRepo.getAllPatientsMap();
    res.json(data);
  } catch (err) {
    console.error('[API] GET /patients', err);
    res.status(500).json({ error: 'Error al leer pacientes', detail: err.message });
  }
});

router.get('/patients/:cedula', async (req, res) => {
  try {
    const cedula = String(req.params.cedula || '').trim();
    const patient = await patientsRepo.getPatientByCedula(cedula);
    if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(patient);
  } catch (err) {
    console.error('[API] GET /patients/:cedula', err);
    res.status(500).json({ error: 'Error al leer paciente', detail: err.message });
  }
});

router.post('/patients', async (req, res) => {
  try {
    const { nombre, tipoDoc, edad, genero, telefono } = req.body;
    const cedula = String(req.body.cedula || '').trim();
    if (!cedula || !nombre) {
      return res.status(400).json({ error: 'Cédula y nombre son requeridos' });
    }
    const patient = await patientsRepo.upsertPatient({
      cedula,
      nombre,
      tipoDoc,
      edad,
      genero,
      telefono
    });
    res.json(patient);
  } catch (err) {
    console.error('[API] POST /patients', err);
    res.status(500).json({ error: 'Error al guardar paciente', detail: err.message });
  }
});

router.post('/patients/:cedula/assign', requireDoctorSession, async (req, res) => {
  try {
    const cedula = String(req.params.cedula || '').trim();
    const { consentimientosIds } = req.body;
    const patient = await patientsRepo.assignConsents(cedula, consentimientosIds || []);
    if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(patient);
  } catch (err) {
    console.error('[API] POST /assign', err);
    res.status(500).json({ error: 'Error al asignar consentimientos', detail: err.message });
  }
});

router.post('/patients/:cedula/prefill', requireDoctorSession, async (req, res) => {
  try {
    const cedula = String(req.params.cedula || '').trim();
    const { consentId, campos } = req.body;
    if (!consentId || !campos || typeof campos !== 'object') {
      return res.status(400).json({ error: 'consentId y campos son requeridos' });
    }
    const patient = await patientsRepo.savePrefill(cedula, consentId, campos);
    if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });
    console.log(`[PREFILL] Médico diligencio consentimiento ${consentId} para paciente ${cedula}`);
    res.json(patient);
  } catch (err) {
    console.error('[API] POST /prefill', err);
    res.status(500).json({ error: 'Error al guardar prefill', detail: err.message });
  }
});

router.post('/patients/:cedula/revoke', requireDoctorSession, async (req, res) => {
  try {
    const cedula = String(req.params.cedula || '').trim();
    const { consentId } = req.body;
    if (!consentId) {
      return res.status(400).json({ error: 'consentId es requerido' });
    }
    const exists = await patientsRepo.getPatientByCedula(cedula);
    if (!exists) return res.status(404).json({ error: 'Paciente no encontrado' });
    const patient = await patientsRepo.revokeConsent(cedula, consentId);
    if (!patient) return res.status(404).json({ error: 'Consentimiento no encontrado' });
    console.log(`[REVOKE] Habilitada revocación del consentimiento ${consentId} para paciente ${cedula}`);
    res.json(patient);
  } catch (err) {
    console.error('[API] POST /revoke', err);
    res.status(500).json({ error: 'Error al revocar', detail: err.message });
  }
});

module.exports = router;
