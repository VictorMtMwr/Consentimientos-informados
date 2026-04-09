const fs = require('fs');
const path = require('path');
const { getPool } = require('./pool');

/**
 * Si la tabla patients est� vac�a y existe data/patients.json con datos, importa una sola vez.
 */
async function migrateFromJsonIfEmpty() {
  const pool = getPool();
  const { rows } = await pool.query('SELECT COUNT(*)::int AS n FROM patients');
  if (rows[0].n > 0) return { migrated: false, reason: 'db_not_empty' };

  const file = path.join(__dirname, '..', '..', 'data', 'patients.json');
  if (!fs.existsSync(file)) return { migrated: false, reason: 'no_file' };

  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return { migrated: false, reason: 'invalid_json' };
  }
  if (!raw || typeof raw !== 'object') return { migrated: false, reason: 'empty_object' };
  const cedulas = Object.keys(raw);
  if (cedulas.length === 0) return { migrated: false, reason: 'no_patients_in_file' };

  let count = 0;
  for (const cedula of cedulas) {
    const p = raw[cedula];
    if (!p || !p.cedula) continue;
    await pool.query(
      `INSERT INTO patients (cedula, nombre, tipo_doc, edad, genero, telefono, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (cedula) DO UPDATE SET
         nombre = EXCLUDED.nombre,
         tipo_doc = EXCLUDED.tipo_doc,
         edad = EXCLUDED.edad,
         genero = EXCLUDED.genero,
         telefono = EXCLUDED.telefono,
         updated_at = NOW()`,
      [
        String(p.cedula),
        p.nombre || '',
        p.tipoDoc || '',
        p.edad || '',
        p.genero || '',
        p.telefono || ''
      ]
    );

    const consents = p.consentimientos || {};
    for (const [cid, c] of Object.entries(consents)) {
      const consentId = Number(cid);
      if (Number.isNaN(consentId)) continue;
      await pool.query(
        `INSERT INTO patient_consents (
           cedula, consent_id, asignado, firmado, fecha_firma, archivo_firmado,
           datos_medico, signatures, revocacion, fecha_revocacion, archivo_revocado
         ) VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb, $9, $10, $11)
         ON CONFLICT (cedula, consent_id) DO NOTHING`,
        [
          String(p.cedula),
          consentId,
          c.asignado !== false,
          !!c.firmado,
          c.fechaFirma ? new Date(c.fechaFirma) : null,
          c.archivoFirmado || null,
          JSON.stringify(c.datosMedico || {}),
          c.signatures ? JSON.stringify(c.signatures) : null,
          !!c.revocacion,
          c.fechaRevocacion ? new Date(c.fechaRevocacion) : null,
          c.archivoRevocado || null
        ]
      );
    }
    count += 1;
  }

  return { migrated: true, patients: count };
}

module.exports = { migrateFromJsonIfEmpty };
