// =============================================================================
// FORMULARIOS: Contenido HTML de cada consentimiento informado
// Clínica Medihelp Services - Cada formulario contiene la información médica
// completa y campos editables donde el documento original tenía blancos
// =============================================================================
const FORMULARIOS = {

// ─── 1. CIRUGÍA BARIÁTRICA ──────────────────────────────────────────
1: {
  titulo: "Consentimiento Informado - Cirugía Bariátrica",
  contenido: `
    <p>Mediante el presente documento legal certifico que he sido informado por parte del Médico Tratante de la Clínica Medihelp Services sobre la siguiente actividad, intervención, procedimiento especial o tratamiento que requiero:</p>
    <div class="form-inline-field"><label>Descripción del procedimiento:</label><textarea name="ci_procedimiento" rows="2" placeholder="Describa el procedimiento bariátrico..." required></textarea></div>
    <p>Se me ha informado que el procedimiento es integral y está orientado a <strong>reducir la capacidad del estómago</strong>, o en <strong>desviar el alimento en el intestino</strong> de forma que no va a pasar por todas sus partes, o ambas cosas. Con esto se intenta disminuir el volumen de alimento que necesito para encontrarme satisfecho y/o disminuir la absorción de nutrientes.</p>
    <p>Mediante este procedimiento se pretende conseguir la pérdida del exceso de peso que no se ha podido tratar por otros métodos y que produce complicaciones hemodinámicas, vasculares, pulmonares, endocrinas u osteoarticulares. Al operarme por laparoscopia se pretende evitar una incisión mayor; el dolor postoperatorio generalmente es más leve, la recuperación del tránsito intestinal suele ser más rápida y el periodo de convalecencia postoperatorio suele ser más corto.</p>
    <h4>Riesgos frecuentes:</h4>
    <ul>
      <li>Infección o sangrado de la herida quirúrgica</li>
      <li>Flebitis, infección urinaria, retención urinaria</li>
      <li>Alteraciones digestivas transitorias</li>
      <li>Dolor prolongado en la zona de la operación</li>
      <li>Derrame pleural</li>
      <li>Por cirugía laparoscópica: extensión del gas al tejido subcutáneo y dolor</li>
    </ul>
    <h4>Riesgos poco frecuentes y graves:</h4>
    <ul>
      <li>Embolias y tromboembolismo pulmonar</li>
      <li>Fístulas intestinales por alteración en la cicatrización de las suturas</li>
      <li>Estrechez de las anastomosis</li>
      <li>Sangrado o infección intrabdominal</li>
      <li>Obstrucción intestinal</li>
      <li>Perforación esofágica o gástrica</li>
      <li>Neumonía, sepsis o infección generalizada</li>
      <li>Alteraciones digestivas definitivas (diarrea o vómito)</li>
      <li>Déficit nutricional crónico, hipoglicemia</li>
      <li>Excesiva pérdida de peso o fallo del procedimiento con escasa pérdida de peso</li>
      <li>Por cirugía laparoscópica: lesiones vasculares, lesiones de órganos vecinos, embolia gaseosa y neumotórax</li>
    </ul>
    <p>Cabe la posibilidad de que durante la cirugía se requiera realizar <strong>modificaciones del procedimiento</strong> por los hallazgos intraoperatorios, con el fin de proporcionarme el tratamiento más adecuado.</p>
    <div class="form-inline-field"><label>Alternativas de tratamiento informadas:</label><textarea name="ci_alternativas" rows="2" placeholder="Alternativas de tratamiento..." required></textarea></div>
  `
},

// ─── 2. CIRUGÍA CARDIOVASCULAR ──────────────────────────────────────
2: {
  titulo: "Consentimiento Informado - Cirugía Cardiovascular",
  contenido: `
    <div class="anx-block-title">4. DESCRIPCIÓN DEL PROCEDIMIENTO</div>
    <p>El procedimiento consiste en cirugía del corazón realizada bajo anestesia general. Se abre el tórax para acceder al corazón y los grandes vasos.</p>
    <p>Según el diagnóstico y la indicación médica, el procedimiento puede corresponder a:</p>
    <ul>
      <li><strong>Revascularización miocárdica (bypass coronario):</strong> se utilizan injertos de arteria o vena para crear nuevos puentes de circulación que sortean las arterias coronarias obstruidas, con o sin detención del corazón.</li>
      <li><strong>Cirugía valvular:</strong> reparación o reemplazo de una o más válvulas del corazón mediante válvula mecánica, biológica o reparación del tejido propio.</li>
      <li><strong>Cirugía de la aorta:</strong> corrección de aneurisma, disección u otras patologías de la aorta ascendente o el arco aórtico.</li>
    </ul>
    <div class="form-inline-field">
      <label>El tipo de válvula utilizada será:</label>
      <select name="cv_tipo_valvula">
        <option value="">Seleccionar...</option>
        <option value="mecanica">Mecánica</option>
        <option value="biologica">Biológica</option>
      </select>
    </div>
    <div class="form-inline-field"><label>Reparación del tejido nativo (especificar):</label><input type="text" name="cv_reparacion_tejido_nativo" placeholder="Detalle de la reparación"></div>
    <p>En algunos casos se requiere el uso de circulación extracorpórea (máquina corazón-pulmón) durante la intervención.</p>
    <div class="form-inline-field"><label>El procedimiento específico indicado para este paciente es:</label><input type="text" name="cv_procedimiento_especifico" placeholder="Procedimiento específico" required></div>
    <div class="form-inline-field"><label>EuroSCORE II estimado para este paciente:</label><input type="number" name="cv_euroscore_ii" min="0" max="100" step="0.01" placeholder="Ej: 3.50"> <span>%</span></div>

    <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
    <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICACIÓN / RIESGO</th>
          <th>FRECUENCIA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Hemorragia que prolongue la cirugía o que requiera reoperación o transfusión de hemoderivados</td><td>3.9-6.8%</td></tr>
        <tr><td>Reacciones de hipersensibilidad o alergia a sangre o medicamentos</td><td>1-3%</td></tr>
        <tr><td>Riesgo de transmisión de enfermedades infecto-contagiosas por transfusión (ventana inmunológica)</td><td>1-1.6%</td></tr>
        <tr><td>Accidente cerebrovascular (embolia o hemorragia): parálisis, convulsiones, coma</td><td>1.1-1.4%</td></tr>
        <tr><td>Incapacidad del corazón para mantener la circulación: bajo gasto cardíaco / choque cardiogénico</td><td>2.4-12%</td></tr>
        <tr><td>Necesidad de asistencia mecánica del corazón (balón de contrapulsación intraaórtico, asistencia ventricular)</td><td>0.2-0.6%</td></tr>
        <tr><td>Paro cardiorrespiratorio en el postoperatorio</td><td>0.7-2.9%</td></tr>
        <tr><td>Lesión isquémica o infarto del músculo cardíaco durante el perioperatorio</td><td>1%</td></tr>
        <tr><td>Bloqueo auriculoventricular con necesidad de marcapasos definitivo</td><td>0.9%</td></tr>
        <tr><td>Arritmias cardíacas (fibrilación auricular y otras)</td><td>30-50%</td></tr>
        <tr><td>Síndrome de dificultad respiratoria aguda o necesidad de ventilación mecánica prolongada</td><td>6-11.9%</td></tr>
        <tr><td>Insuficiencia renal aguda que en ocasiones requiera inicio de diálisis</td><td>1.7%</td></tr>
        <tr><td>Infección profunda del tórax (mediastinitis), de la herida superficial o del implante</td><td>3.9-6.8%</td></tr>
        <tr><td>Úlcera o hemorragia digestiva</td><td>1.6%</td></tr>
        <tr><td>Formación de trombos venosos con riesgo de embolia pulmonar</td><td>0.2%</td></tr>
        <tr><td>Cicatrices hipertróficas o queloideas</td><td>Variable</td></tr>
        <tr><td>Necesidad de reintervención quirúrgica</td><td>2.1%</td></tr>
        <tr><td>Riesgos propios de la anestesia general (ver consentimiento de anestesia)</td><td>Ver consentimiento de anestesia</td></tr>
        <tr><td>Muerte: estimada individualmente según el cálculo de riesgo del paciente</td><td>Individualizado</td></tr>
      </tbody>
    </table>
    <div class="form-inline-field"><label>Riesgo de muerte individualizado:</label><input type="number" name="cv_riesgo_muerte_individualizado" min="0" max="100" step="0.01" placeholder="Ej: 2.35"> <span>%</span></div>

    <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
    <p>En mi caso particular, el médico me ha explicado los siguientes riesgos adicionales según mis condiciones de salud individuales:</p>
    <div class="form-inline-field"><label>Riesgos adicionales del caso:</label><textarea name="cv_riesgos_adicionales" rows="3" placeholder="Describa los riesgos adicionales..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="cv_alt_tratamiento_medico"> Tratamiento médico / farmacológico (control de síntomas, sin cirugía)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="cv_alt_cateterismo"> Cateterismo cardíaco intervencionista (angioplastia coronaria o valvuloplastia, según indicación)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="cv_alt_no_realizar"> No realizar ningún procedimiento (decisión informada y documentada)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="cv_alt_otra"> Otra:</label>
      <input type="text" name="cv_alt_otra_detalle" class="ax-full-line" placeholder="Describa otra alternativa">
    </div>

    <div class="anx-block-title">8. RECUPERACIÓN Y MANEJO DEL DOLOR</div>
    <p class="anx-p">Me han informado que después del procedimiento estaré en la Unidad de Cuidados Intensivos para recuperación. Podré presentar dolor en la herida y el tórax, el cual será manejado con medicamentos analgésicos. La probabilidad de éxito del procedimiento depende de las condiciones individuales de cada paciente. Se me indicarán los cuidados y restricciones específicas para el período de recuperación.</p>

    <div class="anx-block-title">9. DECLARACIÓN DE ENTENDIMIENTO Y ACEPTACIÓN</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leído el presente documento - o me ha sido leído en caso de no poder hacerlo por mí mismo(a) - y he entendido la información que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el médico tratante.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento, sin que ello implique perjuicio alguno para mi atención médica.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realización del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolución 13437 de 1991 y los estándares de acreditación internacional en salud vigentes.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realización del procedimiento descrito en este consentimiento.</label>

    <div class="anx-block-title" id="cvSection10Title">10. FIRMAS DE CONSENTIMIENTO</div>
    <div id="cvDissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">Yo, (nombre y documento):</div>
        <input name="cv_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">en calidad de:</div>
        <input name="cv_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">Declaro que:</div>
        <label><input type="checkbox" name="cv_disent_rechaza"> Rechazo el procedimiento</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Motivo:</div>
        <textarea name="cv_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Fecha y hora:</div>
        <input type="datetime-local" name="cv_disent_fecha_hora" class="ax-full-line">
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
          <div class="anx-firma-foot">Nombre y vínculo/parentesco</div>
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
        <div class="anx-firma-head">Médico Tratante</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Nombre completo | Registro Médico | Especialidad</div>
      </div>
    </div>
  `
},

// ─── 3. ACOMPAÑANTE COVID-19 ────────────────────────────────────────
3: {
  titulo: "Consentimiento Informado - Acompañante de Caso Probable/Confirmado de COVID-19",
  contenido: `
    <p>Por medio del presente documento, actuando en calidad de acompañante de un paciente con caso probable o confirmado de COVID-19, manifiesto:</p>
    <div class="form-inline-field"><label>Paciente que acompaño:</label><input type="text" name="ci_paciente_acompanado" placeholder="Nombre del paciente" required></div>
    <div class="form-inline-field"><label>Relación o parentesco con el paciente:</label>
      <select name="ci_parentesco"><option value="">Seleccionar...</option><option>Cónyuge</option><option>Hijo/a</option><option>Padre/Madre</option><option>Hermano/a</option><option>Otro</option></select>
    </div>
    <h4>Información recibida:</h4>
    <ul>
      <li>De manera detallada se me ha suministrado información completa, suficiente, con un lenguaje sencillo y claro sobre la COVID-19.</li>
      <li>El profesional de la salud me ha explicado la naturaleza de la enfermedad, el significado de caso sospechoso o confirmado del coronavirus SARS-CoV-2 en cuanto a su presentación clínica, modo de contagio, medidas para contenerla, posibilidad de sufrir la enfermedad, complicaciones o muerte.</li>
    </ul>
    <h4>Compromisos:</h4>
    <ul>
      <li>Me comprometo a limitar mis movimientos dentro de la habitación y reducir al mínimo los espacios compartidos.</li>
      <li>Debo mantener una distancia mínima de un metro con el enfermo.</li>
      <li>Soy una persona que gozo de buena salud y que no presento enfermedades crónicas o que afecten mi respuesta inmunitaria.</li>
      <li>Utilizaré la mascarilla quirúrgica y los otros elementos de protección personal (EPP) que me sean suministrados.</li>
      <li>Implementaré rutinas de lavado frecuente de las manos con agua y jabón (se ha demostrado reducción de hasta 50% en el riesgo de infección).</li>
    </ul>
    <p>Certifico que he podido hacer las preguntas relacionadas con la enfermedad COVID-19 y se me han respondido en forma satisfactoria. Entiendo que voy a estar en riesgo de contagiarme mientras permanezca junto a mi familiar como acompañante.</p>
  `
},

// ─── 4. CIRCUNCIÓN ─────────────────────────────────────────────────
4: {
  titulo: "Consentimiento Informado Médico Circuncisión",
  contenido: `
    <div class="anx-block-title">4. DESCRIPCIÓN DEL PROCEDIMIENTO</div>
    <p>La circuncisión es el procedimiento quirúrgico en el que se extirpa el prepucio (piel que cubre el glande del pene). Se realiza bajo anestesia (local, regional o general según la edad y condición del paciente). Está indicada en casos de fimosis (imposibilidad de retraer el prepucio), parafimosis de repetición, balanopostitis crónica o por indicación médica documentada.</p>

    <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
    <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICACIÓN / RIESGO</th>
          <th>FRECUENCIA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Sangrado de la herida quirúrgica</td><td>Poco frecuente</td></tr>
        <tr><td>Infección de la herida</td><td>Poco frecuente</td></tr>
        <tr><td>Hematoma en el sitio quirúrgico</td><td>Poco frecuente</td></tr>
        <tr><td>Resultado estético insatisfactorio (retiro insuficiente o excesivo del prepucio)</td><td>Variable</td></tr>
        <tr><td>Dolor crónico en la zona intervenida</td><td>Raro</td></tr>
        <tr><td>Hipersensibilidad del glande y pérdida de cobertura (transitoria)</td><td>Frecuente</td></tr>
        <tr><td>Dehiscencia de suturas (apertura de la herida)</td><td>Raro</td></tr>
        <tr><td>Cicatriz queloidea o hipertrófica</td><td>Variable según predisposición</td></tr>
        <tr><td>Lesión del glande o del meato uretral</td><td>Muy raro</td></tr>
        <tr><td>Necesidad de reintervención quirúrgica</td><td>Raro</td></tr>
        <tr><td>Riesgos propios de la anestesia utilizada</td><td>Ver consentimiento de anestesia</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
    <p>En mi caso particular, el médico me ha explicado los siguientes riesgos adicionales según mis condiciones de salud individuales:</p>
    <div class="form-inline-field"><label>Riesgos adicionales del caso:</label><textarea name="ci4_riesgos_adicionales" rows="3" placeholder="Describa los riesgos adicionales..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci4_alt_no_cirugia"> No realizar cirugía / manejo médico conservador con corticoides tópicos (fimosis leve a moderada)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci4_alt_prepucioplastia"> Prepucioplastia (ampliación del anillo sin resección completa del prepucio)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci4_alt_otra"> Otra:</label>
      <input type="text" name="ci4_alt_otra_detalle" class="ax-full-line" placeholder="Describa otra alternativa">
    </div>

    <div class="anx-block-title">8. DECLARACIÓN DE ENTENDIMIENTO Y ACEPTACIÓN</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leído el presente documento - o me ha sido leído en caso de no poder hacerlo por mí mismo(a) - y he entendido la información que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el médico tratante.</label>
    <label class="anx-decl-item"><input type="checkbox" name="ci4_declara_autoriza_dr" required> Autorizo expresamente al Dr. Gabriel de León Matos — Urólogo — C.C. 15.029.675 para que, con el apoyo del equipo médico y de anestesiología de la Clínica Medihelp Services, realice el procedimiento descrito, así como cualquier otro procedimiento que a su juicio resulte necesario o urgente durante la intervención para preservar mi salud y seguridad.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento, sin que ello implique perjuicio alguno para mi atención médica.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realización del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolución 13437 de 1991 y los estándares de acreditación internacional en salud vigentes.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realización del procedimiento descrito en este consentimiento.</label>

    <div class="anx-block-title" id="ci4SectionFirmasTitle">9. FIRMAS DE CONSENTIMIENTO</div>
    <div id="ci4DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">Yo, (nombre y documento):</div>
        <input name="ci4_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">en calidad de:</div>
        <input name="ci4_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">Declaro que:</div>
        <label><input type="checkbox" name="ci4_disent_rechaza"> Rechazo el procedimiento</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Motivo:</div>
        <textarea name="ci4_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Fecha y hora:</div>
        <input type="datetime-local" name="ci4_disent_fecha_hora" class="ax-full-line">
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
          <div class="anx-firma-foot">Nombre y vínculo/parentesco</div>
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
        <div class="anx-firma-head">Médico Tratante</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Nombre completo | Registro Médico | Especialidad</div>
      </div>
    </div>
  `
},

// ─── 5. COLECISTECTOMÍA LAPAROSCÓPICA ───────────────────────────────
5: {
  titulo: "Consentimiento Informado Médico Colecistectomía Laparoscópica",
  contenido: `
    <div class="anx-block-title">4. DESCRIPCIÓN DEL PROCEDIMIENTO</div>
    <p>La colecistectomía laparoscópica es la extirpación de la vesícula biliar mediante cirugía mínimamente invasiva. A través de 3 o 4 pequeñas incisiones en el abdomen se introduce el instrumental y una cámara para visualizar y extirpar la vesícula enferma (generalmente por cálculos biliares, inflamación o pólipos). En algunos casos, por razones de seguridad, puede ser necesario convertir la cirugía a técnica abierta. Se realiza bajo anestesia general.</p>

    <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
    <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICACIÓN / RIESGO</th>
          <th>FRECUENCIA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>• Infección o sangrado de la herida quirúrgica</td><td>2–5%</td></tr>
        <tr><td>• Trastornos digestivos temporales (distensión, diarrea, dispepsia)</td><td>Frecuente, transitorio</td></tr>
        <tr><td>• Dolor referido al hombro por irritación del diafragma (gas de la laparoscopia)</td><td>Frecuente, autolimitado</td></tr>
        <tr><td>• Estrechez o lesión de la vía biliar (complicación grave)</td><td>&lt;1%</td></tr>
        <tr><td>• Escape de bilis o fístula biliar</td><td>&lt;1%</td></tr>
        <tr><td>• Sangrado o infección intraabdominal</td><td>Raro, &lt;0.5%</td></tr>
        <tr><td>• Lesión de órganos vecinos (intestino, vasos, hígado) con posible conversión a cirugía abierta</td><td>Muy raro, &lt;0.3%</td></tr>
        <tr><td>• Hernia en el sitio de las incisiones</td><td>Poco frecuente</td></tr>
        <tr><td>• Pancreatitis si se realiza exploración de la vía biliar</td><td>Raro</td></tr>
        <tr><td>• Riesgos propios de la anestesia general</td><td>Ver consentimiento de anestesia</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
    <p>En mi caso particular, el médico me ha explicado los siguientes riesgos adicionales según mis condiciones de salud, antecedentes quirúrgicos, anatomía o comorbilidades:</p>
    <div class="form-inline-field"><label>Riesgos adicionales del caso:</label><textarea name="ci5_riesgos_adicionales" rows="3" placeholder="Describa los riesgos adicionales..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci5_alt_conservador"> Manejo médico conservador (dieta, analgesia) — solo en pacientes de muy alto riesgo quirúrgico</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci5_alt_drenaje"> Drenaje percutáneo de la vesícula (sin extirpación, en casos críticos)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci5_alt_abierta"> Colecistectomía a cielo abierto (si hay contraindicación para laparoscopia)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci5_alt_no_cirugia"> No cirugía (con documentación de los riesgos)</label>
    </div>

    <div class="anx-block-title">8. DECLARACIÓN DE ENTENDIMIENTO Y ACEPTACIÓN</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leído el presente documento — o me ha sido leído en caso de no poder hacerlo por mí mismo(a) — y he entendido la información que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el médico tratante.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento, sin que ello implique perjuicio alguno para mi atención médica.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realización del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolución 13437 de 1991 y los estándares de acreditación internacional en salud vigentes.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realización del procedimiento descrito en este consentimiento.</label>

    <div class="anx-block-title" id="ci5SectionFirmasTitle">9. FIRMAS DE CONSENTIMIENTO</div>
    <div id="ci5DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">Yo, (nombre y documento):</div>
        <input name="ci5_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">en calidad de:</div>
        <input name="ci5_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">Declaro que:</div>
        <label><input type="checkbox" name="ci5_disent_rechaza"> Rechazo el procedimiento</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Motivo:</div>
        <textarea name="ci5_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Fecha y hora:</div>
        <input type="datetime-local" name="ci5_disent_fecha_hora" class="ax-full-line">
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
          <div class="anx-firma-foot">Nombre y vínculo/parentesco</div>
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
        <div class="anx-firma-head">Médico Tratante</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Nombre completo | Registro Médico | Especialidad</div>
      </div>
    </div>
  `
},

// ─── 6. COLONOSCOPIA ────────────────────────────────────────────────
6: {
  titulo: "Consentimiento Informado Médico Colonoscopia",
  contenido: `
    <div class="anx-block-title">4. DESCRIPCIÓN DEL PROCEDIMIENTO</div>
    <p>La colonoscopia es un procedimiento endoscópico en el que se introduce un tubo flexible con cámara a través del ano para visualizar el interior del intestino grueso (colon) y el recto. Está indicada para el estudio de sangrado rectal, alteraciones del hábito intestinal, anemia, sospecha de pólipos o tumores, enfermedad inflamatoria intestinal y detección temprana de cáncer de colon. Durante el mismo procedimiento se pueden tomar biopsias y extirpar pólipos. Se realiza bajo sedación o anestesia.</p>

    <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
    <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICACIÓN / RIESGO</th>
          <th>FRECUENCIA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>• Perforación del colon o recto (complicación grave, puede requerir cirugía)</td><td>0.05–0.1%</td></tr>
        <tr><td>• Sangrado después de extirpar un pólipo o tomar una biopsia</td><td>0.1–0.5%</td></tr>
        <tr><td>• Infección o peritonitis (si hay perforación)</td><td>Raro</td></tr>
        <tr><td>• Distensión abdominal y dolor por el gas introducido durante el procedimiento</td><td>Frecuente, transitorio</td></tr>
        <tr><td>• Reacciones adversas a la sedación (baja presión arterial, disminución respiratoria)</td><td>Poco frecuente</td></tr>
        <tr><td>• Fiebre y dolor abdominal sin perforación después de extirpar un pólipo</td><td>Raro, &lt;1%</td></tr>
        <tr><td>• Preparación intestinal incompleta que requiera repetir el procedimiento</td><td>5–10%</td></tr>
        <tr><td>• Baja en el oxígeno de la sangre durante la sedación</td><td>Poco frecuente</td></tr>
        <tr><td>• Riesgos propios de la sedación o anestesia</td><td>Ver consentimiento de anestesia</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
    <p>En mi caso particular, el médico me ha explicado los siguientes riesgos adicionales según mis condiciones de salud, edad, medicamentos, antecedentes quirúrgicos o cardiovasculares:</p>
    <div class="form-inline-field"><label>Riesgos adicionales del caso:</label><textarea name="ci6_riesgos_adicionales" rows="3" placeholder="Describa los riesgos adicionales..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci6_alt_flexible_recto_colon_izquierdo"> Endoscopia flexible del recto y colon izquierdo (solo evalúa la parte final del colon)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci6_alt_tomografia_colon"> Tomografía de colon (solo diagnóstico, sin posibilidad de tomar biopsias)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci6_alt_capsula_colon"> Cápsula endoscópica de colon</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci6_alt_no_realizar"> No realizar el procedimiento (con documentación)</label>
    </div>

    <div class="anx-block-title">8. DECLARACIÓN DE ENTENDIMIENTO Y ACEPTACIÓN</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leído el presente documento — o me ha sido leído en caso de no poder hacerlo por mí mismo(a) — y he entendido la información que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el médico tratante.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento, sin que ello implique perjuicio alguno para mi atención médica.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realización del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolución 13437 de 1991 y los estándares de acreditación internacional en salud vigentes.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realización del procedimiento descrito en este consentimiento.</label>

    <div class="anx-block-title" id="ci6SectionFirmasTitle">9. FIRMAS DE CONSENTIMIENTO</div>
    <div id="ci6DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">Yo, (nombre y documento):</div>
        <input name="ci6_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">en calidad de:</div>
        <input name="ci6_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">Declaro que:</div>
        <label><input type="checkbox" name="ci6_disent_rechaza"> Rechazo el procedimiento</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Motivo:</div>
        <textarea name="ci6_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Fecha y hora:</div>
        <input type="datetime-local" name="ci6_disent_fecha_hora" class="ax-full-line">
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
          <div class="anx-firma-foot">Nombre y vínculo/parentesco</div>
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
        <div class="anx-firma-head">Médico Tratante</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Nombre completo | Registro Médico | Especialidad</div>
      </div>
    </div>
  `
},

// ─── 7. ENDOSCOPIA DIGESTIVA ALTA ───────────────────────────────────
7: {
  titulo: "Consentimiento Informado Médico Endoscopia Digestiva Alta",
  contenido: `
    <div class="anx-block-title">4. DESCRIPCIÓN DEL PROCEDIMIENTO</div>
    <p>La endoscopia digestiva alta es un procedimiento en el que se introduce un tubo flexible con cámara por la boca para visualizar el esófago, el estómago y la primera parte del intestino delgado (duodeno). Está indicada para el estudio de dolor abdominal alto, acidez, dificultad para tragar, sangrado digestivo alto, sospecha de úlcera, gastritis, reflujo o tumor. Permite también tomar biopsias y realizar procedimientos de tratamiento. Se realiza bajo sedación o anestesia local de garganta.</p>

    <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
    <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICACIÓN / RIESGO</th>
          <th>FRECUENCIA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>• Perforación del esófago, estómago o duodeno (complicación grave)</td><td>&lt;0.05%</td></tr>
        <tr><td>• Sangrado después de tomar una biopsia o realizar un tratamiento</td><td>&lt;0.5%</td></tr>
        <tr><td>• Aspiración de contenido gástrico a las vías respiratorias</td><td>Raro</td></tr>
        <tr><td>• Dolor de garganta o molestia al tragar después del procedimiento</td><td>Frecuente, transitorio</td></tr>
        <tr><td>• Distensión abdominal por el gas introducido</td><td>Frecuente, transitorio</td></tr>
        <tr><td>• Reacciones adversas a la sedación (baja presión arterial, disminución respiratoria)</td><td>Poco frecuente</td></tr>
        <tr><td>• Espasmo de las cuerdas vocales</td><td>Raro</td></tr>
        <tr><td>• Paso transitorio de bacterias a la sangre</td><td>Muy raro</td></tr>
        <tr><td>• Riesgos propios de la sedación o anestesia</td><td>Ver consentimiento de anestesia</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
    <p>En mi caso particular, el médico me ha explicado los siguientes riesgos adicionales según mis condiciones de salud, edad, medicamentos, antecedentes quirúrgicos o cardiovasculares:</p>
    <div class="form-inline-field"><label>Riesgos adicionales del caso:</label><textarea name="ci7_riesgos_adicionales" rows="3" placeholder="Describa los riesgos adicionales..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci7_alt_estudio_radiologico_contraste"> Estudio radiológico con medio de contraste del tubo digestivo alto</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci7_alt_capsula_endoscopica"> Cápsula endoscópica</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci7_alt_manejo_medico_empirico"> Manejo médico empírico sin endoscopia (en casos de bajo riesgo)</label>
    </div>

    <div class="anx-block-title">8. DECLARACIÓN DE ENTENDIMIENTO Y ACEPTACIÓN</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leído el presente documento — o me ha sido leído en caso de no poder hacerlo por mí mismo(a) — y he entendido la información que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el médico tratante.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento, sin que ello implique perjuicio alguno para mi atención médica.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realización del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolución 13437 de 1991 y los estándares de acreditación internacional en salud vigentes.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realización del procedimiento descrito en este consentimiento.</label>

    <div class="anx-block-title" id="ci7SectionFirmasTitle">9. FIRMAS DE CONSENTIMIENTO</div>
    <div id="ci7DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">Yo, (nombre y documento):</div>
        <input name="ci7_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">en calidad de:</div>
        <input name="ci7_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">Declaro que:</div>
        <label><input type="checkbox" name="ci7_disent_rechaza"> Rechazo el procedimiento</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Motivo:</div>
        <textarea name="ci7_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Fecha y hora:</div>
        <input type="datetime-local" name="ci7_disent_fecha_hora" class="ax-full-line">
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
          <div class="anx-firma-foot">Nombre y vínculo/parentesco</div>
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
        <div class="anx-firma-head">Médico Tratante</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Nombre completo | Registro Médico | Especialidad</div>
      </div>
    </div>
  `
},

// ─── 8. EXTRACCIÓN EXTRACAPSULAR DE CRISTALINO (CATARATA) ───────────
8: {
  titulo: "Consentimiento Informado Médico Extracción Extracapsular de Cristalino",
  contenido: `
    <div class="anx-block-title">4. DESCRIPCIÓN DEL PROCEDIMIENTO</div>
    <p>La cirugía de catarata consiste en retirar el cristalino del ojo cuando se ha opacado (catarata) y reemplazarlo por un lente artificial para restaurar la visión. Mediante una pequeña incisión en la córnea, se fragmenta y aspira el cristalino opaco con ultrasonido y se implanta el lente artificial en su lugar. Se realiza bajo anestesia local (gotas o inyección alrededor del ojo) con o sin sedación leve.</p>

    <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
    <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICACIÓN / RIESGO</th>
          <th>FRECUENCIA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>• Rotura de la membrana posterior del cristalino con posible caída de fragmentos al interior del ojo</td><td>1–3%</td></tr>
        <tr><td>• Infección grave del ojo (endoftalmitis) que puede causar pérdida de visión</td><td>&lt;0.1%</td></tr>
        <tr><td>• Hinchazón de la córnea transitoria o permanente</td><td>&lt;1%</td></tr>
        <tr><td>• Desprendimiento de retina después de la cirugía</td><td>0.5–1%</td></tr>
        <tr><td>• Opacificación de la membrana posterior (membrana secundaria que requiere tratamiento con láser posterior)</td><td>20–40%</td></tr>
        <tr><td>• Hemorragia grave dentro del ojo (muy rara)</td><td>&lt;0.1%</td></tr>
        <tr><td>• Descentramiento o desplazamiento del lente artificial implantado</td><td>&lt;1%</td></tr>
        <tr><td>• Hinchazón de la retina central con disminución de la visión</td><td>1–2%</td></tr>
        <tr><td>• Inflamación ocular (uveítis)</td><td>Poco frecuente</td></tr>
        <tr><td>• Aumento de la presión intraocular</td><td>1–2%</td></tr>
        <tr><td>• Riesgos propios de la anestesia local o sedación</td><td>Ver consentimiento de anestesia</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
    <p>En mi caso particular, el médico me ha explicado los siguientes riesgos adicionales según mis condiciones de salud, edad, medicamentos, ojo a operar u otras circunstancias:</p>
    <div class="form-inline-field"><label>Riesgos adicionales del caso:</label><textarea name="ci8_riesgos_adicionales" rows="3" placeholder="Describa los riesgos adicionales..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci8_alt_observacion"> Observación (cataratas iniciales sin impacto significativo en las actividades diarias)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci8_alt_correccion_optica"> Corrección óptica con gafas o lentes de contacto (alivio temporal)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci8_alt_no_cirugia"> No cirugía (con documentación del impacto en la calidad de vida)</label>
    </div>

    <div class="anx-block-title">8. DECLARACIÓN DE ENTENDIMIENTO Y ACEPTACIÓN</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leído el presente documento — o me ha sido leído en caso de no poder hacerlo por mí mismo(a) — y he entendido la información que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el médico tratante.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento, sin que ello implique perjuicio alguno para mi atención médica.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realización del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolución 13437 de 1991 y los estándares de acreditación internacional en salud vigentes.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realización del procedimiento descrito en este consentimiento.</label>

    <div class="anx-block-title" id="ci8SectionFirmasTitle">9. FIRMAS DE CONSENTIMIENTO</div>
    <div id="ci8DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">Yo, (nombre y documento):</div>
        <input name="ci8_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">en calidad de:</div>
        <input name="ci8_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">Declaro que:</div>
        <label><input type="checkbox" name="ci8_disent_rechaza"> Rechazo el procedimiento</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Motivo:</div>
        <textarea name="ci8_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Fecha y hora:</div>
        <input type="datetime-local" name="ci8_disent_fecha_hora" class="ax-full-line">
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
          <div class="anx-firma-foot">Nombre y vínculo/parentesco</div>
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
        <div class="anx-firma-head">Médico Tratante</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Nombre completo | Registro Médico | Especialidad</div>
      </div>
    </div>
  `
},

// ─── 9. HERNIORRAFIA UMBILICAL ───────────────────────────────────────
9: {
  titulo: "Consentimiento Informado Médico Herniorrafia Umbilical",
  contenido: `
    <div class="anx-block-title">4. DESCRIPCIÓN DEL PROCEDIMIENTO</div>
    <p>La herniorrafia umbilical es la corrección quirúrgica de la hernia umbilical, que ocurre cuando parte del intestino u otro tejido abdominal sale a través de un defecto en la musculatura de la zona del ombligo. Bajo anestesia (local, regional o general), se devuelve el contenido herniado a su posición normal y se cierra el defecto de la pared abdominal con puntos o con una malla protésica para evitar la recurrencia.</p>

    <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
    <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICACIÓN / RIESGO</th>
          <th>FRECUENCIA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Infección de la herida quirúrgica</td><td>2–5%</td></tr>
        <tr><td>Hematoma o acumulación de líquido en el sitio de la cirugía</td><td>2–5%</td></tr>
        <tr><td>Recurrencia de la hernia</td><td>1–10% según técnica y características del paciente</td></tr>
        <tr><td>Dolor crónico en la zona operada</td><td>2–5%</td></tr>
        <tr><td>Complicaciones de la malla (infección, rechazo, adherencias)</td><td>&lt;2%</td></tr>
        <tr><td>Parálisis intestinal temporal post-operatoria</td><td>Poco frecuente</td></tr>
        <tr><td>Lesión intestinal o de vasos sanguíneos</td><td>Muy raro</td></tr>
        <tr><td>Riesgos propios de la anestesia utilizada</td><td>Ver consentimiento de anestesia</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
    <p>En mi caso particular, el médico me ha explicado los siguientes riesgos adicionales según mis condiciones de salud, obesidad, antecedentes quirúrgicos, tabaquismo, tamaño del defecto u otras comorbilidades:</p>
    <div class="form-inline-field"><label>Riesgos adicionales del caso:</label><textarea name="ci9_riesgos_adicionales" rows="3" placeholder="Describa los riesgos adicionales..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci9_alt_observacion"> Observación (hernias pequeñas asintomáticas, especialmente en niños menores de 2 años)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci9_alt_faja"> Faja o sostén abdominal (alivio temporal, no es tratamiento definitivo)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci9_alt_no_cirugia"> No cirugía (con documentación de los riesgos de complicaciones)</label>
    </div>

    <div class="anx-block-title">8. DECLARACIÓN DE ENTENDIMIENTO Y ACEPTACIÓN</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leído el presente documento — o me ha sido leído en caso de no poder hacerlo por mí mismo(a) — y he entendido la información que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el médico tratante.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento, sin que ello implique perjuicio alguno para mi atención médica.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realización del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolución 13437 de 1991 y los estándares de acreditación internacional en salud vigentes.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realización del procedimiento descrito en este consentimiento.</label>

    <div class="anx-block-title" id="ci9SectionFirmasTitle">9. FIRMAS DE CONSENTIMIENTO</div>
    <div id="ci9DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">Yo, (nombre y documento):</div>
        <input name="ci9_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">en calidad de:</div>
        <input name="ci9_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">Declaro que:</div>
        <label><input type="checkbox" name="ci9_disent_rechaza"> Rechazo el procedimiento</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Motivo:</div>
        <textarea name="ci9_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Fecha y hora:</div>
        <input type="datetime-local" name="ci9_disent_fecha_hora" class="ax-full-line">
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
          <div class="anx-firma-foot">Nombre y vínculo/parentesco</div>
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
        <div class="anx-firma-head">Médico Tratante</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Nombre completo | Registro Médico | Especialidad</div>
      </div>
    </div>
  `
},

// ─── 10. ANESTESIA ──────────────────────────────────────────────────
10: {
  titulo: "Consentimiento Informado de Anestesia",
  contenido: `
    <p>En mi condición de paciente/tutor, certifico que el Dr. <strong>(anestesiólogo)</strong> me ha explicado de manera clara y sencilla, los tipos de anestesia, los riesgos propios de cada una y las expectativas de complicaciones teniendo en cuenta además de la anestesia, mi condición física y el tipo de cirugía a realizarme.</p>
    <p>Entiendo que si bien hemos elaborado un plan anestésico; este puede ser modificado en el transcurso de la operación, además que el anestesiólogo usará los medios disponibles para brindar la mayor seguridad en el acto anestésico y en el manejo de las complicaciones que se presentaren. Es claro que no se me pueden garantizar resultados a pesar de todo ello y que he tenido la oportunidad de hacer preguntas para aclarar mis dudas.</p>
    <p><strong>Entiendo que el anestesiólogo que me valoró en la consulta puede o no ser el mismo que me asista durante el procedimiento.</strong></p>

    <div class="form-inline-field"><label>Tipo de cirugía a realizar:</label><input type="text" name="ci_tipo_cirugia" placeholder="Describa la cirugía..." required></div>

    <h4>POSIBLES COMPLICACIONES EN SEDACIÓN O ANESTESIA GENERAL</h4>
    <p><strong>MENORES:</strong> Reacción alérgica leve, náuseas, vómitos, temblor, flebitis, lesiones menores en labios, dientes, boca. Espasmo de las cuerdas vocales leve, disminución de la fuerza o sensibilidad o dolor crónico por compresión de nervios debido a la posición.</p>
    <p><strong>MAYORES:</strong> Hipotensión o hipertensión severas que lleven a problemas cardíacos o cerebrales como isquemia, infarto cardíaco, insuficiencia cardíaca, sangrado cerebral con disminución variable del estado de conciencia hasta el coma. Reacción alérgica severa, espasmo de las cuerdas vocales severo con edema pulmonar, broncoaspiración, broncoespasmo, trombosis venosa con embolismo pulmonar.</p>
    <p><em>Estas complicaciones pueden conllevar finalmente a la muerte.</em></p>

    <h4>POSIBLES COMPLICACIONES EN ANESTESIA REGIONAL</h4>
    <p>Cefalea o dolor de cabeza posterior a la punción de la duramadre. Temblor, náuseas, vómito, reacciones alérgicas, dolor lumbar, toxicidad por anestésicos locales incluyendo arritmias, disminución de frecuencia cardíaca y paro, o convulsiones y coma. Lesión neurológica con disminución de la fuerza o sensibilidad temporal o permanente. Broncoaspiración, broncoespasmo, trombosis venosa, embolismo pulmonar.</p>
    <p><em>Algunas de estas complicaciones pueden ser graves y conllevar a la muerte.</em></p>

    <div class="form-inline-field"><label>Riesgos adicionales específicos del paciente:</label><textarea name="ci_riesgos_esp" rows="2" placeholder="Riesgos adicionales..."></textarea></div>
  `
},

// ─── 11. LITOTRICIA EXTRACORPÓREA (ondas de choque) ──────────────────
11: {
  titulo: "Consentimiento Informado — Litotricia Extracorpórea por Ondas de Choque",
  contenido: `
    <div class="anx-block-title">4. DESCRIPCIÓN DEL PROCEDIMIENTO</div>
    <p>La litotricia extracorpórea por ondas de choque es un procedimiento no invasivo para tratar cálculos (piedras) en el riñón o el uréter. Mediante un equipo externo que genera ondas acústicas de alta energía, se fragmentan los cálculos desde el exterior del cuerpo sin incisiones. Los fragmentos resultantes son eliminados de forma natural a través de la orina. Se requiere sedación o anestesia para controlar el dolor. El procedimiento puede requerir más de una sesión.</p>

    <div class="anx-block-title">5. POSIBLES COMPLICACIONES</div>
    <p class="anx-p">Me ha informado sobre las posibles complicaciones del procedimiento y entiendo que pueden presentarse los siguientes riesgos:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICACIÓN / RIESGO</th>
          <th>FRECUENCIA</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Cólico renal por paso de los fragmentos del cálculo por el uréter</td><td>Frecuente</td></tr>
        <tr><td>Sangre en la orina de manera transitoria</td><td>Muy frecuente</td></tr>
        <tr><td>Acumulación de sangre alrededor del riñón (hematoma perirrenal)</td><td>0.5–1%</td></tr>
        <tr><td>Obstrucción del uréter por acumulación de fragmentos</td><td>2–4%</td></tr>
        <tr><td>Infección urinaria o infección generalizada (especialmente si el cálculo está infectado)</td><td>1–3%</td></tr>
        <tr><td>Fragmentación incompleta que requiera procedimiento adicional</td><td>10–30% según tamaño del cálculo</td></tr>
        <tr><td>Manchas o moretones en la piel en la zona de impacto de las ondas</td><td>Frecuente, transitorio</td></tr>
        <tr><td>Lesión de órganos vecinos en casos excepcionales</td><td>Muy raro</td></tr>
        <tr><td>Riesgos propios de la sedación o anestesia</td><td>Ver consentimiento de anestesia</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. RIESGOS ADICIONALES DE MI CASO PARTICULAR</div>
    <p>En mi caso particular, el médico me ha explicado los siguientes riesgos adicionales según el tamaño y número de cálculos, antecedentes de infección, anatomía, función renal, tratamiento anticoagulante u otras condiciones:</p>
    <div class="form-inline-field"><label>Riesgos adicionales del caso:</label><textarea name="ci10_riesgos_adicionales" rows="3" placeholder="Describa los riesgos adicionales..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVAS AL PROCEDIMIENTO</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci10_alt_endoscopia_laser"> Endoscopia ureteral con fragmentación láser del cálculo</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci10_alt_percutanea"> Extracción percutánea del cálculo (para cálculos grandes mayores de 2 cm)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci10_alt_expectante"> Manejo expectante con hidratación y analgesia (cálculos pequeños con alta probabilidad de salida espontánea)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci10_alt_cirugia_abierta_lap"> Cirugía abierta o laparoscópica (casos complejos)</label>
    </div>

    <div class="anx-block-title">8. DECLARACIÓN DE ENTENDIMIENTO Y ACEPTACIÓN</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> Declaro que he leído el presente documento — o me ha sido leído en caso de no poder hacerlo por mí mismo(a) — y he entendido la información que se me ha suministrado. He tenido oportunidad de formular todas las preguntas que he considerado necesarias, y las mismas han sido respondidas de manera satisfactoria por el médico tratante.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> Entiendo que puedo revocar este consentimiento en cualquier momento antes de la realización del procedimiento, sin que ello implique perjuicio alguno para mi atención médica.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Por lo anterior, de manera libre, consciente, informada y voluntaria, OTORGO MI CONSENTIMIENTO para la realización del procedimiento descrito, conforme a lo establecido en la Ley 23 de 1981, el Decreto 3380 de 1981, la Resolución 13437 de 1991 y los estándares de acreditación internacional en salud vigentes.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> No autorizo la realización del procedimiento descrito en este consentimiento.</label>

    <div class="anx-block-title" id="ci10SectionFirmasTitle">9. FIRMAS DE CONSENTIMIENTO</div>
    <div id="ci10DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">Yo, (nombre y documento):</div>
        <input name="ci10_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">en calidad de:</div>
        <input name="ci10_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">Declaro que:</div>
        <label><input type="checkbox" name="ci10_disent_rechaza"> Rechazo el procedimiento</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Motivo:</div>
        <textarea name="ci10_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Fecha y hora:</div>
        <input type="datetime-local" name="ci10_disent_fecha_hora" class="ax-full-line">
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
          <div class="anx-firma-foot">Nombre y vínculo/parentesco</div>
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
        <div class="anx-firma-head">Médico Tratante</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Nombre completo | Registro Médico | Especialidad</div>
      </div>
    </div>
  `
},

// ─── 12. MÉDICO GENERAL ─────────────────────────────────────────────
12: {
  titulo: "Consentimiento Informado Médico",
  contenido: `
    <p>Mediante el presente documento legal certifico que he sido informado por parte del Médico Tratante de la Clínica Medihelp Services sobre la siguiente actividad, intervención, procedimiento especial o tratamiento que requiero:</p>
    <div class="form-inline-field"><label>Descripción del procedimiento o tratamiento:</label><textarea name="ci_procedimiento" rows="2" placeholder="Describa el procedimiento o tratamiento..." required></textarea></div>
    <p>Y se me ha informado de igual manera que este procedimiento o servicio es integral y puede generar, entre otros, los siguientes efectos secundarios o colaterales y las siguientes complicaciones, entendiéndose como riesgos que se pueden presentar incluso bajo condiciones de atención adecuada:</p>
    <div class="form-inline-field"><label>Riesgos y complicaciones informados:</label><textarea name="ci_riesgos" rows="3" placeholder="Describa los riesgos y complicaciones..." required></textarea></div>
    <p>He sido informado sobre las alternativas de tratamiento disponibles y reconozco mi derecho a rechazar el procedimiento. Este documento constituye un instrumento legal basado en el principio de autonomía.</p>
    <div class="form-inline-field"><label>Alternativas de tratamiento:</label><textarea name="ci_alternativas" rows="2" placeholder="Alternativas de tratamiento..." required></textarea></div>
  `
},

// ─── 13. FISIOTERAPIA ───────────────────────────────────────────────
13: {
  titulo: "Consentimiento Informado - Fisioterapia",
  contenido: `
    <p>Certifico que he sido informado que el personal de fisioterapia que labora en la Clínica Medihelp Services desarrolla su trabajo de acuerdo a protocolos y procedimientos basados en evidencia científica, para brindarme un ambiente de seguridad y confort en el proceso de rehabilitación. Sustentado bajo la Ley 528 de 1999 de Fisioterapia.</p>
    <h4>Terapia respiratoria</h4>
    <p><strong>Inhaloterapia</strong> — <em>Beneficios:</em> facilita la administración de medicamentos a las vías respiratorias, mejora la ventilación. <em>Riesgos:</em> broncoespasmo, reacciones adversas. <em>Barreras:</em> intolerancia al procedimiento, falta de cooperación.</p>
    <p><strong>Lavado nasal</strong> — <em>Beneficios:</em> reduce la congestión nasal. <em>Riesgos:</em> estornudos, irritación nasal transitoria. <em>Barreras:</em> epistaxis activa, obstrucción nasal severa.</p>
    <p><strong>Incentivos respiratorios</strong> — <em>Beneficios:</em> expansión pulmonar, prevención de atelectasias. <em>Riesgos:</em> hiperventilación, mareo, fatiga. <em>Barreras:</em> déficit de comprensión, debilidad muscular, dolor torácico.</p>
    <p><strong>Muestras respiratorias</strong> (panel neumonía, panel respiratorio, SARS-CoV-2, adenovirus, RSV, influenza) — <em>Beneficios:</em> diagnóstico etiológico. <em>Riesgos:</em> molestias, tos, náuseas, hemorragias menores. <em>Barreras:</em> aceptación del paciente, contraindicaciones clínicas.</p>
    <h4>Terapia física y rehabilitación funcional</h4>
    <p><em>Beneficios:</em> mejora de la movilidad, fuerza muscular, independencia funcional y calidad de vida. <em>Riesgos:</em> fatiga, dolor, exacerbación de síntomas. <em>Barreras:</em> estado clínico inestable, falta de motivación, dolor no controlado.</p>
    <h4>Toma de muestra sanguínea (gases arteriales)</h4>
    <p><em>Beneficios:</em> conocer el estado ácido-base, oxigenación y ventilación. <em>Riesgos:</em> dolor local, hematoma, sangrado, infección. <em>Barreras:</em> trastornos de coagulación, mala perfusión periférica.</p>
    <h4>Cuidados de vía aérea artificial (Traqueostomía / Tubo endotraqueal)</h4>
    <p><strong>Aspiración con sistema abierto/cerrado</strong> — <em>Beneficios:</em> remoción de secreciones. <em>Riesgos:</em> hipoxemia transitoria, trauma de mucosa traqueal, infección respiratoria, broncoespasmo. <em>Barreras:</em> intolerancia al procedimiento, ansiedad, reflejo tusígeno exacerbado.</p>
    <p><em>La prescripción de medicamentos es competencia exclusiva del médico. Las actividades de fisioterapia no pueden garantizar los resultados, teniendo en cuenta los múltiples factores que inciden en la recuperación.</em></p>
  `
},

// ─── 14. OBTENCIÓN DE IMÁGENES CON CONTENIDO CLÍNICO ─────────────────
14: {
  titulo: "Consentimiento Informado - Obtención de Imágenes con Contenido Clínico",
  contenido: `
    <p>Mediante el presente documento legal certifico que he sido informado por el personal de la Clínica Medihelp Services de la siguiente actividad, intervención o procedimiento imagenológico que requiero:</p>
    <div class="form-inline-field"><label>Tipo de procedimiento imagenológico:</label><input type="text" name="ci_procedimiento_img" placeholder="Ej: Rx, TAC, RM, Ecografía, fluoroscopia..." required></div>
    <p>Se me ha informado que este procedimiento puede incluir la administración de diferentes tipos de <strong>medios de contraste</strong> por vía oral y/o intravenosa.</p>
    <h4>Riesgos asociados al contraste:</h4>
    <ul>
      <li>Reacciones alérgicas graves (0.05% a 0.22% de los casos)</li>
      <li>Reacciones fatales (0.001% a 0.03% de los casos)</li>
    </ul>
    <h4>Verificación mediante check list:</h4>
    <ul>
      <li>Historial alérgico</li>
      <li>Posibilidad de embarazo</li>
      <li>Función renal</li>
      <li>Verificación de identidad</li>
      <li>Tipo de estudio y área anatómica</li>
      <li>Preparación adecuada</li>
    </ul>
    <p>Para procedimientos que requieren punción (biopsias, colocación de dispositivos con ayuda imagenológica) existen riesgos específicos asociados.</p>
    <div class="form-inline-field"><label>Riesgos asociados a punción (si aplica):</label><textarea name="ci_riesgos_puncion" rows="2" placeholder="Riesgos específicos de la punción..."></textarea></div>
    <p>Autorizo a la institución y su personal médico, enfermería y/o tecnológico a practicar las maniobras y administración de fármacos necesarios en caso de cualquier reacción adversa.</p>
  `
},

// ─── 16. ENFERMERÍA ─────────────────────────────────────────────────
16: {
  titulo: "Consentimiento Informado de Enfermería",
  contenido: `
    <p>Certifico que he sido informado que el personal de enfermería que labora en la Clínica Medihelp Services desarrolla su trabajo —"cuidado de enfermería"— de acuerdo a protocolos y procedimientos basados en evidencia científica establecidos para brindarme un ambiente de seguridad, confort y calidez durante mi estancia.</p>
    <h4>Procedimientos de enfermería:</h4>
    <table class="form-table">
      <thead><tr><th>Procedimiento</th><th>Beneficio</th><th>Riesgos</th></tr></thead>
      <tbody>
        <tr><td>Canalización venosa (vía IV)</td><td>Administración de medicamentos, hidratación, componentes sanguíneos</td><td>Hematoma, infecciones</td></tr>
        <tr><td>Toma de muestra sanguínea y fluidos corporales</td><td>Diagnóstico</td><td>Hematoma, rechazo de muestra</td></tr>
        <tr><td>Administración de medicamentos</td><td>Acción terapéutica</td><td>Reacción adversa al medicamento</td></tr>
        <tr><td>Paso de sonda vesical</td><td>Drenaje de la vejiga</td><td>Infección, trauma</td></tr>
        <tr><td>Paso de sonda al tracto gastrointestinal</td><td>Nutrición y/o drenaje del contenido gástrico</td><td>Infección asociada a la atención en salud, broncoaspiración</td></tr>
        <tr><td>Curación de heridas</td><td>Cierre de heridas, prevención de infecciones</td><td>Infección asociada a la atención en salud, retraso en cicatrización</td></tr>
      </tbody>
    </table>
    <p><em>La prescripción de medicamentos es competencia exclusiva del médico. Las actividades de enfermería no pueden garantizar los resultados. Sustentado bajo la Ley 911 de 2004 de Enfermería.</em></p>
  `
},

};
