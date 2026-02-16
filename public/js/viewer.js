// =============================================================================
// VIEWER / FORMULARIO
// =============================================================================
let _viewerRole = 'patient';
let doctorSignaturePad = null;

function initDoctorSignaturePad() {
  const canvas = document.getElementById('doctorSignatureCanvas');
  if (!canvas) return;
  canvas.width = 450;
  canvas.height = 160;

  doctorSignaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0, 0, 0)',
    minWidth: 1,
    maxWidth: 2.5
  });

  const wrapper = canvas.closest('.signature-canvas-wrapper');
  doctorSignaturePad.addEventListener('beginStroke', () => wrapper.classList.add('signing'));
  doctorSignaturePad.addEventListener('endStroke', () => wrapper.classList.remove('signing'));

  document.getElementById('clearDoctorSignature')?.addEventListener('click', () => {
    doctorSignaturePad.clear();
    showToast('Firma borrada');
  });
}

function initViewer() {
  const params = new URLSearchParams(window.location.search);
  const consentId = params.get('id');
  const cedula = params.get('cedula');
  _viewerRole = params.get('role') || 'patient';

  const fallbackPage = _viewerRole === 'doctor' ? 'doctor.html' : 'paciente.html';
  if (!consentId || !cedula) { window.location.href = fallbackPage; return; }

  const consent = getConsentById(consentId);
  if (!consent) { window.location.href = fallbackPage; return; }

  document.getElementById('btnBack').addEventListener('click', () => window.location.href = fallbackPage);
  document.getElementById('btnBackFromSigned')?.addEventListener('click', () => window.location.href = fallbackPage);

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
      if (!pc || !pc.asignado) { window.location.href = fallbackPage; return; }

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
    .catch(() => { window.location.href = fallbackPage; });
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
function loadDoctorForm(consent, patient, pc) {
  _viewerConsent = consent;
  _viewerPatient = patient;
  _viewerReadOnly = false;

  const lang = currentLanguage;
  const s = (typeof UI_STRINGS !== 'undefined') ? UI_STRINGS[lang] : {};
  const container = document.getElementById('formContainer');

  const formDef = lang === 'en'
    ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[consent.id] || FORMULARIOS?.[consent.id]) : FORMULARIOS?.[consent.id])
    : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[consent.id] : null);
  const formTitle = formDef?.titulo || consent.titulo;
  const formContent = formDef?.contenido || '<p><em>Contenido no disponible</em></p>';

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

      <div class="form-section">
        <div class="form-grid">
          <div class="form-field"><label>${s.doctor || 'Médico tratante'}</label><input type="text" name="medico" placeholder="${s.doctorPlaceholder || 'Nombre del médico'}"></div>
          <div class="form-field"><label>Registro médico</label><input type="text" name="registroMedico" placeholder="Ej: RM-12345"></div>
          <div class="form-field full-width"><label>${s.diagnosis || 'Diagnóstico / Motivo de consulta'}</label><textarea name="diagnostico" rows="2" placeholder="${s.diagnosisPlaceholder || 'Describa el diagnóstico o motivo de consulta'}"></textarea></div>
          <div class="form-field"><label>${s.service || 'Servicio / Área'}</label><input type="text" name="servicio" placeholder="${s.servicePlaceholder || 'Ej: Cirugía, UCI, Consulta'}"></div>
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
          <button class="btn btn-outline btn-lg" type="button" onclick="window.location.href='doctor.html'">Cancelar</button>
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
      const el = document.querySelector(`[name="${name}"]`);
      if (el) el.value = value;
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
  }

  // Botón guardar
  document.getElementById('btnSavePrefill')?.addEventListener('click', () => saveDoctorPrefill(consent, patient));
}

async function saveDoctorPrefill(consent, patient) {
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

    // Recoger todos los campos inline del contenido del consentimiento
    form.querySelectorAll('.document-content-box input, .document-content-box textarea, .document-content-box select').forEach(el => {
      if (el.name && el.value.trim()) campos[el.name] = el.value.trim();
    });

    // Recoger también medico, registroMedico, diagnostico, servicio
    ['medico', 'registroMedico', 'diagnostico', 'servicio'].forEach(name => {
      const el = form.querySelector(`[name="${name}"]`);
      if (el && el.value.trim()) campos[name] = el.value.trim();
    });

    // Guardar firma del médico y fecha/hora
    campos._firmaMedico = doctorSignaturePad.toDataURL('image/png');
    campos._fechaFirmaMedico = new Date().toISOString();

    await api('POST', `/api/patients/${patient.cedula}/prefill`, {
      consentId: consent.id,
      campos
    });

    showToast('Datos médicos guardados correctamente');
    setTimeout(() => { window.location.href = 'doctor.html'; }, 1500);
  } catch (err) {
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
    ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[consent.id] || FORMULARIOS?.[consent.id]) : FORMULARIOS?.[consent.id])
    : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[consent.id] : null);
  const formTitle = formDef?.titulo || consent.titulo;
  const formContent = formDef?.contenido || '<p><em>Contenido no disponible / Content not available.</em></p>';
  const ro = readOnly ? 'readonly' : '';
  const dis = readOnly ? 'disabled' : '';

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  document.getElementById('docTitle').textContent = formTitle;

  container.innerHTML = `
    <form id="consentForm" class="consent-form" autocomplete="off">

      <div class="form-section form-header-section">
        <h2 class="form-title">${formTitle}</h2>
        <p class="form-subtitle">${s.formSubtitle || 'Clínica Medihelp Services — Formulario digital'}</p>
      </div>

      <div class="form-section">
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
      </div>

      <div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          ${s.medicalInfo || 'Información Médica'}
        </h3>
        <div class="form-grid">
          <div class="form-field full-width"><label>${s.diagnosis || 'Diagnóstico / Motivo de consulta'}</label><textarea name="diagnostico" rows="2" placeholder="${s.diagnosisPlaceholder || 'Describa el diagnóstico o motivo de consulta'}" ${ro}></textarea></div>
          <div class="form-field"><label>${s.doctor || 'Médico tratante'}</label><input type="text" name="medico" placeholder="${s.doctorPlaceholder || 'Nombre del médico'}" ${ro}></div>
          <div class="form-field"><label>${s.service || 'Servicio / Área'}</label><input type="text" name="servicio" placeholder="${s.servicePlaceholder || 'Ej: Cirugía, UCI, Consulta'}" ${ro}></div>
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

      <div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          ${s.declarations || 'Declaraciones del Paciente'}
        </h3>
        <div class="form-checkboxes">
          <label class="form-checkbox"><input type="checkbox" name="declara_informado" ${dis} required><span>${s.declInformed || 'Declaro que he sido informado/a de manera clara y comprensible sobre el procedimiento, sus riesgos, beneficios y alternativas.'}</span></label>
          <label class="form-checkbox"><input type="checkbox" name="declara_preguntas" ${dis} required><span>${s.declQuestions || 'He tenido la oportunidad de hacer preguntas y todas han sido respondidas a mi satisfacción.'}</span></label>
          <label class="form-checkbox"><input type="checkbox" name="declara_voluntario" ${dis} required><span>${s.declVoluntary || 'Autorizo de manera libre y voluntaria la realización del procedimiento descrito en este consentimiento.'}</span></label>
          <label class="form-checkbox"><input type="checkbox" name="declara_revocar" ${dis}><span>${s.declRevoke || 'Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento.'}</span></label>
          <label class="form-checkbox no-auth-checkbox"><input type="checkbox" name="declara_no_autoriza" ${dis} id="chkNoAuth" onchange="toggleNoAuthReason(this)"><span>${s.declNoAuth || 'NO AUTORIZO la realización del procedimiento descrito en este consentimiento.'}</span></label>
        </div>
        <div class="no-auth-reason-box" id="noAuthReasonContainer">
          <div class="no-auth-reason-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <label>${s.declNoAuthReason || 'Motivo de la no autorización'}</label>
          </div>
          <textarea name="motivo_no_autoriza" rows="4" placeholder="${s.declNoAuthPlaceholder || 'Explique detalladamente los motivos por los cuales no autoriza el procedimiento...'}" ${ro}></textarea>
        </div>
      </div>

      <div class="form-section">
        <h3 class="form-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
          ${s.observations || 'Observaciones adicionales'}
        </h3>
        <div class="form-field full-width"><textarea name="observaciones" rows="3" placeholder="${s.observationsPlaceholder || 'Ingrese cualquier observación o anotación adicional...'}" ${ro}></textarea></div>
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
          <button class="btn btn-outline btn-lg" type="button" onclick="window.location.href='paciente.html'">${s.cancel || 'Cancelar'}</button>
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
      const el = document.querySelector(`[name="${name}"]`);
      if (el && value) {
        el.value = value;
        if (el.tagName === 'SELECT') {
          el.disabled = true;
        } else {
          el.readOnly = true;
        }
        el.classList.add('filled');
      }
    });
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
    ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[consent.id] || FORMULARIOS?.[consent.id]) : FORMULARIOS?.[consent.id])
    : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[consent.id] : null);
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
          <button class="btn btn-outline btn-lg" type="button" onclick="window.location.href='paciente.html'">Cancelar</button>
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
