#!/usr/bin/env node
/**
 * Aplica server/db/schema.sql contra PostgreSQL (usa .env en la raiz del proyecto).
 * Uso: npm run db:schema
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const { initSchema } = require('./initSchema');
const { getPool } = require('./pool');

initSchema()
  .then(() => getPool().end())
  .then(() => {
    console.log('[DB] Esquema aplicado correctamente (incl. users_consent si estaba en schema.sql).');
    process.exit(0);
  })
  .catch((e) => {
    console.error('[DB] Error:', e.message);
    process.exit(1);
  });
