const express = require('express');
const path = require('path');

const patientsRouter = require('./routes/patients');
const consentsRouter = require('./routes/consents');
const capbasRouter = require('./routes/capbas');

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API routes
app.use('/api', patientsRouter);
app.use('/api', consentsRouter);
app.use('/api', capbasRouter);

// Static: signed PDFs
app.use('/firmados', express.static(path.join(__dirname, '..', 'firmados'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
    }
  }
}));

// Static: frontend files
app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
