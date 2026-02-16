const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const PATIENTS_FILE = path.join(DATA_DIR, 'patients.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(PATIENTS_FILE)) fs.writeFileSync(PATIENTS_FILE, '{}', 'utf8');

function readPatients() {
  try {
    return JSON.parse(fs.readFileSync(PATIENTS_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writePatients(data) {
  fs.writeFileSync(PATIENTS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { readPatients, writePatients };
