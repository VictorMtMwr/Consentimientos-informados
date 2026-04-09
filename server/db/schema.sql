-- Esquema para reemplazar data/patients.json
-- Ejecutar una vez (initSchema) o aplicar manualmente con psql

CREATE TABLE IF NOT EXISTS patients (
  cedula VARCHAR(32) PRIMARY KEY,
  nombre TEXT NOT NULL DEFAULT '',
  tipo_doc VARCHAR(32) DEFAULT '',
  edad VARCHAR(16) DEFAULT '',
  genero VARCHAR(32) DEFAULT '',
  telefono VARCHAR(64) DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patient_consents (
  id SERIAL PRIMARY KEY,
  cedula VARCHAR(32) NOT NULL REFERENCES patients(cedula) ON DELETE CASCADE,
  consent_id INTEGER NOT NULL,
  asignado BOOLEAN NOT NULL DEFAULT TRUE,
  firmado BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_firma TIMESTAMPTZ,
  archivo_firmado TEXT,
  datos_medico JSONB NOT NULL DEFAULT '{}'::jsonb,
  signatures JSONB,
  revocacion BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_revocacion TIMESTAMPTZ,
  archivo_revocado TEXT,
  UNIQUE (cedula, consent_id)
);

CREATE INDEX IF NOT EXISTS idx_patient_consents_cedula ON patient_consents(cedula);
CREATE INDEX IF NOT EXISTS idx_patient_consents_consent_id ON patient_consents(consent_id);

-- Panel medico: password_hash bcrypt
CREATE TABLE IF NOT EXISTS users_consent (
  id SERIAL PRIMARY KEY,
  username VARCHAR(128) NOT NULL,
  password_hash TEXT NOT NULL,
  tipo_documento VARCHAR(32) NOT NULL DEFAULT '',
  numero_documento VARCHAR(64) NOT NULL DEFAULT '',
  nombres VARCHAR(256) NOT NULL DEFAULT '',
  apellidos VARCHAR(256) NOT NULL DEFAULT '',
  registro_medico VARCHAR(128) NOT NULL DEFAULT '',
  nombre TEXT,
  especialidad VARCHAR(256) NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_consent_username_lower ON users_consent (LOWER(username));

ALTER TABLE users_consent ADD COLUMN IF NOT EXISTS especialidad VARCHAR(256) NOT NULL DEFAULT '';
ALTER TABLE users_consent ADD COLUMN IF NOT EXISTS nombres VARCHAR(256) NOT NULL DEFAULT '';
ALTER TABLE users_consent ADD COLUMN IF NOT EXISTS apellidos VARCHAR(256) NOT NULL DEFAULT '';
ALTER TABLE users_consent ADD COLUMN IF NOT EXISTS registro_medico VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE users_consent ADD COLUMN IF NOT EXISTS tipo_documento VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE users_consent ADD COLUMN IF NOT EXISTS numero_documento VARCHAR(64) NOT NULL DEFAULT '';
