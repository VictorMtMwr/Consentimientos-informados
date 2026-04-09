const { Pool } = require('pg');

function createPool() {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '5432', 10);
  const database = process.env.DB_NAME || 'clinical_request_db';
  const user = process.env.DB_USER || 'medihelp';
  const password = process.env.DB_PASSWORD || '';

  return new Pool({
    host,
    port,
    database,
    user,
    password,
    max: 10,
    idleTimeoutMillis: 30000
  });
}

let pool;
function getPool() {
  if (!pool) pool = createPool();
  return pool;
}

module.exports = { getPool, createPool };
