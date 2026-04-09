require('dotenv').config();

const { initSchema } = require('./server/db/initSchema');
const { migrateFromJsonIfEmpty } = require('./server/db/migrateFromJson');
const { seedUsersConsentIfEmpty } = require('./server/db/seedUsersConsent');

async function bootstrap() {
  try {
    await initSchema();
    console.log('[DB] Esquema PostgreSQL listo.');
    const mig = await migrateFromJsonIfEmpty();
    if (mig.migrated) {
      console.log(`[DB] Migración desde data/patients.json: ${mig.patients} paciente(s).`);
    }
    await seedUsersConsentIfEmpty();
  } catch (err) {
    console.error('[DB] Error al conectar o inicializar:', err.message);
    process.exit(1);
  }

  const app = require('./server/app');
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.listen(PORT, () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════════════════════════╗');
    console.log('  ║   SISTEMA DE CONSENTIMIENTOS INFORMADOS                 ║');
    console.log(`  ║   Servidor: http://localhost:${PORT}                      ║`);
    console.log('  ║   Datos: PostgreSQL (patients, patient_consents, users)    ║');
    console.log('  ║   PDFs firmados: /firmados/                              ║');
    console.log('  ╚══════════════════════════════════════════════════════════╝');
    console.log('');
  });
}

bootstrap();
