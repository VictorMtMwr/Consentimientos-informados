// =============================================================================
// VIEWER / FORMULARIO
// =============================================================================
let _viewerRole = 'patient';
let doctorSignaturePad = null;

/** Solo estos campos del formulario de anestesia (id 1) deben persistir como datos del médico. Evita guardar checkboxes del paciente (declaraciones, identificación §2, disentimiento) por el bug histórico de usar input.value === "on" en todos los checkbox. */
const ANESTHESIA_MEDICO_PREFILL_KEYS = new Set([
  'ax_fecha_hora', 'medico', 'diagnostico', 'servicio',
  'ax_tipo_general', 'ax_tipo_regional', 'ax_tipo_sedacion', 'ax_tipo_anestesia',
  'ax_riesgos_adicionales', 'ax_alt_1', 'ax_alt_2', 'ax_alt_3'
]);

const COMMON_PATIENT_OWNED_KEYS = new Set([
  'ci_nombre_otorga',
  'ci_doc_otorga',
  'ci_mi_mismo',
  'ci_paciente',
  'ci_paciente_nombre',
  'ci_paciente_doc',
  'ci_padre',
  'ci_tutor',
  'ci_apoderado',
  'ci_conyuge',
  'ci_familiar',
  'declara_informado',
  'declara_revocacion_info',
  'declara_revocar',
  'declara_voluntario',
  'declara_no_autoriza',
  'ax_firma_paciente_nombre',
  'ax_testigo1',
  'ax_testigo2',
  'bi_disent_nombre_doc',
  'bi_disent_calidad',
  'bi_disent_rechaza',
  'bi_disent_motivo',
  'bi_disent_fecha_hora',
  'cv_disent_nombre_doc',
  'cv_disent_calidad',
  'cv_disent_rechaza',
  'cv_disent_motivo',
  'cv_disent_fecha_hora',
  'ci4_disent_nombre_doc',
  'ci4_disent_calidad',
  'ci4_disent_rechaza',
  'ci4_disent_motivo',
  'ci4_disent_fecha_hora',
  'ci4_declara_autoriza_dr',
  'ci5_disent_nombre_doc',
  'ci5_disent_calidad',
  'ci5_disent_rechaza',
  'ci5_disent_motivo',
  'ci5_disent_fecha_hora',
  'ci6_disent_nombre_doc',
  'ci6_disent_calidad',
  'ci6_disent_rechaza',
  'ci6_disent_motivo',
  'ci6_disent_fecha_hora',
  'ci7_disent_nombre_doc',
  'ci7_disent_calidad',
  'ci7_disent_rechaza',
  'ci7_disent_motivo',
  'ci7_disent_fecha_hora',
  'ci8_disent_nombre_doc',
  'ci8_disent_calidad',
  'ci8_disent_rechaza',
  'ci8_disent_motivo',
  'ci8_disent_fecha_hora',
  'ci9_disent_nombre_doc',
  'ci9_disent_calidad',
  'ci9_disent_rechaza',
  'ci9_disent_motivo',
  'ci9_disent_fecha_hora',
  'ci10_disent_nombre_doc',
  'ci10_disent_calidad',
  'ci10_disent_rechaza',
  'ci10_disent_motivo',
  'ci10_disent_fecha_hora',
  'bi_firma_paciente_nombre',
  'bi_testigo1',
  'bi_testigo2'
]);

const COMMON_TEMPLATE_REUSE_CONFIG = {
  1: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'bi_proc_manga',
      'bi_proc_bypass',
      'bi_proc_biliopancreatica',
      'bi_proc_otra',
      'bi_proc_otra_detalle',
      'bi_riesgos_adicionales',
      'bi_alt_conservador',
      'bi_alt_farmacologico',
      'bi_alt_endoscopico',
      'bi_alt_otra_tecnica',
      'bi_alt_otra_tecnica_detalle',
      'bi_alt_no_realizar'
    ],
    signatureNameField: 'bi_firma_paciente_nombre',
    dissentNameField: 'bi_disent_nombre_doc',
    dissentRoleField: 'bi_disent_calidad'
  },
  2: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'cv_tipo_valvula',
      'cv_reparacion_tejido_nativo',
      'cv_procedimiento_especifico',
      'cv_euroscore_ii',
      'cv_riesgo_muerte_individualizado',
      'cv_riesgos_adicionales',
      'cv_alt_tratamiento_medico',
      'cv_alt_cateterismo',
      'cv_alt_no_realizar',
      'cv_alt_otra',
      'cv_alt_otra_detalle'
    ],
    // Cardiovascular replica la caja de firma de anestesia en forms-es.js
    signatureNameField: 'ax_firma_paciente_nombre',
    dissentNameField: 'cv_disent_nombre_doc',
    dissentRoleField: 'cv_disent_calidad'
  },
  4: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'ci4_riesgos_adicionales',
      'ci4_alt_no_cirugia',
      'ci4_alt_prepucioplastia',
      'ci4_alt_otra',
      'ci4_alt_otra_detalle'
    ],
    signatureNameField: 'ax_firma_paciente_nombre',
    dissentNameField: 'ci4_disent_nombre_doc',
    dissentRoleField: 'ci4_disent_calidad'
  },
  5: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'ci5_riesgos_adicionales',
      'ci5_alt_conservador',
      'ci5_alt_drenaje',
      'ci5_alt_abierta',
      'ci5_alt_no_cirugia'
    ],
    signatureNameField: 'ax_firma_paciente_nombre',
    dissentNameField: 'ci5_disent_nombre_doc',
    dissentRoleField: 'ci5_disent_calidad'
  },
  6: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'ci6_riesgos_adicionales',
      'ci6_alt_flexible_recto_colon_izquierdo',
      'ci6_alt_tomografia_colon',
      'ci6_alt_capsula_colon',
      'ci6_alt_no_realizar'
    ],
    signatureNameField: 'ax_firma_paciente_nombre',
    dissentNameField: 'ci6_disent_nombre_doc',
    dissentRoleField: 'ci6_disent_calidad'
  },
  7: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'ci7_riesgos_adicionales',
      'ci7_alt_estudio_radiologico_contraste',
      'ci7_alt_capsula_endoscopica',
      'ci7_alt_manejo_medico_empirico'
    ],
    signatureNameField: 'ax_firma_paciente_nombre',
    dissentNameField: 'ci7_disent_nombre_doc',
    dissentRoleField: 'ci7_disent_calidad'
  },
  8: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'ci8_riesgos_adicionales',
      'ci8_alt_observacion',
      'ci8_alt_correccion_optica',
      'ci8_alt_no_cirugia'
    ],
    signatureNameField: 'ax_firma_paciente_nombre',
    dissentNameField: 'ci8_disent_nombre_doc',
    dissentRoleField: 'ci8_disent_calidad'
  },
  9: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'ci9_riesgos_adicionales',
      'ci9_alt_observacion',
      'ci9_alt_faja',
      'ci9_alt_no_cirugia'
    ],
    signatureNameField: 'ax_firma_paciente_nombre',
    dissentNameField: 'ci9_disent_nombre_doc',
    dissentRoleField: 'ci9_disent_calidad'
  },
  11: {
    doctorOwnedFields: [
      'medico',
      'diagnostico',
      'servicio',
      'ci10_riesgos_adicionales',
      'ci10_alt_endoscopia_laser',
      'ci10_alt_percutanea',
      'ci10_alt_expectante',
      'ci10_alt_cirugia_abierta_lap'
    ],
    signatureNameField: 'ax_firma_paciente_nombre',
    dissentNameField: 'ci10_disent_nombre_doc',
    dissentRoleField: 'ci10_disent_calidad'
  }
};

function isAnesthesiaMedicoPrefillKey(consentId, name) {
  if (Number(consentId) !== 1) return !COMMON_PATIENT_OWNED_KEYS.has(name);
  return ANESTHESIA_MEDICO_PREFILL_KEYS.has(name);
}

function syncDoctorSignatureToTemplate(signatureDataUrl) {
  const slots = ['axMedicoSignSlot', 'axMedicoSignSlotTop']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!slots.length) return;
  slots.forEach((slot) => {
    if (!signatureDataUrl) {
      slot.innerHTML = '';
      return;
    }
    slot.innerHTML = `<img src="${signatureDataUrl}" alt="Firma del médico" class="ax-signature-img">`;
  });
}

function setupRepresentativeToggle(patient, readOnly) {
  const cbSelf = document.querySelector('input[name="ax_mi_mismo"]');
  const cbRep = document.querySelector('input[name="ax_paciente"]');
  const yoNombre = document.querySelector('input[name="ax_nombre_otorga"]');
  const yoDoc = document.querySelector('input[name="ax_doc_otorga"]');
  const repPaciente = document.querySelector('input[name="ax_paciente_nombre"]');
  const repPacienteDoc = document.querySelector('input[name="ax_paciente_doc"]');
  const repQualityChecks = Array.from(document.querySelectorAll(
    'input[name="ax_padre"], input[name="ax_tutor"], input[name="ax_apoderado"], input[name="ax_conyuge"]'
  ));
  if (!cbSelf || !cbRep || !yoNombre || !yoDoc) return;

  const patientName = patient?.nombre || '';
  const patientDoc = `${patient?.tipoDoc || 'CC'} ${patient?.cedula || ''}`.trim();

  /** Calidad/representación solo aplica si firma a nombre del paciente (tercero), no en «Mi mismo(a)». */
  function updateRepQualityAvailability() {
    const allow = cbRep.checked;
    repQualityChecks.forEach((el) => {
      if (!allow) el.checked = false;
      el.disabled = readOnly || !allow;
      const label = el.closest('label');
      if (label) label.classList.toggle('is-locked-field', readOnly || !allow);
    });
  }

  function applyMode() {
    if (cbRep.checked) {
      // Representante: debe diligenciar sus propios datos
      const movedName = yoNombre.value.trim();
      const movedDoc = yoDoc.value.trim();
      if (repPaciente && movedName && !repPaciente.value.trim()) {
        repPaciente.value = movedName;
      }
      if (repPacienteDoc && movedDoc && !repPacienteDoc.value.trim()) {
        repPacienteDoc.value = movedDoc;
      }
      yoNombre.value = '';
      yoDoc.value = '';
      yoNombre.readOnly = !!readOnly;
      yoDoc.readOnly = !!readOnly;
      yoNombre.classList.remove('filled');
      yoDoc.classList.remove('filled');
      if (repPaciente) repPaciente.readOnly = true;
      if (repPacienteDoc) repPacienteDoc.readOnly = true;
    } else {
      // Por mi mismo: usar datos del paciente y bloquear edición
      yoNombre.value = patientName;
      yoDoc.value = patientDoc;
      yoNombre.readOnly = true;
      yoDoc.readOnly = true;
      yoNombre.classList.add('filled');
      yoDoc.classList.add('filled');
      if (repPaciente) {
        repPaciente.value = '';
        repPaciente.readOnly = true;
      }
      if (repPacienteDoc) {
        repPacienteDoc.value = '';
        repPacienteDoc.readOnly = true;
      }
    }
    updateRepQualityAvailability();
    syncAnesthesiaDerivedIdentityFields(patient);
  }

  function handleSelfChange() {
    if (cbSelf.checked) cbRep.checked = false;
    if (!cbSelf.checked && !cbRep.checked) cbSelf.checked = true;
    applyMode();
  }

  function handleRepChange() {
    if (cbRep.checked) cbSelf.checked = false;
    if (!cbRep.checked && !cbSelf.checked) cbRep.checked = true;
    applyMode();
  }

  cbSelf.addEventListener('change', handleSelfChange);
  cbRep.addEventListener('change', handleRepChange);

  // Calidad/representacion: permitir solo una opcion a la vez
  repQualityChecks.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        repQualityChecks.forEach((other) => {
          if (other !== checkbox) other.checked = false;
        });
      }
      syncAnesthesiaDerivedIdentityFields(patient);
    });
  });

  // Estado inicial
  if (!cbSelf.checked && !cbRep.checked) cbSelf.checked = true;
  applyMode();

  const syncDisent = () => syncAnesthesiaDerivedIdentityFields(patient);
  [yoNombre, yoDoc].forEach((el) => {
    if (!el) return;
    el.addEventListener('input', syncDisent);
    el.addEventListener('change', syncDisent);
  });
}

/** Etiqueta de calidad según Padre/Tutor/Apoderado/Cónyuge (solo una activa). */
function getRepresentacionLabelAnesthesia() {
  const map = [
    ['ax_padre', 'Padre/Madre'],
    ['ax_tutor', 'Tutor legal'],
    ['ax_apoderado', 'Apoderado(a)'],
    ['ax_conyuge', 'Cónyuge']
  ];
  for (const [name, label] of map) {
    const el = document.querySelector(`input[name="${name}"]`);
    if (el?.checked) return label;
  }
  return '';
}

/**
 * Rellena sección 9 disentimiento (nombre/documento y calidad) desde la identificación del §2.
 * — Mi mismo(a): datos del paciente, calidad "Paciente".
 * — Del/La paciente: nombre y documento del firmante (tercero) y calidad según checkboxes.
 */
function syncDisentimientoFromSection2(patient) {
  const nombreDoc = document.querySelector('input[name="ax_disent_nombre_doc"]');
  const calidad = document.querySelector('input[name="ax_disent_calidad"]');
  const miMismo = document.querySelector('input[name="ax_mi_mismo"]');
  const porPaciente = document.querySelector('input[name="ax_paciente"]');
  if (!nombreDoc || !calidad || !miMismo || !porPaciente) return;

  const yoNombre = document.querySelector('input[name="ax_nombre_otorga"]');
  const yoDoc = document.querySelector('input[name="ax_doc_otorga"]');
  const p = patient || (typeof _viewerPatient !== 'undefined' ? _viewerPatient : {}) || {};

  const joinNombreDoc = (n, d) => [n, d].filter((x) => String(x || '').trim()).join(' — ');

  if (miMismo.checked) {
    const n = yoNombre?.value?.trim() || p.nombre || '';
    const d = yoDoc?.value?.trim() || `${p.tipoDoc || 'CC'} ${p.cedula || ''}`.trim();
    nombreDoc.value = joinNombreDoc(n, d);
    calidad.value = 'Paciente';
    return;
  }

  if (porPaciente.checked) {
    const n = yoNombre?.value?.trim() || '';
    const d = yoDoc?.value?.trim() || '';
    nombreDoc.value = joinNombreDoc(n, d);
    const rep = getRepresentacionLabelAnesthesia();
    calidad.value = rep || '';
    return;
  }

  nombreDoc.value = '';
  calidad.value = '';
}

/**
 * Línea bajo la firma del paciente/representante: nombre, documento y calidad según §2.
 */
function syncPacienteFirmaNombreLine(patient) {
  const el = document.querySelector('[name="ax_firma_paciente_nombre"]');
  if (!el) return;
  const miMismo = document.querySelector('input[name="ax_mi_mismo"]');
  const porPaciente = document.querySelector('input[name="ax_paciente"]');
  if (!miMismo || !porPaciente) return;

  const yoNombre = document.querySelector('input[name="ax_nombre_otorga"]');
  const yoDoc = document.querySelector('input[name="ax_doc_otorga"]');
  const p = patient || (typeof _viewerPatient !== 'undefined' ? _viewerPatient : {}) || {};

  const joinNombreDoc = (n, d) => [n, d].filter((x) => String(x || '').trim()).join(' — ');

  if (miMismo.checked) {
    const n = yoNombre?.value?.trim() || p.nombre || '';
    const d = yoDoc?.value?.trim() || `${p.tipoDoc || 'CC'} ${p.cedula || ''}`.trim();
    const base = joinNombreDoc(n, d);
    el.value = base ? `${base}\nen calidad de Paciente` : '';
    el.classList.toggle('filled', !!el.value.trim());
    return;
  }
  if (porPaciente.checked) {
    const n = yoNombre?.value?.trim() || '';
    const d = yoDoc?.value?.trim() || '';
    const base = joinNombreDoc(n, d);
    const cal = getRepresentacionLabelAnesthesia();
    el.value = cal && base ? `${base}\nen calidad de ${cal}` : base;
    el.classList.toggle('filled', !!el.value.trim());
    return;
  }
  el.value = '';
  el.classList.remove('filled');
}

function syncAnesthesiaDerivedIdentityFields(patient) {
  syncDisentimientoFromSection2(patient);
  syncPacienteFirmaNombreLine(patient);
}

function lockDoctorOnlyFields(consent) {
  if (consent?.id !== 1) return;
  [
    'ax_alt_1', 'ax_alt_2', 'ax_alt_3',
    'ax_tipo_general', 'ax_tipo_regional', 'ax_tipo_sedacion',
    'ax_tipo_anestesia'
  ].forEach((name) => {
    const el = document.querySelector(`[name="${name}"]`);
    if (!el) return;
    el.disabled = true;
    el.readOnly = true;
    const label = el.closest('label');
    if (label) label.classList.add('is-locked-field');
  });
}

function lockCommonDoctorOwnedFieldsForPatient(consent) {
  if (Number(consent?.id) === 1) return;
  const formId = Number(getConsentFormId(consent));
  const doctorOwned = COMMON_TEMPLATE_REUSE_CONFIG[formId]?.doctorOwnedFields || [
    'medico',
    'diagnostico',
    'servicio'
  ];
  doctorOwned.forEach((name) => {
    const el = document.querySelector(`[name="${name}"]`);
    if (!el) return;
    el.disabled = true;
    el.readOnly = true;
    const label = el.closest('label');
    if (label) label.classList.add('is-locked-field');
  });
}

function restoreSavedSignatures(pc) {
  const signatures = pc?.signatures;
  if (!signatures || typeof signatures !== 'object') return;

  const map = [
    { key: 'axPacienteSignSlot', alt: 'Firma del paciente' },
    { key: 'axTestigo1SignSlot', alt: 'Firma testigo 1' },
    { key: 'axTestigo2SignSlot', alt: 'Firma testigo 2' }
  ];

  map.forEach(({ key, alt }) => {
    const slot = document.getElementById(key);
    const src = signatures[key];
    if (!slot || !src) return;
    slot.innerHTML = `<img src="${src}" alt="${alt}" class="ax-signature-img">`;
  });
}

function lockPatientOwnedSectionForDoctor(consent) {
  if (Number(consent?.id) !== 1) return;
  const patientOwnedFields = [
    'ax_nombre_otorga',
    'ax_doc_otorga',
    'ax_mi_mismo',
    'ax_paciente',
    'ax_paciente_nombre',
    'ax_paciente_doc',
    'ax_padre',
    'ax_tutor',
    'ax_apoderado',
    'ax_conyuge',
    'declara_informado',
    'declara_revocacion_info',
    'declara_voluntario',
    'declara_no_autoriza',
    'ax_firma_paciente_nombre',
    'ax_testigo1',
    'ax_testigo2'
  ];
  patientOwnedFields.forEach((name) => {
    const el = document.querySelector(`[name="${name}"]`);
    if (!el) return;
    el.disabled = true;
    el.readOnly = true;
    const label = el.closest('label');
    if (label) label.classList.add('is-locked-field');
  });
}

function lockCommonPatientOwnedSectionForDoctor(consent) {
  if (Number(consent?.id) === 1) return;
  COMMON_PATIENT_OWNED_KEYS.forEach((name) => {
    const el = document.querySelector(`[name="${name}"]`);
    if (!el) return;
    el.disabled = true;
    el.readOnly = true;
    const label = el.closest('label');
    if (label) label.classList.add('is-locked-field');
  });
}

function lockCityForAllUsers() {
  ['ax_ciudad', 'ci_ciudad'].forEach((name) => {
    const el = document.querySelector(`[name="${name}"]`);
    if (!el) return;
    if (!String(el.value || '').trim()) {
      el.value = 'Cartagena de Indias - Bolivar';
    }
    el.readOnly = true;
    el.disabled = true;
    el.classList.add('filled');
  });
}

function buildFormDraftKey(consent, patient, role, mode) {
  const consentId = String(consent?.id || '');
  const cedula = String(patient?.cedula || '');
  const safeRole = role || _viewerRole || 'patient';
  const safeMode = mode || (window._isRevocation ? 'revocation' : 'consent');
  return `ci:draft:${safeRole}:${cedula}:${consentId}:${safeMode}`;
}

/** Guarda de inmediato el borrador local (p. ej. tras reglas de exclusión de declaraciones). */
function persistCurrentFormDraft(consent, patient, role, mode) {
  const form = document.getElementById('consentForm');
  if (!form || !consent || !patient) return;
  try {
    const key = buildFormDraftKey(consent, patient, role, mode);
    localStorage.setItem(key, JSON.stringify(snapshotFormValues(form)));
  } catch {
    // quota / privado
  }
}

function applyFormDraft(form, draft) {
  if (!form || !draft || typeof draft !== 'object') return;
  const truthy = (v) => v === true || v === 'on' || v === 'true' || v === 1 || v === '1';

  Object.entries(draft).forEach(([name, value]) => {
    const el = form.querySelector(`[name="${name}"]`);
    if (!el) return;
    const isCb = (el.type || '').toLowerCase() === 'checkbox';
    // Checkboxes: restaurar aunque sigan disabled (p. ej. regla no-autorización); luego initNoAuthorizationExclusivity ajusta.
    if (isCb) {
      const wasDisabled = el.disabled;
      el.disabled = false;
      el.checked = truthy(value);
      el.disabled = wasDisabled;
      return;
    }
    if (el.disabled || el.readOnly) return;
    el.value = value == null ? '' : String(value);
  });
  // §2 anestesia: "Mi mismo" y "Del/La paciente" son excluyentes; el HTML marca Mi mismo por defecto.
  const mm = form.querySelector('input[name="ax_mi_mismo"]');
  const rp = form.querySelector('input[name="ax_paciente"]');
  if (mm && rp) {
    const mmD = truthy(draft.ax_mi_mismo);
    const rpD = truthy(draft.ax_paciente);
    if (mm.checked && rp.checked) {
      if (rpD && !mmD) mm.checked = false;
      else if (mmD && !rpD) rp.checked = false;
      else if (mmD && rpD) { mm.checked = false; rp.checked = true; }
      else { mm.checked = false; rp.checked = true; }
    } else if (!mm.checked && !rp.checked) {
      mm.checked = true;
      rp.checked = false;
    }
  }
}

/** Aplica valor guardado en prefill (datosMedico): checkboxes/radios usan .checked, no .value */
function applyPrefillValue(el, value) {
  if (!el) return;
  const t = (el.type || '').toLowerCase();
  if (t === 'checkbox') {
    el.checked = value === true || value === 'on' || value === 'true' || value === 1 || value === '1';
    return;
  }
  if (t === 'radio') {
    const form = el.form || document.getElementById('consentForm');
    const str = value == null ? '' : String(value);
    if (form) {
      form.querySelectorAll(`input[type="radio"][name="${el.name}"]`).forEach((r) => {
        r.checked = r.value === str;
      });
    }
    return;
  }
  el.value = value == null ? '' : String(value);
}

function snapshotFormValues(form) {
  const values = {};
  if (!form) return values;
  form.querySelectorAll('input[name], textarea[name], select[name]').forEach((el) => {
    const name = el.name;
    if (!name) return;
    if ((el.type || '').toLowerCase() === 'checkbox') {
      values[name] = !!el.checked;
    } else {
      values[name] = el.value ?? '';
    }
  });
  // Refuerzo: todos los checkbox con nombre (p. ej. §8 anestesia dentro de labels largos)
  form.querySelectorAll('input[type="checkbox"][name]').forEach((el) => {
    const name = el.name;
    if (!name) return;
    values[name] = !!el.checked;
  });
  return values;
}

function initFormDraftPersistence(consent, patient, role, readOnly, mode) {
  if (readOnly) return;
  const form = document.getElementById('consentForm');
  if (!form) return;

  const key = buildFormDraftKey(consent, patient, role, mode);
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const draft = JSON.parse(raw);
      applyFormDraft(form, draft);
      persistCurrentFormDraft(consent, patient, role, mode);
    }
  } catch {
    // Ignorar errores de parseo de borrador
  }

  let saveTimer = null;
  const flushSave = () => persistCurrentFormDraft(consent, patient, role, mode);
  const scheduleSave = () => {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(flushSave, 200);
  };

  form.addEventListener('change', scheduleSave, true);
  form.addEventListener('input', scheduleSave, true);
  form.querySelectorAll('input[name], textarea[name], select[name]').forEach((el) => {
    el.addEventListener('input', scheduleSave);
    el.addEventListener('change', scheduleSave);
    el.addEventListener('click', scheduleSave);
  });
}

function clearCurrentFormDraft(mode) {
  if (!_viewerConsent || !_viewerPatient) return;
  const key = buildFormDraftKey(_viewerConsent, _viewerPatient, _viewerRole, mode);
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignorar errores de storage
  }
}

function buildAnesthesiaConsentTemplate(patient, dateStr) {
  const docVal = `${patient.tipoDoc || 'CC'} ${patient.cedula}`;
  return `
    <div class="anx-doc">
      <h2 class="anx-title">CONSENTIMIENTO INFORMADO - ANESTESIA GENERAL / REGIONAL / SEDACION</h2>
      <p class="anx-subtitle">Servicio de Anestesiologia - Clinica Medihelp Services</p>

      <div class="anx-block-title">1. LUGAR Y FECHA</div>
      <div class="anx-row anx-row-fecha">
        <div class="anx-label">Ciudad:</div><input name="ax_ciudad" value="Cartagena de Indias - Bolivar">
        <div class="anx-label">Fecha y hora:</div><input type="datetime-local" name="ax_fecha_hora" class="ax-mini">
      </div>

      <div class="anx-block-title">2. IDENTIFICACION DE QUIEN OTORGA EL CONSENTIMIENTO</div>
      <div class="anx-row anx-row-ident">
        <div class="anx-label">Yo:</div><input name="ax_nombre_otorga" value="${patient.nombre}">
        <div class="anx-label">Identificado(a) con:</div><input name="ax_doc_otorga" value="${docVal}">
      </div>
      <div class="anx-row anx-row-representante">
        <div class="anx-label">Actuo en nombre de:</div>
        <div class="anx-checkgroup">
          <label><input type="checkbox" name="ax_mi_mismo" checked> Mi mismo(a)</label>
          <label><input type="checkbox" name="ax_paciente"> Del/La paciente</label>
        </div>
        <div class="anx-inline-pair">
          <div class="anx-label">Paciente:</div><input name="ax_paciente_nombre">
        </div>
        <div class="anx-inline-pair">
          <div class="anx-label">Identificado(a) paciente:</div><input name="ax_paciente_doc">
        </div>
      </div>
      <div class="anx-row">
        <div class="anx-label">Calidad / representacion:</div>
        <div class="anx-checkgroup anx-checkgroup-wide">
          <label><input type="checkbox" name="ax_padre"> Padre/Madre</label>
          <label><input type="checkbox" name="ax_tutor"> Tutor legal</label>
          <label><input type="checkbox" name="ax_apoderado"> Apoderado(a)</label>
          <label><input type="checkbox" name="ax_conyuge"> Conyuge</label>
        </div>
      </div>

      <div class="anx-block-title">3. INFORMACION MEDICA RECIBIDA</div>
      <div class="anx-row"><div class="anx-label">Doctor(a) tratante:</div><input name="medico"></div>
      <div class="anx-row"><div class="anx-label">Enfermedad / diagnostico:</div><input name="diagnostico"></div>
      <div class="anx-row"><div class="anx-label">Procedimiento a realizar:</div><input name="servicio"></div>

      <div class="anx-block-title">4. DESCRIPCION DEL PROCEDIMIENTO</div>
      <p class="anx-p">La anestesia es un estado controlado de inconsciencia, insensibilidad al dolor o relajacion muscular, inducido por medicamentos, con el fin de permitir la realizacion de procedimientos quirurgicos o diagnosticos.</p>
      <p class="anx-p">
        Los tipos de anestesia a utilizar son:
        <label class="anx-inline-check"><input type="checkbox" name="ax_tipo_general"> Anestesia general:</label>
        perdida total de la consciencia y el dolor durante el procedimiento mediante medicamentos intravenosos y/o inhalados. Requiere manejo de la via aerea (intubacion endotraqueal o mascara laringea).
        <label class="anx-inline-check"><input type="checkbox" name="ax_tipo_regional"> Anestesia regional (epidural / raquidea / bloqueos nerviosos):</label>
        se insensibiliza una region del cuerpo inyectando anestesico local cerca de nervios o la medula espinal. El paciente permanece despierto o con sedacion leve.
        <label class="anx-inline-check"><input type="checkbox" name="ax_tipo_sedacion"> Sedacion / anestesia monitoreada:</label>
        estado de somnolencia controlada que permite la realizacion del procedimiento con preservacion de la respiracion espontanea.
        El tipo de anestesia se selecciona segun el procedimiento, las condiciones de salud del paciente y criterio del anestesiologo.
      </p>
      <div class="anx-row anx-row--field-top"><div class="anx-label">Tipo de anestesia indicado para este caso:</div><textarea name="ax_tipo_anestesia" class="ax-full-line ax-full-line--multiline" rows="2" spellcheck="false"></textarea></div>

      <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
      <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
      <table class="anx-table">
        <thead><tr><th>COMPLICACION / RIESGO</th><th>FRECUENCIA</th></tr></thead>
        <tbody>
          <tr><td>Nauseas y vomitos postoperatorios</td><td>20-30%</td></tr>
          <tr><td>Dolor de garganta o ronquera por intubacion (transitorio)</td><td>20-40%</td></tr>
          <tr><td>Escalofrios postanestesia</td><td>Frecuente</td></tr>
          <tr><td>Dolor en el sitio de puncion o inyeccion</td><td>Frecuente</td></tr>
          <tr><td>Confusion o desorientacion transitoria al despertar (especialmente en adultos mayores)</td><td>Variable</td></tr>
          <tr><td>Cefalea postpuncion dural (en anestesia espinal / epidural)</td><td>1-3%</td></tr>
          <tr><td>Hipotension arterial durante el procedimiento</td><td>5-20%</td></tr>
          <tr><td>Bradicardia (disminucion del ritmo cardiaco)</td><td>Variable</td></tr>
          <tr><td>Dificultad para el manejo de la via aerea / laringoespasmo</td><td>0.1-1%</td></tr>
          <tr><td>Reacciones alergicas a medicamentos anestesicos</td><td>Raro, &lt;1%</td></tr>
          <tr><td>Hipertermia maligna (reaccion rara a ciertos gases anestesicos)</td><td>Muy raro, 1:50,000</td></tr>
          <tr><td>Lesion dental por instrumentos de via aerea</td><td>Raro</td></tr>
          <tr><td>Aspiracion gastrica y neumonia por aspiracion</td><td>Raro, &lt;0.1%</td></tr>
          <tr><td>Neuropatia periferica por posicion prolongada</td><td>Raro</td></tr>
          <tr><td>Bloqueo espinal total / toxicidad por anestesico local (en anestesia regional)</td><td>Muy raro</td></tr>
          <tr><td>Lesion neurologica o paralisis transitoria o permanente (en anestesia regional)</td><td>Muy raro</td></tr>
          <tr><td>Complicaciones cardiorespiratorias graves</td><td>Poco frecuente</td></tr>
          <tr><td>Muerte relacionada con la anestesia</td><td>Muy raro, 1:100.000-1:200.000</td></tr>
        </tbody>
      </table>

      <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
      <p class="anx-p">En mi caso particular, el medico me ha explicado los siguientes riesgos adicionales segun mis condiciones de salud individuales:</p>
      <div class="anx-row"><textarea name="ax_riesgos_adicionales" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea></div>

      <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
      <label><input type="checkbox" name="ax_alt_1"> Otro tipo de anestesia</label>
      <label><input type="checkbox" name="ax_alt_2"> Analgesia / sedacion sin anestesia general</label>
      <label><input type="checkbox" name="ax_alt_3"> No realizar procedimiento que requiere anestesia</label>

      <div class="anx-block-title">8. DECLARACION DE ENTENDIMIENTO Y ACEPTACION</div>
      <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leido el presente documento - o me ha sido leido en caso de no poder hacerlo por mi mismo(a) - y he entendido la informacion que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el medico tratante.</label>
      <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realizacion del procedimiento, sin que ello implique perjuicio alguno para mi atencion medica.</label>
      <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realizacion del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolucion 13437 de 1991 y los estandares de acreditacion internacional en salud vigentes.</label>
      <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realizacion del procedimiento descrito en este consentimiento.</label>

      <div class="anx-block-title" id="anxSection9Title">9. FIRMAS DE CONSENTIMIENTO</div>
      <div id="anxDissentFields" style="display:none;">
        <div class="anx-row">
          <div class="anx-label">Yo, (nombre y documento):</div>
          <input name="ax_disent_nombre_doc" class="ax-full-line">
        </div>
        <div class="anx-row">
          <div class="anx-label">en calidad de:</div>
          <input name="ax_disent_calidad" class="ax-full-line">
        </div>
        <div class="anx-row anx-inline-checks">
          <div class="anx-label">Declaro que:</div>
          <label><input type="checkbox" name="ax_disent_rechaza"> Rechazo el procedimiento</label>
        </div>
        <div class="anx-row anx-row--field-top">
          <div class="anx-label">Motivo:</div>
          <textarea name="ax_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
        </div>
        <div class="anx-row">
          <div class="anx-label">Fecha y hora:</div>
          <input type="datetime-local" name="ax_disent_fecha_hora" class="ax-full-line">
        </div>
      </div>

      <div class="anx-firmas-box">
        <div class="anx-firmas-top">
          <div class="anx-firma-card">
            <div class="anx-firma-head">Paciente / Rep. Legal</div>
            <div class="anx-firma-body">
              <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
              <textarea name="ax_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Se completa automáticamente según la identificación (§2). Modifique nombre y documento en esa sección."></textarea>
            </div>
            <div class="anx-firma-foot">Nombre y documento de identidad</div>
          </div>
          <div class="anx-firma-card">
            <div class="anx-firma-head">Testigo 1</div>
            <div class="anx-firma-body">
              <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
              <textarea name="ax_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
            </div>
            <div class="anx-firma-foot">Nombre y vinculo/parentesco</div>
          </div>
          <div class="anx-firma-card">
            <div class="anx-firma-head">Testigo 2</div>
            <div class="anx-firma-body">
              <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
              <textarea name="ax_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
            </div>
            <div class="anx-firma-foot">Nombre y documento de identidad</div>
          </div>
        </div>
        <div class="anx-firma-card anx-firma-card-medico">
          <div class="anx-firma-head">Medico Tratante</div>
          <div class="anx-firma-body">
            <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
          </div>
          <div class="anx-firma-foot">Nombre completo | Registro Medico | Especialidad</div>
        </div>
      </div>

    </div>
  `;
}

function buildBariatricConsentTemplate() {
  return `
      <div class="anx-block-title">4. INFORMACION DEL PROCEDIMIENTO</div>
      <p class="anx-p">
        La cirugia bariatrica es una intervencion quirurgica del aparato digestivo indicada para el tratamiento de la obesidad severa (indice de masa corporal >= 40 kg/m2, o >= 35 kg/m2 con enfermedades asociadas como diabetes, hipertension, apnea del sueno). Actua reduciendo la capacidad del estomago y/o modificando la absorcion de nutrientes.
      </p>
      <p class="anx-p"><strong>El procedimiento a realizarse es:</strong></p>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_proc_manga"> Manga gastrica (gastrectomia en manga): extirpacion del 75-80% del estomago, dejando un tubo de pequeno volumen.</label>
      </div>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_proc_bypass"> Bypass gastrico en Y de Roux: creacion de un pequeno reservorio gastrico conectado directamente al intestino delgado.</label>
      </div>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_proc_biliopancreatica"> Derivacion biliopancreatica con interrupcion duodenal: tecnica mixta de restriccion y malabsorcion.</label>
      </div>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_proc_otra"> Otra tecnica:</label>
        <input name="bi_proc_otra_detalle" class="ax-full-line" placeholder="Describa otra tecnica, si aplica">
      </div>
      <p class="anx-p">
        La cirugia se realiza principalmente por via laparoscopica (pequenas incisiones). En caso necesario puede convertirse a cirugia abierta.
      </p>

      <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
      <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
      <table class="anx-table">
        <thead>
          <tr>
            <th>COMPLICACION / RIESGO</th>
            <th>FRECUENCIA</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Fistula o escape de la linea de grapas (complicacion grave que puede requerir reoperacion)</td><td>1-3%</td></tr>
          <tr><td>Hemorragia intraabdominal o de la linea de grapas</td><td>1-4%</td></tr>
          <tr><td>Trombosis venosa profunda o embolia pulmonar</td><td>0.3-2%</td></tr>
          <tr><td>Estenosis o estrechez de la manga / anastomosis (dificultad para comer)</td><td>3-5%</td></tr>
          <tr><td>Reflujo gastroesofagico cronico (especialmente en manga gastrica)</td><td>10-30%</td></tr>
          <tr><td>Nauseas y vomitos prolongados en el postoperatorio</td><td>Frecuente, transitorio</td></tr>
          <tr><td>Infeccion de la herida o del espacio intraabdominal</td><td>1-3%</td></tr>
          <tr><td>Hernia en sitio de trocar</td><td>0.5-1%</td></tr>
          <tr><td>Deficiencias nutricionales: hierro, vitamina B12, vitamina D, calcio, proteinas</td><td>Frecuente a largo plazo</td></tr>
          <tr><td>Sindrome de dumping (mareos, sudoracion, diarrea tras comer)</td><td>Frecuente - bypass gastrico</td></tr>
          <tr><td>Calculos biliares (litiasis biliar postoperatoria)</td><td>30%</td></tr>
          <tr><td>Necesidad de reoperacion o revision de la cirugia</td><td>2-5%</td></tr>
          <tr><td>Complicaciones respiratorias / neumonia postoperatoria</td><td>1-2%</td></tr>
          <tr><td>Riesgos propios de la anestesia general (ver consentimiento de anestesia)</td><td>Ver consentimiento de anestesia</td></tr>
          <tr><td>Muerte</td><td>0.1-0.3%</td></tr>
        </tbody>
      </table>

      <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
      <p class="anx-p">En mi caso particular, el medico me ha explicado los siguientes riesgos adicionales segun mis condiciones de salud individuales:</p>
      <div class="anx-row">
        <textarea name="bi_riesgos_adicionales" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>

      <div class="anx-block-title">7. ALTERNATIVAS DE TRATAMIENTO</div>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_alt_conservador"> Manejo conservador: dieta, actividad fisica y cambio de habitos supervisados</label>
      </div>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_alt_farmacologico"> Tratamiento farmacologico para la obesidad (con resultados limitados)</label>
      </div>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_alt_endoscopico"> Procedimientos endoscopicos (balon intragastrico, gastroplastia endoscopica)</label>
      </div>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_alt_otra_tecnica"> Otra tecnica quirurgica bariatrica:</label>
        <input name="bi_alt_otra_tecnica_detalle" class="ax-full-line" placeholder="Describa la tecnica, si aplica">
      </div>
      <div class="anx-row anx-row--compact">
        <label class="anx-inline-check"><input type="checkbox" name="bi_alt_no_realizar"> No realizar el procedimiento (con documentacion de riesgos de la obesidad)</label>
      </div>

      <div class="anx-block-title">8. RECUPERACION Y MANEJO DEL DOLOR</div>
      <p class="anx-p">
        Despues de la cirugia pasare por una fase de recuperacion progresiva con dieta liquida y semiblanda.
        El dolor sera manejado con analgesicos. Se me informara sobre el programa de seguimiento nutricional y medico
        a largo plazo, incluyendo suplementos vitaminicos de por vida.
      </p>

      <div class="anx-block-title">9. DECLARACION DE ENTENDIMIENTO Y ACEPTACION</div>
      <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leido el presente documento - o me ha sido leido en caso de no poder hacerlo por mi mismo(a) - y he entendido la informacion que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el medico tratante.</label>
      <label class="anx-decl-item"><input type="checkbox" name="declara_revocar"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realizacion del procedimiento, sin que ello implique perjuicio alguno para mi atencion medica.</label>
      <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realizacion del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolucion 13437 de 1991 y los estandares de acreditacion internacional en salud vigentes.</label>
      <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realizacion del procedimiento descrito en este consentimiento.</label>

      <div class="anx-block-title" id="biSection10Title">10. FIRMAS DE CONSENTIMIENTO</div>
      <div id="biDissentFields" style="display:none;">
        <div class="anx-row">
          <div class="anx-label">Yo, (nombre y documento):</div>
          <input name="bi_disent_nombre_doc" class="ax-full-line">
        </div>
        <div class="anx-row">
          <div class="anx-label">en calidad de:</div>
          <input name="bi_disent_calidad" class="ax-full-line">
        </div>
        <div class="anx-row anx-inline-checks">
          <div class="anx-label">Declaro que:</div>
          <label><input type="checkbox" name="bi_disent_rechaza"> Rechazo el procedimiento</label>
        </div>
        <div class="anx-row anx-row--field-top">
          <div class="anx-label">Motivo:</div>
          <textarea name="bi_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
        </div>
        <div class="anx-row">
          <div class="anx-label">Fecha y hora:</div>
          <input type="datetime-local" name="bi_disent_fecha_hora" class="ax-full-line">
        </div>
      </div>
      <div class="anx-firmas-box">
        <div class="anx-firmas-top">
          <div class="anx-firma-card">
            <div class="anx-firma-head">Paciente / Rep. Legal</div>
            <div class="anx-firma-body">
              <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
              <textarea name="bi_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Se completa automaticamente segun la identificacion del otorgante."></textarea>
            </div>
            <div class="anx-firma-foot">Nombre y documento de identidad</div>
          </div>
          <div class="anx-firma-card">
            <div class="anx-firma-head">Testigo 1</div>
            <div class="anx-firma-body">
              <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
              <textarea name="bi_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
            </div>
            <div class="anx-firma-foot">Nombre y vinculo/parentesco</div>
          </div>
          <div class="anx-firma-card">
            <div class="anx-firma-head">Testigo 2</div>
            <div class="anx-firma-body">
              <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
              <textarea name="bi_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
            </div>
            <div class="anx-firma-foot">Nombre y documento de identidad</div>
          </div>
        </div>
        <div class="anx-firma-card anx-firma-card-medico">
          <div class="anx-firma-head">Medico Tratante</div>
          <div class="anx-firma-body">
            <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
          </div>
          <div class="anx-firma-foot">Nombre completo | Registro Medico | Especialidad</div>
        </div>
      </div>
  `;
}

function buildCommonConsentIntroTemplate(consent, patient, readOnly) {
  const p = patient || {};
  const ro = readOnly ? 'readonly' : '';
  const dis = readOnly ? 'disabled' : '';
  const docVal = `${p.tipoDoc || 'CC'} ${p.cedula || ''}`.trim();
  const nombreVal = String(p.nombre || '');
  const consentTitle = String(consent?.titulo || 'CONSENTIMIENTO INFORMADO').toUpperCase();

  const anxSubtitle = consent?.subtituloDoc
    ? `${consent.subtituloDoc} — Clinica Medihelp Services`
    : 'Clinica Medihelp Services';

  return `
      <h2 class="anx-title">${consentTitle}</h2>
      <p class="anx-subtitle">${anxSubtitle}</p>

      <div class="anx-block-title">1. LUGAR Y FECHA</div>
      <div class="anx-row anx-row-fecha">
        <div class="anx-label">Ciudad:</div><input name="ci_ciudad" value="Cartagena de Indias - Bolivar" ${ro}>
        <div class="anx-label">Fecha y hora:</div><input type="datetime-local" name="ci_fecha_hora" class="ax-mini" ${ro}>
      </div>

      <div class="anx-block-title">2. IDENTIFICACION DE QUIEN OTORGA EL CONSENTIMIENTO</div>
      <div class="anx-row anx-row-ident">
        <div class="anx-label">Yo:</div><input name="ci_nombre_otorga" value="${nombreVal}" ${ro}>
        <div class="anx-label">Identificado(a) con:</div><input name="ci_doc_otorga" value="${docVal}" ${ro}>
      </div>
      <div class="anx-row anx-row-representante">
        <div class="anx-label">Actuo en nombre de:</div>
        <div class="anx-checkgroup">
          <label><input type="checkbox" name="ci_mi_mismo" ${dis}> Mi mismo(a)</label>
          <label><input type="checkbox" name="ci_paciente" ${dis}> Del/La paciente</label>
        </div>
        <div class="anx-inline-pair">
          <div class="anx-label">Paciente:</div><input name="ci_paciente_nombre" ${ro}>
        </div>
        <div class="anx-inline-pair">
          <div class="anx-label">Identificado(a) paciente:</div><input name="ci_paciente_doc" ${ro}>
        </div>
      </div>
      <div class="anx-row">
        <div class="anx-label">Calidad / representacion:</div>
        <div class="anx-checkgroup anx-checkgroup-wide">
          <label><input type="checkbox" name="ci_padre" ${dis}> Padre/Madre</label>
          <label><input type="checkbox" name="ci_tutor" ${dis}> Tutor legal</label>
          <label><input type="checkbox" name="ci_apoderado" ${dis}> Apoderado(a)</label>
          <label><input type="checkbox" name="ci_conyuge" ${dis}> Conyuge</label>
          <label><input type="checkbox" name="ci_familiar" ${dis}> Familiar primer grado</label>
        </div>
      </div>

      <div class="anx-block-title">3. INFORMACION MEDICA RECIBIDA</div>
      <div class="anx-row"><div class="anx-label">Doctor(a) tratante:</div><input name="medico" ${ro}></div>
      <div class="anx-row"><div class="anx-label">Enfermedad / diagnostico:</div><input name="diagnostico" ${ro}></div>
      <div class="anx-row"><div class="anx-label">Procedimiento a realizar:</div><input name="servicio" ${ro}></div>
  `;
}

function getCommonRepresentacionLabel() {
  const map = [
    ['ci_padre', 'Padre/Madre'],
    ['ci_tutor', 'Tutor legal'],
    ['ci_apoderado', 'Apoderado(a)'],
    ['ci_conyuge', 'Conyuge'],
    ['ci_familiar', 'Familiar primer grado']
  ];
  for (const [name, label] of map) {
    const el = document.querySelector(`input[name="${name}"]`);
    if (el?.checked) return label;
  }
  return '';
}

function syncCommonDerivedSignatureFields(patient) {
  const reusableSignatureSelectors = Object.values(COMMON_TEMPLATE_REUSE_CONFIG)
    .map((cfg) => cfg.signatureNameField)
    .filter(Boolean)
    .map((name) => `[name="${name}"]`);
  reusableSignatureSelectors.push('[name="ci_firma_paciente_nombre"]');
  const fields = Array.from(document.querySelectorAll(reusableSignatureSelectors.join(', ')));
  if (!fields.length) return;

  const miMismo = document.querySelector('input[name="ci_mi_mismo"]');
  const porPaciente = document.querySelector('input[name="ci_paciente"]');
  const yoNombre = document.querySelector('input[name="ci_nombre_otorga"]');
  const yoDoc = document.querySelector('input[name="ci_doc_otorga"]');
  const p = patient || (typeof _viewerPatient !== 'undefined' ? _viewerPatient : {}) || {};
  if (!miMismo || !porPaciente) return;

  const joinNombreDoc = (n, d) => [n, d].filter((x) => String(x || '').trim()).join(' — ');
  let line = '';

  if (miMismo.checked) {
    const n = yoNombre?.value?.trim() || p.nombre || '';
    const d = yoDoc?.value?.trim() || `${p.tipoDoc || 'CC'} ${p.cedula || ''}`.trim();
    const base = joinNombreDoc(n, d);
    line = base ? `${base}\nen calidad de Paciente` : '';
  } else if (porPaciente.checked) {
    const n = yoNombre?.value?.trim() || '';
    const d = yoDoc?.value?.trim() || '';
    const base = joinNombreDoc(n, d);
    const cal = getCommonRepresentacionLabel();
    line = cal && base ? `${base}\nen calidad de ${cal}` : base;
  }

  fields.forEach((el) => {
    el.value = line;
    el.classList.toggle('filled', !!line.trim());
  });

  const lineNameDoc = line.replace('\nen calidad de Paciente', '').replace(/\nen calidad de .+$/, '');
  const miMismoRole = document.querySelector('input[name="ci_mi_mismo"]');
  const roleText = miMismoRole?.checked ? 'Paciente' : (getCommonRepresentacionLabel() || '');
  Object.values(COMMON_TEMPLATE_REUSE_CONFIG).forEach((cfg) => {
    const dissentNombreDoc = cfg.dissentNameField ? document.querySelector(`[name="${cfg.dissentNameField}"]`) : null;
    const dissentCalidad = cfg.dissentRoleField ? document.querySelector(`[name="${cfg.dissentRoleField}"]`) : null;
    if (dissentNombreDoc) dissentNombreDoc.value = lineNameDoc;
    if (dissentCalidad) dissentCalidad.value = roleText;
  });
}

function initCommonIntroCheckboxRules(patient, readOnly) {
  const cbSelf = document.querySelector('input[name="ci_mi_mismo"]');
  const cbRep = document.querySelector('input[name="ci_paciente"]');
  if (!cbSelf || !cbRep) return;

  const p = patient || (typeof _viewerPatient !== 'undefined' ? _viewerPatient : {}) || {};
  const patientName = p.nombre || '';
  const patientDoc = `${p.tipoDoc || 'CC'} ${p.cedula || ''}`.trim();
  const yoNombre = document.querySelector('input[name="ci_nombre_otorga"]');
  const yoDoc = document.querySelector('input[name="ci_doc_otorga"]');
  const repPaciente = document.querySelector('input[name="ci_paciente_nombre"]');
  const repPacienteDoc = document.querySelector('input[name="ci_paciente_doc"]');
  const repQualityChecks = Array.from(document.querySelectorAll(
    'input[name="ci_padre"], input[name="ci_tutor"], input[name="ci_apoderado"], input[name="ci_conyuge"], input[name="ci_familiar"]'
  ));

  const syncRepAvailability = (allowRep) => {
    repQualityChecks.forEach((el) => {
      if (!allowRep) el.checked = false;
      el.disabled = readOnly || !allowRep;
      const label = el.closest('label');
      if (label) label.classList.toggle('is-locked-field', readOnly || !allowRep);
    });
  };

  const applyMode = () => {
    if (cbRep.checked) {
      // Representante: intercambiar valores hacia los campos "Paciente" solo si están vacíos.
      const movedName = yoNombre?.value?.trim() || '';
      const movedDoc = yoDoc?.value?.trim() || '';
      if (repPaciente && movedName && !repPaciente.value.trim()) repPaciente.value = movedName;
      if (repPacienteDoc && movedDoc && !repPacienteDoc.value.trim()) repPacienteDoc.value = movedDoc;

      if (yoNombre) {
        yoNombre.value = '';
        yoNombre.readOnly = !!readOnly;
        yoNombre.classList.remove('filled');
      }
      if (yoDoc) {
        yoDoc.value = '';
        yoDoc.readOnly = !!readOnly;
        yoDoc.classList.remove('filled');
      }
      if (repPaciente) repPaciente.readOnly = true;
      if (repPacienteDoc) repPacienteDoc.readOnly = true;
      syncRepAvailability(true);
      syncCommonDerivedSignatureFields(p);
      return;
    }

    // Mi mismo(a): usar datos del paciente en "Yo" y limpiar datos de representante.
    if (yoNombre) {
      yoNombre.value = patientName;
      yoNombre.readOnly = true;
      yoNombre.classList.add('filled');
    }
    if (yoDoc) {
      yoDoc.value = patientDoc;
      yoDoc.readOnly = true;
      yoDoc.classList.add('filled');
    }
    if (repPaciente) {
      repPaciente.value = '';
      repPaciente.readOnly = true;
    }
    if (repPacienteDoc) {
      repPacienteDoc.value = '';
      repPacienteDoc.readOnly = true;
    }
    syncRepAvailability(false);
    syncCommonDerivedSignatureFields(p);
  };

  const handleSelfChange = () => {
    if (cbSelf.checked) cbRep.checked = false;
    if (!cbSelf.checked && !cbRep.checked) cbSelf.checked = true;
    applyMode();
  };

  const handleRepChange = () => {
    if (cbRep.checked) cbSelf.checked = false;
    if (!cbRep.checked && !cbSelf.checked) cbRep.checked = true;
    applyMode();
  };

  cbSelf.addEventListener('change', handleSelfChange);
  cbRep.addEventListener('change', handleRepChange);

  repQualityChecks.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      if (!checkbox.checked) return;
      repQualityChecks.forEach((other) => {
        if (other !== checkbox) other.checked = false;
      });
      syncCommonDerivedSignatureFields(p);
    });
  });

  [yoNombre, yoDoc].forEach((el) => {
    if (!el) return;
    el.addEventListener('input', () => syncCommonDerivedSignatureFields(p));
    el.addEventListener('change', () => syncCommonDerivedSignatureFields(p));
  });

  if (readOnly) {
    cbSelf.disabled = true;
    cbRep.disabled = true;
    cbSelf.readOnly = true;
    cbRep.readOnly = true;
  }

  if (!cbSelf.checked && !cbRep.checked) cbSelf.checked = true;
  applyMode();
  syncCommonDerivedSignatureFields(p);
}

async function resolveConsentContent(consent, fallbackHtml) {
  if (!consent) {
    return fallbackHtml || '<p><em>Contenido no disponible</em></p>';
  }
  if (consent.id === 1) {
    return buildAnesthesiaConsentTemplate(_viewerPatient || {}, new Date().toISOString().slice(0, 10));
  }
  const html = consent.id === 2
    ? buildBariatricConsentTemplate()
    : (fallbackHtml && String(fallbackHtml).trim()
      ? fallbackHtml
      : '<p><em>Contenido no disponible</em></p>');
  const intro = buildCommonConsentIntroTemplate(consent, _viewerPatient || {}, !!_viewerReadOnly);
  return `<div class="anx-doc">${intro}${html}</div>`;
}

function initDoctorSignaturePad() {
  const canvas = document.getElementById('doctorSignatureCanvas');
  if (!canvas) return;
  const container = canvas.closest('.signature-canvas-wrapper');
  const maxW = container ? container.clientWidth - 16 : 800;
  canvas.width = maxW;
  canvas.height = Math.round(maxW * 0.62);

  doctorSignaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0, 0, 0)',
    minWidth: 1,
    maxWidth: 2.5
  });

  const wrapper = canvas.closest('.signature-canvas-wrapper');
  doctorSignaturePad.addEventListener('beginStroke', () => wrapper.classList.add('signing'));
  doctorSignaturePad.addEventListener('endStroke', () => {
    wrapper.classList.remove('signing');
    syncDoctorSignatureToTemplate(doctorSignaturePad.toDataURL('image/png'));
  });

  document.getElementById('clearDoctorSignature')?.addEventListener('click', () => {
    doctorSignaturePad.clear();
    syncDoctorSignatureToTemplate('');
    showToast('Firma borrada');
  });
}

function initViewer() {
  const params = new URLSearchParams(window.location.search);
  const consentId = params.get('id');
  const cedula = params.get('cedula');
  _viewerRole = params.get('role') || 'patient';

  const fallbackPage = _viewerRole === 'doctor' ? 'doctor.html' : 'paciente.html';
  if (!consentId || !cedula) { window.location.assign(fallbackPage); return; }

  const consent = getConsentById(consentId);
  if (!consent) { window.location.assign(fallbackPage); return; }

  document.getElementById('btnBack').addEventListener('click', () => window.location.assign(fallbackPage));
  document.getElementById('btnBackFromSigned')?.addEventListener('click', () => window.location.assign(fallbackPage));

  // Update header "Volver" link to match role
  const headerBackLink = document.querySelector('.header-right .btn-header');
  if (headerBackLink) headerBackLink.href = fallbackPage;

  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    langBtn.addEventListener('click', toggleLanguage);
  }

  document.getElementById('docTitle').textContent = consent.titulo;
  document.getElementById('docBadge').className = `doc-badge card-type ${consent.tipo}`;
  document.getElementById('docBadge').textContent = consent.tipo.toUpperCase();

  api('GET', `/api/patients/${cedula}`)
    .then(patient => {
      const pc = patient.consentimientos?.[consentId];
      if (!pc || !pc.asignado) { window.location.assign(fallbackPage); return; }

      if (_viewerRole === 'doctor') {
        loadDoctorForm(consent, patient, pc);
      } else if (pc.revocacion && !pc.firmado) {
        loadRevocationForm(consent, patient, pc);
      } else {
        if (pc.firmado) {
          showSignedState(patient, pc);
          loadForm(consent, patient, true);
        } else {
          loadForm(consent, patient, false);
        }
      }
    })
    .catch(() => { window.location.assign(fallbackPage); });
}

function showSignedState(patient, pc) {
  document.getElementById('signedBanner').style.display = 'flex';
  document.getElementById('signedDate').textContent = 'Firmado el ' + new Date(pc.fechaFirma).toLocaleString('es-CO');
  if (pc.archivoFirmado) {
    const btn = document.getElementById('btnViewSigned');
    btn.href = `/firmados/${patient.cedula}/${encodeURIComponent(pc.archivoFirmado)}`;
    btn.style.display = 'inline-flex';
  }
}

// =============================================================================
// MODO DOCTOR — Solo campos inline del contenido del consentimiento
// =============================================================================
async function loadDoctorForm(consent, patient, pc) {
  _viewerConsent = consent;
  _viewerPatient = patient;
  _viewerReadOnly = false;

  const lang = currentLanguage;
  const s = (typeof UI_STRINGS !== 'undefined') ? UI_STRINGS[lang] : {};
  const container = document.getElementById('formContainer');

  const formDef = lang === 'en'
    ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[getConsentFormId(consent)] || FORMULARIOS?.[getConsentFormId(consent)]) : FORMULARIOS?.[getConsentFormId(consent)])
    : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[getConsentFormId(consent)] : null);
  const formTitle = formDef?.titulo || consent.titulo;
  const fallbackContent = formDef?.contenido || '<p><em>Contenido no disponible</em></p>';
  const formContent = await resolveConsentContent(consent, fallbackContent);

  document.getElementById('docTitle').textContent = formTitle;

  container.innerHTML = `
    <form id="consentForm" class="consent-form" autocomplete="off">

      <div class="form-section form-header-section">
        <h2 class="form-title">${formTitle}</h2>
        <p class="form-subtitle">Diligenciamiento médico — ${s.formSubtitle || 'Clínica Medihelp Services'}</p>
      </div>

      <div class="form-section doctor-info-banner">
        <div class="doctor-info-row">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <div>
            <strong>${patient.nombre}</strong>
            <span>${patient.tipoDoc || 'C.C.'} ${patient.cedula}</span>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          ${s.consentContent || 'Contenido del Consentimiento'}
        </h3>
        <div class="document-content-box">
          ${formContent}
        </div>
      </div>

      <div class="form-section form-signature-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Firma del Médico
        </h3>
        <div class="signature-form-area">
          <div class="signature-canvas-container">
            <label>Dibuje su firma en el recuadro</label>
            <div class="signature-canvas-wrapper">
              <canvas id="doctorSignatureCanvas"></canvas>
            </div>
            <div class="signature-actions">
              <button class="btn btn-outline btn-sm" id="clearDoctorSignature" type="button">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                Borrar firma
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-section form-doctor-actions-section">
        <div class="form-submit-area">
          <button class="btn btn-outline btn-lg" type="button" onclick="window.location.assign('doctor.html')">Cancelar</button>
          <button class="btn btn-primary btn-lg" type="button" id="btnSavePrefill">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Guardar datos médicos
          </button>
        </div>
      </div>

    </form>
  `;

  const loadingEl = document.getElementById('formLoading');
  if (loadingEl) loadingEl.style.display = 'none';

  // Pre-rellenar con datosMedico existentes
  if (pc.datosMedico && typeof pc.datosMedico === 'object') {
    Object.entries(pc.datosMedico).forEach(([name, value]) => {
      if (name.startsWith('_')) return;
      if (!isAnesthesiaMedicoPrefillKey(consent.id, name)) return;
      const el = document.querySelector(`[name="${name}"]`);
      if (!el) return;
      const t = (el.type || '').toLowerCase();
      if (t === 'checkbox' || t === 'radio') {
        applyPrefillValue(el, value);
      } else if (value !== undefined && value !== null && String(value).trim() !== '') {
        applyPrefillValue(el, value);
      }
    });
  }

  // Inicializar canvas de firma del médico
  initDoctorSignaturePad();

  // Restaurar firma del médico si ya existe
  if (pc.datosMedico?._firmaMedico) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById('doctorSignatureCanvas');
      if (canvas && doctorSignaturePad) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        doctorSignaturePad._data = [{}];
      }
    };
    img.src = pc.datosMedico._firmaMedico;
    syncDoctorSignatureToTemplate(pc.datosMedico._firmaMedico);
  }

  // Seccion 2 (identificacion y representacion) solo editable por paciente
  lockPatientOwnedSectionForDoctor(consent);
  lockCommonPatientOwnedSectionForDoctor(consent);
  lockCityForAllUsers();
  initCommonIntroCheckboxRules(patient, false);
  syncCommonDerivedSignatureFields(patient);

  initFormDraftPersistence(consent, patient, 'doctor', false, 'consent');

  // Botón guardar
  document.getElementById('btnSavePrefill')?.addEventListener('click', () => saveDoctorPrefill(consent, patient));
}

/**
 * Validación previa a guardar prefill médico — anestesia (consent id 1).
 * Devuelve { msg, el } si falta algo; si todo ok, null.
 */
function validateAnesthesiaDoctorPrefill(form) {
  const q = (name) => form.querySelector(`[name="${name}"]`);
  const trimVal = (name) => {
    const el = q(name);
    return el ? String(el.value || '').trim() : '';
  };

  const reqText = (name, label) => {
    const el = q(name);
    if (!trimVal(name)) return { el, msg: `${label} es obligatorio para guardar.` };
    return null;
  };

  let err = reqText('medico', 'Doctor(a) tratante');
  if (err) return err;
  err = reqText('diagnostico', 'Enfermedad / diagnóstico');
  if (err) return err;
  err = reqText('servicio', 'Procedimiento a realizar');
  if (err) return err;

  const g = q('ax_tipo_general')?.checked;
  const r = q('ax_tipo_regional')?.checked;
  const s = q('ax_tipo_sedacion')?.checked;
  if (!g && !r && !s) {
    const el = q('ax_tipo_general');
    return {
      el,
      msg: 'Seleccione al menos un tipo de anestesia (general, regional o sedación / anestesia monitoreada).'
    };
  }

  err = reqText('ax_tipo_anestesia', 'Tipo de anestesia indicado para este caso');
  if (err) return err;
  err = reqText('ax_riesgos_adicionales', 'Riesgos adicionales de su caso particular');
  if (err) return err;

  return null;
}

/**
 * Campos médicos comunes (§3) en plantillas con intro ci_*.
 * Devuelve { msg, el } si falta algo; si todo ok, null.
 */
function validateCiTemplateSharedDoctorFields(form) {
  const q = (name) => form.querySelector(`[name="${name}"]`);
  const trimVal = (name) => {
    const el = q(name);
    return el ? String(el.value || '').trim() : '';
  };
  const reqText = (name, label) => {
    const el = q(name);
    if (!trimVal(name)) return { el, msg: `${label} es obligatorio para guardar.` };
    return null;
  };
  let err = reqText('medico', 'Doctor(a) tratante');
  if (err) return err;
  err = reqText('diagnostico', 'Enfermedad / diagnóstico');
  if (err) return err;
  err = reqText('servicio', 'Procedimiento a realizar');
  if (err) return err;
  return null;
}

/**
 * Validación previa a guardar prefill médico — cardiovascular (formId 2).
 */
function validateCardiovascularDoctorPrefill(form) {
  const err = validateCiTemplateSharedDoctorFields(form);
  if (err) return err;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  const trimVal = (name) => {
    const el = q(name);
    return el ? String(el.value || '').trim() : '';
  };
  const reqText = (name, label) => {
    const el = q(name);
    if (!trimVal(name)) return { el, msg: `${label} es obligatorio para guardar.` };
    return null;
  };
  let e = reqText('cv_procedimiento_especifico', 'Procedimiento específico indicado para este paciente');
  if (e) return e;
  e = reqText('cv_riesgos_adicionales', 'Riesgos adicionales del caso');
  if (e) return e;
  return null;
}

function validateCircumcisionDoctorPrefill(form) {
  const err = validateCiTemplateSharedDoctorFields(form);
  if (err) return err;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  if (!String(q('ci4_riesgos_adicionales')?.value || '').trim()) {
    return { el: q('ci4_riesgos_adicionales'), msg: 'Riesgos adicionales del caso es obligatorio para guardar.' };
  }
  return null;
}

function validateCholecystectomyDoctorPrefill(form) {
  const err = validateCiTemplateSharedDoctorFields(form);
  if (err) return err;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  if (!String(q('ci5_riesgos_adicionales')?.value || '').trim()) {
    return { el: q('ci5_riesgos_adicionales'), msg: 'Riesgos adicionales del caso es obligatorio para guardar.' };
  }
  return null;
}

function validateColonoscopyDoctorPrefill(form) {
  const err = validateCiTemplateSharedDoctorFields(form);
  if (err) return err;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  if (!String(q('ci6_riesgos_adicionales')?.value || '').trim()) {
    return { el: q('ci6_riesgos_adicionales'), msg: 'Riesgos adicionales del caso es obligatorio para guardar.' };
  }
  return null;
}

function validateUpperGiEndoscopyDoctorPrefill(form) {
  const err = validateCiTemplateSharedDoctorFields(form);
  if (err) return err;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  if (!String(q('ci7_riesgos_adicionales')?.value || '').trim()) {
    return { el: q('ci7_riesgos_adicionales'), msg: 'Riesgos adicionales del caso es obligatorio para guardar.' };
  }
  return null;
}

function validateCataractDoctorPrefill(form) {
  const err = validateCiTemplateSharedDoctorFields(form);
  if (err) return err;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  if (!String(q('ci8_riesgos_adicionales')?.value || '').trim()) {
    return { el: q('ci8_riesgos_adicionales'), msg: 'Riesgos adicionales del caso es obligatorio para guardar.' };
  }
  return null;
}

function validateUmbilicalHerniorrhaphyDoctorPrefill(form) {
  const err = validateCiTemplateSharedDoctorFields(form);
  if (err) return err;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  if (!String(q('ci9_riesgos_adicionales')?.value || '').trim()) {
    return { el: q('ci9_riesgos_adicionales'), msg: 'Riesgos adicionales del caso es obligatorio para guardar.' };
  }
  return null;
}

function validateLithotripsyDoctorPrefill(form) {
  const err = validateCiTemplateSharedDoctorFields(form);
  if (err) return err;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  if (!String(q('ci10_riesgos_adicionales')?.value || '').trim()) {
    return { el: q('ci10_riesgos_adicionales'), msg: 'Riesgos adicionales del caso es obligatorio para guardar.' };
  }
  return null;
}

async function saveDoctorPrefill(consent, patient) {
  const form = document.getElementById('consentForm');

  if (Number(consent.id) === 1 && form) {
    const inv = validateAnesthesiaDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }
  const fid = Number(getConsentFormId(consent));
  if (fid === 2 && form) {
    const inv = validateCardiovascularDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }
  if (fid === 4 && form) {
    const inv = validateCircumcisionDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }
  if (fid === 5 && form) {
    const inv = validateCholecystectomyDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }
  if (fid === 6 && form) {
    const inv = validateColonoscopyDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }
  if (fid === 7 && form) {
    const inv = validateUpperGiEndoscopyDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }
  if (fid === 8 && form) {
    const inv = validateCataractDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }
  if (fid === 9 && form) {
    const inv = validateUmbilicalHerniorrhaphyDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }
  if (fid === 11 && form) {
    const inv = validateLithotripsyDoctorPrefill(form);
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') inv.el.focus();
      }
      return;
    }
  }

  // Validar firma del médico
  if (!doctorSignaturePad || doctorSignaturePad.isEmpty()) {
    showToast('Debe firmar antes de guardar los datos médicos', 'error');
    document.getElementById('doctorSignatureCanvas')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const btn = document.getElementById('btnSavePrefill');
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;"></div> Guardando...';

  try {
    const form = document.getElementById('consentForm');
    const campos = {};

    // Recoger todos los campos inline del contenido del consentimiento (checkbox/radio: estado .checked)
    form.querySelectorAll('.document-content-box input, .document-content-box textarea, .document-content-box select').forEach(el => {
      if (!el.name || el.name.startsWith('_')) return;
      if (!isAnesthesiaMedicoPrefillKey(consent.id, el.name)) return;
      const t = (el.type || '').toLowerCase();
      if (t === 'checkbox') {
        campos[el.name] = el.checked ? ((el.value && String(el.value).trim()) || 'on') : '';
      } else if (t === 'radio') {
        if (el.checked) campos[el.name] = (el.value && String(el.value).trim()) || 'on';
      } else {
        const v = el.value != null ? String(el.value).trim() : '';
        if (v) campos[el.name] = v;
      }
    });

    // Guardar firma del médico y fecha/hora
    campos._firmaMedico = doctorSignaturePad.toDataURL('image/png');
    campos._fechaFirmaMedico = new Date().toISOString();

    await api('POST', `/api/patients/${patient.cedula}/prefill`, {
      consentId: consent.id,
      campos
    });

    clearCurrentFormDraft('consent');
    showToast('Datos médicos guardados correctamente');
    setTimeout(() => { window.location.assign('doctor.html'); }, 1500);
  } catch (err) {
    if (err.status === 401 || err.code === 'AUTH_REQUIRED') {
      showToast('Sesión expirada. Redirigiendo al inicio de sesión...', 'error');
      setTimeout(() => { window.location.assign('doctor-login.html'); }, 900);
      return;
    }
    showToast('Error al guardar: ' + (err.message || err), 'error');
    btn.disabled = false;
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Guardar datos médicos';
  }
}

// =============================================================================
// MODO PACIENTE — Formulario completo con firma
// =============================================================================
async function loadForm(consent, patient, readOnly) {
  _viewerConsent = consent;
  _viewerPatient = patient;
  _viewerReadOnly = readOnly;

  const lang = currentLanguage;
  const s = (typeof UI_STRINGS !== 'undefined') ? UI_STRINGS[lang] : {};
  const container = document.getElementById('formContainer');

  const formDef = lang === 'en'
    ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[getConsentFormId(consent)] || FORMULARIOS?.[getConsentFormId(consent)]) : FORMULARIOS?.[getConsentFormId(consent)])
    : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[getConsentFormId(consent)] : null);
  const formTitle = formDef?.titulo || consent.titulo;
  const fallbackContent = formDef?.contenido || '<p><em>Contenido no disponible / Content not available.</em></p>';
  const formContent = await resolveConsentContent(consent, fallbackContent);
  const ro = readOnly ? 'readonly' : '';
  const dis = readOnly ? 'disabled' : '';
  const hideStandardSections = true;

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  document.getElementById('docTitle').textContent = formTitle;

  container.innerHTML = `
    <form id="consentForm" class="consent-form" autocomplete="off">

      <div class="form-section form-header-section">
        <h2 class="form-title">${formTitle}</h2>
        <p class="form-subtitle">${s.formSubtitle || 'Clínica Medihelp Services — Formulario digital'}</p>
      </div>

      ${hideStandardSections ? '' : `<div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          ${s.patientData || 'Datos del Paciente'}
        </h3>
        <div class="form-grid">
          <div class="form-field"><label>${s.fullName || 'Nombre completo'}</label><input type="text" name="paciente_nombre" value="${patient.nombre}" readonly class="filled"></div>
          <div class="form-field"><label>${s.idNumber || 'Número de cédula'}</label><input type="text" name="paciente_cedula" value="${patient.cedula}" readonly class="filled"></div>
          <div class="form-field"><label>${s.date || 'Fecha'}</label><input type="date" name="fecha" value="${dateStr}" ${ro}></div>
          <div class="form-field"><label>${s.age || 'Edad'}</label><input type="number" name="edad" placeholder="${s.years || 'Años'}" min="0" max="120" ${ro}></div>
          <div class="form-field"><label>${s.gender || 'Género'}</label><select name="genero" ${dis}><option value="">${s.selectGender || 'Seleccionar...'}</option><option value="Masculino">${s.male || 'Masculino'}</option><option value="Femenino">${s.female || 'Femenino'}</option><option value="Otro">${s.other || 'Otro'}</option></select></div>
          <div class="form-field"><label>${s.phone || 'Teléfono de contacto'}</label><input type="tel" name="telefono" placeholder="${s.phone || 'Teléfono'}" ${ro}></div>
        </div>
      </div>`}

      ${hideStandardSections ? '' : `<div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          ${s.medicalInfo || 'Información Médica'}
        </h3>
        <div class="form-grid">
          <div class="form-field full-width"><label>${s.diagnosis || 'Diagnóstico / Motivo de consulta'}</label><textarea name="diagnostico" rows="2" placeholder="${s.diagnosisPlaceholder || 'Describa el diagnóstico o motivo de consulta'}" ${ro}></textarea></div>
          <div class="form-field"><label>${s.doctor || 'Médico tratante'}</label><input type="text" name="medico" placeholder="${s.doctorPlaceholder || 'Nombre del médico'}" ${ro}></div>
          <div class="form-field"><label>${s.service || 'Servicio / Área'}</label><input type="text" name="servicio" placeholder="${s.servicePlaceholder || 'Ej: Cirugía, UCI, Consulta'}" ${ro}></div>
        </div>
      </div>`}

      <div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          ${s.consentContent || 'Contenido del Consentimiento'}
        </h3>
        <div class="document-content-box">
          ${formContent}
        </div>
      </div>

      <!-- FIRMA -->
      <div class="form-section form-signature-section" id="signatureSection" ${readOnly ? 'style="display:none;"' : ''}>
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          ${s.signature || 'Firma del Paciente'}
        </h3>
        <div class="signature-form-area">
          <div class="signature-canvas-container">
            <label>${s.drawSignature || 'Dibuje su firma en el recuadro'}</label>
            <div id="signatureStepIndicator" class="signature-step-indicator"></div>
            <div class="signature-canvas-wrapper">
              <canvas id="signatureCanvas"></canvas>
            </div>
            <div class="signature-actions">
              <button class="btn btn-outline btn-sm" id="clearSignature" type="button">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                ${s.clearSignature || 'Borrar firma'}
              </button>
            </div>
          </div>
        </div>
        <div class="form-submit-area">
          <button class="btn btn-outline btn-lg" type="button" onclick="window.location.assign('paciente.html')">${s.cancel || 'Cancelar'}</button>
          <button class="btn btn-success btn-lg" type="button" id="submitSignature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${s.signAndGenerate || 'Firmar y generar PDF'}
          </button>
        </div>
      </div>

    </form>
  `;

  const loadingEl = document.getElementById('formLoading');
  if (loadingEl) loadingEl.style.display = 'none';

  // Pre-rellenar y bloquear campos con datos del paciente desde la API
  if (patient.edad) {
    const edadField = document.querySelector('[name="edad"]');
    if (edadField) { edadField.value = patient.edad; edadField.readOnly = true; edadField.classList.add('filled'); }
  }
  if (patient.genero) {
    const generoField = document.querySelector('[name="genero"]');
    if (generoField) {
      const gen = patient.genero.toLowerCase();
      if (gen.includes('masc') || gen === 'm') generoField.value = 'Masculino';
      else if (gen.includes('fem') || gen === 'f') generoField.value = 'Femenino';
      else generoField.value = 'Otro';
      generoField.disabled = true;
      generoField.classList.add('filled');
    }
  }
  if (patient.telefono) {
    const telField = document.querySelector('[name="telefono"]');
    if (telField) { telField.value = patient.telefono; telField.readOnly = true; telField.classList.add('filled'); }
  }

  // Pre-rellenar y bloquear campos diligenciados por el médico (datosMedico)
  const consentId = consent.id;
  const pc = patient.consentimientos?.[consentId];
  if (pc?.datosMedico && typeof pc.datosMedico === 'object') {
    Object.entries(pc.datosMedico).forEach(([name, value]) => {
      if (name.startsWith('_')) return;
      if (!isAnesthesiaMedicoPrefillKey(consent.id, name)) return;
      const el = document.querySelector(`[name="${name}"]`);
      if (!el) return;
      const t = (el.type || '').toLowerCase();
      if (t === 'checkbox' || t === 'radio') {
        applyPrefillValue(el, value);
      } else {
        if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) return;
        applyPrefillValue(el, value);
      }
      if (el.tagName === 'SELECT') {
        el.disabled = true;
      } else {
        el.readOnly = true;
      }
      el.classList.add('filled');
    });
  }

  if (pc?.datosMedico?._firmaMedico) {
    syncDoctorSignatureToTemplate(pc.datosMedico._firmaMedico);
  }
  if (readOnly) {
    restoreSavedSignatures(pc);
  }

  // Borrador local ANTES de setupRepresentativeToggle: si applyMode() corre primero con "Mi mismo(a)"
  // por defecto en el HTML, vacía Paciente/representante y pisa el estado guardado al recargar.
  initFormDraftPersistence(consent, patient, 'patient', readOnly, window._isRevocation ? 'revocation' : 'consent');

  if (consent.id === 1) {
    lockDoctorOnlyFields(consent);
    setupRepresentativeToggle(patient, readOnly);
  }
  lockCommonDoctorOwnedFieldsForPatient(consent);
  lockCityForAllUsers();
  initCommonIntroCheckboxRules(patient, readOnly);
  syncCommonDerivedSignatureFields(patient);

  if (consent.id === 1) syncAnesthesiaDerivedIdentityFields(patient);
  initNoAuthorizationExclusivity();
  if (!readOnly) {
    persistCurrentFormDraft(consent, patient, 'patient', window._isRevocation ? 'revocation' : 'consent');
  }

  if (!readOnly) {
    initSignaturePad();
  }
}

function toggleLanguage() {
  const form = document.getElementById('consentForm');
  const savedValues = {};
  if (form) {
    form.querySelectorAll('input, textarea, select').forEach(el => {
      if (el.name) {
        if (el.type === 'checkbox') savedValues[el.name] = el.checked;
        else savedValues[el.name] = el.value;
      }
    });
  }
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  localStorage.setItem('ci_language', currentLanguage);
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
  if (_viewerConsent && _viewerPatient) {
    if (_viewerRole === 'doctor') {
      const params = new URLSearchParams(window.location.search);
      const consentId = params.get('id');
      const pc = _viewerPatient.consentimientos?.[consentId];
      loadDoctorForm(_viewerConsent, _viewerPatient, pc || {});
    } else {
      loadForm(_viewerConsent, _viewerPatient, _viewerReadOnly);
    }
    setTimeout(() => {
      const newForm = document.getElementById('consentForm');
      if (newForm) {
        Object.entries(savedValues).forEach(([name, value]) => {
          const el = newForm.querySelector(`[name="${name}"]`);
          if (el) {
            if (el.type === 'checkbox') el.checked = value;
            else el.value = value;
          }
        });
        const noAuthCb = newForm.querySelector('#chkNoAuth');
        if (noAuthCb) toggleNoAuthReason(noAuthCb);
      }
    }, 100);
  }
}

// =============================================================================
// MODO REVOCACIÓN — Formulario especial de revocación de consentimiento
// =============================================================================
function loadRevocationForm(consent, patient, pc) {
  _viewerConsent = consent;
  _viewerPatient = patient;
  _viewerReadOnly = false;

  const lang = currentLanguage;
  const s = (typeof UI_STRINGS !== 'undefined') ? UI_STRINGS[lang] : {};
  const container = document.getElementById('formContainer');

  const formDef = lang === 'en'
    ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[getConsentFormId(consent)] || FORMULARIOS?.[getConsentFormId(consent)]) : FORMULARIOS?.[getConsentFormId(consent)])
    : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[getConsentFormId(consent)] : null);
  const formTitle = formDef?.titulo || consent.titulo;

  const fechaFirmaOriginal = pc.fechaFirma ? new Date(pc.fechaFirma).toLocaleString('es-CO') : 'No registrada';
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  document.getElementById('docTitle').textContent = 'Revocación — ' + formTitle;

  container.innerHTML = `
    <form id="consentForm" class="consent-form" autocomplete="off">

      <div class="form-section revocation-header-section">
        <div class="revocation-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h2 class="form-title">REVOCACIÓN DE AUTORIZACIÓN</h2>
        <p class="form-subtitle">${formTitle}</p>
        <p class="form-subtitle">Clínica Medihelp Services</p>
      </div>

      <div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Datos del Paciente
        </h3>
        <div class="form-grid">
          <div class="form-field"><label>Nombre completo</label><input type="text" name="paciente_nombre" value="${patient.nombre}" readonly class="filled"></div>
          <div class="form-field"><label>Número de documento</label><input type="text" name="paciente_cedula" value="${(patient.tipoDoc || 'C.C.')} ${patient.cedula}" readonly class="filled"></div>
          <div class="form-field"><label>Fecha de revocación</label><input type="date" name="fecha_revocacion" value="${dateStr}"></div>
          <div class="form-field"><label>Fecha de firma original</label><input type="text" name="fecha_firma_original" value="${fechaFirmaOriginal}" readonly class="filled"></div>
        </div>
      </div>

      <div class="form-section revocation-content-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Revocación del Consentimiento
        </h3>
        <div class="revocation-info-box">
          <p>Yo, <strong>${patient.nombre}</strong>, identificado/a con <strong>${(patient.tipoDoc || 'C.C.')} ${patient.cedula}</strong>, habiendo previamente otorgado mi consentimiento informado para el procedimiento descrito en el documento <strong>"${formTitle}"</strong>, mediante el presente documento <strong>manifiesto mi voluntad de REVOCAR</strong> dicha autorización.</p>
          
          <p>Declaro que:</p>
          <ul>
            <li>He sido informado/a sobre las <strong>implicaciones médicas y riesgos</strong> que conlleva la revocación de este consentimiento.</li>
            <li>Entiendo que al revocar mi autorización, el procedimiento o tratamiento <strong>no se llevará a cabo</strong> o será <strong>suspendido</strong>.</li>
            <li>Asumo la <strong>responsabilidad</strong> por las consecuencias que se deriven de esta decisión.</li>
            <li>He tenido la oportunidad de hacer preguntas y recibir información adicional antes de tomar esta decisión.</li>
          </ul>
        </div>
      </div>

      <div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
          Motivo de la Revocación
        </h3>
        <div class="form-field full-width">
          <textarea name="motivo_revocacion" rows="5" placeholder="Describa detalladamente los motivos por los cuales revoca su autorización para el procedimiento..." required></textarea>
        </div>
      </div>

      <div class="form-section">
        <div class="form-checkboxes">
          <label class="form-checkbox revocation-checkbox"><input type="checkbox" name="declara_revocacion_voluntaria" required><span>Declaro que esta revocación es realizada de manera <strong>libre, voluntaria y consciente</strong>, sin ningún tipo de coacción.</span></label>
          <label class="form-checkbox revocation-checkbox"><input type="checkbox" name="declara_consecuencias" required><span>He sido informado/a sobre las <strong>posibles consecuencias</strong> de revocar este consentimiento y las asumo plenamente.</span></label>
          <label class="form-checkbox revocation-checkbox"><input type="checkbox" name="declara_exonera" required><span><strong>Exonero</strong> a la Clínica Medihelp Services y al equipo médico tratante de cualquier responsabilidad derivada de la no realización del procedimiento.</span></label>
        </div>
      </div>

      <!-- FIRMA PARA REVOCACIÓN -->
      <div class="form-section form-signature-section" id="signatureSection">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Firma del Paciente (Revocación)
        </h3>
        <div class="signature-form-area">
          <div class="signature-canvas-container">
            <label>Dibuje su firma para confirmar la revocación</label>
            <div class="signature-canvas-wrapper">
              <canvas id="signatureCanvas"></canvas>
            </div>
            <div class="signature-actions">
              <button class="btn btn-outline btn-sm" id="clearSignature" type="button">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                Borrar firma
              </button>
            </div>
          </div>
        </div>
        <div class="form-submit-area">
          <button class="btn btn-outline btn-lg" type="button" onclick="window.location.assign('paciente.html')">Cancelar</button>
          <button class="btn btn-danger btn-lg" type="button" id="submitSignature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            Firmar revocación y generar PDF
          </button>
        </div>
      </div>

    </form>
  `;

  const loadingEl = document.getElementById('formLoading');
  if (loadingEl) loadingEl.style.display = 'none';

  // Marcar este formulario como revocación para que signature.js lo detecte
  window._isRevocation = true;

  initSignaturePad();
}

function toggleNoAuthReason(checkbox) {
  const container = document.getElementById('noAuthReasonContainer');
  if (!container) return;
  if (checkbox.checked) {
    container.classList.add('visible');
    const textarea = container.querySelector('textarea');
    if (textarea) {
      textarea.required = true;
      setTimeout(() => textarea.focus(), 320);
    }
  } else {
    container.classList.remove('visible');
    const textarea = container.querySelector('textarea');
    if (textarea) {
      textarea.required = false;
    }
  }
}

function initNoAuthorizationExclusivity() {
  const sectionConfigByFormId = {
    1: {
      titleId: 'biSection10Title',
      dissentId: 'biDissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '10. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    },
    2: {
      titleId: 'cvSection10Title',
      dissentId: 'cvDissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '10. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    },
    10: {
      titleId: 'anxSection9Title',
      dissentId: 'anxDissentFields',
      noAuthTitle: '9. DISENTIMIENTO - Rechazo del Consentimiento',
      defaultTitle: '9. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncAnesthesiaDerivedIdentityFields(_viewerPatient)
    },
    4: {
      titleId: 'ci4SectionFirmasTitle',
      dissentId: 'ci4DissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '9. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    },
    5: {
      titleId: 'ci5SectionFirmasTitle',
      dissentId: 'ci5DissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '9. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    },
    6: {
      titleId: 'ci6SectionFirmasTitle',
      dissentId: 'ci6DissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '9. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    },
    7: {
      titleId: 'ci7SectionFirmasTitle',
      dissentId: 'ci7DissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '9. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    },
    8: {
      titleId: 'ci8SectionFirmasTitle',
      dissentId: 'ci8DissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '9. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    },
    9: {
      titleId: 'ci9SectionFirmasTitle',
      dissentId: 'ci9DissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '9. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    },
    11: {
      titleId: 'ci10SectionFirmasTitle',
      dissentId: 'ci10DissentFields',
      noAuthTitle: '10. DISENTIMIENTO INFORMADO',
      defaultTitle: '9. FIRMAS DE CONSENTIMIENTO',
      onEnable: () => syncCommonDerivedSignatureFields(_viewerPatient)
    }
  };

  const updateDissentSection = (isNoAuth) => {
    const formId = Number(getConsentFormId(_viewerConsent));
    const cfg = sectionConfigByFormId[formId];
    if (!cfg) return;
    const title = document.getElementById(cfg.titleId);
    const dissentFields = document.getElementById(cfg.dissentId);
    if (title) title.textContent = isNoAuth ? cfg.noAuthTitle : cfg.defaultTitle;
    if (dissentFields) dissentFields.style.display = isNoAuth ? 'block' : 'none';
    if (isNoAuth && typeof cfg.onEnable === 'function') cfg.onEnable();
  };

  const bindExclusiveCheckbox = (noAuthCheckbox, otherCheckboxes) => {
    if (!noAuthCheckbox || !otherCheckboxes.length) return;
    const updateState = () => {
      const locked = !!noAuthCheckbox.checked;
      otherCheckboxes.forEach((cb) => {
        if (locked) cb.checked = false;
        cb.disabled = locked;
      });
      if (typeof toggleNoAuthReason === 'function' && noAuthCheckbox.id === 'chkNoAuth') {
        toggleNoAuthReason(noAuthCheckbox);
      }
      if (noAuthCheckbox.name === 'declara_no_autoriza') {
        updateDissentSection(locked);
      }
    };
    noAuthCheckbox.addEventListener('change', updateState);
    updateState();
  };

  // Formularios estándar
  const standardNoAuth = document.getElementById('chkNoAuth');
  const standardOthers = ['declara_informado', 'declara_preguntas', 'declara_voluntario']
    .map((name) => document.querySelector(`[name="${name}"]`))
    .filter(Boolean);
  bindExclusiveCheckbox(standardNoAuth, standardOthers);

  // Plantilla de anestesia
  const anesthesiaNoAuth = document.querySelector('[name="declara_no_autoriza"]:not(#chkNoAuth)');
  const anesthesiaOthers = ['declara_informado', 'declara_revocacion_info', 'declara_voluntario', 'ci4_declara_autoriza_dr'];
  const anesthesiaOtherEls = anesthesiaOthers
    .map((name) => document.querySelector(`[name="${name}"]`))
    .filter(Boolean);
  bindExclusiveCheckbox(anesthesiaNoAuth, anesthesiaOtherEls);
}
