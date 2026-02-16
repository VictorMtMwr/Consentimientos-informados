const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { readPatients, writePatients } = require('../utils/data');

const FIRMADOS_DIR = path.join(__dirname, '..', '..', 'firmados');
if (!fs.existsSync(FIRMADOS_DIR)) fs.mkdirSync(FIRMADOS_DIR, { recursive: true });

router.post('/sign', (req, res) => {
  const { cedula, consentId, pdfBase64, titulo } = req.body;
  if (!cedula || !consentId || !pdfBase64) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const patients = readPatients();
  const patient = patients[cedula];
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

  patient.consentimientos[consentId] = {
    asignado: true,
    firmado: true,
    fechaFirma: new Date().toISOString(),
    archivoFirmado: fileName
  };

  writePatients(patients);
  console.log(`[FIRMA] Paciente ${cedula} firmó: ${fileName}`);
  res.json({ success: true, archivo: fileName });
});

router.get('/signed/:cedula', (req, res) => {
  const patientDir = path.join(FIRMADOS_DIR, req.params.cedula);
  if (!fs.existsSync(patientDir)) return res.json([]);
  const files = fs.readdirSync(patientDir)
    .filter(f => f.endsWith('.pdf'))
    .map(f => ({
      nombre: f,
      tamano: fs.statSync(path.join(patientDir, f)).size,
      fecha: fs.statSync(path.join(patientDir, f)).mtime
    }));
  res.json(files);
});

module.exports = router;
