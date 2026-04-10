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
  titulo: "Medical Informed Consent - Circumcision",
  contenido: `
    <div class="anx-block-title">4. DESCRIPTION OF THE PROCEDURE</div>
    <p>Circumcision is the surgical procedure in which the foreskin (skin covering the glans of the penis) is removed. It is performed under anesthesia (local, regional, or general depending on the patient's age and condition). It is indicated in cases of phimosis (inability to retract the foreskin), recurrent paraphimosis, chronic balanoposthitis, or documented medical indication.</p>

    <div class="anx-block-title">5. POSSIBLE COMPLICATIONS</div>
    <p class="anx-p">I have been informed of the possible complications of the procedure and understand that the following risks may occur:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICATION / RISK</th>
          <th>FREQUENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Bleeding from the surgical wound</td><td>Uncommon</td></tr>
        <tr><td>Wound infection</td><td>Uncommon</td></tr>
        <tr><td>Hematoma at the surgical site</td><td>Uncommon</td></tr>
        <tr><td>Unsatisfactory cosmetic outcome (insufficient or excessive foreskin removal)</td><td>Variable</td></tr>
        <tr><td>Chronic pain in the operated area</td><td>Rare</td></tr>
        <tr><td>Glans hypersensitivity and loss of coverage (temporary)</td><td>Common</td></tr>
        <tr><td>Suture dehiscence (wound opening)</td><td>Rare</td></tr>
        <tr><td>Keloid or hypertrophic scar</td><td>Variable by predisposition</td></tr>
        <tr><td>Injury to the glans or urethral meatus</td><td>Very rare</td></tr>
        <tr><td>Need for reoperation</td><td>Rare</td></tr>
        <tr><td>Risks inherent to the anesthesia used</td><td>See anesthesia consent</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. ADDITIONAL RISKS FOR MY PARTICULAR CASE</div>
    <p>In my particular case, the physician has explained the following additional risks according to my individual health conditions:</p>
    <div class="form-inline-field"><label>Additional risks for this case:</label><textarea name="ci4_riesgos_adicionales" rows="3" placeholder="Describe additional risks..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVES TO THE PROCEDURE</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci4_alt_no_cirugia"> No surgery / conservative medical management with topical corticosteroids (mild to moderate phimosis)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci4_alt_prepucioplastia"> Preputioplasty (widening of the ring without complete foreskin resection)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci4_alt_otra"> Other:</label>
      <input type="text" name="ci4_alt_otra_detalle" class="ax-full-line" placeholder="Describe another alternative">
    </div>

    <div class="anx-block-title">8. DECLARATION OF UNDERSTANDING AND ACCEPTANCE</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> I declare that I have read this document — or it has been read to me if I am unable to read it myself — and I have understood the information provided. I have had the opportunity to ask all questions I considered necessary, and they have been answered satisfactorily by the treating physician.</label>
    <label class="anx-decl-item"><input type="checkbox" name="ci4_declara_autoriza_dr" required> I expressly authorize Dr. Gabriel de León Matos — Urologist — I.D. 15.029.675 to perform, with the support of the medical and anesthesia team at Medihelp Services Clinic, the procedure described as well as any other procedure that in his judgment is necessary or urgent during the intervention to preserve my health and safety.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> I understand that I may revoke this consent at any time before the procedure, without this implying any detriment to my medical care.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Therefore, freely, consciously, in an informed and voluntary manner, I GIVE MY CONSENT for the procedure described, in accordance with Law 23 of 1981, Decree 3380 of 1981, Resolution 13437 of 1991, and applicable international health accreditation standards.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> I do not authorize the procedure described in this consent.</label>

    <div class="anx-block-title" id="ci4SectionFirmasTitle">9. SIGNATURES OF CONSENT</div>
    <div id="ci4DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">I, (name and ID):</div>
        <input name="ci4_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">in the capacity of:</div>
        <input name="ci4_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">I declare that:</div>
        <label><input type="checkbox" name="ci4_disent_rechaza"> I refuse the procedure</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Reason:</div>
        <textarea name="ci4_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Date and time:</div>
        <input type="datetime-local" name="ci4_disent_fecha_hora" class="ax-full-line">
      </div>
    </div>
    <div class="anx-firmas-box">
      <div class="anx-firmas-top">
        <div class="anx-firma-card">
          <div class="anx-firma-head">Patient / Legal representative</div>
          <div class="anx-firma-body">
            <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Completed automatically from identification (section 2). Edit name and document there."></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 1</div>
          <div class="anx-firma-body">
            <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and relationship</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 2</div>
          <div class="anx-firma-body">
            <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
      </div>
      <div class="anx-firma-card anx-firma-card-medico">
        <div class="anx-firma-head">Treating physician</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Full name | Medical license | Specialty</div>
      </div>
    </div>
  `
},

5: {
  titulo: "Medical Informed Consent - Laparoscopic Cholecystectomy",
  contenido: `
    <div class="anx-block-title">4. DESCRIPTION OF THE PROCEDURE</div>
    <p>Laparoscopic cholecystectomy is removal of the gallbladder through minimally invasive surgery. Through 3 or 4 small incisions in the abdomen, instruments and a camera are introduced to visualize and remove the diseased gallbladder (usually due to gallstones, inflammation, or polyps). In some cases, for safety reasons, it may be necessary to convert the surgery to an open technique. It is performed under general anesthesia.</p>

    <div class="anx-block-title">5. POSSIBLE COMPLICATIONS</div>
    <p class="anx-p">I have been informed about the possible complications of the procedure and understand that the following risks may occur:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICATION / RISK</th>
          <th>FREQUENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>• Wound infection or bleeding</td><td>2–5%</td></tr>
        <tr><td>• Temporary digestive symptoms (bloating, diarrhea, dyspepsia)</td><td>Common, transient</td></tr>
        <tr><td>• Referred shoulder pain from diaphragmatic irritation (laparoscopy gas)</td><td>Common, self-limited</td></tr>
        <tr><td>• Bile duct stricture or injury (serious complication)</td><td>&lt;1%</td></tr>
        <tr><td>• Bile leak or biliary fistula</td><td>&lt;1%</td></tr>
        <tr><td>• Intra-abdominal bleeding or infection</td><td>Rare, &lt;0.5%</td></tr>
        <tr><td>• Injury to adjacent organs (intestine, vessels, liver) with possible conversion to open surgery</td><td>Very rare, &lt;0.3%</td></tr>
        <tr><td>• Hernia at incision sites</td><td>Uncommon</td></tr>
        <tr><td>• Pancreatitis if the bile duct is explored</td><td>Rare</td></tr>
        <tr><td>• Risks inherent to general anesthesia</td><td>See anesthesia consent</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. ADDITIONAL RISKS FOR MY PARTICULAR CASE</div>
    <p>In my particular case, the physician has explained the following additional risks based on my health conditions, surgical history, anatomy, or comorbidities:</p>
    <div class="form-inline-field"><label>Additional risks for this case:</label><textarea name="ci5_riesgos_adicionales" rows="3" placeholder="Describe additional risks..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVES TO THE PROCEDURE</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci5_alt_conservador"> Conservative medical management (diet, analgesia) — only in patients at very high surgical risk</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci5_alt_drenaje"> Percutaneous gallbladder drainage (without removal, in critical cases)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci5_alt_abierta"> Open cholecystectomy (if laparoscopy is contraindicated)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci5_alt_no_cirugia"> No surgery (with documentation of risks)</label>
    </div>

    <div class="anx-block-title">8. DECLARATION OF UNDERSTANDING AND ACCEPTANCE</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> I declare that I have read this document — or it has been read to me if I am unable to read it myself — and I have understood the information provided. I have had the opportunity to ask all questions I considered necessary, and they have been answered satisfactorily by the treating physician.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> I understand that I may revoke this consent at any time before the procedure, without this implying any detriment to my medical care.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Therefore, freely, consciously, in an informed and voluntary manner, I GIVE MY CONSENT for the procedure described, in accordance with Law 23 of 1981, Decree 3380 of 1981, Resolution 13437 of 1991, and applicable international health accreditation standards.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> I do not authorize the procedure described in this consent.</label>

    <div class="anx-block-title" id="ci5SectionFirmasTitle">9. SIGNATURES OF CONSENT</div>
    <div id="ci5DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">I, (name and ID):</div>
        <input name="ci5_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">in the capacity of:</div>
        <input name="ci5_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">I declare that:</div>
        <label><input type="checkbox" name="ci5_disent_rechaza"> I refuse the procedure</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Reason:</div>
        <textarea name="ci5_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Date and time:</div>
        <input type="datetime-local" name="ci5_disent_fecha_hora" class="ax-full-line">
      </div>
    </div>
    <div class="anx-firmas-box">
      <div class="anx-firmas-top">
        <div class="anx-firma-card">
          <div class="anx-firma-head">Patient / Legal representative</div>
          <div class="anx-firma-body">
            <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Completed automatically from identification (section 2). Edit name and document there."></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 1</div>
          <div class="anx-firma-body">
            <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and relationship</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 2</div>
          <div class="anx-firma-body">
            <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
      </div>
      <div class="anx-firma-card anx-firma-card-medico">
        <div class="anx-firma-head">Treating physician</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Full name | Medical license | Specialty</div>
      </div>
    </div>
  `
},

6: {
  titulo: "Medical Informed Consent - Colonoscopy",
  contenido: `
    <div class="anx-block-title">4. DESCRIPTION OF THE PROCEDURE</div>
    <p>Colonoscopy is an endoscopic procedure in which a flexible tube with a camera is inserted through the anus to visualize the inside of the large intestine (colon) and rectum. It is indicated for evaluation of rectal bleeding, changes in bowel habits, anemia, suspected polyps or tumors, inflammatory bowel disease, and early detection of colon cancer. During the same procedure, biopsies may be taken and polyps removed. It is performed under sedation or anesthesia.</p>

    <div class="anx-block-title">5. POSSIBLE COMPLICATIONS</div>
    <p class="anx-p">I have been informed about the possible complications of the procedure and understand that the following risks may occur:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICATION / RISK</th>
          <th>FREQUENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>• Perforation of the colon or rectum (serious complication; may require surgery)</td><td>0.05–0.1%</td></tr>
        <tr><td>• Bleeding after removing a polyp or taking a biopsy</td><td>0.1–0.5%</td></tr>
        <tr><td>• Infection or peritonitis (if perforation occurs)</td><td>Rare</td></tr>
        <tr><td>• Abdominal distension and pain from gas introduced during the procedure</td><td>Common, transient</td></tr>
        <tr><td>• Adverse reactions to sedation (low blood pressure, decreased breathing)</td><td>Uncommon</td></tr>
        <tr><td>• Fever and abdominal pain without perforation after polyp removal</td><td>Rare, &lt;1%</td></tr>
        <tr><td>• Incomplete bowel preparation requiring repeat procedure</td><td>5–10%</td></tr>
        <tr><td>• Low blood oxygen during sedation</td><td>Uncommon</td></tr>
        <tr><td>• Risks inherent to sedation or anesthesia</td><td>See anesthesia consent</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. ADDITIONAL RISKS FOR MY PARTICULAR CASE</div>
    <p>In my particular case, the physician has explained the following additional risks based on my health conditions, age, medications, surgical history, or cardiovascular status:</p>
    <div class="form-inline-field"><label>Additional risks for this case:</label><textarea name="ci6_riesgos_adicionales" rows="3" placeholder="Describe additional risks..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVES TO THE PROCEDURE</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci6_alt_flexible_recto_colon_izquierdo"> Flexible endoscopy of the rectum and left colon (only evaluates the final part of the colon)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci6_alt_tomografia_colon"> Colon CT scan (diagnostic only, without the possibility of taking biopsies)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci6_alt_capsula_colon"> Colon capsule endoscopy</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci6_alt_no_realizar"> Do not perform the procedure (with documentation)</label>
    </div>

    <div class="anx-block-title">8. DECLARATION OF UNDERSTANDING AND ACCEPTANCE</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> I declare that I have read this document — or it has been read to me if I am unable to read it myself — and I have understood the information provided. I have had the opportunity to ask all questions I considered necessary, and they have been answered satisfactorily by the treating physician.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> I understand that I may revoke this consent at any time before the procedure, without this implying any detriment to my medical care.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Therefore, freely, consciously, in an informed and voluntary manner, I GIVE MY CONSENT for the procedure described, in accordance with Law 23 of 1981, Decree 3380 of 1981, Resolution 13437 of 1991, and applicable international health accreditation standards.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> I do not authorize the procedure described in this consent.</label>

    <div class="anx-block-title" id="ci6SectionFirmasTitle">9. SIGNATURES OF CONSENT</div>
    <div id="ci6DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">I, (name and ID):</div>
        <input name="ci6_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">in the capacity of:</div>
        <input name="ci6_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">I declare that:</div>
        <label><input type="checkbox" name="ci6_disent_rechaza"> I refuse the procedure</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Reason:</div>
        <textarea name="ci6_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Date and time:</div>
        <input type="datetime-local" name="ci6_disent_fecha_hora" class="ax-full-line">
      </div>
    </div>
    <div class="anx-firmas-box">
      <div class="anx-firmas-top">
        <div class="anx-firma-card">
          <div class="anx-firma-head">Patient / Legal representative</div>
          <div class="anx-firma-body">
            <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Completed automatically from identification (section 2). Edit name and document there."></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 1</div>
          <div class="anx-firma-body">
            <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and relationship</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 2</div>
          <div class="anx-firma-body">
            <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
      </div>
      <div class="anx-firma-card anx-firma-card-medico">
        <div class="anx-firma-head">Treating physician</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Full name | Medical license | Specialty</div>
      </div>
    </div>
  `
},

7: {
  titulo: "Medical Informed Consent - Upper GI Endoscopy",
  contenido: `
    <div class="anx-block-title">4. DESCRIPTION OF THE PROCEDURE</div>
    <p>Upper gastrointestinal endoscopy is a procedure in which a flexible tube with a camera is introduced through the mouth to visualize the esophagus, stomach, and the first part of the small intestine (duodenum). It is indicated for evaluation of upper abdominal pain, heartburn, difficulty swallowing, upper gastrointestinal bleeding, suspected ulcer, gastritis, reflux, or tumor. It also allows biopsies and therapeutic procedures. It is performed under sedation or local throat anesthesia.</p>

    <div class="anx-block-title">5. POSSIBLE COMPLICATIONS</div>
    <p class="anx-p">I have been informed about the possible complications of the procedure and understand that the following risks may occur:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICATION / RISK</th>
          <th>FREQUENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>• Perforation of the esophagus, stomach, or duodenum (serious complication)</td><td>&lt;0.05%</td></tr>
        <tr><td>• Bleeding after taking a biopsy or performing a treatment</td><td>&lt;0.5%</td></tr>
        <tr><td>• Aspiration of gastric contents into the airways</td><td>Rare</td></tr>
        <tr><td>• Sore throat or discomfort when swallowing after the procedure</td><td>Common, transient</td></tr>
        <tr><td>• Abdominal distension from gas introduced during the procedure</td><td>Common, transient</td></tr>
        <tr><td>• Adverse reactions to sedation (low blood pressure, decreased breathing)</td><td>Uncommon</td></tr>
        <tr><td>• Vocal cord spasm</td><td>Rare</td></tr>
        <tr><td>• Transient passage of bacteria into the bloodstream</td><td>Very rare</td></tr>
        <tr><td>• Risks inherent to sedation or anesthesia</td><td>See anesthesia consent</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. ADDITIONAL RISKS FOR MY PARTICULAR CASE</div>
    <p>In my particular case, the physician has explained the following additional risks based on my health conditions, age, medications, surgical history, or cardiovascular status:</p>
    <div class="form-inline-field"><label>Additional risks for this case:</label><textarea name="ci7_riesgos_adicionales" rows="3" placeholder="Describe additional risks..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVES TO THE PROCEDURE</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci7_alt_estudio_radiologico_contraste"> Radiologic study with contrast medium of the upper digestive tract</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci7_alt_capsula_endoscopica"> Capsule endoscopy</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci7_alt_manejo_medico_empirico"> Empirical medical management without endoscopy (in low-risk cases)</label>
    </div>

    <div class="anx-block-title">8. DECLARATION OF UNDERSTANDING AND ACCEPTANCE</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> I declare that I have read this document — or it has been read to me if I am unable to read it myself — and I have understood the information provided. I have had the opportunity to ask all questions I considered necessary, and they have been answered satisfactorily by the treating physician.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> I understand that I may revoke this consent at any time before the procedure, without this implying any detriment to my medical care.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Therefore, freely, consciously, in an informed and voluntary manner, I GIVE MY CONSENT for the procedure described, in accordance with Law 23 of 1981, Decree 3380 of 1981, Resolution 13437 of 1991, and applicable international health accreditation standards.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> I do not authorize the procedure described in this consent.</label>

    <div class="anx-block-title" id="ci7SectionFirmasTitle">9. SIGNATURES OF CONSENT</div>
    <div id="ci7DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">I, (name and ID):</div>
        <input name="ci7_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">in the capacity of:</div>
        <input name="ci7_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">I declare that:</div>
        <label><input type="checkbox" name="ci7_disent_rechaza"> I refuse the procedure</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Reason:</div>
        <textarea name="ci7_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Date and time:</div>
        <input type="datetime-local" name="ci7_disent_fecha_hora" class="ax-full-line">
      </div>
    </div>
    <div class="anx-firmas-box">
      <div class="anx-firmas-top">
        <div class="anx-firma-card">
          <div class="anx-firma-head">Patient / Legal representative</div>
          <div class="anx-firma-body">
            <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Completed automatically from identification (section 2). Edit name and document there."></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 1</div>
          <div class="anx-firma-body">
            <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and relationship</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 2</div>
          <div class="anx-firma-body">
            <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
      </div>
      <div class="anx-firma-card anx-firma-card-medico">
        <div class="anx-firma-head">Treating physician</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Full name | Medical license | Specialty</div>
      </div>
    </div>
  `
},

8: {
  titulo: "Medical Informed Consent - Extracapsular Lens Extraction",
  contenido: `
    <div class="anx-block-title">4. DESCRIPTION OF THE PROCEDURE</div>
    <p>Cataract surgery removes the lens of the eye when it has become cloudy (cataract) and replaces it with an artificial lens to restore vision. Through a small incision in the cornea, the cloudy lens is fragmented and aspirated with ultrasound and the artificial lens is implanted in its place. It is performed under local anesthesia (eye drops or injection around the eye) with or without mild sedation.</p>

    <div class="anx-block-title">5. POSSIBLE COMPLICATIONS</div>
    <p class="anx-p">I have been informed about the possible complications of the procedure and understand that the following risks may occur:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICATION / RISK</th>
          <th>FREQUENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>• Tear of the posterior lens capsule with possible dropping of fragments into the eye</td><td>1–3%</td></tr>
        <tr><td>• Severe eye infection (endophthalmitis) that may cause vision loss</td><td>&lt;0.1%</td></tr>
        <tr><td>• Transient or permanent corneal swelling</td><td>&lt;1%</td></tr>
        <tr><td>• Retinal detachment after surgery</td><td>0.5–1%</td></tr>
        <tr><td>• Opacification of the posterior membrane (secondary membrane requiring subsequent laser treatment)</td><td>20–40%</td></tr>
        <tr><td>• Severe hemorrhage inside the eye (very rare)</td><td>&lt;0.1%</td></tr>
        <tr><td>• Decentering or displacement of the implanted artificial lens</td><td>&lt;1%</td></tr>
        <tr><td>• Swelling of the central retina with decreased vision</td><td>1–2%</td></tr>
        <tr><td>• Ocular inflammation (uveitis)</td><td>Uncommon</td></tr>
        <tr><td>• Increased intraocular pressure</td><td>1–2%</td></tr>
        <tr><td>• Risks inherent to local anesthesia or sedation</td><td>See anesthesia consent</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. ADDITIONAL RISKS FOR MY PARTICULAR CASE</div>
    <p>In my particular case, the physician has explained the following additional risks based on my health conditions, age, medications, eye to be operated on, or other circumstances:</p>
    <div class="form-inline-field"><label>Additional risks for this case:</label><textarea name="ci8_riesgos_adicionales" rows="3" placeholder="Describe additional risks..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVES TO THE PROCEDURE</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci8_alt_observacion"> Observation (early cataracts without significant impact on daily activities)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci8_alt_correccion_optica"> Optical correction with glasses or contact lenses (temporary relief)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci8_alt_no_cirugia"> No surgery (with documentation of impact on quality of life)</label>
    </div>

    <div class="anx-block-title">8. DECLARATION OF UNDERSTANDING AND ACCEPTANCE</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> I declare that I have read this document — or it has been read to me if I am unable to read it myself — and I have understood the information provided. I have had the opportunity to ask all questions I considered necessary, and they have been answered satisfactorily by the treating physician.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> I understand that I may revoke this consent at any time before the procedure, without this implying any detriment to my medical care.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Therefore, freely, consciously, in an informed and voluntary manner, I GIVE MY CONSENT for the procedure described, in accordance with Law 23 of 1981, Decree 3380 of 1981, Resolution 13437 of 1991, and applicable international health accreditation standards.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> I do not authorize the procedure described in this consent.</label>

    <div class="anx-block-title" id="ci8SectionFirmasTitle">9. SIGNATURES OF CONSENT</div>
    <div id="ci8DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">I, (name and ID):</div>
        <input name="ci8_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">in the capacity of:</div>
        <input name="ci8_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">I declare that:</div>
        <label><input type="checkbox" name="ci8_disent_rechaza"> I refuse the procedure</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Reason:</div>
        <textarea name="ci8_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Date and time:</div>
        <input type="datetime-local" name="ci8_disent_fecha_hora" class="ax-full-line">
      </div>
    </div>
    <div class="anx-firmas-box">
      <div class="anx-firmas-top">
        <div class="anx-firma-card">
          <div class="anx-firma-head">Patient / Legal representative</div>
          <div class="anx-firma-body">
            <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Completed automatically from identification (section 2). Edit name and document there."></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 1</div>
          <div class="anx-firma-body">
            <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and relationship</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 2</div>
          <div class="anx-firma-body">
            <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
      </div>
      <div class="anx-firma-card anx-firma-card-medico">
        <div class="anx-firma-head">Treating physician</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Full name | Medical license | Specialty</div>
      </div>
    </div>
  `
},

9: {
  titulo: "Medical Informed Consent - Umbilical Herniorrhaphy",
  contenido: `
    <div class="anx-block-title">4. DESCRIPTION OF THE PROCEDURE</div>
    <p>Umbilical herniorrhaphy is the surgical correction of umbilical hernia, which occurs when part of the intestine or other abdominal tissue protrudes through a defect in the muscle of the navel area. Under anesthesia (local, regional, or general), the herniated contents are returned to their normal position and the abdominal wall defect is closed with sutures or with a prosthetic mesh to prevent recurrence.</p>

    <div class="anx-block-title">5. POSSIBLE COMPLICATIONS</div>
    <p class="anx-p">I have been informed about the possible complications of the procedure and understand that the following risks may occur:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICATION / RISK</th>
          <th>FREQUENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Surgical wound infection</td><td>2–5%</td></tr>
        <tr><td>Hematoma or fluid accumulation at the surgical site</td><td>2–5%</td></tr>
        <tr><td>Hernia recurrence</td><td>1–10% depending on technique and patient characteristics</td></tr>
        <tr><td>Chronic pain in the operated area</td><td>2–5%</td></tr>
        <tr><td>Mesh complications (infection, rejection, adhesions)</td><td>&lt;2%</td></tr>
        <tr><td>Temporary postoperative ileus</td><td>Uncommon</td></tr>
        <tr><td>Intestinal or blood vessel injury</td><td>Very rare</td></tr>
        <tr><td>Risks inherent to the anesthesia used</td><td>See anesthesia consent</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. ADDITIONAL RISKS FOR MY PARTICULAR CASE</div>
    <p>In my particular case, the physician has explained the following additional risks based on my health status, obesity, prior surgery, smoking, defect size, or other comorbidities:</p>
    <div class="form-inline-field"><label>Additional risks for this case:</label><textarea name="ci9_riesgos_adicionales" rows="3" placeholder="Describe additional risks..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVES TO THE PROCEDURE</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci9_alt_observacion"> Observation (small asymptomatic hernias, especially in children under 2 years of age)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci9_alt_faja"> Abdominal binder or support (temporary relief, not definitive treatment)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci9_alt_no_cirugia"> No surgery (with documentation of the risks of complications)</label>
    </div>

    <div class="anx-block-title">8. DECLARATION OF UNDERSTANDING AND ACCEPTANCE</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> I declare that I have read this document — or it has been read to me if I am unable to read it myself — and I have understood the information provided. I have had the opportunity to ask all questions I considered necessary, and they have been answered satisfactorily by the treating physician.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> I understand that I may revoke this consent at any time before the procedure, without this implying any detriment to my medical care.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Therefore, freely, consciously, in an informed and voluntary manner, I GIVE MY CONSENT for the procedure described, in accordance with Law 23 of 1981, Decree 3380 of 1981, Resolution 13437 of 1991, and applicable international health accreditation standards.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> I do not authorize the procedure described in this consent.</label>

    <div class="anx-block-title" id="ci9SectionFirmasTitle">9. SIGNATURES OF CONSENT</div>
    <div id="ci9DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">I, (name and ID):</div>
        <input name="ci9_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">in the capacity of:</div>
        <input name="ci9_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">I declare that:</div>
        <label><input type="checkbox" name="ci9_disent_rechaza"> I refuse the procedure</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Reason:</div>
        <textarea name="ci9_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Date and time:</div>
        <input type="datetime-local" name="ci9_disent_fecha_hora" class="ax-full-line">
      </div>
    </div>
    <div class="anx-firmas-box">
      <div class="anx-firmas-top">
        <div class="anx-firma-card">
          <div class="anx-firma-head">Patient / Legal representative</div>
          <div class="anx-firma-body">
            <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Completed automatically from identification (section 2). Edit name and document there."></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 1</div>
          <div class="anx-firma-body">
            <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and relationship</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 2</div>
          <div class="anx-firma-body">
            <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
      </div>
      <div class="anx-firma-card anx-firma-card-medico">
        <div class="anx-firma-head">Treating physician</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Full name | Medical license | Specialty</div>
      </div>
    </div>
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

11: {
  titulo: "Informed Consent — Extracorporeal Shock Wave Lithotripsy",
  contenido: `
    <div class="anx-block-title">4. DESCRIPTION OF THE PROCEDURE</div>
    <p>Extracorporeal shock wave lithotripsy is a non-invasive procedure to treat stones in the kidney or ureter. Using external equipment that generates high-energy acoustic waves, stones are fragmented from outside the body without incisions. The resulting fragments are eliminated naturally in the urine. Sedation or anesthesia is required for pain control. The procedure may require more than one session.</p>

    <div class="anx-block-title">5. POSSIBLE COMPLICATIONS</div>
    <p class="anx-p">I have been informed about the possible complications of the procedure and understand that the following risks may occur:</p>
    <table class="anx-table">
      <thead>
        <tr>
          <th>COMPLICATION / RISK</th>
          <th>FREQUENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Renal colic from passage of stone fragments through the ureter</td><td>Common</td></tr>
        <tr><td>Blood in the urine on a transient basis</td><td>Very common</td></tr>
        <tr><td>Blood accumulation around the kidney (perirenal hematoma)</td><td>0.5–1%</td></tr>
        <tr><td>Ureteral obstruction from accumulation of fragments</td><td>2–4%</td></tr>
        <tr><td>Urinary infection or systemic infection (especially if the stone is infected)</td><td>1–3%</td></tr>
        <tr><td>Incomplete fragmentation requiring an additional procedure</td><td>10–30% depending on stone size</td></tr>
        <tr><td>Spots or bruising on the skin in the wave impact area</td><td>Common, transient</td></tr>
        <tr><td>Injury to adjacent organs in exceptional cases</td><td>Very rare</td></tr>
        <tr><td>Risks inherent to sedation or anesthesia</td><td>See anesthesia consent</td></tr>
      </tbody>
    </table>

    <div class="anx-block-title">6. ADDITIONAL RISKS FOR MY PARTICULAR CASE</div>
    <p>In my particular case, the physician has explained the following additional risks based on stone size and number, infection history, anatomy, kidney function, anticoagulation, or other conditions:</p>
    <div class="form-inline-field"><label>Additional risks for this case:</label><textarea name="ci10_riesgos_adicionales" rows="3" placeholder="Describe additional risks..." required></textarea></div>

    <div class="anx-block-title">7. ALTERNATIVES TO THE PROCEDURE</div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci10_alt_endoscopia_laser"> Ureteral endoscopy with laser fragmentation of the stone</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci10_alt_percutanea"> Percutaneous stone removal (for large stones greater than 2 cm)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci10_alt_expectante"> Expectant management with hydration and analgesia (small stones with high likelihood of spontaneous passage)</label>
    </div>
    <div class="anx-row anx-row--compact">
      <label class="anx-inline-check"><input type="checkbox" name="ci10_alt_cirugia_abierta_lap"> Open or laparoscopic surgery (complex cases)</label>
    </div>

    <div class="anx-block-title">8. DECLARATION OF UNDERSTANDING AND ACCEPTANCE</div>
    <label class="anx-decl-item"><input type="checkbox" name="declara_informado" required> I declare that I have read this document — or it has been read to me if I am unable to read it myself — and I have understood the information provided. I have had the opportunity to ask all questions I considered necessary, and they have been answered satisfactorily by the treating physician.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_revocacion_info"> I understand that I may revoke this consent at any time before the procedure, without this implying any detriment to my medical care.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_voluntario" required> Therefore, freely, consciously, in an informed and voluntary manner, I GIVE MY CONSENT for the procedure described, in accordance with Law 23 of 1981, Decree 3380 of 1981, Resolution 13437 of 1991, and applicable international health accreditation standards.</label>
    <label class="anx-decl-item"><input type="checkbox" name="declara_no_autoriza"> I do not authorize the procedure described in this consent.</label>

    <div class="anx-block-title" id="ci10SectionFirmasTitle">9. SIGNATURES OF CONSENT</div>
    <div id="ci10DissentFields" style="display:none;">
      <div class="anx-row">
        <div class="anx-label">I, (name and ID):</div>
        <input name="ci10_disent_nombre_doc" class="ax-full-line">
      </div>
      <div class="anx-row">
        <div class="anx-label">in the capacity of:</div>
        <input name="ci10_disent_calidad" class="ax-full-line">
      </div>
      <div class="anx-row anx-inline-checks">
        <div class="anx-label">I declare that:</div>
        <label><input type="checkbox" name="ci10_disent_rechaza"> I refuse the procedure</label>
      </div>
      <div class="anx-row anx-row--field-top">
        <div class="anx-label">Reason:</div>
        <textarea name="ci10_disent_motivo" class="ax-full-line ax-full-line--multiline" rows="3" spellcheck="false"></textarea>
      </div>
      <div class="anx-row">
        <div class="anx-label">Date and time:</div>
        <input type="datetime-local" name="ci10_disent_fecha_hora" class="ax-full-line">
      </div>
    </div>
    <div class="anx-firmas-box">
      <div class="anx-firmas-top">
        <div class="anx-firma-card">
          <div class="anx-firma-head">Patient / Legal representative</div>
          <div class="anx-firma-body">
            <div id="axPacienteSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_firma_paciente_nombre" class="anx-sign-line anx-sign-line--multiline anx-sign-line--sync-only" rows="3" spellcheck="false" readonly title="Completed automatically from identification (section 2). Edit name and document there."></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 1</div>
          <div class="anx-firma-body">
            <div id="axTestigo1SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo1" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and relationship</div>
        </div>
        <div class="anx-firma-card">
          <div class="anx-firma-head">Witness 2</div>
          <div class="anx-firma-body">
            <div id="axTestigo2SignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
            <textarea name="ax_testigo2" class="anx-sign-line anx-sign-line--multiline" rows="2" spellcheck="false" autocomplete="off"></textarea>
          </div>
          <div class="anx-firma-foot">Name and identity document</div>
        </div>
      </div>
      <div class="anx-firma-card anx-firma-card-medico">
        <div class="anx-firma-head">Treating physician</div>
        <div class="anx-firma-body">
          <div id="axMedicoSignSlot" class="ax-sign-slot ax-sign-slot-table"></div>
        </div>
        <div class="anx-firma-foot">Full name | Medical license | Specialty</div>
      </div>
    </div>
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
