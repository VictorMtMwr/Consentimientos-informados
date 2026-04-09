const fs = require('fs');
const path = require('path');
const { getPool } = require('./pool');

/**
 * Parte schema.sql en sentencias (pg puede fallar o no aplicar todo si se env�a el archivo entero en un solo query).
 */
function splitSqlStatements(sql) {
  const lines = sql.split('\n');
  const withoutLineComments = lines
    .map((line) => {
      const idx = line.indexOf('--');
      if (idx === -1) return line;
      return line.slice(0, idx);
    })
    .join('\n');

  return withoutLineComments
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function initSchema() {
  const pool = getPool();
  const sqlPath = path.join(__dirname, 'schema.sql');
  const raw = fs.readFileSync(sqlPath, 'utf8');
  const statements = splitSqlStatements(raw);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await pool.query(stmt);
    } catch (err) {
      const preview = stmt.length > 120 ? `${stmt.slice(0, 120)}...` : stmt;
      console.error(`[DB] Fallo sentencia ${i + 1}/${statements.length}:\n${preview}`);
      throw err;
    }
  }
}

module.exports = { initSchema, splitSqlStatements };
