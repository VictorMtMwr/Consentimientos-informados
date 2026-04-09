const bcrypt = require('bcrypt');
const { getPool } = require('../db/pool');
const { buildNombreCompleto } = require('./usersConsentRepo');

async function listUsers() {
  const pool = getPool();
  const r = await pool.query(
    `SELECT id, username, tipo_documento, numero_documento, nombres, apellidos, registro_medico, nombre, especialidad, created_at
     FROM users_consent ORDER BY LOWER(username)`
  );
  return r.rows;
}

async function createUser({
  username,
  password,
  tipo_documento,
  numero_documento,
  nombres,
  apellidos,
  registro_medico,
  especialidad
}) {
  const pool = getPool();
  const u = String(username || '').trim().toLowerCase();
  if (!u || !password) {
    const e = new Error('username_password_required');
    throw e;
  }
  const hash = await bcrypt.hash(String(password), 10);
  const td = String(tipo_documento || '').trim();
  const nd = String(numero_documento || '').trim();
  const nom = String(nombres || '').trim();
  const ape = String(apellidos || '').trim();
  const rm = String(registro_medico || '').trim();
  const esp = String(especialidad || '').trim();
  const nombre = buildNombreCompleto({ nombres: nom, apellidos: ape, nombre: '' }) || u;

  await pool.query(
    `INSERT INTO users_consent (username, password_hash, tipo_documento, numero_documento, nombres, apellidos, registro_medico, nombre, especialidad)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [u, hash, td, nd, nom, ape, rm, nombre, esp]
  );

  const row = await pool.query(
    `SELECT id, username, tipo_documento, numero_documento, nombres, apellidos, registro_medico, nombre, especialidad, created_at
     FROM users_consent WHERE LOWER(username) = $1`,
    [u]
  );
  return row.rows[0];
}

async function deleteUserByUsername(username, actingUsername) {
  const u = String(username || '').trim().toLowerCase();
  const self = String(actingUsername || '').trim().toLowerCase();
  if (u === self) {
    const e = new Error('cannot_delete_self');
    throw e;
  }
  const pool = getPool();
  const d = await pool.query(`DELETE FROM users_consent WHERE LOWER(username) = $1 RETURNING username`, [u]);
  return d.rowCount > 0;
}

async function setPassword(username, newPassword) {
  const u = String(username || '').trim().toLowerCase();
  if (!newPassword || String(newPassword).length < 4) {
    const e = new Error('password_too_short');
    throw e;
  }
  const pool = getPool();
  const hash = await bcrypt.hash(String(newPassword), 10);
  const r = await pool.query(
    `UPDATE users_consent SET password_hash = $2, updated_at = NOW() WHERE LOWER(username) = $1`,
    [u, hash]
  );
  return r.rowCount > 0;
}

module.exports = {
  listUsers,
  createUser,
  deleteUserByUsername,
  setPassword
};
