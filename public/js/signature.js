// =============================================================================
// SIGNATURE PAD & PDF GENERATION
// =============================================================================
let signaturePad = null;

function initSignaturePad() {
  const canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;
  const container = canvas.closest('.signature-canvas-wrapper');
  const maxW = container ? container.clientWidth - 16 : 450;
  canvas.width = Math.min(450, maxW);
  canvas.height = Math.min(160, Math.round(canvas.width * 0.36));

  signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0, 0, 0)',
    minWidth: 1,
    maxWidth: 2.5
  });

  const wrapper = canvas.closest('.signature-canvas-wrapper');
  signaturePad.addEventListener('beginStroke', () => wrapper.classList.add('signing'));
  signaturePad.addEventListener('endStroke', () => wrapper.classList.remove('signing'));

  document.getElementById('clearSignature')?.addEventListener('click', () => {
    signaturePad.clear();
    showToast('Firma borrada');
  });

  document.getElementById('submitSignature')?.addEventListener('click', submitSignature);
}

function submitSignature() {
  const isRevocation = window._isRevocation === true;

  if (isRevocation) {
    // Validar revocación
    const motivo = document.querySelector('textarea[name="motivo_revocacion"]');
    if (!motivo || !motivo.value.trim()) {
      showToast('Debe explicar el motivo de la revocación', 'error');
      if (motivo) motivo.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const requiredChecks = document.querySelectorAll('.form-checkboxes input[required]');
    for (const cb of requiredChecks) {
      if (!cb.checked) {
        showToast('Debe aceptar todas las declaraciones obligatorias', 'error');
        cb.closest('.form-checkbox').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
  } else {
    const noAuthCheck = document.getElementById('chkNoAuth');
    const isNoAuth = noAuthCheck && noAuthCheck.checked;

    if (isNoAuth) {
      const reasonField = document.querySelector('textarea[name="motivo_no_autoriza"]');
      if (!reasonField || !reasonField.value.trim()) {
        showToast('Debe explicar el motivo de la no autorización', 'error');
        if (reasonField) reasonField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    } else {
      const requiredChecks = document.querySelectorAll('.form-checkboxes input[required]');
      for (const cb of requiredChecks) {
        if (!cb.checked) {
          showToast('Debe aceptar todas las declaraciones obligatorias', 'error');
          cb.closest('.form-checkbox').scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
      }
    }
  }

  if (!signaturePad || signaturePad.isEmpty()) {
    showToast('Por favor dibuje su firma en el recuadro', 'error');
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const consent = getConsentById(params.get('id'));
  const cedula = params.get('cedula');

  api('GET', `/api/patients/${cedula}`).then(patient => {
    document.getElementById('modalDocName').textContent = (isRevocation ? 'REVOCACIÓN — ' : '') + consent.titulo;
    document.getElementById('modalSignerName').textContent = patient.nombre;
    document.getElementById('modalSignerDoc').textContent = patient.cedula;
    document.getElementById('modalOverlay').classList.add('active');
  });
}

function closeModal() {
  document.getElementById('modalOverlay')?.classList.remove('active');
}

async function confirmSignature() {
  closeModal();

  const params = new URLSearchParams(window.location.search);
  const consentId = params.get('id');
  const cedula = params.get('cedula');
  const consent = getConsentById(consentId);

  let patient;
  try { patient = await api('GET', `/api/patients/${cedula}`); } catch { return; }

  const signatureDataUrl = signaturePad.toDataURL('image/png');

  const submitBtn = document.getElementById('submitSignature');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;"></div> Generando PDF...';

  if (window._isRevocation) {
    await generateRevocationPdf(consent, patient, consentId, cedula, signatureDataUrl, submitBtn);
    return;
  }

  try {
    const form = document.getElementById('consentForm');
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (cb.name) datos[cb.name] = cb.checked ? 'on' : '';
    });

    // Recoger campos disabled/readonly que FormData ignora
    form.querySelectorAll('input[readonly], input[disabled], select[disabled], textarea[readonly], textarea[disabled]').forEach(el => {
      if (el.name && !datos[el.name]) datos[el.name] = el.value;
    });

    // Normalizar género para el PDF
    if (datos.genero) {
      const g = datos.genero.trim().toUpperCase();
      if (g === 'M' || g.startsWith('MASC')) datos.genero = 'MASCULINO';
      else if (g === 'F' || g.startsWith('FEM')) datos.genero = 'FEMENINO';
      else datos.genero = 'OTRO';
    }

    const inlineFields = [];
    document.querySelectorAll('.document-content-box .form-inline-field').forEach(field => {
      const label = field.querySelector('label')?.textContent || '';
      const input = field.querySelector('input, textarea, select');
      inlineFields.push({ label, value: input ? input.value || '---' : '---' });
    });

    const lang = currentLanguage;
    const s = (typeof UI_STRINGS !== 'undefined') ? UI_STRINGS[lang] : {};
    const formDef = lang === 'en'
      ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[consent.id] || FORMULARIOS?.[consent.id]) : FORMULARIOS?.[consent.id])
      : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[consent.id] : null);
    const formTitle = formDef?.titulo || consent.titulo;

    const contentBox = document.querySelector('.document-content-box');
    let contentText = '';
    if (contentBox) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = contentBox.innerHTML;
      tempDiv.querySelectorAll('.form-inline-field').forEach(f => f.remove());
      contentText = tempDiv.textContent.replace(/\n{3,}/g, '\n\n').trim();
    }

    // Cargar logo como data URL completo para jsPDF
    let logoDataUrl = null;
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      logoDataUrl = await new Promise((resolve, reject) => {
        logoImg.onload = () => {
          const cvs = document.createElement('canvas');
          cvs.width = logoImg.naturalWidth;
          cvs.height = logoImg.naturalHeight;
          const ctx = cvs.getContext('2d');
          ctx.drawImage(logoImg, 0, 0);
          resolve(cvs.toDataURL('image/png'));
        };
        logoImg.onerror = () => reject('Logo no cargado');
        logoImg.src = '/assets/descarga.png';
      });
    } catch (e) { console.warn('No se pudo cargar el logo:', e); }

    // ===== GENERAR PDF =====
    const jsPDF = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    if (!jsPDF) throw new Error('La libreria jsPDF no se cargo correctamente.');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const mL = 18, mR = 18, mTop = 18;
    const uW = pageW - mL - mR;
    let y = mTop;
    let pageCount = 1;

    // Colores corporativos
    const teal = [0, 131, 143];
    const tealDark = [0, 105, 114];
    const darkText = [33, 33, 33];
    const grayText = [100, 100, 100];
    const lightGray = [230, 230, 230];

    function checkPage(needed) {
      if (y + needed > pageH - 22) {
        doc.addPage();
        pageCount++;
        y = mTop;
        drawHeaderStripe();
      }
    }

    function drawHeaderStripe() {
      doc.setFillColor(teal[0], teal[1], teal[2]);
      doc.rect(0, 0, pageW, 3, 'F');
    }

    function sectionTitle(text) {
      checkPage(14);
      doc.setFillColor(teal[0], teal[1], teal[2]);
      doc.rect(mL, y - 1, 2.5, 6, 'F');
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(teal[0], teal[1], teal[2]);
      doc.text(text.toUpperCase(), mL + 5, y + 3.5);
      y += 7;
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setLineWidth(0.3);
      doc.line(mL, y, pageW - mR, y);
      y += 4;
    }

    function fieldRow(label, value, x, maxW) {
      const startX = x || mL;
      const fieldW = maxW || uW;
      checkPage(8);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text(label, startX, y);
      const labelW = doc.getTextWidth(label) + 1.5;
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      doc.setFontSize(8.5);
      const lines = doc.splitTextToSize(value || '---', fieldW - labelW);
      doc.text(lines, startX + labelW, y);
      y += lines.length * 4 + 1.5;
    }

    function twoColFields(left, right) {
      const halfW = uW / 2 - 3;
      const savedY = y;
      fieldRow(left.label, left.value, mL, halfW);
      const leftEndY = y;
      y = savedY;
      fieldRow(right.label, right.value, mL + uW / 2 + 3, halfW);
      const rightEndY = y;
      y = Math.max(leftEndY, rightEndY);
    }

    function wrappedText(text, fontSize, bold) {
      doc.setFontSize(fontSize || 8.5);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setTextColor(50, 50, 50);
      const lines = doc.splitTextToSize(text, uW);
      for (const line of lines) {
        checkPage(5);
        doc.text(line, mL, y);
        y += fontSize ? fontSize * 0.44 : 3.8;
      }
      y += 1.5;
    }

    function declCheckbox(checked, text, danger) {
      checkPage(10);
      const boxSize = 3.5;
      const boxY = y - 2.8;
      doc.setDrawColor(danger ? 200 : 0, danger ? 50 : 131, danger ? 50 : 143);
      doc.setLineWidth(0.4);
      doc.roundedRect(mL, boxY, boxSize, boxSize, 0.6, 0.6, 'S');
      if (checked) {
        doc.setFillColor(danger ? 200 : 0, danger ? 50 : 131, danger ? 50 : 143);
        doc.roundedRect(mL + 0.5, boxY + 0.5, boxSize - 1, boxSize - 1, 0.4, 0.4, 'F');
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.5);
        doc.line(mL + 0.9, boxY + 1.7, mL + 1.5, boxY + 2.6);
        doc.line(mL + 1.5, boxY + 2.6, mL + 2.8, boxY + 1.1);
      }
      doc.setFontSize(8);
      doc.setFont('helvetica', danger ? 'bold' : 'normal');
      doc.setTextColor(danger ? 180 : 50, danger ? 30 : 50, danger ? 30 : 50);
      const txtLines = doc.splitTextToSize(text, uW - boxSize - 4);
      doc.text(txtLines, mL + boxSize + 3, y);
      y += txtLines.length * 3.8 + 2;
    }

    // ===================================================================
    // PAGINA 1 — ENCABEZADO CON LOGO + TABLA DE CODIGO
    // ===================================================================
    drawHeaderStripe();
    y = 8;

    // Logo a la izquierda
    if (logoDataUrl) {
      try {
        doc.addImage(logoDataUrl, 'PNG', mL, y, 52, 14);
      } catch (e) {
        console.warn('No se pudo insertar el logo:', e);
      }
    }

    // Tabla de código/versión/vigente en la esquina superior derecha
    const tblW = 48, tblRowH = 5.2, tblX = pageW - mR - tblW, tblY = 6;
    const consentMeta = consent;
    if (consentMeta.codigo || consentMeta.version || consentMeta.vigente) {
      doc.setDrawColor(teal[0], teal[1], teal[2]);
      doc.setLineWidth(0.4);
      // Fila 1: Código
      doc.setFillColor(0, 131, 143);
      doc.rect(tblX, tblY, tblW, tblRowH, 'FD');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text((lang === 'en' ? 'Code: ' : 'Código: ') + (consentMeta.codigo || '---'), tblX + 2, tblY + 3.6);
      // Fila 2: Versión
      doc.setFillColor(245, 250, 250);
      doc.rect(tblX, tblY + tblRowH, tblW, tblRowH, 'FD');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      doc.text((lang === 'en' ? 'Version N.° ' : 'Versión N.° ') + (consentMeta.version || '---'), tblX + 2, tblY + tblRowH + 3.6);
      // Fila 3: Vigente
      doc.setFillColor(245, 250, 250);
      doc.rect(tblX, tblY + tblRowH * 2, tblW, tblRowH, 'FD');
      doc.setFontSize(7);
      doc.text((lang === 'en' ? 'Effective: ' : 'Vigente: ') + (consentMeta.vigente || '---'), tblX + 2, tblY + tblRowH * 2 + 3.6);
    }

    // Línea divisoria debajo del encabezado
    y = 25;
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.setLineWidth(0.6);
    doc.line(mL, y, pageW - mR, y);
    y += 5;

    // Titulo del consentimiento
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
    const titleLines = doc.splitTextToSize(formTitle, uW);
    doc.text(titleLines, mL, y);
    y += titleLines.length * 5.5 + 1;

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    doc.text(s.pdfSubtitle || 'Clinica Medihelp Services - Formulario digital de consentimiento informado', mL, y);
    y += 7;

    // ===================================================================
    // DATOS DEL PACIENTE (dos columnas)
    // ===================================================================
    sectionTitle(s.patientData || 'Datos del Paciente');

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(mL, y - 2, uW, 28, 1.5, 1.5, 'F');
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setLineWidth(0.2);
    doc.roundedRect(mL, y - 2, uW, 28, 1.5, 1.5, 'S');
    const boxPad = 3;
    y += boxPad - 1;
    const datosStartX = mL + boxPad;
    const halfW = (uW - boxPad * 2) / 2 - 2;

    let savedY = y;
    fieldRow(s.pdfName || 'Nombre:', patient.nombre, datosStartX, halfW);
    fieldRow(s.pdfDate || 'Fecha:', datos.fecha || '---', datosStartX, halfW);
    fieldRow(s.pdfGender || 'Genero:', datos.genero || '---', datosStartX, halfW);
    const leftEndY = y;

    y = savedY;
    const rightStartX = mL + uW / 2 + 2;
    fieldRow(s.pdfId || 'Cedula:', patient.cedula, rightStartX, halfW);
    fieldRow(s.pdfAge || 'Edad:', (datos.edad || '---') + ' ' + (s.pdfAgeUnit || 'anios'), rightStartX, halfW);
    fieldRow(s.pdfPhone || 'Telefono:', datos.telefono || '---', rightStartX, halfW);
    y = Math.max(leftEndY, y);

    y = (mL + boxPad - 1 + savedY - (mL + boxPad - 1)) + 28 + mL - (mL + boxPad - 1) - 2 + boxPad;
    y = savedY - boxPad + 1 + 28 + 2;
    y += 4;

    // ===================================================================
    // INFORMACION MEDICA (dos columnas)
    // ===================================================================
    sectionTitle(s.pdfMedInfo || 'Informacion Medica');
    const medStartY = y;
    fieldRow(s.pdfDiagnosis || 'Diagnostico:', datos.diagnostico || '---', mL, uW / 2 - 3);
    const medLeftEnd = y;
    y = medStartY;
    fieldRow(s.pdfDoctor || 'Medico tratante:', datos.medico || '---', mL + uW / 2 + 3, uW / 2 - 3);
    y = Math.max(medLeftEnd, y);
    fieldRow(s.pdfService || 'Servicio:', datos.servicio || '---');
    y += 4;

    // ===================================================================
    // CONTENIDO DEL CONSENTIMIENTO
    // ===================================================================
    sectionTitle(s.pdfContent || 'Contenido del Consentimiento');
    if (contentText) {
      const paragraphs = contentText.split('\n').filter(p => p.trim());
      for (const p of paragraphs) {
        wrappedText(p.trim(), 8, false);
      }
    }
    if (inlineFields.length > 0) {
      y += 2;
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setLineWidth(0.15);
      for (const f of inlineFields) {
        fieldRow(f.label + ':', f.value);
        doc.line(mL, y - 0.5, pageW - mR, y - 0.5);
      }
    }
    y += 4;

    // ===================================================================
    // DECLARACIONES DEL PACIENTE
    // ===================================================================
    sectionTitle(s.pdfDecl || 'Declaraciones del Paciente');
    declCheckbox(!!datos.declara_informado, s.pdfDeclInformed || 'He sido informado/a de manera clara sobre el procedimiento, riesgos, beneficios y alternativas.', false);
    declCheckbox(!!datos.declara_preguntas, s.pdfDeclQuestions || 'He tenido la oportunidad de hacer preguntas y todas han sido respondidas satisfactoriamente.', false);
    declCheckbox(!!datos.declara_voluntario, s.pdfDeclVoluntary || 'Autorizo de manera libre y voluntaria la realizacion del procedimiento descrito.', false);
    declCheckbox(!!datos.declara_revocar, s.pdfDeclRevoke || 'Entiendo que puedo revocar este consentimiento en cualquier momento.', false);
    declCheckbox(!!datos.declara_no_autoriza, s.pdfDeclNoAuth || 'NO AUTORIZO la realizacion del procedimiento descrito en este consentimiento.', true);

    if (datos.declara_no_autoriza && datos.motivo_no_autoriza) {
      checkPage(18);
      doc.setFillColor(255, 243, 243);
      const motLines = doc.splitTextToSize(datos.motivo_no_autoriza, uW - 12);
      const motH = motLines.length * 4 + 10;
      doc.roundedRect(mL, y - 2, uW, motH, 1.5, 1.5, 'F');
      doc.setDrawColor(200, 50, 50);
      doc.setLineWidth(0.4);
      doc.roundedRect(mL, y - 2, uW, motH, 1.5, 1.5, 'S');
      doc.setFillColor(200, 50, 50);
      doc.rect(mL, y - 2, 2.5, motH, 'F');
      y += 2;
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 30, 30);
      doc.text((s.pdfNoAuthReason || 'MOTIVO DE NO AUTORIZACION:').toUpperCase(), mL + 5, y);
      y += 5;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(motLines, mL + 5, y);
      y += motLines.length * 4 + 4;
    }
    y += 3;

    // ===================================================================
    // OBSERVACIONES
    // ===================================================================
    if (datos.observaciones) {
      sectionTitle(s.pdfObs || 'Observaciones');
      doc.setFillColor(252, 252, 252);
      const obsLines = doc.splitTextToSize(datos.observaciones, uW - 8);
      const obsH = obsLines.length * 4 + 6;
      checkPage(obsH + 4);
      doc.roundedRect(mL, y - 2, uW, obsH, 1.5, 1.5, 'F');
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setLineWidth(0.2);
      doc.roundedRect(mL, y - 2, uW, obsH, 1.5, 1.5, 'S');
      y += 2;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(obsLines, mL + 4, y);
      y += obsLines.length * 4 + 5;
    }

    // ===================================================================
    // CONSTANCIA DE FIRMAS
    // ===================================================================
    checkPage(75);
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.setLineWidth(0.6);
    doc.line(mL, y, pageW - mR, y);
    y += 6;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
    doc.text(s.pdfSignTitle || 'CONSTANCIA DE FIRMAS', mL, y);
    y += 8;

    const sigColW = (uW - 10) / 2;
    const sigLeftX = mL;
    const sigRightX = mL + sigColW + 10;
    const sigStartY = y;

    // --- FIRMA DEL PACIENTE (izquierda) ---
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text('FIRMA DEL PACIENTE', sigLeftX, y);
    y += 5;

    try {
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setLineWidth(0.15);
      doc.roundedRect(sigLeftX, y - 1, 55, 24, 1, 1, 'S');
      doc.addImage(signatureDataUrl, 'PNG', sigLeftX + 2, y, 51, 22);
      y += 26;
    } catch (e) {
      y += 5;
    }

    doc.setDrawColor(darkText[0], darkText[1], darkText[2]);
    doc.setLineWidth(0.5);
    doc.line(sigLeftX, y, sigLeftX + sigColW, y);
    y += 4;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    doc.text(patient.nombre, sigLeftX, y);
    y += 4;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    doc.text((patient.tipoDoc || 'C.C.') + ' ' + patient.cedula, sigLeftX, y);
    y += 5;
    doc.text((s.pdfDateTime || 'Fecha y hora: ') + new Date().toLocaleString('es-CO'), sigLeftX, y);
    const patientEndY = y;

    // --- FIRMA DEL MÉDICO (derecha) ---
    const pc = patient.consentimientos?.[consent.id];
    const firmaMedico = pc?.datosMedico?._firmaMedico;
    const fechaFirmaMedico = pc?.datosMedico?._fechaFirmaMedico;
    const nombreMedico = pc?.datosMedico?.medico || datos.medico || '';
    const registroMedico = pc?.datosMedico?.registroMedico || datos.registroMedico || '';

    let yDoc = sigStartY;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text('FIRMA DEL MÉDICO', sigRightX, yDoc);
    yDoc += 5;

    if (firmaMedico) {
      try {
        doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.setLineWidth(0.15);
        doc.roundedRect(sigRightX, yDoc - 1, 55, 24, 1, 1, 'S');
        doc.addImage(firmaMedico, 'PNG', sigRightX + 2, yDoc, 51, 22);
        yDoc += 26;
      } catch (e) {
        yDoc += 5;
      }
    } else {
      yDoc += 26;
    }

    doc.setDrawColor(darkText[0], darkText[1], darkText[2]);
    doc.setLineWidth(0.5);
    doc.line(sigRightX, yDoc, sigRightX + sigColW, yDoc);
    yDoc += 4;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    doc.text(nombreMedico || 'Médico tratante', sigRightX, yDoc);
    yDoc += 4;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    if (registroMedico) {
      doc.text('Reg. Médico: ' + registroMedico, sigRightX, yDoc);
      yDoc += 4;
    }
    yDoc += 1;
    if (fechaFirmaMedico) {
      doc.text('Fecha y hora: ' + new Date(fechaFirmaMedico).toLocaleString('es-CO'), sigRightX, yDoc);
    }

    y = Math.max(patientEndY, yDoc) + 6;

    doc.setFillColor(teal[0], teal[1], teal[2]);
    doc.roundedRect(mL, y, 48, 5, 0.8, 0.8, 'F');
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(s.pdfDigital || 'Documento firmado digitalmente', mL + 2, y + 3.4);
    y += 10;

    // Texto legal
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    const legal = s.pdfLegal || 'El/La firmante declara que ha leido y comprendido en su totalidad el contenido del consentimiento informado, que ha recibido explicacion clara y suficiente sobre los procedimientos, riesgos, beneficios y alternativas, y que firma de manera voluntaria el presente documento como constancia de su aceptacion.';
    const legalLines = doc.splitTextToSize(legal, uW);
    checkPage(legalLines.length * 3 + 5);
    doc.text(legalLines, mL, y);

    // ===================================================================
    // PIE DE PAGINA — numero de pagina en todas las paginas
    // ===================================================================
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(teal[0], teal[1], teal[2]);
      doc.rect(0, pageH - 3, pageW, 3, 'F');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text(formTitle, mL, pageH - 5);
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(i + ' / ' + totalPages, pageW - mR - 8, pageH - 5);
    }

    const pdfBlob = doc.output('blob');
    const pdfBase64 = await blobToBase64(pdfBlob);

    await api('POST', '/api/sign', {
      cedula: patient.cedula,
      consentId: parseInt(consentId),
      pdfBase64,
      titulo: consent.titulo
    });

    showToast('Consentimiento firmado y guardado exitosamente');

    document.getElementById('signatureSection').style.display = 'none';
    document.getElementById('signedBanner').style.display = 'flex';
    document.getElementById('signedDate').textContent = 'Firmado el ' + new Date().toLocaleString('es-CO');

    document.querySelectorAll('#consentForm input, #consentForm textarea, #consentForm select').forEach(el => {
      el.readOnly = true;
      el.disabled = true;
    });

    setTimeout(() => { window.location.href = 'paciente.html'; }, 2500);

  } catch (err) {
    console.error('Error al firmar:', err);
    showToast('Error al generar el documento: ' + err.message, 'error');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Firmar y generar PDF';
  }
}

// =============================================================================
// GENERACIÓN DE PDF DE REVOCACIÓN
// =============================================================================
async function generateRevocationPdf(consent, patient, consentId, cedula, signatureDataUrl, submitBtn) {
  try {
    const form = document.getElementById('consentForm');
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (cb.name) datos[cb.name] = cb.checked ? 'on' : '';
    });
    form.querySelectorAll('input[readonly], input[disabled]').forEach(el => {
      if (el.name && !datos[el.name]) datos[el.name] = el.value;
    });

    const lang = currentLanguage;
    const s = (typeof UI_STRINGS !== 'undefined') ? UI_STRINGS[lang] : {};
    const formDef = lang === 'en'
      ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[consent.id] || FORMULARIOS?.[consent.id]) : FORMULARIOS?.[consent.id])
      : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[consent.id] : null);
    const formTitle = formDef?.titulo || consent.titulo;

    const jsPDF = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    const doc = new jsPDF({ unit: 'mm', format: 'letter' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const mL = 15, mR = 15, mT = 15;
    const uW = pageW - mL - mR;

    const red = [198, 40, 40];
    const redDark = [183, 28, 28];
    const teal = [0, 131, 143];
    const tealDark = [0, 96, 100];
    const darkText = [38, 50, 56];
    const grayText = [96, 125, 139];
    const lightGray = [207, 216, 220];

    let y = mT;

    function checkPage(needed) {
      if (y + needed > pageH - 20) { doc.addPage(); y = mT; }
    }

    // Logo
    let logoDataUrl = null;
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
        logoImg.src = 'assets/descarga.png';
      });
      const cvs = document.createElement('canvas');
      cvs.width = logoImg.naturalWidth;
      cvs.height = logoImg.naturalHeight;
      cvs.getContext('2d').drawImage(logoImg, 0, 0);
      logoDataUrl = cvs.toDataURL('image/png');
    } catch {}

    // Header con franja roja
    doc.setFillColor(red[0], red[1], red[2]);
    doc.rect(0, 0, pageW, 3, 'F');

    y = 8;
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, 'PNG', mL, y, 52, 14);
    }

    // Tabla de metadata
    const consentMeta = consent;
    if (consentMeta.codigo || consentMeta.version || consentMeta.vigente) {
      const tblW = 48, tblRowH = 5.2, tblX = pageW - mR - tblW, tblY = 6;
      doc.setFillColor(red[0], red[1], red[2]);
      doc.roundedRect(tblX, tblY, tblW, tblRowH, 0.8, 0.8, 'F');
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255);
      doc.text('Codigo: ' + (consentMeta.codigo || '---'), tblX + 2, tblY + 3.6);
      doc.setFillColor(248, 250, 252);
      doc.rect(tblX, tblY + tblRowH, tblW, tblRowH, 'F');
      doc.setTextColor(darkText[0], darkText[1], darkText[2]); doc.setFont('helvetica', 'normal');
      doc.text('Version: ' + (consentMeta.version || '---'), tblX + 2, tblY + tblRowH + 3.6);
      doc.rect(tblX, tblY + tblRowH * 2, tblW, tblRowH, 'F');
      doc.text('Vigente: ' + (consentMeta.vigente || '---'), tblX + 2, tblY + tblRowH * 2 + 3.6);
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]); doc.setLineWidth(0.15);
      doc.roundedRect(tblX, tblY, tblW, tblRowH * 3, 0.8, 0.8, 'S');
    }

    y = 25;
    doc.setDrawColor(red[0], red[1], red[2]); doc.setLineWidth(0.6);
    doc.line(mL, y, pageW - mR, y);
    y += 8;

    // Título
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(red[0], red[1], red[2]);
    doc.text('REVOCACION DE AUTORIZACION', pageW / 2, y, { align: 'center' });
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    const titleLines = doc.splitTextToSize(formTitle, uW);
    doc.text(titleLines, pageW / 2, y, { align: 'center' });
    y += titleLines.length * 4 + 6;

    // Datos del paciente
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(mL, y - 2, uW, 18, 1.5, 1.5, 'F');
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]); doc.setLineWidth(0.2);
    doc.roundedRect(mL, y - 2, uW, 18, 1.5, 1.5, 'S');

    const bPad = 3;
    const bY = y + bPad - 1;
    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    doc.text('NOMBRE:', mL + bPad, bY);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    doc.setFontSize(9);
    doc.text(patient.nombre, mL + bPad + 18, bY);

    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    doc.text('DOCUMENTO:', mL + bPad, bY + 5);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    doc.setFontSize(9);
    doc.text((patient.tipoDoc || 'C.C.') + ' ' + patient.cedula, mL + bPad + 24, bY + 5);

    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    doc.text('FECHA REVOCACION:', mL + uW / 2, bY);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    doc.setFontSize(9);
    doc.text(datos.fecha_revocacion || new Date().toISOString().slice(0, 10), mL + uW / 2 + 36, bY);

    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    doc.text('FIRMA ORIGINAL:', mL + uW / 2, bY + 5);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    doc.setFontSize(9);
    doc.text(datos.fecha_firma_original || '---', mL + uW / 2 + 32, bY + 5);

    y += 22;

    // Contenido de revocación
    doc.setDrawColor(red[0], red[1], red[2]); doc.setLineWidth(0.4);
    doc.line(mL, y, pageW - mR, y);
    y += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(redDark[0], redDark[1], redDark[2]);
    doc.text('DECLARACION DE REVOCACION', mL, y);
    y += 7;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    const revText = `Yo, ${patient.nombre}, identificado/a con ${(patient.tipoDoc || 'C.C.')} ${patient.cedula}, habiendo previamente otorgado mi consentimiento informado para el procedimiento descrito en el documento "${formTitle}", mediante el presente documento manifiesto mi voluntad de REVOCAR dicha autorizacion.`;
    const revLines = doc.splitTextToSize(revText, uW);
    doc.text(revLines, mL, y);
    y += revLines.length * 4 + 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Declaro que:', mL, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    const declarations = [
      'He sido informado/a sobre las implicaciones medicas y riesgos que conlleva la revocacion de este consentimiento.',
      'Entiendo que al revocar mi autorizacion, el procedimiento o tratamiento no se llevara a cabo o sera suspendido.',
      'Asumo la responsabilidad por las consecuencias que se deriven de esta decision.',
      'He tenido la oportunidad de hacer preguntas y recibir informacion adicional antes de tomar esta decision.'
    ];
    declarations.forEach(decl => {
      checkPage(8);
      doc.text('•', mL + 2, y);
      const dLines = doc.splitTextToSize(decl, uW - 8);
      doc.text(dLines, mL + 7, y);
      y += dLines.length * 4 + 2;
    });
    y += 3;

    // Motivo de revocación
    checkPage(25);
    doc.setFillColor(255, 235, 238);
    const motivo = datos.motivo_revocacion || '';
    const motivoLines = doc.splitTextToSize(motivo, uW - 8);
    const motivoBoxH = Math.max(15, motivoLines.length * 4 + 12);
    doc.roundedRect(mL, y, uW, motivoBoxH, 1.5, 1.5, 'F');
    doc.setDrawColor(red[0], red[1], red[2]); doc.setLineWidth(0.3);
    doc.roundedRect(mL, y, uW, motivoBoxH, 1.5, 1.5, 'S');

    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(red[0], red[1], red[2]);
    doc.text('MOTIVO DE LA REVOCACION:', mL + 4, y + 5);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    doc.setFontSize(9);
    doc.text(motivoLines, mL + 4, y + 10);
    y += motivoBoxH + 6;

    // Declaraciones checkbox
    checkPage(20);
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(redDark[0], redDark[1], redDark[2]);
    doc.text('CONFIRMACIONES:', mL, y);
    y += 5;
    doc.setFont('helvetica', 'normal'); doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    const confirmaciones = [
      'Esta revocacion es realizada de manera libre, voluntaria y consciente.',
      'He sido informado/a sobre las posibles consecuencias y las asumo plenamente.',
      'Exonero a la Clinica Medihelp Services y al equipo medico de cualquier responsabilidad derivada.'
    ];
    confirmaciones.forEach(c => {
      checkPage(8);
      doc.setFillColor(red[0], red[1], red[2]);
      doc.roundedRect(mL + 2, y - 2.5, 3, 3, 0.5, 0.5, 'F');
      doc.setFontSize(5); doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold');
      doc.text('✓', mL + 2.6, y);
      doc.setFontSize(8); doc.setTextColor(darkText[0], darkText[1], darkText[2]); doc.setFont('helvetica', 'normal');
      const cLines = doc.splitTextToSize(c, uW - 10);
      doc.text(cLines, mL + 8, y);
      y += cLines.length * 3.5 + 3;
    });
    y += 4;

    // Firma del paciente
    checkPage(50);
    doc.setDrawColor(red[0], red[1], red[2]); doc.setLineWidth(0.6);
    doc.line(mL, y, pageW - mR, y);
    y += 6;

    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(redDark[0], redDark[1], redDark[2]);
    doc.text('FIRMA DE REVOCACION', mL, y);
    y += 8;

    try {
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]); doc.setLineWidth(0.15);
      doc.roundedRect(mL, y - 1, 55, 24, 1, 1, 'S');
      doc.addImage(signatureDataUrl, 'PNG', mL + 2, y, 51, 22);
      y += 26;
    } catch { y += 5; }

    doc.setDrawColor(darkText[0], darkText[1], darkText[2]); doc.setLineWidth(0.5);
    doc.line(mL, y, mL + 65, y);
    y += 4;

    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(darkText[0], darkText[1], darkText[2]);
    doc.text(patient.nombre, mL, y);
    y += 4;
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    doc.text((patient.tipoDoc || 'C.C.') + ' ' + patient.cedula, mL, y);
    y += 5;
    doc.text('Fecha y hora: ' + new Date().toLocaleString('es-CO'), mL, y);
    y += 6;

    doc.setFillColor(red[0], red[1], red[2]);
    doc.roundedRect(mL, y, 55, 5, 0.8, 0.8, 'F');
    doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255);
    doc.text('Documento de revocacion firmado digitalmente', mL + 2, y + 3.4);
    y += 10;

    // Texto legal
    doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(150, 150, 150);
    const legal = 'El/La firmante declara que revoca de manera voluntaria el consentimiento previamente otorgado, habiendo sido informado/a de las consecuencias de dicha revocacion. Este documento constituye constancia legal de la decision del paciente.';
    const legalLines = doc.splitTextToSize(legal, uW);
    checkPage(legalLines.length * 3 + 5);
    doc.text(legalLines, mL, y);

    // Pie de página
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(red[0], red[1], red[2]);
      doc.rect(0, pageH - 3, pageW, 3, 'F');
      doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('REVOCACION — ' + formTitle, mL, pageH - 5);
      doc.setTextColor(darkText[0], darkText[1], darkText[2]); doc.setFont('helvetica', 'bold');
      doc.text(i + ' / ' + totalPages, pageW - mR - 8, pageH - 5);
    }

    const pdfBlob = doc.output('blob');
    const pdfBase64 = await blobToBase64(pdfBlob);

    await api('POST', '/api/sign', {
      cedula: patient.cedula,
      consentId: parseInt(consentId),
      pdfBase64,
      titulo: 'REVOCACION_' + consent.titulo
    });

    showToast('Revocación firmada y guardada exitosamente');
    document.getElementById('signatureSection').style.display = 'none';
    document.querySelectorAll('#consentForm input, #consentForm textarea, #consentForm select').forEach(el => {
      el.readOnly = true;
      el.disabled = true;
    });
    setTimeout(() => { window.location.href = 'paciente.html'; }, 2500);

  } catch (err) {
    console.error('Error al generar revocación:', err);
    showToast('Error al generar el documento: ' + err.message, 'error');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Firmar revocación y generar PDF';
  }
}
