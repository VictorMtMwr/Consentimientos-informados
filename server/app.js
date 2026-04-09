const express = require('express');
const path = require('path');
const session = require('express-session');

const patientsRouter = require('./routes/patients');
const consentsRouter = require('./routes/consents');
const capbasRouter = require('./routes/capbas');
const authRouter = require('./routes/auth');
const usersConsentAdminRouter = require('./routes/usersConsentAdmin');

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const sessionSecret = process.env.SESSION_SECRET || 'development-secret-cambiar-en-produccion';
app.use(
  session({
    name: 'ci.sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: process.env.COOKIE_SECURE === 'true'
    }
  })
);

// API routes
app.use('/api', authRouter);
app.use('/api', usersConsentAdminRouter);
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

// Archivos en /documentos (opcional); el visor ya no genera formularios desde PDF.
app.use('/documentos', express.static(path.join(__dirname, '..', 'documentos'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
    }
  }
}));

// Static: frontend files (charset UTF-8 para HTML/CSS/JS y tildes correctas)
app.use(
  express.static(path.join(__dirname, '..', 'public'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      }
    }
  })
);

module.exports = app;
