// =============================================================================
// DATA: Lista maestra de consentimientos informados (actualizada)
// El contenido del formulario en pantalla sale de forms-es.js / plantillas JS.
// "archivo" es solo referencia opcional; ya no se extrae texto desde PDF.
// =============================================================================
const consentimientos = [
  { id: 1, numero: "1", titulo: "Consentimiento Informado de Anestesia General", archivo: "CI-ANESTESIA GENERAL.pdf", tipo: "form", categoria: "anestesia", codigo: "N/A", version: "N/A", vigente: "N/A", formId: 10 },
  { id: 2, numero: "2", titulo: "Consentimiento Informado Cirugía Bariátrica", archivo: "CI-BARIÁTRICA.pdf", tipo: "form", categoria: "cirugia", codigo: "N/A", version: "N/A", vigente: "N/A", formId: 1 },
  { id: 3, numero: "3", titulo: "Consentimiento Informado de Cirugía Cardiovascular", archivo: "CI-CARDIOVASCULAR.pdf", tipo: "form", categoria: "cirugia", codigo: "N/A", version: "N/A", vigente: "N/A", formId: 2 },
  { id: 4, numero: "4", titulo: "Consentimiento Informado Médico Circuncisión", archivo: "CONSENTIMIENTO INFORMADO MEDICO CIRCUNCISION.pdf", tipo: "form", categoria: "urologia", codigo: "CI-URO-003", version: "2.0", vigente: "2026-03-13", formId: 4 },
  { id: 5, numero: "5", titulo: "Consentimiento Informado Médico Colecistectomía Laparoscópica", archivo: "CONSENTIMIENTO INFORMADO MEDICO COLECISTECTOMIA LAPAROSCOPICA.pdf", tipo: "form", categoria: "cirugia", codigo: "CI-DM-004", version: "2.0", vigente: "2026-03-13", formId: 5 },
  { id: 6, numero: "6", titulo: "Consentimiento Informado Médico Colonoscopia", archivo: "CONSENTIMIENTO INFORMADO MEDICO COLONOSCOPIA.pdf", tipo: "form", categoria: "gastroenterologia", codigo: "CI-GAS-001", version: "2.0", vigente: "2026-03-13", formId: 6 },
  { id: 7, numero: "7", titulo: "Consentimiento Informado Médico Endoscopia Digestiva Alta", archivo: "CONSENTIMIENTO INFORMADO MEDICO ENDOSCOPIA DIGESTIVA ALTA.pdf", tipo: "form", categoria: "gastroenterologia", codigo: "CI-GAS-002", version: "2.0", vigente: "2026-03-13", formId: 7 },
  { id: 8, numero: "8", titulo: "Consentimiento Informado Médico Extracción Extracapsular de Cristalino", archivo: "CONSENTIMIENTO INFORMADO MEDICO EXTRACCION EXTRACAPSULAR DE CRISTALINO.pdf", tipo: "form", categoria: "oftalmologia", codigo: "CI-OFT-001", version: "2.0", vigente: "2026-03-13", formId: 8 },
  { id: 9, numero: "9", titulo: "Consentimiento Informado Médico Herniorrafia Umbilical", archivo: "CONSENTIMIENTO INFORMADO MEDICO HERNIORRAFIA UMBILICAL.pdf", tipo: "form", categoria: "cirugia", codigo: "CI-DM-005", version: "2.0", vigente: "2026-03-13", formId: 9 },
  { id: 10, numero: "10", titulo: "Consentimiento Informado — Litotricia Extracorpórea por Ondas de Choque", archivo: "CONSENTIMIENTO INFORMADO MEDICO LITOTRICIA EXTRACORPOREA.pdf", tipo: "form", categoria: "urologia", codigo: "CI-URO-016", version: "2.0", vigente: "2026-03-13", formId: 11, subtituloDoc: "Urología" },
  { id: 11, numero: "11", titulo: "Consentimiento Informado Médico Resección de Tumor de Piel o Tejidos Blandos", archivo: "CONSENTIMIENTO INFORMADO MEDICO RESECCION DE TUMOR BENIGNO O MALIGNO DE PIEL O TEJIDOS BLANDOS.pdf", tipo: "form", categoria: "cirugia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 12, numero: "12", titulo: "Consentimiento Informado Médico Turbinoplastia Transnasal", archivo: "CONSENTIMIENTO INFORMADO MEDICO TURBINOPLASTIA TRANSNASAL.pdf", tipo: "form", categoria: "otorrinolaringologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 13, numero: "13", titulo: "Consentimiento Informado Médico Ureterolitotomía Endoscópica", archivo: "CONSENTIMIENTO INFORMADO MEDICO URETEROLITOTOMIA ENDOSCOPICA.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 14, numero: "14", titulo: "Consentimiento Informado Médico Uretrocistoscopia", archivo: "CONSENTIMIENTO INFORMADO MEDICO URETROCISTOSCOPIA.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 15, numero: "15", titulo: "Consentimiento Informado Médico Varicocelectomía", archivo: "CONSENTIMIENTO INFORMADO MEDICO VARICOCELECTOMIA.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 16, numero: "16", titulo: "Consentimiento Informado Médico Vasectomía", archivo: "CONSENTIMIENTO INFORMADO MEDICO VASECTOMIA.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 17, numero: "17", titulo: "CI Urología Biopsia de Próstata", archivo: "CI-URO Biopsia Próstata.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 18, numero: "18", titulo: "CI Urología Biopsia de Riñón", archivo: "CI-URO Biopsia Riñón.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 19, numero: "19", titulo: "CI Urología Cistoscopia de Coágulos", archivo: "CI-URO Cistoscopia Coágulos.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 20, numero: "20", titulo: "CI Urología Cistoscopia Diagnóstica", archivo: "CI-URO Cistoscopia Diagnóst_.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 21, numero: "21", titulo: "CI Urología Cistouretropexia", archivo: "CI-URO Cistouretropexia.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 22, numero: "22", titulo: "CI Urología Hidrocelectomía", archivo: "CI-URO Hidrocelectomía.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 23, numero: "23", titulo: "CI Urología Nefrolitotomía Percutánea", archivo: "CI-URO Nefrolitotomía Perc_.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 24, numero: "24", titulo: "CI Urología Prostatectomía Laparoscópica", archivo: "CI-URO Prostatectomía Lapar_.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 25, numero: "25", titulo: "CI Urología RTUP", archivo: "CI-URO RTUP.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 26, numero: "26", titulo: "CI Urología Ureteroscopia con DJ", archivo: "CI-URO Ureteroscopia-DJ.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" },
  { id: 27, numero: "27", titulo: "CI Urología Uretrotomía Interna", archivo: "CI-URO Uretrotomía Interna.pdf", tipo: "form", categoria: "urologia", codigo: "N/A", version: "N/A", vigente: "N/A" }
];

function getConsentById(id) {
  return consentimientos.find(c => c.id === parseInt(id));
}

function getConsentFormId(consent) {
  if (!consent) return null;
  return consent.formId || consent.id;
}

// Estado global del idioma y contexto del visor
let currentLanguage = localStorage.getItem('ci_language') || 'es';
let _viewerConsent = null;
let _viewerPatient = null;
let _viewerReadOnly = false;
