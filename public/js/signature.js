// =============================================================================
// SIGNATURE PAD & PDF GENERATION
// =============================================================================
let signaturePad = null;
let signatureFlowState = null;

function getSignatureFlowSteps() {
  const candidateSteps = [
    { slotId: 'axPacienteSignSlot', label: 'Paciente / Rep. Legal' },
    { slotId: 'axTestigo1SignSlot', label: 'Testigo' },
    { slotId: 'axTestigo2SignSlot', label: 'Testigo 2' }
  ];
  return candidateSteps.filter(step => document.getElementById(step.slotId));
}

function isSignatureFlowEnabled() {
  return !!(signatureFlowState && signatureFlowState.enabled);
}

/**
 * Campos de testigo: el paciente (paso 0) no los edita.
 * Testigo 1 se puede rellenar desde el paso 1 en adelante (sigue editable en el paso del testigo 2 por si hay que corregir).
 * Testigo 2 solo desde el paso 2.
 */
function updateAnesthesiaWitnessFieldLocks() {
  const t1 = document.querySelector('[name="ax_testigo1"]');
  const t2 = document.querySelector('[name="ax_testigo2"]');
  if (!t1 || !t2) return;

  const flow = signatureFlowState && signatureFlowState.enabled;
  const idx = flow ? signatureFlowState.currentIndex : 0;

  if (!flow) {
    t1.readOnly = false;
    t2.readOnly = false;
    t1.classList.remove('is-locked-field');
    t2.classList.remove('is-locked-field');
    t1.removeAttribute('title');
    t2.removeAttribute('title');
    return;
  }

  t1.readOnly = idx < 1;
  t2.readOnly = idx < 2;
  t1.classList.toggle('is-locked-field', t1.readOnly);
  t2.classList.toggle('is-locked-field', t2.readOnly);
  if (t1.readOnly) {
    t1.title = 'Podrá diligenciar este campo al continuar (firma del testigo 1).';
  } else {
    t1.removeAttribute('title');
  }
  if (t2.readOnly) {
    t2.title = 'Podrá diligenciar este campo al continuar (firma del testigo 2).';
  } else {
    t2.removeAttribute('title');
  }
}

function getCurrentSignatureStep() {
  if (!isSignatureFlowEnabled()) return null;
  return signatureFlowState.steps[signatureFlowState.currentIndex] || null;
}

function syncSignatureToSlot(slotId, signatureDataUrl, altText) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  if (!signatureDataUrl) {
    slot.innerHTML = '';
    return;
  }
  slot.innerHTML = `<img src="${signatureDataUrl}" alt="${altText || 'Firma'}" class="ax-signature-img">`;
}

function updateSignatureFlowUi() {
  const indicator = document.getElementById('signatureStepIndicator');
  const submitBtn = document.getElementById('submitSignature');
  const step = getCurrentSignatureStep();
  if (!indicator || !submitBtn || !step) return;

  const total = signatureFlowState.steps.length;
  const current = signatureFlowState.currentIndex + 1;
  indicator.textContent = `Paso ${current}/${total}: Firma de ${step.label}`;

  if (current < total) {
    submitBtn.innerHTML = 'Continuar';
  } else {
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Firmar y generar PDF';
  }
}

function commitCurrentStepSignature() {
  if (!signaturePad || signaturePad.isEmpty()) {
    showToast('Por favor dibuje su firma en el recuadro', 'error');
    return null;
  }
  const step = getCurrentSignatureStep();
  if (!step) return null;
  const dataUrl = signaturePad.toDataURL('image/png');
  signatureFlowState.signatures[step.slotId] = dataUrl;
  syncSignatureToSlot(step.slotId, dataUrl, `Firma ${step.label}`);
  return dataUrl;
}

function advanceSignatureStep() {
  if (!isSignatureFlowEnabled()) return;
  const total = signatureFlowState.steps.length;
  if (signatureFlowState.currentIndex >= total - 1) return;
  signatureFlowState.currentIndex += 1;
  if (signaturePad) signaturePad.clear();
  updateSignatureFlowUi();
  updateAnesthesiaWitnessFieldLocks();
}

function syncPatientSignatureToTemplate(signatureDataUrl) {
  if (isSignatureFlowEnabled()) {
    const step = getCurrentSignatureStep();
    if (!step) return;
    syncSignatureToSlot(step.slotId, signatureDataUrl, `Firma ${step.label}`);
    return;
  }
  syncSignatureToSlot('axPacienteSignSlot', signatureDataUrl, 'Firma del paciente');
}

function initSignaturePad() {
  const canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;
  const container = canvas.closest('.signature-canvas-wrapper');
  const maxW = container ? container.clientWidth - 16 : 800;
  canvas.width = maxW;
  canvas.height = Math.round(maxW * 0.62);

  signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0, 0, 0)',
    minWidth: 1,
    maxWidth: 2.5
  });

  const wrapper = canvas.closest('.signature-canvas-wrapper');
  signaturePad.addEventListener('beginStroke', () => wrapper.classList.add('signing'));
  signaturePad.addEventListener('endStroke', () => {
    wrapper.classList.remove('signing');
    syncPatientSignatureToTemplate(signaturePad.toDataURL('image/png'));
  });

  const steps = getSignatureFlowSteps();
  signatureFlowState = {
    enabled: !window._isRevocation && steps.length > 1,
    currentIndex: 0,
    steps,
    signatures: {}
  };
  if (isSignatureFlowEnabled()) {
    updateSignatureFlowUi();
  } else {
    const indicator = document.getElementById('signatureStepIndicator');
    if (indicator) indicator.style.display = 'none';
  }
  updateAnesthesiaWitnessFieldLocks();

  document.getElementById('clearSignature')?.addEventListener('click', () => {
    signaturePad.clear();
    if (isSignatureFlowEnabled()) {
      const step = getCurrentSignatureStep();
      if (step) {
        delete signatureFlowState.signatures[step.slotId];
        syncSignatureToSlot(step.slotId, '', '');
      }
    } else {
      syncPatientSignatureToTemplate('');
    }
    showToast('Firma borrada');
  });

  document.getElementById('submitSignature')?.addEventListener('click', submitSignature);
}

/**
 * Validación obligatorios — consentimiento de anestesia (paciente), antes de firmar y generar PDF.
 * @returns {{ el: Element|null, msg: string }|null}
 */
function validateAnesthesiaPatientConsentForm() {
  const form = document.getElementById('consentForm');
  if (!form) return null;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  const t = (name) => String(q(name)?.value || '').trim();
  const fail = (el, msg) => ({ el: el || null, msg });

  if (!t('ax_ciudad')) return fail(q('ax_ciudad'), 'Indique la ciudad (§1 Lugar y fecha).');
  if (!t('ax_fecha_hora')) return fail(q('ax_fecha_hora'), 'Indique la fecha y hora (§1).');

  if (!t('ax_nombre_otorga')) return fail(q('ax_nombre_otorga'), 'Indique quién otorga el consentimiento (§2).');
  if (!t('ax_doc_otorga')) return fail(q('ax_doc_otorga'), 'Indique el documento de identidad (§2).');

  const delPaciente = q('ax_paciente')?.checked;
  if (delPaciente) {
    const calOk = ['ax_padre', 'ax_tutor', 'ax_apoderado', 'ax_conyuge'].some((n) => q(n)?.checked);
    if (!calOk) return fail(q('ax_padre'), 'Seleccione la calidad o representación (§2).');
    const pn = q('ax_paciente_nombre');
    const pd = q('ax_paciente_doc');
    if (pn && !pn.readOnly && !t('ax_paciente_nombre')) return fail(pn, 'Indique el nombre del paciente (§2).');
    if (pd && !pd.readOnly && !t('ax_paciente_doc')) return fail(pd, 'Indique el documento del paciente (§2).');
  }

  const noAuth = q('declara_no_autoriza')?.checked;
  if (noAuth) {
    if (!q('ax_disent_rechaza')?.checked) {
      return fail(q('ax_disent_rechaza'), 'Debe marcar «Rechazo el procedimiento» en el disentimiento (§9).');
    }
    if (!t('ax_disent_motivo')) return fail(q('ax_disent_motivo'), 'Indique el motivo del disentimiento (§9).');
    if (!t('ax_disent_fecha_hora')) return fail(q('ax_disent_fecha_hora'), 'Indique la fecha y hora del disentimiento (§9).');
    if (!t('ax_disent_nombre_doc')) return fail(q('ax_disent_nombre_doc'), 'Complete nombre y documento en el disentimiento (§9).');
    if (!t('ax_disent_calidad')) return fail(q('ax_disent_calidad'), 'Complete «en calidad de» en el disentimiento (§9).');
  } else {
    if (!q('declara_informado')?.checked) return fail(q('declara_informado'), 'Debe aceptar la declaración sobre información recibida (§8).');
    if (!q('declara_revocacion_info')?.checked) return fail(q('declara_revocacion_info'), 'Debe aceptar la declaración sobre revocación del consentimiento (§8).');
    if (!q('declara_voluntario')?.checked) return fail(q('declara_voluntario'), 'Debe otorgar su consentimiento en el §8.');
  }

  if (!t('ax_firma_paciente_nombre')) {
    return fail(q('ax_firma_paciente_nombre'), 'Revise la identificación (§2): debe aparecer el texto bajo la firma del paciente.');
  }
  if (!t('ax_testigo1')) return fail(q('ax_testigo1'), 'Complete nombre y vínculo del testigo 1.');
  if (!t('ax_testigo2')) return fail(q('ax_testigo2'), 'Complete nombre y documento del testigo 2.');

  return null;
}

/**
 * Validaciones obligatorias globales (todos los consentimientos):
 * - Fecha/hora del consentimiento
 * - Nombre de testigo 1
 * - Nombre de testigo 2
 * @returns {{ el: Element|null, msg: string }|null}
 */
function validateCommonRequiredForAllConsents() {
  const form = document.getElementById('consentForm');
  if (!form) return null;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  const t = (name) => String(q(name)?.value || '').trim();
  const fail = (el, msg) => ({ el: el || null, msg });

  const fechaField = q('ax_fecha_hora') || q('ci_fecha_hora');
  if (fechaField && !String(fechaField.value || '').trim()) {
    return fail(fechaField, 'Debe diligenciar la fecha y hora del consentimiento.');
  }

  const testigo1 = q('ax_testigo1') || q('bi_testigo1');
  if (testigo1 && !t(testigo1.name)) {
    return fail(testigo1, 'Debe diligenciar el nombre del testigo 1.');
  }

  const testigo2 = q('ax_testigo2') || q('bi_testigo2');
  if (testigo2 && !t(testigo2.name)) {
    return fail(testigo2, 'Debe diligenciar el nombre del testigo 2.');
  }

  return null;
}

/** Disentimiento informado (plantillas con bloque cv / ci4 / ci5 / bi). */
const DISSENT_FIELD_SETS = [
  ['bi_disent_rechaza', 'bi_disent_motivo', 'bi_disent_fecha_hora', 'bi_disent_nombre_doc', 'bi_disent_calidad'],
  ['cv_disent_rechaza', 'cv_disent_motivo', 'cv_disent_fecha_hora', 'cv_disent_nombre_doc', 'cv_disent_calidad'],
  ['ci4_disent_rechaza', 'ci4_disent_motivo', 'ci4_disent_fecha_hora', 'ci4_disent_nombre_doc', 'ci4_disent_calidad'],
  ['ci5_disent_rechaza', 'ci5_disent_motivo', 'ci5_disent_fecha_hora', 'ci5_disent_nombre_doc', 'ci5_disent_calidad'],
  ['ci6_disent_rechaza', 'ci6_disent_motivo', 'ci6_disent_fecha_hora', 'ci6_disent_nombre_doc', 'ci6_disent_calidad'],
  ['ci7_disent_rechaza', 'ci7_disent_motivo', 'ci7_disent_fecha_hora', 'ci7_disent_nombre_doc', 'ci7_disent_calidad'],
  ['ci8_disent_rechaza', 'ci8_disent_motivo', 'ci8_disent_fecha_hora', 'ci8_disent_nombre_doc', 'ci8_disent_calidad'],
  ['ci9_disent_rechaza', 'ci9_disent_motivo', 'ci9_disent_fecha_hora', 'ci9_disent_nombre_doc', 'ci9_disent_calidad'],
  ['ci10_disent_rechaza', 'ci10_disent_motivo', 'ci10_disent_fecha_hora', 'ci10_disent_nombre_doc', 'ci10_disent_calidad']
];

/**
 * Paciente — consentimientos con intro común ci_* (bariátrica en viewer, cardiovascular, circuncisión, colecistectomía, etc.).
 * Incluye §1–2, declaraciones §8, disentimiento, testigos y línea bajo firma del paciente.
 * @returns {{ el: Element|null, msg: string }|null}
 */
function validateCommonCiTemplatePatientConsentForm() {
  const form = document.getElementById('consentForm');
  if (!form || !form.querySelector('[name="ci_fecha_hora"]')) return null;
  const q = (name) => form.querySelector(`[name="${name}"]`);
  const t = (name) => String(q(name)?.value || '').trim();
  const fail = (el, msg) => ({ el: el || null, msg });

  if (!t('ci_ciudad')) return fail(q('ci_ciudad'), 'Indique la ciudad (§1 Lugar y fecha).');
  if (!t('ci_fecha_hora')) return fail(q('ci_fecha_hora'), 'Indique la fecha y hora (§1).');

  if (!t('ci_nombre_otorga')) return fail(q('ci_nombre_otorga'), 'Indique quién otorga el consentimiento (§2).');
  if (!t('ci_doc_otorga')) return fail(q('ci_doc_otorga'), 'Indique el documento de identidad (§2).');

  const delPaciente = q('ci_paciente')?.checked;
  if (delPaciente) {
    const calOk = ['ci_padre', 'ci_tutor', 'ci_apoderado', 'ci_conyuge', 'ci_familiar'].some((n) => q(n)?.checked);
    if (!calOk) return fail(q('ci_padre'), 'Seleccione la calidad o representación (§2).');
    if (!t('ci_paciente_nombre')) return fail(q('ci_paciente_nombre'), 'Indique el nombre del paciente (§2).');
    if (!t('ci_paciente_doc')) return fail(q('ci_paciente_doc'), 'Indique el documento del paciente (§2).');
  }

  if (q('medico') && !t('medico')) {
    return fail(q('medico'), 'Debe constar el médico tratante (§3). Si falta, el médico debe completar y guardar antes de firmar.');
  }
  if (q('diagnostico') && !t('diagnostico')) {
    return fail(q('diagnostico'), 'Debe constar el diagnóstico (§3). Si falta, el médico debe completar y guardar antes de firmar.');
  }
  if (q('servicio') && !t('servicio')) {
    return fail(q('servicio'), 'Debe constar el procedimiento a realizar (§3). Si falta, el médico debe completar y guardar antes de firmar.');
  }

  if (q('cv_procedimiento_especifico') && !t('cv_procedimiento_especifico')) {
    return fail(q('cv_procedimiento_especifico'), 'El médico debe indicar el procedimiento específico (y guardar datos médicos) antes de firmar.');
  }
  if (q('cv_riesgos_adicionales') && !t('cv_riesgos_adicionales')) {
    return fail(q('cv_riesgos_adicionales'), 'Deben constar los riesgos adicionales del caso (§6). Si faltan, el médico debe completar y guardar antes de firmar.');
  }
  if (q('ci4_riesgos_adicionales') && !t('ci4_riesgos_adicionales')) {
    return fail(q('ci4_riesgos_adicionales'), 'Deben constar los riesgos adicionales del caso (§6). Si faltan, el médico debe completar y guardar antes de firmar.');
  }
  if (q('ci5_riesgos_adicionales') && !t('ci5_riesgos_adicionales')) {
    return fail(q('ci5_riesgos_adicionales'), 'Deben constar los riesgos adicionales del caso (§6). Si faltan, el médico debe completar y guardar antes de firmar.');
  }
  if (q('ci6_riesgos_adicionales') && !t('ci6_riesgos_adicionales')) {
    return fail(q('ci6_riesgos_adicionales'), 'Deben constar los riesgos adicionales del caso (§6). Si faltan, el médico debe completar y guardar antes de firmar.');
  }
  if (q('ci7_riesgos_adicionales') && !t('ci7_riesgos_adicionales')) {
    return fail(q('ci7_riesgos_adicionales'), 'Deben constar los riesgos adicionales del caso (§6). Si faltan, el médico debe completar y guardar antes de firmar.');
  }
  if (q('ci8_riesgos_adicionales') && !t('ci8_riesgos_adicionales')) {
    return fail(q('ci8_riesgos_adicionales'), 'Deben constar los riesgos adicionales del caso (§6). Si faltan, el médico debe completar y guardar antes de firmar.');
  }
  if (q('ci9_riesgos_adicionales') && !t('ci9_riesgos_adicionales')) {
    return fail(q('ci9_riesgos_adicionales'), 'Deben constar los riesgos adicionales del caso (§6). Si faltan, el médico debe completar y guardar antes de firmar.');
  }
  if (q('ci10_riesgos_adicionales') && !t('ci10_riesgos_adicionales')) {
    return fail(q('ci10_riesgos_adicionales'), 'Deben constar los riesgos adicionales del caso (§6). Si faltan, el médico debe completar y guardar antes de firmar.');
  }

  const noAuth = q('declara_no_autoriza')?.checked;
  if (noAuth) {
    const dissentNames = DISSENT_FIELD_SETS.find(([r]) => q(r));
    if (dissentNames) {
      const [rName, mName, fName, nName, cName] = dissentNames;
      const rechaza = q(rName);
      if (!rechaza?.checked) {
        return fail(rechaza, 'Debe marcar «Rechazo el procedimiento» en el disentimiento.');
      }
      if (!t(mName)) return fail(q(mName), 'Indique el motivo del disentimiento.');
      if (!t(fName)) return fail(q(fName), 'Indique la fecha y hora del disentimiento.');
      if (!t(nName)) return fail(q(nName), 'Complete nombre y documento en el disentimiento.');
      if (!t(cName)) return fail(q(cName), 'Complete «en calidad de» en el disentimiento.');
    } else {
      const reasonField = form.querySelector('textarea[name="motivo_no_autoriza"]');
      if (!reasonField || !String(reasonField.value || '').trim()) {
        return fail(reasonField, 'Debe explicar el motivo de la no autorización.');
      }
    }
  } else {
    const inf = q('declara_informado');
    if (inf && !inf.checked) {
      return fail(inf, 'Debe aceptar la declaración sobre información recibida (§8).');
    }
    const uro = q('ci4_declara_autoriza_dr');
    if (uro && uro.required && !uro.checked) {
      return fail(uro, 'Debe aceptar la autorización al profesional indicado (§8).');
    }
    const rev = q('declara_revocacion_info');
    if (rev && rev.required && !rev.checked) {
      return fail(rev, 'Debe aceptar la declaración sobre revocación del consentimiento (§8).');
    }
    const vol = q('declara_voluntario');
    if (vol && !vol.checked) {
      return fail(vol, 'Debe otorgar su consentimiento en el §8.');
    }
  }

  if (!t('ax_firma_paciente_nombre')) {
    return fail(q('ax_firma_paciente_nombre'), 'Revise la identificación (§2): debe aparecer el texto bajo la firma del paciente.');
  }
  if (!t('ax_testigo1')) return fail(q('ax_testigo1'), 'Complete nombre y vínculo del testigo 1.');
  if (!t('ax_testigo2')) return fail(q('ax_testigo2'), 'Complete nombre y documento del testigo 2.');

  return null;
}

function submitSignature() {
  const params = new URLSearchParams(window.location.search);
  const consentIdNum = Number(params.get('id'));
  const isAnesthesiaConsent = consentIdNum === 1;

  const isRevocation = window._isRevocation === true;
  const isFlow = isSignatureFlowEnabled();
  const isLastFlowStep = isFlow && signatureFlowState.currentIndex === signatureFlowState.steps.length - 1;
  const finalizingSignature = !isRevocation && (!isFlow || isLastFlowStep);

  if (isFlow && !isLastFlowStep) {
    const saved = commitCurrentStepSignature();
    if (!saved) return;
    advanceSignatureStep();
    showToast(`Firma guardada (${signatureFlowState.currentIndex}/${signatureFlowState.steps.length})`);
    return;
  }

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
  } else if (isAnesthesiaConsent && finalizingSignature) {
    const commonInv = validateCommonRequiredForAllConsents();
    if (commonInv) {
      showToast(commonInv.msg, 'error');
      if (commonInv.el) {
        commonInv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof commonInv.el.focus === 'function') {
          try { commonInv.el.focus(); } catch {}
        }
      }
      return;
    }
    const inv = validateAnesthesiaPatientConsentForm();
    if (inv) {
      showToast(inv.msg, 'error');
      if (inv.el) {
        inv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof inv.el.focus === 'function') {
          try {
            inv.el.focus();
          } catch {
            // p. ej. textarea readonly
          }
        }
      }
      return;
    }
  } else {
    const isCiTemplate = !!document.querySelector('[name="ci_fecha_hora"]');
    if (finalizingSignature) {
      if (isCiTemplate) {
        const tplInv = validateCommonCiTemplatePatientConsentForm();
        if (tplInv) {
          showToast(tplInv.msg, 'error');
          if (tplInv.el) {
            tplInv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (typeof tplInv.el.focus === 'function') {
              try { tplInv.el.focus(); } catch {}
            }
          }
          return;
        }
      } else {
        const commonInv = validateCommonRequiredForAllConsents();
        if (commonInv) {
          showToast(commonInv.msg, 'error');
          if (commonInv.el) {
            commonInv.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (typeof commonInv.el.focus === 'function') {
              try { commonInv.el.focus(); } catch {}
            }
          }
          return;
        }
      }
    }

    const noAuthCheck = document.getElementById('chkNoAuth')
      || document.querySelector('input[name="declara_no_autoriza"]');
    const isNoAuth = !!(noAuthCheck && noAuthCheck.checked);

    if (!isCiTemplate) {
      if (isNoAuth) {
        const isBariatricDissent = !!document.querySelector('[name="bi_disent_rechaza"]');
        if (isBariatricDissent) {
          const rechaza = document.querySelector('[name="bi_disent_rechaza"]');
          const motivo = document.querySelector('[name="bi_disent_motivo"]');
          const fechaHora = document.querySelector('[name="bi_disent_fecha_hora"]');
          const nombreDoc = document.querySelector('[name="bi_disent_nombre_doc"]');
          const calidad = document.querySelector('[name="bi_disent_calidad"]');

          if (!rechaza?.checked) {
            showToast('Debe marcar "Rechazo el procedimiento" en el disentimiento.', 'error');
            rechaza?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          if (!String(motivo?.value || '').trim()) {
            showToast('Debe indicar el motivo del disentimiento.', 'error');
            motivo?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          if (!String(fechaHora?.value || '').trim()) {
            showToast('Debe indicar la fecha y hora del disentimiento.', 'error');
            fechaHora?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          if (!String(nombreDoc?.value || '').trim()) {
            showToast('Debe completar nombre y documento en el disentimiento.', 'error');
            nombreDoc?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          if (!String(calidad?.value || '').trim()) {
            showToast('Debe completar la calidad en el disentimiento.', 'error');
            calidad?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
        } else {
          const reasonField = document.querySelector('textarea[name="motivo_no_autoriza"]');
          if (!reasonField || !reasonField.value.trim()) {
            showToast('Debe explicar el motivo de la no autorización', 'error');
            if (reasonField) reasonField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
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
  }

  if (isFlow) {
    const saved = commitCurrentStepSignature();
    if (!saved) return;
    if (isAnesthesiaConsent && signatureFlowState?.steps) {
      for (const st of signatureFlowState.steps) {
        const src = signatureFlowState.signatures[st.slotId];
        if (!src) {
          showToast(`Falta la firma: ${st.label}.`, 'error');
          document.getElementById(st.slotId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
      }
    }
  } else if (!signaturePad || signaturePad.isEmpty()) {
      showToast('Por favor dibuje su firma en el recuadro', 'error');
      return;
  }

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

function drawSectionBar(doc, text, x, y, w) {
  doc.setFillColor(0, 131, 143);
  doc.rect(x, y, w, 5.8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.6);
  doc.setTextColor(255, 255, 255);
  doc.text(String(text || '').toUpperCase(), x + 1.6, y + 4.1);
}

function getConsentDocumentMeta(consent) {
  const id = Number(consent?.id);
  const byConsent = {
    3: { codigo: 'CI-DM-001', version: '2.0', fecha: '2026-03-13' }, // Cardiovascular
    2: { codigo: 'CI-DM-002', version: '2.0', fecha: '2026-03-13' }, // Bariátrica
    1: { codigo: 'CI-DM-003', version: '2.0', fecha: '2026-03-13' }, // Anestesia
    4: { codigo: 'CI-URO-003', version: '2.0', fecha: '2026-03-13' }, // Circuncisión
    5: { codigo: 'CI-DM-004', version: '2.0', fecha: '2026-03-13' }, // Colecistectomía laparoscópica
    6: { codigo: 'CI-GAS-001', version: '2.0', fecha: '2026-03-13' }, // Colonoscopia
    7: { codigo: 'CI-GAS-002', version: '2.0', fecha: '2026-03-13' }, // Endoscopia digestiva alta
    8: { codigo: 'CI-OFT-001', version: '2.0', fecha: '2026-03-13' }, // Extracción extracapsular de cristalino
    9: { codigo: 'CI-DM-005', version: '2.0', fecha: '2026-03-13' }, // Herniorrafia umbilical
    10: { codigo: 'CI-URO-016', version: '2.0', fecha: '2026-03-13' }  // Litotricia extracorpórea (ondas de choque)
  };
  const specific = byConsent[id] || {};
  return {
    codigo: specific.codigo || consent?.codigo || 'N/A',
    version: specific.version || consent?.version || 'N/A',
    fecha: specific.fecha || consent?.vigente || 'N/A'
  };
}

function resolveControlDocumentalSectionNumber(defaultNumber = 10) {
  try {
    const titles = Array.from(document.querySelectorAll('.document-content-box .anx-block-title'));
    const nums = titles
      .map((el) => {
        const m = String(el.textContent || '').trim().match(/^(\d+)\s*\./);
        return m ? Number(m[1]) : null;
      })
      .filter((n) => Number.isFinite(n));
    if (!nums.length) return defaultNumber;
    return Math.max(...nums) + 1;
  } catch {
    return defaultNumber;
  }
}

async function generateAnesthesiaPdfStructured(consent, patient, signaturesPayload) {
  const jsPDF = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
  if (!jsPDF) throw new Error('La libreria jsPDF no se cargo correctamente.');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const mL = 10;
  const mR = 10;
  const uW = pageW - mL - mR;
  let y = 9;

  const q = (name) => document.querySelector(`[name="${name}"]`);
  const gv = (name, fallback = '') => (q(name)?.value || fallback || '').toString().trim();
  const gc = (name) => !!q(name)?.checked;
  const writeVectorCheckLine = (checked, text, options = {}) => {
    const { x = mL + 1, maxW = uW - 2, fontSize = 7.1, lineH = 3.2 } = options;
    writeWrapped(`${checked ? '[x]' : '[ ]'} ${String(text || '')}`, { x, maxW, fontSize, lineH });
  };
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
      logoImg.onerror = () => reject(new Error('Logo no cargado'));
      logoImg.src = '/assets/descarga.png';
    });
  } catch {
    logoDataUrl = null;
  }
  const ensureSpace = (needed = 8) => {
    if (y + needed <= pageH - 12) return;
    doc.addPage();
    y = 10;
  };
  const writeWrapped = (text, options = {}) => {
    const {
      x = mL + 1,
      maxW = uW - 2,
      fontSize = 7.8,
      lineH = 3.7
    } = options;
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(String(text || ''), maxW);
    ensureSpace(lines.length * lineH + 2.2);
    doc.text(lines, x, y);
    y += lines.length * lineH;
  };

  // Header
  doc.setFillColor(0, 131, 143);
  doc.rect(0, 0, pageW, 1.8, 'F');
  doc.setDrawColor(0, 131, 143);
  doc.setLineWidth(0.2);
  doc.line(mL, y + 9, pageW - mR, y + 9);
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', mL, y + 0.8, 34, 8.2);
  } else {
    doc.setTextColor(0, 96, 100);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('MEDIHELP', mL + 8, y + 4);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.text('COMPLEJO DE SALUD', mL + 8, y + 7);
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('CLINICA MEDIHELP SERVICES', pageW - mR, y + 2.8, { align: 'right' });
  doc.text('DIRECCION MEDICA Y CIENTIFICA', pageW - mR, y + 5.8, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.text('Cartagena de Indias, Colombia', pageW - mR, y + 8.6, { align: 'right' });
  y += 16;

  // Meta row
  const docMeta = getConsentDocumentMeta(consent);
  const cW = uW / 3;
  drawSectionBar(doc, 'CODIGO', mL, y, cW);
  drawSectionBar(doc, 'VERSION', mL + cW, y, cW);
  drawSectionBar(doc, 'FECHA', mL + cW * 2, y, cW);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(30, 41, 59);
  doc.rect(mL, y + 5.8, cW, 6);
  doc.rect(mL + cW, y + 5.8, cW, 6);
  doc.rect(mL + cW * 2, y + 5.8, cW, 6);
  doc.text(gv('ax_codigo', docMeta.codigo) || docMeta.codigo, mL + 1.2, y + 9.9);
  doc.text(gv('ax_version', docMeta.version) || docMeta.version, mL + cW + 1.2, y + 9.9);
  doc.text(gv('ax_fecha_doc', docMeta.fecha), mL + cW * 2 + 1.2, y + 9.9);
  y += 18.5;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(20, 83, 87);
  doc.text('CONSENTIMIENTO INFORMADO - ANESTESIA GENERAL / REGIONAL / SEDACION', pageW / 2, y, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  doc.text('Servicio de Anestesiologia - Clinica Medihelp Services', pageW / 2, y + 4.2, { align: 'center' });
  y += 10.5;

  // Section 1
  ensureSpace(12);
  drawSectionBar(doc, '1. LUGAR Y FECHA', mL, y, uW); y += 9.2;
  doc.setTextColor(15, 23, 42);
  writeWrapped(`Ciudad: ${gv('ax_ciudad', 'Cartagena de Indias - Bolivar')}   Fecha y hora: ${gv('ax_fecha_hora')}`, { fontSize: 7.8, lineH: 3.7 });
  y += 1.6;

  // Section 2
  ensureSpace(17);
  drawSectionBar(doc, '2. IDENTIFICACION DE QUIEN OTORGA EL CONSENTIMIENTO', mL, y, uW); y += 9.2;
  doc.setTextColor(15, 23, 42);
  writeWrapped(`Yo: ${gv('ax_nombre_otorga', patient?.nombre || '')}   identificado(a) con: ${gv('ax_doc_otorga', `${patient?.tipoDoc || 'CC'} ${patient?.cedula || ''}`)}`, { fontSize: 7.6, lineH: 3.6 });
  writeWrapped('Actuo en nombre de:', { fontSize: 7.6, lineH: 3.6 });
  writeVectorCheckLine(gc('ax_mi_mismo'), 'Mi mismo(a)', { fontSize: 7.4, lineH: 3.4 });
  writeVectorCheckLine(gc('ax_paciente'), `Del/La paciente: ${gv('ax_paciente_nombre')}   Doc. N: ${gv('ax_paciente_doc')}`, { fontSize: 7.4, lineH: 3.4 });
  writeWrapped('Calidad / representacion:', { fontSize: 7.6, lineH: 3.6 });
  writeVectorCheckLine(gc('ax_padre'), 'Padre/Madre', { fontSize: 7.4, lineH: 3.2 });
  writeVectorCheckLine(gc('ax_tutor'), 'Tutor legal', { fontSize: 7.4, lineH: 3.2 });
  writeVectorCheckLine(gc('ax_apoderado'), 'Apoderado(a)', { fontSize: 7.4, lineH: 3.2 });
  writeVectorCheckLine(gc('ax_conyuge'), 'Conyuge', { fontSize: 7.4, lineH: 3.2 });
  y += 1.6;

  // Section 3
  ensureSpace(14);
  drawSectionBar(doc, '3. INFORMACION MEDICA RECIBIDA', mL, y, uW); y += 9.2;
  doc.setTextColor(15, 23, 42);
  writeWrapped(`Doctor(a) tratante: ${gv('medico')}`, { fontSize: 7.6, lineH: 3.6 });
  writeWrapped(`Enfermedad / diagnostico: ${gv('diagnostico')}`, { fontSize: 7.6, lineH: 3.6 });
  writeWrapped(`Procedimiento a realizar: ${gv('servicio')}`, { fontSize: 7.6, lineH: 3.6 });
  y += 1.5;

  // Section 4
  ensureSpace(20);
  drawSectionBar(doc, '4. DESCRIPCION DEL PROCEDIMIENTO', mL, y, uW); y += 9.2;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  writeWrapped('La anestesia es un estado controlado de inconsciencia, insensibilidad al dolor o relajacion muscular, inducido por medicamentos, con el fin de permitir la realizacion de procedimientos quirurgicos o diagnosticos.', { fontSize: 7.2, lineH: 3.3 });
  writeWrapped('Los tipos de anestesia a utilizar son:', { fontSize: 7.2, lineH: 3.3 });
  writeVectorCheckLine(gc('ax_tipo_general'), 'Anestesia general: perdida total de la consciencia y el dolor durante el procedimiento mediante medicamentos intravenosos y/o inhalados. Requiere manejo de la via aerea (intubacion endotraqueal o mascara laringea).', { fontSize: 7.1, lineH: 3.2 });
  writeVectorCheckLine(gc('ax_tipo_regional'), 'Anestesia regional (epidural / raquidea / bloqueos nerviosos): se insensibiliza una region del cuerpo inyectando anestesico local cerca de nervios o la medula espinal. El paciente permanece despierto o con sedacion leve.', { fontSize: 7.1, lineH: 3.2 });
  writeVectorCheckLine(gc('ax_tipo_sedacion'), 'Sedacion / anestesia monitoreada: estado de somnolencia controlada que permite la realizacion del procedimiento con preservacion de la respiracion espontanea.', { fontSize: 7.1, lineH: 3.2 });
  writeWrapped('El tipo de anestesia se selecciona segun el procedimiento, las condiciones de salud del paciente y criterio del anestesiologo.', { fontSize: 7.2, lineH: 3.3 });
  {
    const raw = gv('ax_tipo_anestesia');
    const paras = String(raw || '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (paras.length) {
      writeWrapped(`Tipo de anestesia indicado para este caso: ${paras[0]}`, { fontSize: 7.2, lineH: 3.3 });
      paras.slice(1).forEach((p) => writeWrapped(p, { fontSize: 7.2, lineH: 3.3 }));
    } else {
      writeWrapped('Tipo de anestesia indicado para este caso:', { fontSize: 7.2, lineH: 3.3 });
    }
  }
  y += 1.4;

  // Section 5
  ensureSpace(24);
  drawSectionBar(doc, '5. POSIBLES COMPLICACIONES', mL, y, uW); y += 9.2;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  writeWrapped('Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:', { fontSize: 7.1, lineH: 3.1 });
  y += 1.1;
  doc.setFillColor(0, 131, 143);
  doc.rect(mL, y, uW * 0.78, 5, 'F');
  doc.rect(mL + uW * 0.78, y, uW * 0.22, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('COMPLICACION / RIESGO', mL + uW * 0.39, y + 3.4, { align: 'center' });
  doc.text('FRECUENCIA', mL + uW * 0.89, y + 3.4, { align: 'center' });
  y += 5.2;
  doc.setFont('helvetica', 'normal'); doc.setTextColor(30, 41, 59);
  const risks = [
    ['Nauseas y vomitos postoperatorios', '20-30%'],
    ['Dolor de garganta o ronquera por intubacion (transitorio)', '20-40%'],
    ['Escalofrios postanestesia', 'Frecuente'],
    ['Dolor en el sitio de puncion o inyeccion', 'Frecuente'],
    ['Confusion o desorientacion transitoria al despertar (especialmente en adultos mayores)', 'Variable'],
    ['Cefalea postpuncion dural (en anestesia espinal / epidural)', '1-3%'],
    ['Hipotension arterial durante el procedimiento', '5-20%'],
    ['Bradicardia (disminucion del ritmo cardiaco)', 'Variable'],
    ['Dificultad para el manejo de la via aerea / laringoespasmo', '0.1-1%'],
    ['Reacciones alergicas a medicamentos anestesicos', 'Raro, <1%'],
    ['Hipertermia maligna (reaccion rara a ciertos gases anestesicos)', 'Muy raro, 1:50,000'],
    ['Lesion dental por instrumentos de via aerea', 'Raro'],
    ['Aspiracion gastrica y neumonia por aspiracion', 'Raro, <0.1%'],
    ['Neuropatia periferica por posicion prolongada', 'Raro'],
    ['Bloqueo espinal total / toxicidad por anestesico local (en anestesia regional)', 'Muy raro'],
    ['Lesion neurologica o paralisis transitoria o permanente (en anestesia regional)', 'Muy raro'],
    ['Complicaciones cardiorespiratorias graves', 'Poco frecuente'],
    ['Muerte relacionada con la anestesia', 'Muy raro, 1:100.000-1:200.000']
  ];
  risks.forEach(([r, f], i) => {
    const riskLines = doc.splitTextToSize(r, uW * 0.76);
    const h = Math.max(5, (riskLines.length * 3.1) + 1.6);
    if (y + h > pageH - 14) { doc.addPage(); y = 8; }
    if (i % 2 === 0) { doc.setFillColor(242, 247, 247); doc.rect(mL, y, uW, h, 'F'); }
    doc.setDrawColor(208, 216, 216); doc.setLineWidth(0.1);
    doc.rect(mL, y, uW * 0.78, h);
    doc.rect(mL + uW * 0.78, y, uW * 0.22, h);
    doc.setFontSize(7);
    doc.text(riskLines, mL + 0.9, y + 3.1);
    doc.text(f, mL + uW * 0.79 + 0.9, y + 3.2);
    y += h;
  });
  y += 1.2;

  // Section 6
  ensureSpace(12);
  drawSectionBar(doc, '6. RIESGOS ADICIONALES DE MI CASO PARTICULAR', mL, y, uW); y += 9.2;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  writeWrapped('En mi caso particular, el medico me ha explicado los siguientes riesgos adicionales segun mis condiciones de salud individuales:', { fontSize: 7.1, lineH: 3.1 });
  y += 1.1;
  doc.line(mL + 1, y, pageW - mR - 1, y);
  y += 1.2;
  {
    const raw = gv('ax_riesgos_adicionales');
    const paras = String(raw || '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (paras.length) {
      paras.forEach((p) => writeWrapped(p, { fontSize: 7.1, lineH: 3.1 }));
    } else {
      y += 2.5;
    }
  }
  y += 0.5;

  // Section 7
  ensureSpace(10);
  drawSectionBar(doc, '7. ALTERNATIVAS AL PROCEDIMIENTO', mL, y, uW); y += 9.2;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'normal');
  writeVectorCheckLine(gc('ax_alt_1'), 'Otro tipo de anestesia', { fontSize: 7.2, lineH: 3.2 });
  writeVectorCheckLine(gc('ax_alt_2'), 'Analgesia / sedacion sin anestesia general', { fontSize: 7.2, lineH: 3.2 });
  writeVectorCheckLine(gc('ax_alt_3'), 'No realizar procedimiento que requiere anestesia', { fontSize: 7.2, lineH: 3.2 });
  y += 1.2;

  // Section 8
  ensureSpace(14);
  drawSectionBar(doc, '8. DECLARACION DE ENTENDIMIENTO Y ACEPTACION', mL, y, uW); y += 9.2;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'normal');
  const decl = [
    [gc('declara_informado'), 'Declaro que he leido el presente documento - o me ha sido leido en caso de no poder hacerlo por mi mismo(a) - y he entendido la informacion que se me ha suministrado.'],
    [gc('declara_revocacion_info'), 'Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realizacion del procedimiento, sin que ello implique perjuicio alguno para mi atencion medica.'],
    [gc('declara_voluntario'), 'Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realizacion del procedimiento descrito.'],
    [gc('declara_no_autoriza'), 'No autorizo la realizacion del procedimiento descrito en este consentimiento.']
  ];
  decl.forEach(([ck, txt]) => {
    writeVectorCheckLine(!!ck, txt, { fontSize: 7.1, lineH: 3.2 });
    y += 0.8;
  });
  y += 1.4;

  // Section 9 (firma/disentimiento condicional)
  const isNoAuth = gc('declara_no_autoriza');
  ensureSpace(isNoAuth ? 72 : 66);
  drawSectionBar(doc, isNoAuth ? '9. DISENTIMIENTO - Rechazo del Consentimiento' : '9. FIRMAS DE CONSENTIMIENTO', mL, y, uW); y += 8.4;
  if (isNoAuth) {
    y += 0.8;
    writeWrapped(`Yo, (nombre y documento): ${gv('ax_disent_nombre_doc')}`, { fontSize: 7, lineH: 3.3 });
    writeWrapped(`en calidad de: ${gv('ax_disent_calidad', 'Paciente o Rep. Legal')}`, { fontSize: 7, lineH: 3.3 });
    writeWrapped('Declaro que:', { fontSize: 7, lineH: 3.3 });
    writeVectorCheckLine(gc('ax_disent_rechaza'), 'Rechazo el procedimiento', { fontSize: 7, lineH: 3.2 });
    {
      const motivoRaw = gv('ax_disent_motivo');
      const paras = String(motivoRaw || '')
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (paras.length) {
        writeWrapped(`Motivo: ${paras[0]}`, { fontSize: 7, lineH: 3.3 });
        paras.slice(1).forEach((p) => writeWrapped(p, { fontSize: 7, lineH: 3.3 }));
      } else {
        writeWrapped('Motivo:', { fontSize: 7, lineH: 3.3 });
      }
    }
    writeWrapped(`Fecha y hora: ${gv('ax_disent_fecha_hora')}`, { fontSize: 7, lineH: 3.3 });
    y += 0.8;
  }

  const colW = uW / 3;
  const sigImgH = 21;
  const rowH = 46;
  ['Paciente / Rep. Legal', 'Testigo 1', 'Testigo 2'].forEach((t, i) => {
    const x = mL + i * colW;
    doc.setFillColor(216, 236, 235);
    doc.rect(x, y, colW, 4.5, 'F');
    doc.rect(x, y, colW, rowH);
    doc.setTextColor(15, 118, 110);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(t, x + colW / 2, y + 3.2, { align: 'center' });
  });
  const pSig = signaturesPayload?.axPacienteSignSlot || '';
  const t1Sig = signaturesPayload?.axTestigo1SignSlot || '';
  const t2Sig = signaturesPayload?.axTestigo2SignSlot || '';
  if (pSig) doc.addImage(pSig, 'PNG', mL + 2, y + 7, colW - 4, sigImgH);
  if (t1Sig) doc.addImage(t1Sig, 'PNG', mL + colW + 2, y + 7, colW - 4, sigImgH);
  if (t2Sig) doc.addImage(t2Sig, 'PNG', mL + colW * 2 + 2, y + 7, colW - 4, sigImgH);
  const pNombreLine = gv('ax_firma_paciente_nombre', '');
  if (pNombreLine) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.6);
    doc.setTextColor(30, 41, 59);
    const raw = String(pNombreLine);
    const nameLines = raw
      .split(/\r?\n/)
      .flatMap((para) => {
        const t = para.trim();
        return t ? doc.splitTextToSize(t, colW - 4) : [];
      });
    doc.text(nameLines.slice(0, 6), mL + colW / 2, y + 7 + sigImgH + 1.2, { align: 'center', lineHeightFactor: 1.22 });
  }
  doc.setFontSize(6.2);
  doc.setTextColor(15, 118, 110);
  doc.text('Nombre y documento de identidad', mL + colW / 2, y + 41.5, { align: 'center' });
  doc.text('Nombre y vinculo/parentesco', mL + colW + colW / 2, y + 41.5, { align: 'center' });
  doc.text('Nombre y documento de identidad', mL + colW * 2 + colW / 2, y + 41.5, { align: 'center' });
  y += rowH + 1;

  const medicoBoxH = 23;
  doc.setFillColor(216, 236, 235);
  doc.rect(mL, y, uW, 4.5, 'F');
  doc.rect(mL, y, uW, medicoBoxH);
  doc.setTextColor(15, 118, 110);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.3);
  doc.text('Medico Tratante', pageW / 2, y + 3.1, { align: 'center' });
  const mSig = document.querySelector('#axMedicoSignSlot img')?.src || '';
  if (mSig) doc.addImage(mSig, 'PNG', mL + uW * 0.18, y + 5.3, uW * 0.64, 13.5);
  doc.setFontSize(6.2);
  doc.text('Nombre completo | Registro Medico | Especialidad', pageW / 2, y + 21.2, { align: 'center' });
  y += medicoBoxH + 1.8;

  // Section 10 (o siguiente según plantilla)
  const controlDocNumber = resolveControlDocumentalSectionNumber(10);
  ensureSpace(20);
  drawSectionBar(doc, `${controlDocNumber}. CONTROL DOCUMENTAL`, mL, y, uW); y += 8.4;
  const rows = [
    `Elaborado por: ${gv('ax_elaborado_por', 'Dr. Erick David Castro Reyes - Director Medico y Cientifico - Medihelp Services')}`,
    `Aprobado por: ${gv('ax_aprobado_por', 'Jefatura de Anestesiologia - Medihelp Services')}`,
    `Revisado por: ${gv('ax_revisado_por', 'Dr. Erick David Castro Reyes - Director Medico y Cientifico - Medihelp Services')}`,
    `F. Aprobacion: ${gv('ax_fecha_aprobacion', '2026-03-13')}`,
    `Proxima revision: ${gv('ax_proxima_revision', '3 anos desde la fecha de aprobacion')}`,
    `Alineado a: ${gv('ax_alineado_a', 'Joint Commission International 8a Edicion - Ley 23 de 1981 Art. 15 - Decreto 3380 de 1981 - Resolucion 13437 de 1991')}`
  ];
  rows.forEach((r, i) => {
    ensureSpace(5);
    if (i % 2 === 0) {
      doc.setFillColor(242, 247, 247);
      doc.rect(mL, y - 3.2, uW, 4.5, 'F');
    }
    doc.setFontSize(7.1);
    doc.setTextColor(30, 41, 59);
    doc.text(r, mL + 1, y);
    y += 4.5;
  });

  // Footer
  doc.setFontSize(5.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Conforme al Art. 15 Ley 23/1981, Decreto 3380/1981 y Resolucion 13437/1991. El medico tratante conserva copia firmada.', pageW / 2, pageH - 4.5, { align: 'center' });
  doc.text('Pagina 1', pageW - mR, pageH - 4.5, { align: 'right' });

  return doc.output('blob');
}

async function generateStandardStyledPdf(consent, patient, signaturesPayload) {
  const jsPDF = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
  if (!jsPDF) throw new Error('La libreria jsPDF no se cargo correctamente.');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const mL = 10;
  const mR = 10;
  const uW = pageW - mL - mR;
  let y = 9;

  const q = (name) => document.querySelector(`[name="${name}"]`);
  const gv = (name, fallback = '') => (q(name)?.value || fallback || '').toString().trim();
  const gc = (name) => !!q(name)?.checked;
  const writeVectorCheckLine = (checked, text, options = {}) => {
    const { x = mL + 1, maxW = uW - 2, fontSize = 7.1, lineH = 3.2 } = options;
    writeWrapped(`${checked ? '[x]' : '[ ]'} ${String(text || '')}`, { x, maxW, fontSize, lineH });
  };
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
      logoImg.onerror = () => reject(new Error('Logo no cargado'));
      logoImg.src = '/assets/descarga.png';
    });
  } catch {
    logoDataUrl = null;
  }

  const ensureSpace = (needed = 8) => {
    if (y + needed <= pageH - 12) return;
    doc.addPage();
    y = 10;
  };
  const writeWrapped = (text, options = {}) => {
    const {
      x = mL + 1,
      maxW = uW - 2,
      fontSize = 7.8,
      lineH = 3.7
    } = options;
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(String(text || ''), maxW);
    ensureSpace(lines.length * lineH + 2.2);
    doc.text(lines, x, y);
    y += lines.length * lineH;
  };

  // Header de estilo (igual lenguaje visual del consentimiento 1)
  doc.setFillColor(0, 131, 143);
  doc.rect(0, 0, pageW, 1.8, 'F');
  doc.setDrawColor(0, 131, 143);
  doc.setLineWidth(0.2);
  doc.line(mL, y + 9, pageW - mR, y + 9);
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', mL, y + 0.8, 34, 8.2);
  } else {
    doc.setTextColor(0, 96, 100);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('MEDIHELP', mL + 8, y + 4);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.text('COMPLEJO DE SALUD', mL + 8, y + 7);
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('CLINICA MEDIHELP SERVICES', pageW - mR, y + 2.8, { align: 'right' });
  doc.text('DIRECCION MEDICA Y CIENTIFICA', pageW - mR, y + 5.8, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.text('Cartagena de Indias, Colombia', pageW - mR, y + 8.6, { align: 'right' });
  y += 12;

  // Meta row (dinámico por consentimiento)
  const docMeta = getConsentDocumentMeta(consent);
  const cW = uW / 3;
  drawSectionBar(doc, 'CODIGO', mL, y, cW);
  drawSectionBar(doc, 'VERSION', mL + cW, y, cW);
  drawSectionBar(doc, 'FECHA', mL + cW * 2, y, cW);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(30, 41, 59);
  doc.rect(mL, y + 5.8, cW, 6);
  doc.rect(mL + cW, y + 5.8, cW, 6);
  doc.rect(mL + cW * 2, y + 5.8, cW, 6);
  doc.text(docMeta.codigo, mL + 1.2, y + 9.9);
  doc.text(docMeta.version, mL + cW + 1.2, y + 9.9);
  doc.text(docMeta.fecha, mL + cW * 2 + 1.2, y + 9.9);
  y += 18.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(20, 83, 87);
  doc.text(String(consent?.titulo || 'CONSENTIMIENTO INFORMADO').toUpperCase(), pageW / 2, y, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  const pdfSub = consent?.subtituloDoc
    ? `${consent.subtituloDoc} — Clinica Medihelp Services`
    : 'Clinica Medihelp Services';
  doc.text(pdfSub, pageW / 2, y + 4.2, { align: 'center' });
  y += 10.5;

  // 1
  ensureSpace(12);
  drawSectionBar(doc, '1. LUGAR Y FECHA', mL, y, uW); y += 9.2;
  writeWrapped(`Ciudad: ${gv('ci_ciudad', 'Cartagena de Indias - Bolivar')}   Fecha y hora: ${gv('ci_fecha_hora')}`, { fontSize: 7.8, lineH: 3.7 });
  y += 1.6;

  // 2
  ensureSpace(16);
  drawSectionBar(doc, '2. IDENTIFICACION DE QUIEN OTORGA EL CONSENTIMIENTO', mL, y, uW); y += 9.2;
  writeWrapped(`Yo: ${gv('ci_nombre_otorga', patient?.nombre || '')}   identificado(a) con: ${gv('ci_doc_otorga', `${patient?.tipoDoc || 'CC'} ${patient?.cedula || ''}`)}`, { fontSize: 7.6, lineH: 3.6 });
  writeWrapped('Actuo en nombre de:', { fontSize: 7.6, lineH: 3.6 });
  writeVectorCheckLine(gc('ci_mi_mismo'), 'Mi mismo(a)', { fontSize: 7.4, lineH: 3.3 });
  writeVectorCheckLine(gc('ci_paciente'), `Del/La paciente: ${gv('ci_paciente_nombre')}   Doc. N: ${gv('ci_paciente_doc')}`, { fontSize: 7.4, lineH: 3.3 });
  writeWrapped('Calidad / representacion:', { fontSize: 7.6, lineH: 3.6 });
  writeVectorCheckLine(gc('ci_padre'), 'Padre/Madre', { fontSize: 7.4, lineH: 3.2 });
  writeVectorCheckLine(gc('ci_tutor'), 'Tutor legal', { fontSize: 7.4, lineH: 3.2 });
  writeVectorCheckLine(gc('ci_apoderado'), 'Apoderado(a)', { fontSize: 7.4, lineH: 3.2 });
  writeVectorCheckLine(gc('ci_conyuge'), 'Conyuge', { fontSize: 7.4, lineH: 3.2 });
  writeVectorCheckLine(gc('ci_familiar'), 'Familiar primer grado', { fontSize: 7.4, lineH: 3.2 });
  y += 1.6;

  // 3
  ensureSpace(14);
  drawSectionBar(doc, '3. INFORMACION MEDICA RECIBIDA', mL, y, uW); y += 9.2;
  writeWrapped(`Doctor(a) tratante: ${gv('medico')}`, { fontSize: 7.6, lineH: 3.6 });
  writeWrapped(`Enfermedad / diagnostico: ${gv('diagnostico')}`, { fontSize: 7.6, lineH: 3.6 });
  writeWrapped(`Procedimiento a realizar: ${gv('servicio')}`, { fontSize: 7.6, lineH: 3.6 });
  y += 1.4;

  // 4+ contenido del consentimiento: respetar puntos reales del formulario web
  ensureSpace(14);
  let section4Title = '4. DESCRIPCION DEL PROCEDIMIENTO';
  let declarationSectionTitle = '9. DECLARACION DE ENTENDIMIENTO Y ACEPTACION';
  let signaturesSectionTitle = '10. FIRMAS DE CONSENTIMIENTO';
  const contentRoot = document.querySelector('.document-content-box');
  if (contentRoot) {
    const titleEls = Array.from(contentRoot.querySelectorAll('.anx-block-title'));
    const normalizeHeading = (txt) => String(txt || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .trim();
    const parsedTitles = titleEls.map((el) => {
      const text = String(el.textContent || '').trim();
      const m = text.match(/^(\d+)\s*\./);
      const n = m ? Number(m[1]) : null;
      return { el, text, n, upper: normalizeHeading(text) };
    });

    const declarationSection = parsedTitles.find((t) =>
      t.upper.includes('DECLARACION DE ENTENDIMIENTO') ||
      t.upper.includes('DECLARATION OF UNDERSTANDING'));
    const signaturesSection = parsedTitles.find((t) =>
      t.upper.includes('FIRMAS DE CONSENTIMIENTO') ||
      t.upper.includes('SIGNATURES OF CONSENT') ||
      t.upper.includes('DISENTIMIENTO') ||
      t.upper.includes('INFORMED DISSENT'));
    const section4 = parsedTitles.find((t) => t.n === 4);
    if (section4?.text) section4Title = section4.text;
    if (declarationSection?.text) declarationSectionTitle = declarationSection.text;
    if (signaturesSection?.text) signaturesSectionTitle = signaturesSection.text;

    drawSectionBar(doc, section4Title, mL, y, uW); y += 9.2;

    const declarationNum = declarationSection?.n ?? Number.POSITIVE_INFINITY;
    const signaturesNum = signaturesSection?.n ?? Number.POSITIVE_INFINITY;
    const stopAt = Math.min(declarationNum, signaturesNum);

    const sourceControls = Array.from(contentRoot.querySelectorAll('input[name], textarea[name], select[name]'));
    const findSourceControl = (name) => sourceControls.find((c) => c.name === name) || null;

    const renderSectionContent = (sectionRoot) => {
      sectionRoot.querySelectorAll('[style*="display:none"], canvas, button, svg, .anx-firmas-box').forEach((el) => el.remove());
      const controls = Array.from(sectionRoot.querySelectorAll('input[name], textarea[name], select[name]'));
      controls.forEach((el) => {
        const src = findSourceControl(el.name) || el;
        const t = ((src?.type || el.type || '') + '').toLowerCase();
        let textVal = '';
        if (t === 'checkbox') {
          textVal = src.checked ? '[X] ' : '[ ] ';
        } else if (el.tagName === 'SELECT') {
          const idx = src.selectedIndex ?? -1;
          textVal = idx >= 0 ? String(src.options[idx]?.text || '').trim() : '';
        } else {
          textVal = String(src.value || '').trim();
        }
        el.replaceWith(document.createTextNode(textVal));
      });
      const renderPdfTable = (tableEl) => {
        const rows = Array.from(tableEl.querySelectorAll('tr'))
          .map((tr) => Array.from(tr.querySelectorAll('th,td')).map((c) => String(c.textContent || '').trim()))
          .filter((r) => r.length);
        if (!rows.length) return;
        const colCount = Math.max(...rows.map((r) => r.length));
        const normRows = rows.map((r) => {
          const out = r.slice();
          while (out.length < colCount) out.push('');
          return out;
        });
        const colW = uW / colCount;
        normRows.forEach((row, rIdx) => {
          const isHeader = rIdx === 0;
          const cellLines = row.map((txt) => doc.splitTextToSize(txt || ' ', colW - 2.2));
          const maxLines = Math.max(1, ...cellLines.map((l) => l.length));
          const rowH = maxLines * 3 + 2.2;
          ensureSpace(rowH + 1.2);
          row.forEach((_, cIdx) => {
            const x = mL + cIdx * colW;
            if (isHeader) {
              doc.setFillColor(15, 118, 110);
              doc.rect(x, y, colW, rowH, 'F');
              doc.setTextColor(255, 255, 255);
              doc.setFont('helvetica', 'bold');
            } else {
              doc.setTextColor(30, 41, 59);
              doc.setFont('helvetica', 'normal');
            }
            doc.setDrawColor(210, 219, 230);
            doc.rect(x, y, colW, rowH);
            doc.setFontSize(6.8);
            doc.text(cellLines[cIdx], x + 1.1, y + 2.4, { maxWidth: colW - 2.2 });
          });
          y += rowH;
        });
        y += 1.2;
      };

      const tableTokens = [];
      Array.from(sectionRoot.querySelectorAll('table')).forEach((table, idx) => {
        const token = `__PDF_TABLE_${idx}__`;
        tableTokens.push({ token, table: table.cloneNode(true) });
        table.replaceWith(document.createTextNode(`\n${token}\n`));
      });

      sectionRoot.querySelectorAll('li').forEach((li) => li.prepend(document.createTextNode('• ')));
      sectionRoot.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, ul, ol').forEach((el) => el.append(document.createTextNode('\n')));
      const text = String(sectionRoot.textContent || '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      const lines = text.split('\n').map((s) => s.trim()).filter(Boolean);
      lines.forEach((line) => {
        const tk = tableTokens.find((t) => t.token === line);
        if (tk) {
          renderPdfTable(tk.table);
        } else {
          writeWrapped(line, { fontSize: 7.1, lineH: 3.3 });
        }
      });
    };

    parsedTitles
      .filter((t) => Number.isFinite(t.n) && t.n >= 4 && t.n < stopAt)
      .forEach((section) => {
        // La sección 4 ya quedó como cabecera principal; no repetir su título dentro del contenido.
        if (section.n >= 5) {
          ensureSpace(10);
          drawSectionBar(doc, section.text, mL, y, uW);
          y += 8.6;
        }
        const fragment = document.createElement('div');
        let node = section.el.nextSibling;
        while (node) {
          if (node.nodeType === 1 && node.classList?.contains('anx-block-title')) break;
          fragment.appendChild(node.cloneNode(true));
          node = node.nextSibling;
        }
        renderSectionContent(fragment);
        y += 0.8;
      });
  } else {
    drawSectionBar(doc, section4Title, mL, y, uW); y += 9.2;
    writeWrapped('Contenido no disponible.', { fontSize: 7.1, lineH: 3.3 });
  }
  y += 1.6;

  // 9 (declaraciones)
  ensureSpace(12);
  drawSectionBar(doc, declarationSectionTitle, mL, y, uW); y += 9.2;
  const decl = [
    [gc('declara_informado'), 'Declaro que he leido el presente documento y he entendido la informacion suministrada.'],
    [gc('declara_revocar') || gc('declara_revocacion_info'), 'Entiendo que puedo revocar este consentimiento en cualquier momento antes del procedimiento.'],
    [gc('declara_voluntario'), 'Otorgo mi consentimiento de manera libre, consciente, informada y voluntaria.'],
    [gc('declara_no_autoriza'), 'No autorizo la realizacion del procedimiento descrito en este consentimiento.']
  ];
  decl.forEach(([ck, txt]) => {
    writeVectorCheckLine(!!ck, txt, { fontSize: 7.1, lineH: 3.2 });
    y += 0.5;
  });
  y += 1.2;

  // 10 firmas
  ensureSpace(68);
  drawSectionBar(doc, signaturesSectionTitle, mL, y, uW); y += 8.4;
  const colW = uW / 3;
  const sigImgH = 21;
  const rowH = 46;
  ['Paciente / Rep. Legal', 'Testigo 1', 'Testigo 2'].forEach((t, i) => {
    const x = mL + i * colW;
    doc.setFillColor(216, 236, 235);
    doc.rect(x, y, colW, 4.5, 'F');
    doc.rect(x, y, colW, rowH);
    doc.setTextColor(15, 118, 110);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(t, x + colW / 2, y + 3.2, { align: 'center' });
  });
  const pSig = signaturesPayload?.axPacienteSignSlot || '';
  const t1Sig = signaturesPayload?.axTestigo1SignSlot || '';
  const t2Sig = signaturesPayload?.axTestigo2SignSlot || '';
  if (pSig) doc.addImage(pSig, 'PNG', mL + 2, y + 7, colW - 4, sigImgH);
  if (t1Sig) doc.addImage(t1Sig, 'PNG', mL + colW + 2, y + 7, colW - 4, sigImgH);
  if (t2Sig) doc.addImage(t2Sig, 'PNG', mL + colW * 2 + 2, y + 7, colW - 4, sigImgH);
  const pNombreLine = gv('bi_firma_paciente_nombre', gv('ax_firma_paciente_nombre', ''));
  if (pNombreLine) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.6);
    doc.setTextColor(30, 41, 59);
    const nameLines = String(pNombreLine).split(/\r?\n/).flatMap((para) => {
      const t = para.trim();
      return t ? doc.splitTextToSize(t, colW - 4) : [];
    });
    doc.text(nameLines.slice(0, 6), mL + colW / 2, y + 7 + sigImgH + 1.2, { align: 'center', lineHeightFactor: 1.22 });
  }
  doc.setFontSize(6.2);
  doc.setTextColor(15, 118, 110);
  doc.text('Nombre y documento de identidad', mL + colW / 2, y + 41.5, { align: 'center' });
  doc.text('Nombre y vinculo/parentesco', mL + colW + colW / 2, y + 41.5, { align: 'center' });
  doc.text('Nombre y documento de identidad', mL + colW * 2 + colW / 2, y + 41.5, { align: 'center' });
  y += rowH + 1;

  const medicoBoxH = 23;
  doc.setFillColor(216, 236, 235);
  doc.rect(mL, y, uW, 4.5, 'F');
  doc.rect(mL, y, uW, medicoBoxH);
  doc.setTextColor(15, 118, 110);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.3);
  doc.text('Medico Tratante', pageW / 2, y + 3.1, { align: 'center' });
  const mSig = document.querySelector('#axMedicoSignSlot img')?.src || '';
  if (mSig) doc.addImage(mSig, 'PNG', mL + uW * 0.18, y + 5.3, uW * 0.64, 13.5);
  doc.setFontSize(6.2);
  doc.text('Nombre completo | Registro Medico | Especialidad', pageW / 2, y + 21.2, { align: 'center' });
  y += medicoBoxH + 1.8;

  // Control documental al final (numeración dinámica según consentimiento)
  const controlDocNumber = resolveControlDocumentalSectionNumber(10);
  ensureSpace(20);
  drawSectionBar(doc, `${controlDocNumber}. CONTROL DOCUMENTAL`, mL, y, uW); y += 8.4;
  const rows = [
    `Elaborado por: ${gv('ax_elaborado_por', 'Dr. Erick David Castro Reyes - Director Medico y Cientifico - Medihelp Services')}`,
    `Aprobado por: ${gv('ax_aprobado_por', 'Jefatura de Anestesiologia - Medihelp Services')}`,
    `Revisado por: ${gv('ax_revisado_por', 'Dr. Erick David Castro Reyes - Director Medico y Cientifico - Medihelp Services')}`,
    `F. Aprobacion: ${gv('ax_fecha_aprobacion', '2026-03-13')}`,
    `Proxima revision: ${gv('ax_proxima_revision', '3 anos desde la fecha de aprobacion')}`,
    `Alineado a: ${gv('ax_alineado_a', 'Joint Commission International 8a Edicion - Ley 23 de 1981 Art. 15 - Decreto 3380 de 1981 - Resolucion 13437 de 1991')}`
  ];
  rows.forEach((r, i) => {
    ensureSpace(5);
    if (i % 2 === 0) {
      doc.setFillColor(242, 247, 247);
      doc.rect(mL, y - 3.2, uW, 4.5, 'F');
    }
    doc.setFontSize(7.1);
    doc.setTextColor(30, 41, 59);
    doc.text(r, mL + 1, y);
    y += 4.5;
  });

  doc.setFontSize(5.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Conforme al Art. 15 Ley 23/1981, Decreto 3380/1981 y Resolucion 13437/1991. El medico tratante conserva copia firmada.', pageW / 2, pageH - 4.5, { align: 'center' });
  doc.text('Pagina 1', pageW - mR, pageH - 4.5, { align: 'right' });

  return doc.output('blob');
}

async function confirmSignature() {
  closeModal();

  const params = new URLSearchParams(window.location.search);
  const consentId = params.get('id');
  const cedula = params.get('cedula');
  const consent = getConsentById(consentId);

  let patient;
  try { patient = await api('GET', `/api/patients/${cedula}`); } catch { return; }

  const signatureDataUrl = isSignatureFlowEnabled()
    ? (signatureFlowState.signatures.axPacienteSignSlot || '')
    : signaturePad.toDataURL('image/png');
  const signaturesPayload = isSignatureFlowEnabled()
    ? { ...signatureFlowState.signatures }
    : { axPacienteSignSlot: signatureDataUrl };

  const submitBtn = document.getElementById('submitSignature');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;"></div> Generando PDF...';

  if (window._isRevocation) {
    await generateRevocationPdf(consent, patient, consentId, cedula, signatureDataUrl, submitBtn);
    return;
  }

  // Anestesia (id=1): PDF estructurado con jsPDF.
  if (Number(consent.id) === 1) {
    try {
      const pdfBlob = await generateAnesthesiaPdfStructured(consent, patient, signaturesPayload);
      const pdfBase64 = await blobToBase64(pdfBlob);
      await api('POST', '/api/sign', {
        cedula: patient.cedula,
        consentId: parseInt(consentId),
        pdfBase64,
        titulo: consent.titulo,
        signatures: signaturesPayload
      });

      if (typeof clearCurrentFormDraft === 'function') clearCurrentFormDraft('consent');
      showToast('Consentimiento firmado y guardado exitosamente');
      document.getElementById('signatureSection').style.display = 'none';
      document.getElementById('signedBanner').style.display = 'flex';
      document.getElementById('signedDate').textContent = 'Firmado el ' + new Date().toLocaleString('es-CO');
      document.querySelectorAll('#consentForm input, #consentForm textarea, #consentForm select').forEach(el => {
        el.readOnly = true;
        el.disabled = true;
      });
      setTimeout(() => { window.location.assign('paciente.html'); }, 2500);
      return;
    } catch (err) {
      console.error('Error al firmar consentimiento de anestesia:', err);
      showToast('Error al generar el documento: ' + err.message, 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Firmar y generar PDF';
      return;
    }
  }

  // Todos los demás consentimientos: usar estilo visual del consentimiento 1.
  if (Number(consent.id) !== 1) {
    try {
      const pdfBlob = await generateStandardStyledPdf(consent, patient, signaturesPayload);
      const pdfBase64 = await blobToBase64(pdfBlob);
      await api('POST', '/api/sign', {
        cedula: patient.cedula,
        consentId: parseInt(consentId),
        pdfBase64,
        titulo: consent.titulo,
        signatures: signaturesPayload
      });

      if (typeof clearCurrentFormDraft === 'function') clearCurrentFormDraft('consent');
      showToast('Consentimiento firmado y guardado exitosamente');
      document.getElementById('signatureSection').style.display = 'none';
      document.getElementById('signedBanner').style.display = 'flex';
      document.getElementById('signedDate').textContent = 'Firmado el ' + new Date().toLocaleString('es-CO');
      document.querySelectorAll('#consentForm input, #consentForm textarea, #consentForm select').forEach(el => {
        el.readOnly = true;
        el.disabled = true;
      });
      setTimeout(() => { window.location.assign('paciente.html'); }, 2500);
      return;
    } catch (err) {
      console.error('Error al firmar consentimiento:', err);
      showToast('Error al generar el documento: ' + err.message, 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Firmar y generar PDF';
      return;
    }
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
      ? ((typeof FORMULARIOS_EN !== 'undefined') ? (FORMULARIOS_EN[getConsentFormId(consent)] || FORMULARIOS?.[getConsentFormId(consent)]) : FORMULARIOS?.[getConsentFormId(consent)])
      : ((typeof FORMULARIOS !== 'undefined') ? FORMULARIOS[getConsentFormId(consent)] : null);
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
        logoImg.src = '/assets/descarga.png';
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

    if (typeof clearCurrentFormDraft === 'function') clearCurrentFormDraft('revocation');
    showToast('Revocación firmada y guardada exitosamente');
    document.getElementById('signatureSection').style.display = 'none';
    document.querySelectorAll('#consentForm input, #consentForm textarea, #consentForm select').forEach(el => {
      el.readOnly = true;
      el.disabled = true;
    });
    setTimeout(() => { window.location.assign('paciente.html'); }, 2500);

  } catch (err) {
    console.error('Error al generar revocación:', err);
    showToast('Error al generar el documento: ' + err.message, 'error');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Firmar revocación y generar PDF';
  }
}
