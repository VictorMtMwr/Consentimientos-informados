// =============================================================================
// PATIENT PANEL
// =============================================================================
let currentPatientCedula = null;

function initPatient() {
  document.getElementById('btnPatientLogin')?.addEventListener('click', patientLogin);
  document.getElementById('btnLogout')?.addEventListener('click', patientLogout);
  document.getElementById('btnRetry')?.addEventListener('click', patientLogout);
  document.getElementById('patientLoginCedula')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') patientLogin();
  });
  const saved = sessionStorage.getItem('ci_current_patient');
  if (saved) {
    document.getElementById('patientLoginCedula').value = saved;
    patientLogin();
  }
}

async function patientLogin() {
  const tipoDoc = document.getElementById('patientLoginTipoDoc')?.value || 'CC';
  const cedula = document.getElementById('patientLoginCedula').value.trim();
  if (!cedula) { showToast('Ingrese su número de documento', 'error'); return; }

  try {
    // Primero intenta buscar el paciente ya registrado localmente
    const patient = await api('GET', `/api/patients/${cedula}`);
    currentPatientCedula = cedula;
    sessionStorage.setItem('ci_current_patient', cedula);
    showPatientConsents(patient);
  } catch {
    // Si no existe localmente, intenta con la API externa
    try {
      const apiData = await api('GET', `/api/capbas/${encodeURIComponent(tipoDoc)}/${encodeURIComponent(cedula)}`);
      const nombre = extractPatientField(apiData, ['mpnomc', 'nombre', 'nombreCompleto', 'nombre_completo', 'paciente', 'name'])
        || buildPatientFullName(apiData) || 'Paciente';
      const fechaNac = extractPatientField(apiData, ['mpfchn', 'fechaNacimiento', 'fecha_nacimiento']);
      const edad = calcPatientAge(fechaNac) || extractPatientField(apiData, ['edad', 'age']) || '';
      const genero = extractPatientField(apiData, ['mpsexo', 'genero', 'sexo', 'gender']) || '';
      const telefono = extractPatientField(apiData, ['mptele', 'mptele2', 'telefono', 'celular', 'phone']) || '';

      const patient = await api('POST', '/api/patients', { cedula, nombre, tipoDoc, edad, genero, telefono });
      currentPatientCedula = cedula;
      sessionStorage.setItem('ci_current_patient', cedula);
      showToast('Paciente verificado exitosamente');
      showPatientConsents(patient);
    } catch {
      document.getElementById('loginSection').style.display = 'none';
      document.getElementById('consentsListSection').style.display = 'block';
      document.getElementById('patientConsentsGrid').style.display = 'none';
      document.getElementById('progressCard').style.display = 'none';
      document.getElementById('emptyState').style.display = 'none';
      document.getElementById('notFoundState').style.display = 'flex';
      document.querySelector('.patient-welcome').style.display = 'none';
    }
  }
}

function extractPatientField(data, keys) {
  if (!data || typeof data !== 'object') return null;
  for (const key of keys) {
    const val = data[key];
    if (val !== undefined && val !== null && String(val).trim() !== '') return String(val).trim();
  }
  for (const k of Object.keys(data)) {
    const lower = k.toLowerCase();
    for (const key of keys) {
      if (lower === key.toLowerCase()) {
        const val = data[k];
        if (val !== undefined && val !== null && String(val).trim() !== '') return String(val).trim();
      }
    }
  }
  return null;
}

function buildPatientFullName(data) {
  const parts = [];
  const fn = extractPatientField(data, ['mpnom1', 'primerNombre', 'primer_nombre', 'firstName']);
  const sn = extractPatientField(data, ['mpnom2', 'segundoNombre', 'segundo_nombre', 'middleName']);
  const ln = extractPatientField(data, ['mpape1', 'primerApellido', 'primer_apellido', 'lastName', 'apellido']);
  const sl = extractPatientField(data, ['mpape2', 'segundoApellido', 'segundo_apellido']);
  if (fn) parts.push(fn);
  if (sn) parts.push(sn);
  if (ln) parts.push(ln);
  if (sl) parts.push(sl);
  return parts.length > 0 ? parts.join(' ') : null;
}

function calcPatientAge(fechaNac) {
  if (!fechaNac) return '';
  try {
    const nac = new Date(fechaNac);
    if (isNaN(nac.getTime())) return '';
    const hoy = new Date();
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad > 0 ? String(edad) : '';
  } catch { return ''; }
}

function patientLogout() {
  currentPatientCedula = null;
  sessionStorage.removeItem('ci_current_patient');
  document.getElementById('loginSection').style.display = 'flex';
  document.getElementById('consentsListSection').style.display = 'none';
  document.getElementById('patientLoginCedula').value = '';
}

function showPatientConsents(patient) {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('consentsListSection').style.display = 'block';
  document.getElementById('notFoundState').style.display = 'none';
  document.querySelector('.patient-welcome').style.display = 'flex';
  document.getElementById('welcomeName').textContent = patient.nombre;
  document.getElementById('welcomeCedula').textContent = (patient.tipoDoc || 'C.C.') + ' ' + patient.cedula;

  const items = Object.entries(patient.consentimientos || {})
    .filter(([_, d]) => d.asignado && (d.firmado || d.revocacion || (d.datosMedico && Object.keys(d.datosMedico).length > 0)))
    .map(([id, d]) => ({ consent: getConsentById(id), ...d }))
    .filter(i => i.consent);

  if (!items.length) {
    document.getElementById('patientConsentsGrid').style.display = 'none';
    document.getElementById('progressCard').style.display = 'none';
    document.getElementById('emptyState').style.display = 'flex';
    return;
  }

  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('progressCard').style.display = 'block';
  document.getElementById('patientConsentsGrid').style.display = 'flex';

  const total = items.length;
  const signed = items.filter(c => c.firmado).length;
  document.getElementById('progressText').textContent = `${signed} de ${total} firmados`;
  document.getElementById('progressBar').style.width = (total > 0 ? Math.round(signed / total * 100) : 0) + '%';

  document.getElementById('patientConsentsGrid').innerHTML = items.map(item => {
    const isRevocation = item.revocacion && !item.firmado;
    const statusClass = item.firmado ? 'signed' : isRevocation ? 'revocation' : 'pending';
    const statusIcon = item.firmado
      ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
      : isRevocation
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>';
    const statusLabel = item.firmado
      ? '<span class="pcc-signed-label">Firmado</span>'
      : isRevocation
        ? '<span class="pcc-revocation-label">Pendiente de revocación</span>'
        : '<span class="pcc-pending-label">Pendiente de firma</span>';
    return `
    <a href="viewer.html?id=${item.consent.id}&cedula=${patient.cedula}" class="patient-consent-card ${statusClass}">
      <div class="pcc-status ${statusClass}">
        ${statusIcon}
      </div>
      <div class="pcc-content">
        <span class="pcc-number">${isRevocation ? 'REVOCACIÓN — ' : ''}N.° ${item.consent.numero}</span>
        <h3 class="pcc-title">${item.consent.titulo}</h3>
        <div class="pcc-footer">
          <span class="card-type ${item.consent.tipo}">${item.consent.tipo.toUpperCase()}</span>
          ${statusLabel}
        </div>
      </div>
      <div class="pcc-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div>
    </a>`;
  }).join('');
}
