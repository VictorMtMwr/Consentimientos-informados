const bcrypt = require('bcrypt');
const { getPool } = require('./pool');
const { buildNombreCompleto } = require('../repositories/usersConsentRepo');

/**
 * Si la tabla users_consent esta vacia y existen USERS_CONSENT_BOOTSTRAP_USERNAME
 * y USERS_CONSENT_BOOTSTRAP_PASSWORD en .env, crea el primer usuario (hash bcrypt).
 */
async function seedUsersConsentIfEmpty() {
  const pool = getPool();
  const c = await pool.query('SELECT COUNT(*)::int AS n FROM users_consent');
  if (c.rows[0].n > 0) return { created: false };

  const u = process.env.USERS_CONSENT_BOOTSTRAP_USERNAME;
  const p = process.env.USERS_CONSENT_BOOTSTRAP_PASSWORD;
  if (!u || !p) {
    console.warn(
      '[Auth] Tabla users_consent vacia: defina USERS_CONSENT_BOOTSTRAP_USERNAME y USERS_CONSENT_BOOTSTRAP_PASSWORD en .env, o inserte filas manualmente.'
    );
    return { created: false, reason: 'no_bootstrap_env' };
  }

  const username = String(u).trim().toLowerCase();
  const hash = await bcrypt.hash(String(p), 10);
  const tipo_documento = String(process.env.USERS_CONSENT_BOOTSTRAP_TIPO_DOC || '').trim();
  const numero_documento = String(process.env.USERS_CONSENT_BOOTSTRAP_NUMERO_DOC || '').trim();
  const nombres = String(process.env.USERS_CONSENT_BOOTSTRAP_NOMBRES || '').trim();
  const apellidos = String(process.env.USERS_CONSENT_BOOTSTRAP_APELLIDOS || '').trim();
  const registro_medico = String(process.env.USERS_CONSENT_BOOTSTRAP_REGISTRO_MEDICO || '').trim();
  const nombreLegacy = String(process.env.USERS_CONSENT_BOOTSTRAP_NOMBRE || '').trim();
  const especialidad = String(process.env.USERS_CONSENT_BOOTSTRAP_ESPECIALIDAD || '').trim();

  const nombre =
    buildNombreCompleto({ nombres, apellidos, nombre: nombreLegacy }) ||
    nombreLegacy ||
    'Administrador';

  await pool.query(
    `INSERT INTO users_consent (
       username, password_hash, tipo_documento, numero_documento,
       nombres, apellidos, registro_medico, nombre, especialidad
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [username, hash, tipo_documento, numero_documento, nombres, apellidos, registro_medico, nombre, especialidad]
  );
  console.log('[Auth] Usuario inicial creado en users_consent:', username);
  return { created: true, username };
}

module.exports = { seedUsersConsentIfEmpty };
