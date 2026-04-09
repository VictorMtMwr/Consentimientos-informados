#!/usr/bin/env node
/**
 * Crea un usuario en users_consent (hash bcrypt).
 * Uso:
 *   usuario password [solo_nombres]
 *   usuario password tipo_doc numero_doc [nombres] [apellidos] [registro_medico] [especialidad...]
 * Ejemplo:
 *   node server/db/addConsentUser.js dr1 x CC 80123456 "Juan" "Perez" "123456" Anestesiologia
 * Requiere .env con credenciales PostgreSQL.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const bcrypt = require('bcrypt');
const { getPool } = require('./pool');
const { buildNombreCompleto } = require('../repositories/usersConsentRepo');

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(
      'Uso: node server/db/addConsentUser.js <usuario> <password> [tipo_doc numero_doc nombres apellidos registro_medico especialidad...]\n' +
        '  Solo nombre: usuario password "Nombre apellido como un solo campo"\n' +
        '  Completo: usuario password CC 123456789 "Juan" "Perez" "RM123" Especialidad'
    );
    process.exit(1);
  }
  const username = String(args[0]).trim().toLowerCase();
  const pass = args[1];
  const rest = args.slice(2);

  let tipo_documento = '';
  let numero_documento = '';
  let nombres = '';
  let apellidos = '';
  let registro_medico = '';
  let especialidad = '';

  if (rest.length === 1) {
    nombres = rest[0];
  } else if (rest.length === 2) {
    tipo_documento = rest[0];
    numero_documento = rest[1];
  } else if (rest.length === 3) {
    tipo_documento = rest[0];
    numero_documento = rest[1];
    nombres = rest[2];
  } else if (rest.length === 4) {
    tipo_documento = rest[0];
    numero_documento = rest[1];
    nombres = rest[2];
    apellidos = rest[3];
  } else if (rest.length === 5) {
    tipo_documento = rest[0];
    numero_documento = rest[1];
    nombres = rest[2];
    apellidos = rest[3];
    registro_medico = rest[4];
  } else if (rest.length >= 6) {
    tipo_documento = rest[0];
    numero_documento = rest[1];
    nombres = rest[2];
    apellidos = rest[3];
    registro_medico = rest[4];
    especialidad = rest.slice(5).join(' ');
  }

  const nombre = buildNombreCompleto({ nombres, apellidos, nombre: '' }) || username;

  const pool = getPool();
  const hash = await bcrypt.hash(String(pass), 10);
  try {
    await pool.query(
      `INSERT INTO users_consent (
         username, password_hash, tipo_documento, numero_documento,
         nombres, apellidos, registro_medico, nombre, especialidad
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [username, hash, tipo_documento, numero_documento, nombres, apellidos, registro_medico, nombre, especialidad]
    );
    console.log('Usuario creado:', username);
  } catch (e) {
    if (e.code === '23505') {
      console.error('Ese usuario ya existe.');
      process.exit(1);
    }
    throw e;
  }
  await pool.end();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
