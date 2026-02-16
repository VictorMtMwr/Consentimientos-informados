const express = require('express');
const http = require('http');
const router = express.Router();

const API_BASE = 'http://api-service:8080/Medihelp-api/capbas/get';

router.get('/capbas/:tipdoc/:documento', (req, res) => {
  const { tipdoc, documento } = req.params;
  const url = `${API_BASE}/${encodeURIComponent(tipdoc)}/${encodeURIComponent(documento)}`;

  http.get(url, { timeout: 10000 }, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => { data += chunk; });
    apiRes.on('end', () => {
      try {
        const json = JSON.parse(data);
        res.json(json);
      } catch {
        res.status(502).json({ error: 'Respuesta inválida de la API externa', raw: data });
      }
    });
  }).on('error', (err) => {
    console.error('[CAPBAS] Error al consultar API externa:', err.message);
    res.status(503).json({ error: 'No se pudo conectar con la API externa', detail: err.message });
  });
});

module.exports = router;
