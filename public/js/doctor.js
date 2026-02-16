// =============================================================================
// DOCTOR PANEL
// =============================================================================
let currentDoctorCedula = null;
let currentPatientData = null;

function initDoctor() {
  document.getElementById('btnSearchPatient')?.addEventListener('click', searchPatientFromApi);
  document.getElementById('btnSelectAll')?.addEventListener('click', () => toggleAllConsents(true));
  document.getElementById('btnDeselectAll')?.addEventListener('click', () => toggleAllConsents(false));
  document.getElementById('btnAssignConsents')?.addEventListener('click', assignConsents);
  document.getElementById('consentSearch')?.addEventListener('input', filterConsentChecklist);
  document.getElementById('patientCedula')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchPatientFromApi();
  });

  // Restaurar paciente si viene de vuelta del viewer
  const savedCedula = sessionStorage.getItem('ci_doctor_cedula');
  const savedTipoDoc = sessionStorage.getItem('ci_doctor_tipodoc');
  if (savedCedula) {
    document.getElementById('patientCedula').value = savedCedula;
    if (savedTipoDoc) document.getElementById('patientTipoDoc').value = savedTipoDoc;
    restorePatientFromSession(savedCedula);
  }
}

async function restorePatientFromSession(cedula) {
  try {
    const patient = await api('GET', `/api/patients/${cedula}`);
    currentDoctorCedula = cedula;
    currentPatientData = {
      cedula: patient.cedula,
      nombre: patient.nombre,
      tipoDoc: patient.tipoDoc || '',
      edad: patient.edad || '',
      genero: patient.genero || '',
      telefono: patient.telefono || ''
    };
    showApiResult(currentPatientData);
    showPatientBanner(patient);
    showConsentSelection(patient);
    showPatientHistory(patient);
  } catch {
    sessionStorage.removeItem('ci_doctor_cedula');
    sessionStorage.removeItem('ci_doctor_tipodoc');
  }
}

async function searchPatientFromApi() {
  const tipoDoc = document.getElementById('patientTipoDoc').value;
  const cedula = document.getElementById('patientCedula').value.trim();
  if (!cedula) { showToast('Ingrese el número de documento', 'error'); return; }

  const btn = document.getElementById('btnSearchPatient');
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner" style="width:18px;height:18px;border-width:2px;"></div> Consultando...';

  try {
    const apiData = await api('GET', `/api/capbas/${encodeURIComponent(tipoDoc)}/${encodeURIComponent(cedula)}`);

    const nombre = extractField(apiData, ['mpnomc', 'nombre', 'nombreCompleto', 'nombre_completo', 'paciente', 'name'])
      || buildFullName(apiData) || 'Sin nombre';
    const fechaNac = extractField(apiData, ['mpfchn', 'fechaNacimiento', 'fecha_nacimiento', 'birthDate']);
    const edad = calcularEdad(fechaNac) || extractField(apiData, ['edad', 'age']) || '';
    const genero = extractField(apiData, ['mpsexo', 'genero', 'sexo', 'gender', 'sex']) || '';
    const telefono = extractField(apiData, ['mptele', 'mptele2', 'telefono', 'celular', 'phone', 'tel', 'movil']) || '';

    currentPatientData = { cedula, nombre, tipoDoc, edad, genero, telefono };

    showApiResult(currentPatientData);

    const patient = await api('POST', '/api/patients', currentPatientData);
    currentDoctorCedula = cedula;
    sessionStorage.setItem('ci_doctor_cedula', cedula);
    sessionStorage.setItem('ci_doctor_tipodoc', tipoDoc);
    showToast('Paciente encontrado correctamente');
    showPatientBanner(patient);
    showConsentSelection(patient);
    showPatientHistory(patient);
  } catch (err) {
    const existingPatient = await tryLocalPatient(cedula);
    if (existingPatient) {
      currentDoctorCedula = cedula;
      sessionStorage.setItem('ci_doctor_cedula', cedula);
      sessionStorage.setItem('ci_doctor_tipodoc', tipoDoc);
      showToast('Paciente cargado desde registros locales');
      showPatientBanner(existingPatient);
      showConsentSelection(existingPatient);
      showPatientHistory(existingPatient);
    } else {
      showToast('No se encontró el paciente en la API externa: ' + (err.message || err), 'error');
      document.getElementById('patientApiResult').style.display = 'none';
    }
  }

  btn.disabled = false;
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Buscar paciente';
}

async function tryLocalPatient(cedula) {
  try {
    return await api('GET', `/api/patients/${cedula}`);
  } catch { return null; }
}

function extractField(data, keys) {
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

function buildFullName(data) {
  const parts = [];
  const fn = extractField(data, ['mpnom1', 'primerNombre', 'primer_nombre', 'firstName']);
  const sn = extractField(data, ['mpnom2', 'segundoNombre', 'segundo_nombre', 'middleName']);
  const ln = extractField(data, ['mpape1', 'primerApellido', 'primer_apellido', 'lastName', 'apellido']);
  const sl = extractField(data, ['mpape2', 'segundoApellido', 'segundo_apellido', 'secondLastName']);

  if (fn) parts.push(fn);
  if (sn) parts.push(sn);
  if (ln) parts.push(ln);
  if (sl) parts.push(sl);

  return parts.length > 0 ? parts.join(' ') : null;
}

function calcularEdad(fechaNac) {
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

function showApiResult(data) {
  const container = document.getElementById('patientApiResult');
  container.style.display = 'block';
  document.getElementById('apiNombre').textContent = data.nombre || '---';
  document.getElementById('apiDocumento').textContent = (data.tipoDoc || '') + ' ' + (data.cedula || '---');
  document.getElementById('apiEdad').textContent = data.edad || '---';
  const g = (data.genero || '').trim().toUpperCase();
  let genDisplay = data.genero || '---';
  if (g === 'M' || g.startsWith('MASC')) genDisplay = 'MASCULINO';
  else if (g === 'F' || g.startsWith('FEM')) genDisplay = 'FEMENINO';
  else if (g && g !== '---') genDisplay = 'OTRO';
  document.getElementById('apiGenero').textContent = genDisplay;
  document.getElementById('apiTelefono').textContent = data.telefono || '---';
}

function showPatientBanner(patient) {
  document.getElementById('patientInfoBanner').style.display = 'flex';
  document.getElementById('bannerPatientName').textContent = patient.nombre;
  document.getElementById('bannerPatientCedula').textContent = (patient.tipoDoc || 'C.C.') + ' ' + patient.cedula;
  const entries = Object.values(patient.consentimientos || {});
  const assigned = entries.filter(c => c.asignado).length;
  const signed = entries.filter(c => c.firmado).length;
  document.getElementById('statAssigned').textContent = assigned + ' asignados';
  document.getElementById('statSigned').textContent = signed + ' firmados';
  document.getElementById('statPending').textContent = (assigned - signed) + ' pendientes';
}

function showConsentSelection(patient) {
  document.getElementById('consentsSection').style.display = 'block';
  renderConsentChecklist(patient);
}

function renderConsentChecklist(patient, filter = '') {
  const container = document.getElementById('consentChecklist');
  const filtered = filter ? consentimientos.filter(c => c.titulo.toLowerCase().includes(filter.toLowerCase())) : consentimientos;
  container.innerHTML = filtered.map(c => {
    const pc = patient.consentimientos?.[c.id];
    const isAssigned = pc?.asignado || false;
    const isSigned = pc?.firmado || false;
    return `
      <label class="consent-check-item ${isSigned ? 'signed' : ''} ${isAssigned ? 'assigned' : ''}" data-id="${c.id}">
        <div class="consent-check-left">
          <input type="checkbox" class="consent-checkbox" value="${c.id}" ${isAssigned ? 'checked' : ''} ${isSigned ? 'disabled' : ''}>
          <div class="consent-check-info">
            <span class="consent-check-number">N.° ${c.numero}</span>
            <span class="consent-check-title">${c.titulo}</span>
          </div>
        </div>
        <div class="consent-check-right">
          <span class="consent-check-type ${c.tipo}">${c.tipo.toUpperCase()}</span>
          ${isSigned ? '<span class="consent-status-badge signed"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Firmado</span>' : isAssigned ? '<span class="consent-status-badge pending">Pendiente</span>' : ''}
        </div>
      </label>`;
  }).join('');
  updateSelectedCount();
}

function filterConsentChecklist() {
  if (!currentDoctorCedula) return;
  api('GET', `/api/patients/${currentDoctorCedula}`).then(p => renderConsentChecklist(p, document.getElementById('consentSearch').value)).catch(() => {});
}

function toggleAllConsents(select) {
  document.querySelectorAll('.consent-checkbox:not(:disabled)').forEach(cb => cb.checked = select);
  updateSelectedCount();
}

function updateSelectedCount() {
  const n = document.querySelectorAll('.consent-checkbox:checked').length;
  const el = document.getElementById('selectedCount');
  if (el) el.textContent = n + ' seleccionados';
}

document.addEventListener('change', (e) => {
  if (e.target.classList.contains('consent-checkbox')) updateSelectedCount();
});

async function assignConsents() {
  if (!currentDoctorCedula) return;
  const ids = Array.from(document.querySelectorAll('.consent-checkbox:checked')).map(cb => parseInt(cb.value));
  try {
    const patient = await api('POST', `/api/patients/${currentDoctorCedula}/assign`, { consentimientosIds: ids });
    showToast('Consentimientos actualizados correctamente');
    showPatientBanner(patient);
    renderConsentChecklist(patient);
    showPatientHistory(patient);
  } catch (err) { showToast(err.message, 'error'); }
}

function showPatientHistory(patient) {
  const section = document.getElementById('historySection');
  const list = document.getElementById('historyList');
  const items = Object.entries(patient.consentimientos || {})
    .filter(([_, d]) => d.asignado)
    .map(([id, d]) => ({ consent: getConsentById(id), id, ...d }))
    .filter(i => i.consent);
  if (!items.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(item => {
    const isRevocation = item.revocacion && !item.firmado;
    const statusClass = item.firmado ? 'signed' : isRevocation ? 'revocation' : 'pending';
    let statusMeta = 'Pendiente de firma';
    if (item.firmado) statusMeta = 'Firmado el ' + new Date(item.fechaFirma).toLocaleString('es-CO');
    else if (isRevocation) statusMeta = 'Pendiente de revocación por el paciente';

    let actions = '';
    if (item.firmado && item.archivoFirmado) {
      actions = `
        <a href="/firmados/${patient.cedula}/${encodeURIComponent(item.archivoFirmado)}" target="_blank" class="btn btn-primary btn-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Ver firmado</a>
        <button class="btn btn-danger btn-sm" onclick="revokeConsent('${item.id}', '${patient.cedula}')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Revocar</button>`;
    } else if (isRevocation) {
      actions = `<span class="revocation-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Revocación habilitada</span>`;
    } else {
      actions = `<a href="viewer.html?id=${item.consent.id}&cedula=${patient.cedula}&role=doctor" class="btn ${item.datosMedico ? 'btn-outline btn-prefilled' : 'btn-primary'} btn-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> ${item.datosMedico ? 'Diligenciado' : 'Diligenciar'}</a>`;
    }

    return `
    <div class="history-item ${statusClass}">
      <div class="history-item-left">
        <div class="history-status-icon ${statusClass}">
          ${item.firmado
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
            : isRevocation
              ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
              : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'}
        </div>
        <div>
          <strong>${item.consent.titulo}</strong>
          <span class="history-meta">${statusMeta}</span>
        </div>
      </div>
      <div class="history-item-right">
        ${actions}
      </div>
    </div>`;
  }).join('');
}

let _pendingRevokeConsentId = null;
let _pendingRevokeCedula = null;

function revokeConsent(consentId, cedula) {
  _pendingRevokeConsentId = consentId;
  _pendingRevokeCedula = cedula;
  const consent = getConsentById(consentId);
  document.getElementById('revokeDocName').textContent = consent ? consent.titulo : 'Consentimiento #' + consentId;
  document.getElementById('revokeModalOverlay').classList.add('active');
}

function closeRevokeModal() {
  document.getElementById('revokeModalOverlay')?.classList.remove('active');
  _pendingRevokeConsentId = null;
  _pendingRevokeCedula = null;
}

async function confirmRevoke() {
  if (!_pendingRevokeConsentId || !_pendingRevokeCedula) return;
  const revokeId = _pendingRevokeConsentId;
  const revokeCedula = _pendingRevokeCedula;
  closeRevokeModal();
  try {
    const patient = await api('POST', `/api/patients/${revokeCedula}/revoke`, { consentId: revokeId });
    showToast('Revocación habilitada. El paciente puede firmar la revocación.');
    showPatientBanner(patient);
    renderConsentChecklist(patient);
    showPatientHistory(patient);
  } catch (err) {
    showToast('Error: ' + (err.message || err), 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnConfirmRevoke')?.addEventListener('click', confirmRevoke);
});
