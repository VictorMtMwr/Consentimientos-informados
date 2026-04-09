const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const patientsRepo = require('../repositories/patientsRepo');

const FIRMADOS_DIR = path.join(__dirname, '..', '..', 'firmados');
if (!fs.existsSync(FIRMADOS_DIR)) fs.mkdirSync(FIRMADOS_DIR, { recursive: true });

router.post('/sign', async (req, res) => {
  try {
    const { consentId, pdfBase64, titulo, signatures } = req.body;
    const cedula = String(req.body.cedula || '').trim();
    if (!cedula || !consentId || !pdfBase64) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const patient = await patientsRepo.getPatientByCedula(cedula);
    if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });

    const patientDir = path.join(FIRMADOS_DIR, cedula);
    if (!fs.existsSync(patientDir)) fs.mkdirSync(patientDir, { recursive: true });

    const safeTitle = (titulo || `consentimiento-${consentId}`)
      .replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s\-]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 80);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
    const fileName = `${safeTitle}_FIRMADO_${timestamp}.pdf`;
    const filePath = path.join(patientDir, fileName);

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    fs.writeFileSync(filePath, pdfBuffer);

    const persistedSignatures =
      signatures && typeof signatures === 'object'
        ? signatures
        : patient.consentimientos?.[String(consentId)]?.signatures || {};

    await patientsRepo.recordSignedConsent(cedula, consentId, fileName, persistedSignatures);

    console.log(`[FIRMA] Paciente ${cedula} firmó: ${fileName}`);
    res.json({ success: true, archivo: fileName });
  } catch (err) {
    console.error('[API] POST /sign', err);
    res.status(500).json({ error: 'Error al registrar la firma', detail: err.message });
  }
});

router.get('/signed/:cedula', (req, res) => {
  const cedula = String(req.params.cedula || '').trim();
  const patientDir = path.join(FIRMADOS_DIR, cedula);
  if (!fs.existsSync(patientDir)) return res.json([]);
  const files = fs
    .readdirSync(patientDir)
    .filter((f) => f.endsWith('.pdf'))
    .map((f) => ({
      nombre: f,
      tamano: fs.statSync(path.join(patientDir, f)).size,
      fecha: fs.statSync(path.join(patientDir, f)).mtime
    }));
  res.json(files);
});

module.exports = router;
