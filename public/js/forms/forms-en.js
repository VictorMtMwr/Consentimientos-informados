// =============================================================================
// FORMULARIOS_EN: Traducciones al inglés de cada consentimiento
// =============================================================================
const FORMULARIOS_EN = {

1: {
  titulo: "Informed Consent - Bariatric Surgery",
  contenido: `
    <p>By means of this legal document, I certify that I have been informed by the Treating Physician at Medihelp Services Clinic about the following activity, intervention, special procedure, or treatment that I require:</p>
    <div class="form-inline-field"><label>Description of the procedure:</label><textarea name="ci_procedimiento" rows="2" placeholder="Describe the bariatric procedure..." required></textarea></div>
    <p>I have been informed that the procedure is comprehensive and aimed at <strong>reducing the capacity of the stomach</strong>, or <strong>diverting food in the intestine</strong> so it does not pass through all its parts, or both. This aims to reduce the volume of food I need to feel satisfied and/or reduce nutrient absorption.</p>
    <p>Through this procedure, the goal is to achieve loss of excess weight that could not be treated by other methods and that produces hemodynamic, vascular, pulmonary, endocrine, or osteoarticular complications. Laparoscopic surgery aims to avoid a larger incision; postoperative pain is generally milder, intestinal transit recovery is usually faster, and the postoperative recovery period is usually shorter.</p>
    <h4>Frequent risks:</h4>
    <ul>
      <li>Infection or bleeding of the surgical wound</li>
      <li>Phlebitis, urinary infection, urinary retention</li>
      <li>Transient digestive alterations</li>
      <li>Prolonged pain in the operation area</li>
      <li>Pleural effusion</li>
      <li>From laparoscopic surgery: gas extension to subcutaneous tissue and pain</li>
    </ul>
    <h4>Infrequent and serious risks:</h4>
    <ul>
      <li>Embolisms and pulmonary thromboembolism</li>
      <li>Intestinal fistulas due to altered wound healing of sutures</li>
      <li>Anastomosis stricture</li>
      <li>Intra-abdominal bleeding or infection</li>
      <li>Intestinal obstruction</li>
      <li>Esophageal or gastric perforation</li>
      <li>Pneumonia, sepsis, or generalized infection</li>
      <li>Permanent digestive alterations (diarrhea or vomiting)</li>
      <li>Chronic nutritional deficiency, hypoglycemia</li>
      <li>Excessive weight loss or procedure failure with insufficient weight loss</li>
      <li>From laparoscopic surgery: vascular injuries, injuries to neighboring organs, gas embolism, and pneumothorax</li>
    </ul>
    <p>There is a possibility that during surgery, <strong>modifications to the procedure</strong> may be required due to intraoperative findings, in order to provide the most appropriate treatment.</p>
    <div class="form-inline-field"><label>Informed treatment alternatives:</label><textarea name="ci_alternativas" rows="2" placeholder="Treatment alternatives..." required></textarea></div>
  `
},

2: {
  titulo: "Informed Consent - Cardiovascular Surgery",
  contenido: `
    <p>I declare that I have been informed by the physician at Medihelp Services Clinic about my disease and the surgical medical treatment, understanding that it requires:</p>
    <h4>Complete surgical description:</h4>
    <p><strong>General anesthesia</strong>, opening of the thorax to adequately visualize organs such as the heart, arteries, and lungs. In some cases, it is necessary to stop and/or open the heart while defects are repaired. While the heart is stopped, protective measures are used and it is necessary for blood to circulate through external equipment (cardiopulmonary bypass machine), which requires temporary anticoagulation.</p>
    <h4>Undesirable effects and risks (with reported percentages):</h4>
    <ol>
      <li>Hemorrhage that prolongs the intervention or requires reoperation (3.9–6.8%)</li>
      <li>Hypersensitivity or allergic reactions to blood or medications (1–3%)</li>
      <li>Risk of transmission of infectious diseases through blood transfusion (1–1.6%)</li>
      <li>Cerebrovascular accident — embolism or hemorrhage (1.1–1.4%)</li>
      <li>Heart's inability to maintain circulation, cardiogenic shock (2.4–12%)</li>
      <li>Need for mechanical heart assist devices (0.2–0.6%)</li>
      <li>Postoperative cardiorespiratory arrest (0.7–2.9%)</li>
      <li>Perioperative myocardial ischemia or infarction (1%)</li>
      <li>Atrioventricular block requiring permanent pacemaker (0.9%)</li>
      <li>Arrhythmias (30–50%)</li>
      <li>Acute respiratory distress syndrome, prolonged ventilation (6–11.9%)</li>
      <li>Acute renal failure that may require dialysis (1.7%)</li>
      <li>Deep chest or wound infection (3.9–6.8%)</li>
      <li>Gastric or duodenal ulcer and digestive hemorrhage (1.6%)</li>
      <li>Venous thrombus formation with risk of pulmonary embolism (0.2%)</li>
      <li>Hypertrophic or keloid scarring</li>
      <li>Need for reoperation in some emergency cases (2.1%)</li>
      <li>Risks inherent to anesthesia</li>
      <li>Death according to EuroScore</li>
    </ol>
    <p>I have been informed about postoperative pain management. The success of the procedure depends on surgical findings and the patient's prior clinical condition.</p>
    <div class="form-inline-field"><label>Patient-specific additional risks:</label><textarea name="ci_riesgos_adicionales" rows="2" placeholder="Additional specific risks..."></textarea></div>
    <div class="form-inline-field"><label>Alternatives to the procedure:</label><textarea name="ci_alternativas" rows="2" placeholder="Treatment alternatives..."></textarea></div>
    <div class="form-inline-field"><label>Authorized surgeons:</label><input type="text" name="ci_cirujanos" placeholder="Names of surgeons"></div>
    <div class="form-inline-field"><label>Type of valve (if applicable):</label><input type="text" name="ci_tipo_valvula" placeholder="E.g.: mechanical valve, biological..."></div>
  `
},

3: {
  titulo: "Informed Consent - Companion of Probable/Confirmed COVID-19 Case",
  contenido: `
    <p>By means of this document, acting as a companion of a patient with probable or confirmed COVID-19 case, I state:</p>
    <div class="form-inline-field"><label>Patient I am accompanying:</label><input type="text" name="ci_paciente_acompanado" placeholder="Patient's name" required></div>
    <div class="form-inline-field"><label>Relationship to the patient:</label>
      <select name="ci_parentesco"><option value="">Select...</option><option>Spouse</option><option>Son/Daughter</option><option>Father/Mother</option><option>Sibling</option><option>Other</option></select>
    </div>
    <h4>Information received:</h4>
    <ul>
      <li>I have been provided with complete and sufficient information about COVID-19 in simple and clear language.</li>
      <li>The healthcare professional has explained the nature of the disease, the meaning of suspected or confirmed case of SARS-CoV-2 coronavirus regarding its clinical presentation, mode of contagion, containment measures, possibility of suffering the disease, complications, or death.</li>
    </ul>
    <h4>Commitments:</h4>
    <ul>
      <li>I commit to limiting my movements within the room and minimizing shared spaces.</li>
      <li>I must maintain a minimum distance of one meter from the patient.</li>
      <li>I am a person in good health who does not have chronic diseases or conditions that affect my immune response.</li>
      <li>I will use the surgical mask and other personal protective equipment (PPE) provided to me.</li>
      <li>I will implement frequent hand washing routines with soap and water (proven to reduce infection risk by up to 50%).</li>
    </ul>
    <p>I certify that I have been able to ask questions about COVID-19 and they have been satisfactorily answered. I understand that I will be at risk of contagion while I remain with my family member as a companion.</p>
  `
},

4: {
  titulo: "Informed Consent - Administration of Blood Components",
  contenido: `
    <p>This document aims to inform you so that you or your representative may consent or refuse the administration of blood components at Medihelp Services Clinic.</p>
    <p>I declare that I have been informed that I may need the administration of one or more blood components now or in the future, in order to restore my health and preserve life:</p>
    <h4>Blood components:</h4>
    <ul>
      <li><strong>Red blood cells</strong> — transport oxygen to tissues</li>
      <li><strong>Platelets</strong> — participate in blood clotting</li>
      <li><strong>Plasma</strong> — contains factors that aid blood clotting</li>
      <li><strong>Cryoprecipitate</strong> — contains specific clotting factors</li>
      <li><strong>Whole blood</strong> — contains all of the above properties</li>
    </ul>
    <p>I understand that blood components may come from a donor or from my own blood collected in advance, examined and tested for the presence of infectious agents.</p>
    <h4>Alternatives evaluated:</h4>
    <p>Before proposing this procedure, the treatment team evaluated other therapeutic options such as: autotransfusion, iron and vitamin therapy, volume expander infusion, medications (erythropoietin, tranexamic acid), cell salvage (blood recovery), among others.</p>
    <h4>Pre-transfusion tests:</h4>
    <p>ABO/RH typing and compatibility tests will be performed. Monitoring does not completely eliminate the risk of disease transmission.</p>
    <h4>Possible adverse reactions:</h4>
    <ul>
      <li>Fever with or without chills</li>
      <li>Alteration of kidney function</li>
      <li>Respiratory difficulty</li>
      <li>Blood pressure changes</li>
      <li>Transmission of infections</li>
      <li>Skin alterations (itching, hives, edema)</li>
      <li>Change in urine color</li>
    </ul>
    <p><em>There is no absolute guarantee of the benefit of transfusion.</em></p>
  `
},

5: {
  titulo: "Informed Consent - Conducting Research Studies",
  contenido: `
    <p>By means of this document, I certify my consent to participate in a research study at Medihelp Services Clinic.</p>
    <div class="form-inline-field"><label>Study name:</label><input type="text" name="ci_nombre_estudio" placeholder="Study name" required></div>
    <div class="form-inline-field"><label>Principal investigator:</label><input type="text" name="ci_investigador" placeholder="Investigator name" required></div>
    <div class="form-inline-field"><label>Institution or organization:</label><input type="text" name="ci_institucion_inv" placeholder="Institution name"></div>
    <h4>Information the study must include (based on WHO recommendations):</h4>
    <ul>
      <li>Introduction and purpose of the study</li>
      <li>Type of intervention and participant selection</li>
      <li>Conditions of voluntary participation</li>
      <li>Procedures, protocols, and duration</li>
      <li>Side effects, risks, and discomforts</li>
      <li>Possible benefits and incentives</li>
      <li>Data confidentiality</li>
      <li>Right to refuse or withdraw at any time</li>
      <li>Available treatment alternatives</li>
    </ul>
    <div class="form-inline-field"><label>Detailed study information:</label><textarea name="ci_info_estudio" rows="6" placeholder="Introduction, purpose, intervention, procedures, duration, side effects, risks, benefits, confidentiality, alternatives..." required></textarea></div>
    <p>This proposal has been reviewed and approved by the Ethics Committee of Medihelp Clinic. I have read the information provided or it has been read to me. I have had the opportunity to ask questions and they have been satisfactorily answered.</p>
    <p><strong>I voluntarily consent to participate</strong> in this research and understand that I have the right to withdraw at any time without affecting my medical care. I will be provided with a copy of this consent.</p>
  `
},

6: {
  titulo: "Informed Consent - Procedures During the COVID-19 Pandemic",
  contenido: `
    <h4>Information about COVID-19</h4>
    <p>Medihelp Services Clinic provides healthcare services based on a care model with quality, safety, and humanized care. Currently, there is a pandemic caused by the new coronavirus (SARS-CoV-2). COVID-19 is the infectious disease caused by this coronavirus.</p>
    <p><strong>Most frequent symptoms:</strong> fever, cough, dyspnea, myalgia, fatigue, diarrhea, and alteration of smell and taste.</p>
    <p><strong>Severity distribution:</strong> Most cases (81%) have mild illness; 14% require oxygen therapy and 5% require intensive care. Approximately 8 out of 10 people recover without the need for special treatment. One in 6 people develops severe illness.</p>
    <h4>Mortality according to prior condition:</h4>
    <ul>
      <li>Cancer: 5.6%</li>
      <li>Hypertension: 6%</li>
      <li>Chronic respiratory disease: 6.3%</li>
      <li>Diabetes mellitus: 7.3%</li>
      <li>Cardiovascular disease: 10.5%</li>
    </ul>
    <div class="form-inline-field"><label>Procedure to be performed:</label><input type="text" name="ci_procedimiento_covid" placeholder="Name of the procedure" required></div>
    <h4>Risk in hospital environment:</h4>
    <p>Being in a hospital environment means it is possible that during your stay you may develop symptoms of the disease, as you may have been admitted as an asymptomatic carrier or you may contract the coronavirus during your stay.</p>
    <h4>Possible complications in case of contagion:</h4>
    <ul>
      <li>Need for hospitalization with oxygen</li>
      <li>Isolation</li>
      <li>Use of antibiotics</li>
      <li>Transfer to ICU</li>
      <li>Intubation and ventilatory support</li>
      <li>Use of artificial lung support (ECMO)</li>
      <li>Death</li>
    </ul>
    <p><em>Surgical care is not recommended for elective procedures during the pandemic unless medically indicated.</em> I must follow the hygiene measures indicated by the institution.</p>
    <p><strong>I confirm that I am not presenting any symptoms</strong> mentioned, I have not been in contact with carriers of the virus, nor have I traveled to other countries in the last 14 days.</p>
  `
},

7: {
  titulo: "Informed Consent - HIV Test",
  contenido: `
    <p>I authorize the laboratory of Medihelp Services Clinic to perform the HIV test. This document is completed to provide counseling regarding the test to detect the Human Immunodeficiency Virus (HIV) and to comply with Decree 1543 of 1997 of the Ministry of Social Protection.</p>
    <h4>Purpose and benefit of the test</h4>
    <p>A presumptive HIV test will be performed to determine whether I am infected with the Human Immunodeficiency Virus.</p>
    <h4>Result interpretation:</h4>
    <ul>
      <li><strong>Reactive:</strong> Antibodies against HIV have been detected. A second confirmatory test is required.</li>
      <li><strong>Non-reactive (negative):</strong> There is no evidence of infection at the time of the test.</li>
      <li><strong>Indeterminate:</strong> There is no certainty of actual infection. The test needs to be repeated in one month.</li>
    </ul>
    <h4>Limitations:</h4>
    <ul>
      <li>Possibility of <strong>false positives</strong></li>
      <li>Possibility of <strong>false negatives</strong> during the immunological window period</li>
    </ul>
    <h4>Emotional risks:</h4>
    <p>Facing a strong emotional reaction, including anxiety and depression. I may also be subject to discrimination or rejection. It is recommended to seek support and post-test counseling.</p>
    <p><strong>Confidentiality:</strong> All healthcare professionals are obligated to maintain confidentiality about my diagnosis. All health professionals must maintain professional secrecy.</p>
    <p>I have received pre-test counseling, I understand the voluntary nature of the test, and I can withdraw my consent before the sample is taken. I have been informed about confidentiality protections and prevention measures.</p>
  `
},

8: {
  titulo: "Informed Consent - Home Visit",
  contenido: `
    <p>In compliance with current regulations on occupational safety and health, and within the framework of the Occupational Safety and Health Management System (SG-SST), Medihelp Services Clinic and/or the company have developed Epidemiological Surveillance Programs (PVE), pursuant to:</p>
    <ul>
      <li><strong>Resolution 0312 of 2019</strong> — articles 5, 8, and 10, on minimum standards of the SG-SST.</li>
      <li><strong>Decree 1072 of 2015</strong> — regulates the SG-SST and includes preventive activities.</li>
    </ul>
    <div class="form-inline-field"><label>Position or role:</label><input type="text" name="ci_cargo" placeholder="Worker's position"></div>
    <div class="form-inline-field"><label>Surveillance program:</label><input type="text" name="ci_programa" placeholder="Program name"></div>
    <div class="form-inline-field"><label>Company or employer:</label><input type="text" name="ci_empresa" placeholder="Company name"></div>
    <h4>Purpose of the visit:</h4>
    <ul>
      <li>Follow up on the worker's health conditions.</li>
      <li>Verify compliance with medical recommendations and restrictions.</li>
      <li>Identify psychosocial, environmental, or family factors that influence rehabilitation.</li>
      <li>Provide guidance on self-care measures and healthy habits.</li>
    </ul>
    <h4>Scope:</h4>
    <p>The visit will be conducted at the residence reported by the employee. It will be of a <strong>preventive, educational, healthcare-related, and strictly confidential</strong> nature. It has no disciplinary or coercive purposes.</p>
    <h4>Confidentiality:</h4>
    <p>The information will be handled in accordance with Law 1581 of 2012 (Personal Data Protection), Law 23 of 1981 (Medical Ethics), and Resolution 1995 of 1999 (Medical Records).</p>
  `
},

9: {
  titulo: "Informed Consent - Psychology",
  contenido: `
    <p>By means of this legal document, I certify that I have been informed by the Psychologist at Medihelp Services Clinic about the following activity, intervention, special procedure, or treatment that I require:</p>
    <p><strong>Psychological care and support</strong> during my stay at the institution, based on accompaniment, assessment, intervention, and follow-up of the presented need as a patient, and to monitor emotional and mental progress during the hospitalization and medical treatment process.</p>
    <h4>Possible side effects or complications:</h4>
    <ul>
      <li>Increase or appearance of new psychological symptoms or adverse emotional reactions</li>
      <li>Dependence on the therapeutic process or on the psychologist's support</li>
      <li>Rejection or resistance to continuing therapy or seeking treatment in the future</li>
      <li>Negative outcome with patient deterioration in therapy, without negligent conduct by the therapist</li>
    </ul>
    <div class="form-inline-field"><label>Informed treatment alternatives:</label><textarea name="ci_alternativas" rows="2" placeholder="Treatment alternatives..."></textarea></div>
  `
},

10: {
  titulo: "Informed Consent - Anesthesia",
  contenido: `
    <p>As a patient/guardian, I certify that the Dr. <strong>(anesthesiologist)</strong> has explained to me in a clear and simple manner the types of anesthesia, the risks of each one and the expectations of complications taking into account, in addition to the anesthesia, my physical condition and the type of surgery to be performed.</p>
    <p>I understand that although we have developed an anesthetic plan, it may be modified during the course of the operation, and the anesthesiologist will use all available means to provide the greatest safety during the anesthetic procedure and in the management of any complications that may arise. It is clear that results cannot be guaranteed despite all of this, and that I have had the opportunity to ask questions to clarify my doubts.</p>
    <p><strong>I understand that the anesthesiologist who evaluated me during the consultation may or may not be the same one who assists me during the procedure.</strong></p>
    <div class="form-inline-field"><label>Type of surgery to be performed:</label><input type="text" name="ci_tipo_cirugia" placeholder="Describe the surgery..." required></div>
    <h4>POSSIBLE COMPLICATIONS IN SEDATION OR GENERAL ANESTHESIA</h4>
    <p><strong>MINOR:</strong> Mild allergic reaction, nausea, vomiting, trembling, phlebitis, minor injuries to lips, teeth, mouth. Mild vocal cord spasm, decreased strength or sensitivity or chronic pain due to nerve compression from positioning.</p>
    <p><strong>MAJOR:</strong> Severe hypotension or hypertension leading to cardiac or cerebral problems such as ischemia, cardiac infarction, heart failure, cerebral bleeding with variable decrease in consciousness up to coma. Severe allergic reaction, severe vocal cord spasm with pulmonary edema, bronchoaspiration, bronchospasm, venous thrombosis with pulmonary embolism.</p>
    <p><em>These complications may ultimately lead to death.</em></p>
    <h4>POSSIBLE COMPLICATIONS IN REGIONAL ANESTHESIA</h4>
    <p>Headache after dura mater puncture. Trembling, nausea, vomiting, allergic reactions, lumbar pain, local anesthetic toxicity including arrhythmias, decreased heart rate and cardiac arrest, or seizures and coma. Neurological injury with temporary or permanent decrease in strength or sensitivity. Bronchoaspiration, bronchospasm, venous thrombosis, pulmonary embolism.</p>
    <p><em>Some of these complications may be severe and lead to death.</em></p>
    <div class="form-inline-field"><label>Patient-specific additional risks:</label><textarea name="ci_riesgos_esp" rows="2" placeholder="Patient-specific risks..."></textarea></div>
  `
},

12: {
  titulo: "Medical Informed Consent",
  contenido: `
    <p>With this legal document I certify that I have been informed by the Treating Physician at Medihelp Services Clinic about the following activity, intervention, special procedure, or treatment which I require:</p>
    <div class="form-inline-field"><label>Description of procedure or treatment:</label><textarea name="ci_procedimiento" rows="2" placeholder="Describe the procedure or treatment..." required></textarea></div>
    <p>And I have also been informed that this procedure or service is integral and can generate, among others, the following secondary or side effects and the following complications, understood as risks that may occur even under adequate care conditions:</p>
    <div class="form-inline-field"><label>Risks and complications informed:</label><textarea name="ci_riesgos" rows="3" placeholder="Describe risks and complications..." required></textarea></div>
    <p>I have been informed about the available treatment alternatives and acknowledge my right to refuse the procedure. This document constitutes a legal instrument based on the principle of autonomy.</p>
    <div class="form-inline-field"><label>Treatment alternatives:</label><textarea name="ci_alternativas" rows="2" placeholder="Treatment alternatives..." required></textarea></div>
  `
},

13: {
  titulo: "Informed Consent - Physiotherapy",
  contenido: `
    <p>I certify that I have been informed that the physiotherapy personnel at Medihelp Services Clinic perform their work according to protocols and procedures based on scientific evidence, to provide me with a safe and comfortable environment during rehabilitation. Based on Law 528 of 1999 on Physiotherapy.</p>
    <h4>Respiratory therapy</h4>
    <p><strong>Inhaler therapy</strong> — <em>Benefits:</em> facilitates medication administration to the airways, improves ventilation. <em>Risks:</em> bronchospasm, adverse reactions. <em>Barriers:</em> intolerance to the procedure, lack of cooperation.</p>
    <p><strong>Nasal lavage</strong> — <em>Benefits:</em> reduces nasal congestion. <em>Risks:</em> sneezing, transient nasal irritation. <em>Barriers:</em> active epistaxis, severe nasal obstruction.</p>
    <p><strong>Respiratory incentives</strong> — <em>Benefits:</em> lung expansion, prevention of atelectasis. <em>Risks:</em> hyperventilation, dizziness, fatigue. <em>Barriers:</em> comprehension deficit, muscular weakness, chest pain.</p>
    <p><strong>Respiratory samples</strong> (pneumonia panel, respiratory panel, SARS-CoV-2, adenovirus, RSV, influenza) — <em>Benefits:</em> etiological diagnosis. <em>Risks:</em> discomfort, coughing, nausea, minor hemorrhages. <em>Barriers:</em> patient acceptance, clinical contraindications.</p>
    <h4>Physical therapy and functional rehabilitation</h4>
    <p><em>Benefits:</em> improvement of mobility, muscle strength, functional independence, and quality of life. <em>Risks:</em> fatigue, pain, symptom exacerbation. <em>Barriers:</em> unstable clinical condition, lack of motivation, uncontrolled pain.</p>
    <h4>Blood sampling (arterial blood gases)</h4>
    <p><em>Benefits:</em> assess acid-base status, oxygenation, and ventilation. <em>Risks:</em> local pain, hematoma, bleeding, infection. <em>Barriers:</em> coagulation disorders, poor peripheral perfusion.</p>
    <h4>Artificial airway care (Tracheostomy / Endotracheal tube)</h4>
    <p><strong>Open/closed system suctioning</strong> — <em>Benefits:</em> secretion removal. <em>Risks:</em> transient hypoxemia, tracheal mucosal trauma, respiratory infection, bronchospasm. <em>Barriers:</em> procedure intolerance, anxiety, exacerbated cough reflex.</p>
    <p><em>Medication prescription is the exclusive competence of the physician. Physiotherapy activities cannot guarantee results, taking into account the multiple factors that affect recovery.</em></p>
  `
},

14: {
  titulo: "Informed Consent - Imaging Procedures with Clinical Content",
  contenido: `
    <p>With this legal document, I certify that I have been informed by the staff of Medihelp Services Clinic of the following activity, intervention, or imaging procedure which I require:</p>
    <div class="form-inline-field"><label>Type of imaging procedure:</label><input type="text" name="ci_procedimiento_img" placeholder="E.g.: X-ray, CT, MRI, Ultrasound, fluoroscopy..." required></div>
    <p>I have been informed that this procedure may include the administration of different types of <strong>contrast media</strong> orally and/or intravenously.</p>
    <h4>Risks associated with contrast:</h4>
    <ul>
      <li>Severe allergic reactions (0.05% to 0.22% of cases)</li>
      <li>Fatal reactions (0.001% to 0.03% of cases)</li>
    </ul>
    <h4>Verification through checklist:</h4>
    <ul>
      <li>Allergic history</li>
      <li>Possibility of pregnancy</li>
      <li>Kidney function</li>
      <li>Identity verification</li>
      <li>Study type and anatomic area</li>
      <li>Adequate preparation</li>
    </ul>
    <p>For procedures requiring puncture (biopsies, device placement with imaging aid), specific associated risks exist.</p>
    <div class="form-inline-field"><label>Associated puncture risks (if applicable):</label><textarea name="ci_riesgos_puncion" rows="2" placeholder="Specific puncture risks..."></textarea></div>
    <p>I authorize the institution and its medical, nursing, and/or technological personnel to perform the necessary maneuvers and drug administration in case of any adverse reaction.</p>
  `
},

16: {
  titulo: "Nursing Informed Consent",
  contenido: `
    <p>I certify that I have been informed that the nursing personnel who work at Medihelp Services Clinic develop their work —"nursing care"— according to protocols and procedures based on scientific evidence established to provide me with a safe, comfortable, and warm environment during my stay.</p>
    <h4>Nursing procedures:</h4>
    <table class="form-table">
      <thead><tr><th>Procedure</th><th>Benefit</th><th>Risks</th></tr></thead>
      <tbody>
        <tr><td>IV cannulation</td><td>Administration of medications, hydration, blood components</td><td>Hematoma, infections</td></tr>
        <tr><td>Blood and fluid sampling</td><td>Diagnosis</td><td>Hematoma, sample rejection</td></tr>
        <tr><td>Medication administration</td><td>Therapeutic action</td><td>Adverse drug reaction</td></tr>
        <tr><td>Urinary catheter</td><td>Bladder drainage</td><td>Infection, trauma</td></tr>
        <tr><td>Gastrointestinal catheter</td><td>Nutrition and/or gastric content drainage</td><td>Healthcare-associated infection, bronchoaspiration</td></tr>
        <tr><td>Wound care</td><td>Wound closure, infection prevention</td><td>Healthcare-associated infection, delayed healing</td></tr>
      </tbody>
    </table>
    <p><em>Medication prescription is the exclusive competence of the physician. Nursing activities cannot guarantee results. Based on Law 911 of 2004 (Nursing).</em></p>
  `
}

};
