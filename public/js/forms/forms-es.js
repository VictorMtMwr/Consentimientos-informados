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
    <p>Declaro que he sido informado por el médico de la Clínica Medihelp Services acerca de mi enfermedad y sobre el tratamiento médico quirúrgico, entendiendo que requiere:</p>
    <h4>Descripción quirúrgica completa:</h4>
    <p><strong>Anestesia general</strong>, apertura del tórax para visualizar adecuadamente órganos como el corazón, las arterias y los pulmones. En algunas ocasiones es necesario detener y/o abrir el corazón mientras se reparan los defectos. Mientras el corazón está detenido, se utilizan medidas de protección y es necesario que la sangre circule por un equipo externo al cuerpo (máquina de circulación extracorpórea), el cual requiere anticoagulación temporal.</p>
    <h4>Efectos indeseables y riesgos (con porcentajes reportados):</h4>
    <ol>
      <li>Hemorragia que prolongue la intervención o que obligue a reoperar (3.9–6.8%)</li>
      <li>Reacciones de hipersensibilidad o alergia a sangre o medicamentos (1–3%)</li>
      <li>Riesgo de transmisión de enfermedades infectocontagiosas por transfusión sanguínea (1–1.6%)</li>
      <li>Accidente vascular cerebral — embolia o hemorragia (1.1–1.4%)</li>
      <li>Incapacidad del corazón para mantener la circulación, shock cardiogénico (2.4–12%)</li>
      <li>Necesidad de asistir al corazón con dispositivos mecánicos (0.2–0.6%)</li>
      <li>Paro cardiocirculatorio en el postoperatorio (0.7–2.9%)</li>
      <li>Isquemia o infarto de miocardio perioperatorio (1%)</li>
      <li>Bloqueo auriculoventricular con necesidad de marcapasos definitivo (0.9%)</li>
      <li>Arritmias (30–50%)</li>
      <li>Síndrome de dificultad respiratoria aguda, ventilación prolongada (6–11.9%)</li>
      <li>Insuficiencia renal aguda que pueda requerir diálisis (1.7%)</li>
      <li>Infección profunda de tórax o de la herida (3.9–6.8%)</li>
      <li>Úlcera gástrica o duodenal y hemorragia digestiva (1.6%)</li>
      <li>Formación de trombos venosos con riesgo de embolia pulmonar (0.2%)</li>
      <li>Cicatrices hipertróficas o queloideas</li>
      <li>Necesidad de reintervención en algunos casos de urgencia (2.1%)</li>
      <li>Riesgos propios de la anestesia</li>
      <li>Muerte según EuroScore</li>
    </ol>
    <p>Se me ha informado sobre el manejo del dolor postoperatorio. El éxito del procedimiento depende de los hallazgos quirúrgicos y de la condición clínica previa del paciente.</p>
    <div class="form-inline-field"><label>Riesgos adicionales específicos del paciente:</label><textarea name="ci_riesgos_adicionales" rows="2" placeholder="Riesgos adicionales específicos..."></textarea></div>
    <div class="form-inline-field"><label>Alternativas al procedimiento:</label><textarea name="ci_alternativas" rows="2" placeholder="Alternativas de tratamiento..."></textarea></div>
    <div class="form-inline-field"><label>Cirujanos autorizados:</label><input type="text" name="ci_cirujanos" placeholder="Nombres de los cirujanos"></div>
    <div class="form-inline-field"><label>Tipo de válvula (si aplica):</label><input type="text" name="ci_tipo_valvula" placeholder="Ej: válvula mecánica, biológica..."></div>
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

// ─── 4. COMPONENTES SANGUÍNEOS ──────────────────────────────────────
4: {
  titulo: "Consentimiento Informado - Administración de Componentes Sanguíneos",
  contenido: `
    <p>Este documento tiene como finalidad informarlo para que usted o quien lo represente pueda consentir o rechazar la administración de componentes sanguíneos en la Clínica Medihelp Services.</p>
    <p>Declaro que he sido informado que puedo necesitar la administración de uno o varios componentes sanguíneos ahora o en el futuro, con el objetivo de restablecer mi salud y preservar la vida:</p>
    <h4>Componentes sanguíneos:</h4>
    <ul>
      <li><strong>Glóbulos rojos</strong> — transportan el oxígeno a los tejidos</li>
      <li><strong>Plaquetas</strong> — participan en la coagulación de la sangre</li>
      <li><strong>Plasma</strong> — contiene factores que ayudan a la coagulación sanguínea</li>
      <li><strong>Crioprecipitado</strong> — contiene factores específicos de coagulación</li>
      <li><strong>Sangre total</strong> — contiene todas las propiedades anteriores</li>
    </ul>
    <p>Manifiesto entender que el origen de los componentes sanguíneos puede ser de un donante o de mi propia sangre recolectada con anterioridad, examinada y revisada para detectar la presencia de agentes infecciosos.</p>
    <h4>Alternativas evaluadas:</h4>
    <p>Antes de proponer este procedimiento, el equipo tratante evaluó otras opciones terapéuticas como: autotransfusión, terapia con hierro y vitaminas, infusión de expansores de volumen, medicamentos (eritropoyetina, ácido tranexámico), uso de cell salvage (recuperación de sangre), entre otros.</p>
    <h4>Pruebas pre-transfusión:</h4>
    <p>Se realizarán pruebas de tipificación ABO/RH y pruebas de compatibilidad. El monitoreo no elimina totalmente el riesgo de transmisión de enfermedades.</p>
    <h4>Reacciones adversas posibles:</h4>
    <ul>
      <li>Fiebre con o sin escalofrío</li>
      <li>Alteración de la función renal</li>
      <li>Dificultad respiratoria</li>
      <li>Modificación de la tensión arterial</li>
      <li>Transmisión de infecciones</li>
      <li>Alteraciones cutáneas (prurito, urticaria, edema)</li>
      <li>Cambio del color de la orina</li>
    </ul>
    <p><em>No existe garantía absoluta del beneficio de la transfusión.</em></p>
  `
},

// ─── 5. ESTUDIOS DE INVESTIGACIÓN ───────────────────────────────────
5: {
  titulo: "Consentimiento Informado - Realización de Estudios de Investigación",
  contenido: `
    <p>Mediante el presente documento certifico mi consentimiento para participar en un estudio de investigación en la Clínica Medihelp Services.</p>
    <div class="form-inline-field"><label>Nombre del estudio:</label><input type="text" name="ci_nombre_estudio" placeholder="Nombre del estudio" required></div>
    <div class="form-inline-field"><label>Investigador principal:</label><input type="text" name="ci_investigador" placeholder="Nombre del investigador" required></div>
    <div class="form-inline-field"><label>Institución u organización:</label><input type="text" name="ci_institucion_inv" placeholder="Nombre de la institución"></div>
    <h4>Información que debe incluir el estudio (basada en recomendaciones OMS):</h4>
    <ul>
      <li>Introducción y propósito del estudio</li>
      <li>Tipo de intervención y selección de participantes</li>
      <li>Condiciones de participación voluntaria</li>
      <li>Procedimientos, protocolos y duración</li>
      <li>Efectos secundarios, riesgos y molestias</li>
      <li>Posibles beneficios e incentivos</li>
      <li>Confidencialidad de los datos</li>
      <li>Derecho a rechazar o retirarse en cualquier momento</li>
      <li>Alternativas de tratamiento disponibles</li>
    </ul>
    <div class="form-inline-field"><label>Información detallada del estudio:</label><textarea name="ci_info_estudio" rows="6" placeholder="Introducción, propósito, intervención, procedimientos, duración, efectos secundarios, riesgos, beneficios, confidencialidad, alternativas..." required></textarea></div>
    <p>Esta propuesta ha sido revisada y aprobada por el Comité de Ética de la Clínica Medihelp. He leído la información proporcionada o me ha sido leída. He tenido la oportunidad de preguntar sobre ella y se me ha contestado satisfactoriamente.</p>
    <p><strong>Consiento voluntariamente participar</strong> en esta investigación y entiendo que tengo el derecho a retirarme en cualquier momento sin que me afecte mi cuidado médico. Se me proporcionará una copia de este consentimiento.</p>
  `
},

// ─── 6. PROCEDIMIENTOS DURANTE PANDEMIA COVID-19 ────────────────────
6: {
  titulo: "Consentimiento Informado - Procedimientos Durante la Pandemia COVID-19",
  contenido: `
    <h4>Información sobre COVID-19</h4>
    <p>La Clínica Medihelp Services presta sus servicios de salud basados en un modelo de atención con calidad, seguridad y cuidado humanizado. Actualmente cursa una pandemia por el nuevo coronavirus (SARS-CoV-2). La COVID-19 es la enfermedad infecciosa causada por dicho coronavirus.</p>
    <p><strong>Síntomas más frecuentes:</strong> fiebre, tos, disnea, mialgias, fatiga, diarrea y alteración del olfato y el gusto.</p>
    <p><strong>Distribución de severidad:</strong> La mayoría de los casos (81%) tienen enfermedad leve; el 14% requieren oxigenoterapia y el 5% ameritan cuidado intensivo. Aproximadamente 8 de cada 10 personas se recuperan sin necesidad de tratamiento especial. Una de cada 6 personas desarrolla una enfermedad grave.</p>
    <h4>Mortalidad según condición previa:</h4>
    <ul>
      <li>Cáncer: 5.6%</li>
      <li>Hipertensión: 6%</li>
      <li>Enfermedad respiratoria crónica: 6.3%</li>
      <li>Diabetes mellitus: 7.3%</li>
      <li>Enfermedad cardiovascular: 10.5%</li>
    </ul>
    <div class="form-inline-field"><label>Procedimiento a realizar:</label><input type="text" name="ci_procedimiento_covid" placeholder="Nombre del procedimiento" required></div>
    <h4>Riesgo en ambiente hospitalario:</h4>
    <p>Al estar en un ambiente hospitalario es posible que durante su estancia se puedan desarrollar síntomas de la enfermedad, pues usted pudo haber ingresado como portador asintomático o puede contagiarse del coronavirus durante la estadía.</p>
    <h4>Posibles complicaciones en caso de contagio:</h4>
    <ul>
      <li>Necesidad de hospitalización con oxígeno</li>
      <li>Aislamiento</li>
      <li>Uso de antibióticos</li>
      <li>Traslado a UCI</li>
      <li>Intubación y soporte ventilatorio</li>
      <li>Uso de soporte con pulmón artificial (ECMO)</li>
      <li>Muerte</li>
    </ul>
    <p><em>La atención quirúrgica no se recomienda para procedimientos electivos durante la pandemia salvo indicación médica.</em> Debo seguir las medidas de higiene indicadas por la institución.</p>
    <p><strong>Confirmo que no estoy presentando ningún síntoma</strong> mencionado, no he estado en contacto con personas portadoras del virus ni he viajado a otros países en los últimos 14 días.</p>
  `
},

// ─── 7. PRUEBA DE VIH ──────────────────────────────────────────────
7: {
  titulo: "Consentimiento Informado - Prueba de VIH",
  contenido: `
    <p>Autorizo al laboratorio de la Clínica Medihelp Services para que me realice la prueba del VIH. Este documento se diligencia con el fin de brindar consejería sobre la realización de la prueba para detectar el virus de la inmunodeficiencia humana (VIH) y dar cumplimiento al Decreto 1543 de 1997 del Ministerio de la Protección Social.</p>
    <h4>Propósito y beneficio de la prueba</h4>
    <p>Se me realizará una prueba presuntiva de VIH para determinar si estoy infectado o no con el Virus de Inmunodeficiencia Humana.</p>
    <h4>Interpretación de resultados:</h4>
    <ul>
      <li><strong>Reactivo:</strong> Se han detectado anticuerpos contra el VIH. Se requiere una segunda prueba de confirmación.</li>
      <li><strong>No reactivo (negativo):</strong> No hay evidencia de infección al momento de la prueba.</li>
      <li><strong>Indeterminado:</strong> No hay certeza de infección real. Se requiere repetir la prueba en un mes.</li>
    </ul>
    <h4>Limitaciones:</h4>
    <ul>
      <li>Posibilidad de <strong>falsos positivos</strong></li>
      <li>Posibilidad de <strong>falsos negativos</strong> durante el período de ventana inmunológica</li>
    </ul>
    <h4>Riesgos emocionales:</h4>
    <p>Enfrentarse a una fuerte reacción emocional, incluyendo ansiedad y depresión. También puedo ser objeto de discriminación o rechazo. Se recomienda buscar apoyo y asesoría post-prueba.</p>
    <p><strong>Confidencialidad:</strong> Todo profesional del equipo de salud está en la obligación de mantener la confidencialidad sobre mi diagnóstico. Todos los profesionales de la salud deben mantener el secreto profesional.</p>
    <p>He recibido consejería pre-prueba, comprendo la naturaleza voluntaria de la prueba y puedo retirar mi consentimiento antes de la toma de la muestra. He sido informado sobre las protecciones de confidencialidad y las medidas de prevención.</p>
  `
},

// ─── 8. VISITA DOMICILIARIA ─────────────────────────────────────────
8: {
  titulo: "Consentimiento Informado - Visita Domiciliaria",
  contenido: `
    <p>En cumplimiento de la normatividad vigente en materia de seguridad y salud en el trabajo, y en el marco del Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST), la Clínica Medihelp Services y/o la empresa han desarrollado Programas de Vigilancia Epidemiológica (PVE), conforme a:</p>
    <ul>
      <li><strong>Resolución 0312 de 2019</strong> — artículos 5, 8 y 10, sobre los estándares mínimos del SG-SST.</li>
      <li><strong>Decreto 1072 de 2015</strong> — reglamenta el SG-SST y contempla actividades preventivas.</li>
    </ul>
    <div class="form-inline-field"><label>Cargo o posición:</label><input type="text" name="ci_cargo" placeholder="Cargo del trabajador"></div>
    <div class="form-inline-field"><label>Programa de vigilancia:</label><input type="text" name="ci_programa" placeholder="Nombre del programa"></div>
    <div class="form-inline-field"><label>Empresa o empleador:</label><input type="text" name="ci_empresa" placeholder="Nombre de la empresa"></div>
    <h4>Propósito de la visita:</h4>
    <ul>
      <li>Hacer seguimiento a las condiciones de salud del trabajador.</li>
      <li>Verificar el cumplimiento de recomendaciones y restricciones médicas.</li>
      <li>Identificar factores psicosociales, ambientales o familiares que influyan en la rehabilitación.</li>
      <li>Brindar orientación en medidas de autocuidado y hábitos saludables.</li>
    </ul>
    <h4>Alcance:</h4>
    <p>La visita será realizada en la residencia informada por el colaborador. Tendrá carácter <strong>preventivo, educativo, asistencial y estrictamente confidencial</strong>. No tiene fines disciplinarios ni coercitivos.</p>
    <h4>Confidencialidad:</h4>
    <p>La información será tratada conforme a la Ley 1581 de 2012 (Protección de Datos Personales), Ley 23 de 1981 (Ética Médica) y Resolución 1995 de 1999 (Historia Clínica).</p>
  `
},

// ─── 9. PSICOLOGÍA ──────────────────────────────────────────────────
9: {
  titulo: "Consentimiento Informado - Psicología",
  contenido: `
    <p>Mediante el presente documento legal certifico que he sido informado por parte del Psicólogo de la Clínica Medihelp Services sobre la siguiente actividad, intervención, procedimiento especial o tratamiento que requiero:</p>
    <p><strong>Atención y apoyo psicológico</strong> durante mi estancia en la institución, basado en el acompañamiento, valoración, intervención y seguimiento de la necesidad presentada como paciente, y monitorear el avance emocional y mental en el proceso de hospitalización y tratamiento médico.</p>
    <h4>Posibles efectos secundarios o complicaciones:</h4>
    <ul>
      <li>Aumento o aparición de nuevos síntomas psicológicos o reacciones adversas emocionales</li>
      <li>Dependencia al proceso terapéutico o al apoyo del psicólogo</li>
      <li>Rechazo o resistencia a continuar en terapia o buscar tratamiento en el futuro</li>
      <li>Resultado negativo con deterioro del paciente en terapia, sin un actuar culposo del terapeuta</li>
    </ul>
    <div class="form-inline-field"><label>Alternativas de tratamiento informadas:</label><textarea name="ci_alternativas" rows="2" placeholder="Alternativas de tratamiento..."></textarea></div>
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
