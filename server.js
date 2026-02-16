const app = require('./server/app');

const PORT = 3200;

app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════════════════╗');
  console.log('  ║   SISTEMA DE CONSENTIMIENTOS INFORMADOS                 ║');
  console.log(`  ║   Servidor corriendo en: http://localhost:${PORT}          ║`);
  console.log('  ║   Documentos firmados se guardan en: /firmados/          ║');
  console.log('  ╚══════════════════════════════════════════════════════════╝');
  console.log('');
});
