const { getPool } = require('../db/pool');

/** Nombre para mostrar: nombres + apellidos, o columna nombre historica, o vacio. */
function buildNombreCompleto(row) {
  const n = String(row.nombres || '').trim();
  const a = String(row.apellidos || '').trim();
  const joined = [n, a].filter(Boolean).join(' ').trim();
  if (joined) return joined;
  return String(row.nombre || '').trim();
}

async function findByUsername(username) {
  const pool = getPool();
  const u = String(username || '').trim().toLowerCase();
  if (!u) return null;
  const r = await pool.query(
    `SELECT id, username, password_hash, tipo_documento, numero_documento, nombres, apellidos, registro_medico, nombre, especialidad
     FROM users_consent WHERE LOWER(username) = $1`,
    [u]
  );
  return r.rows[0] || null;
}

module.exports = { findByUsername, buildNombreCompleto };
