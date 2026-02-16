const express = require('express');
const router = express.Router();
const { readPatients, writePatients } = require('../utils/data');

router.get('/patients', (_req, res) => {
  res.json(readPatients());
});

router.get('/patients/:cedula', (req, res) => {
  const patients = readPatients();
  const patient = patients[req.params.cedula];
  if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json(patient);
});

router.post('/patients', (req, res) => {
  const { cedula, nombre, tipoDoc, edad, genero, telefono } = req.body;
  if (!cedula || !nombre) {
    return res.status(400).json({ error: 'Cédula y nombre son requeridos' });
  }
  const patients = readPatients();
  if (patients[cedula]) {
    patients[cedula].nombre = nombre;
    if (tipoDoc) patients[cedula].tipoDoc = tipoDoc;
    if (edad) patients[cedula].edad = edad;
    if (genero) patients[cedula].genero = genero;
    if (telefono) patients[cedula].telefono = telefono;
  } else {
    patients[cedula] = { cedula, nombre, tipoDoc: tipoDoc || '', edad: edad || '', genero: genero || '', telefono: telefono || '', consentimientos: {} };
  }
  writePatients(patients);
  res.json(patients[cedula]);
});

router.post('/patients/:cedula/assign', (req, res) => {
  const { consentimientosIds } = req.body;
  const patients = readPatients();
  const patient = patients[req.params.cedula];
  if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });

  const idsSet = new Set(consentimientosIds.map(Number));

  idsSet.forEach(id => {
    const existing = patient.consentimientos[id];
    if (!existing) {
      patient.consentimientos[id] = { asignado: true, firmado: false, fechaFirma: null, archivoFirmado: null };
    } else {
      existing.asignado = true;
    }
  });

  Object.keys(patient.consentimientos).forEach(id => {
    if (!idsSet.has(Number(id)) && !patient.consentimientos[id].firmado) {
      delete patient.consentimientos[id];
    }
  });

  writePatients(patients);
  res.json(patient);
});

router.post('/patients/:cedula/prefill', (req, res) => {
  const { consentId, campos } = req.body;
  if (!consentId || !campos || typeof campos !== 'object') {
    return res.status(400).json({ error: 'consentId y campos son requeridos' });
  }
  const patients = readPatients();
  const patient = patients[req.params.cedula];
  if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });

  const consent = patient.consentimientos[consentId];
  if (!consent) return res.status(404).json({ error: 'Consentimiento no asignado' });

  consent.datosMedico = campos;
  writePatients(patients);
  console.log(`[PREFILL] Médico diligencio consentimiento ${consentId} para paciente ${req.params.cedula}`);
  res.json(patient);
});

router.post('/patients/:cedula/revoke', (req, res) => {
  const { consentId } = req.body;
  if (!consentId) {
    return res.status(400).json({ error: 'consentId es requerido' });
  }
  const patients = readPatients();
  const patient = patients[req.params.cedula];
  if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });

  const consent = patient.consentimientos[consentId];
  if (!consent) return res.status(404).json({ error: 'Consentimiento no encontrado' });

  consent.revocacion = true;
  consent.firmado = false;
  consent.fechaRevocacion = null;
  consent.archivoRevocado = null;
  console.log(`[REVOKE] Habilitada revocación del consentimiento ${consentId} para paciente ${req.params.cedula}`);
  writePatients(patients);
  res.json(patient);
});

module.exports = router;
