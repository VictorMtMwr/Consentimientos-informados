const { getPool } = require('../db/pool');

function mapConsentRow(row) {
  const c = {
    asignado: row.asignado,
    firmado: row.firmado,
    fechaFirma: row.fecha_firma ? new Date(row.fecha_firma).toISOString() : null,
    archivoFirmado: row.archivo_firmado || null
  };
  const dm = row.datos_medico;
  if (dm && typeof dm === 'object' && Object.keys(dm).length > 0) {
    c.datosMedico = dm;
  }
  if (row.signatures != null && typeof row.signatures === 'object') {
    c.signatures = row.signatures;
  }
  if (row.revocacion) {
    c.revocacion = true;
    if (row.fecha_revocacion) c.fechaRevocacion = new Date(row.fecha_revocacion).toISOString();
    if (row.archivo_revocado) c.archivoRevocado = row.archivo_revocado;
  }
  return c;
}

function mapPatientRow(row, consentimientos) {
  return {
    cedula: row.cedula,
    nombre: row.nombre,
    tipoDoc: row.tipo_doc,
    edad: row.edad,
    genero: row.genero,
    telefono: row.telefono,
    consentimientos: consentimientos || {}
  };
}

async function getAllPatientsMap() {
  const pool = getPool();
  const pRes = await pool.query(
    `SELECT cedula, nombre, tipo_doc, edad, genero, telefono FROM patients ORDER BY cedula`
  );
  const cRes = await pool.query(`SELECT * FROM patient_consents ORDER BY cedula, consent_id`);
  const byCedula = {};
  for (const row of pRes.rows) {
    byCedula[row.cedula] = mapPatientRow(row, {});
  }
  for (const row of cRes.rows) {
    if (!byCedula[row.cedula]) continue;
    byCedula[row.cedula].consentimientos[String(row.consent_id)] = mapConsentRow(row);
  }
  return byCedula;
}

async function getPatientByCedula(cedula) {
  const pool = getPool();
  const pRes = await pool.query(
    `SELECT cedula, nombre, tipo_doc, edad, genero, telefono FROM patients WHERE cedula = $1`,
    [cedula]
  );
  if (pRes.rows.length === 0) return null;
  const cRes = await pool.query(`SELECT * FROM patient_consents WHERE cedula = $1 ORDER BY consent_id`, [cedula]);
  const consentimientos = {};
  for (const row of cRes.rows) {
    consentimientos[String(row.consent_id)] = mapConsentRow(row);
  }
  return mapPatientRow(pRes.rows[0], consentimientos);
}

async function upsertPatient({ cedula, nombre, tipoDoc, edad, genero, telefono }) {
  const pool = getPool();
  await pool.query(
    `INSERT INTO patients (cedula, nombre, tipo_doc, edad, genero, telefono, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     ON CONFLICT (cedula) DO UPDATE SET
       nombre = EXCLUDED.nombre,
       tipo_doc = COALESCE(NULLIF(EXCLUDED.tipo_doc, ''), patients.tipo_doc),
       edad = COALESCE(NULLIF(EXCLUDED.edad, ''), patients.edad),
       genero = COALESCE(NULLIF(EXCLUDED.genero, ''), patients.genero),
       telefono = COALESCE(NULLIF(EXCLUDED.telefono, ''), patients.telefono),
       updated_at = NOW()`,
    [cedula, nombre, tipoDoc || '', edad || '', genero || '', telefono || '']
  );
  return getPatientByCedula(cedula);
}

async function assignConsents(cedula, consentimientosIds) {
  const pool = getPool();
  const patient = await getPatientByCedula(cedula);
  if (!patient) return null;

  const idsSet = new Set(consentimientosIds.map(Number));

  for (const id of idsSet) {
    const existing = patient.consentimientos[String(id)];
    if (!existing) {
      await pool.query(
        `INSERT INTO patient_consents (cedula, consent_id, asignado, firmado, fecha_firma, archivo_firmado)
         VALUES ($1, $2, TRUE, FALSE, NULL, NULL)
         ON CONFLICT (cedula, consent_id) DO UPDATE SET asignado = TRUE`,
        [cedula, id]
      );
    } else {
      await pool.query(
        `UPDATE patient_consents SET asignado = TRUE WHERE cedula = $1 AND consent_id = $2`,
        [cedula, id]
      );
    }
  }

  const toRemove = Object.keys(patient.consentimientos).filter((id) => {
    const num = Number(id);
    return !idsSet.has(num) && !patient.consentimientos[id].firmado;
  });
  for (const id of toRemove) {
    await pool.query(`DELETE FROM patient_consents WHERE cedula = $1 AND consent_id = $2 AND firmado = FALSE`, [
      cedula,
      Number(id)
    ]);
  }

  return getPatientByCedula(cedula);
}

async function savePrefill(cedula, consentId, campos) {
  const pool = getPool();
  const cid = Number(consentId);
  if (Number.isNaN(cid)) return null;

  const p = await pool.query(`SELECT 1 FROM patients WHERE cedula = $1`, [cedula]);
  if (p.rowCount === 0) return null;

  await pool.query(
    `INSERT INTO patient_consents (cedula, consent_id, asignado, firmado, datos_medico, revocacion)
     VALUES ($1, $2, TRUE, FALSE, $3::jsonb, FALSE)
     ON CONFLICT (cedula, consent_id) DO UPDATE SET
       datos_medico = EXCLUDED.datos_medico,
       asignado = TRUE`,
    [cedula, cid, JSON.stringify(campos)]
  );
  return getPatientByCedula(cedula);
}

async function revokeConsent(cedula, consentId) {
  const pool = getPool();
  const cid = Number(consentId);
  if (Number.isNaN(cid)) return null;
  const chk = await pool.query(`SELECT 1 FROM patient_consents WHERE cedula = $1 AND consent_id = $2`, [
    cedula,
    cid
  ]);
  if (chk.rowCount === 0) return null;
  await pool.query(
    `UPDATE patient_consents SET
       revocacion = TRUE,
       firmado = FALSE,
       fecha_revocacion = NULL,
       archivo_revocado = NULL
     WHERE cedula = $1 AND consent_id = $2`,
    [cedula, cid]
  );
  return getPatientByCedula(cedula);
}

async function recordSignedConsent(cedula, consentId, archivoFirmado, signatures) {
  const pool = getPool();
  const cid = Number(consentId);
  if (Number.isNaN(cid)) throw new Error('consentId invalido');

  const prev = await pool.query(
    `SELECT datos_medico, signatures FROM patient_consents WHERE cedula = $1 AND consent_id = $2`,
    [cedula, cid]
  );
  const datosMedico = prev.rows[0]?.datos_medico || {};
  const sigMerge = signatures && typeof signatures === 'object' ? signatures : prev.rows[0]?.signatures || {};

  const up = await pool.query(
    `UPDATE patient_consents SET
       asignado = TRUE,
       firmado = TRUE,
       fecha_firma = NOW(),
       archivo_firmado = $3,
       signatures = $4::jsonb
     WHERE cedula = $1 AND consent_id = $2`,
    [cedula, cid, archivoFirmado, JSON.stringify(sigMerge)]
  );
  if (up.rowCount === 0) {
    await pool.query(
      `INSERT INTO patient_consents (cedula, consent_id, asignado, firmado, fecha_firma, archivo_firmado, datos_medico, signatures, revocacion)
       VALUES ($1, $2, TRUE, TRUE, NOW(), $3, $4::jsonb, $5::jsonb, FALSE)`,
      [cedula, cid, archivoFirmado, JSON.stringify(datosMedico), JSON.stringify(sigMerge)]
    );
  }

  return getPatientByCedula(cedula);
}

module.exports = {
  getAllPatientsMap,
  getPatientByCedula,
  upsertPatient,
  assignConsents,
  savePrefill,
  revokeConsent,
  recordSignedConsent
};
