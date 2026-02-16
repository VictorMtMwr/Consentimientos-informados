// =============================================================================
// DATA: Lista maestra de consentimientos informados
// =============================================================================
const consentimientos = [
  { id: 1, numero: "1", titulo: "Consentimiento Informado Cirugía Bariátrica", archivo: "1. CONSENTIMIENTO INFORMADO CIRUGIA BARIATRICA.docx", tipo: "docx", categoria: "cirugia", codigo: "F-CX-CB-001", version: "1", vigente: "Abril 2020" },
  { id: 2, numero: "2", titulo: "Consentimiento Informado de Cirugía Cardiovascular", archivo: "2. CONSENTIMIENTO INFORMADO DE CIRUGÍA CARDIOVASCULAR.pdf", tipo: "pdf", categoria: "cirugia", codigo: "F-CX-CCM-004", version: "1", vigente: "Abril 2025" },
  { id: 3, numero: "3", titulo: "Consentimiento Informado para Acompañante de Casos Probable/Confirmado de COVID-19", archivo: "3. CONSENTIMIENTO INFORMADO PARA ACOMPAÑANTE DE CASOS PROBABLE CONFIRMADO DE COVID-19.pdf", tipo: "pdf", categoria: "covid", codigo: "F-GQ-129", version: "1", vigente: "Abril 2020" },
  { id: 4, numero: "4", titulo: "Consentimiento Informado para la Administración de Componentes Sanguíneos", archivo: "4. CONSENTIMIENTO INFORMADO PARA LA ADMINISTRACION DE COMPONENTES SANGUINEOS.pdf", tipo: "pdf", categoria: "procedimientos", codigo: "FDX-029", version: "3", vigente: "Octubre 2023" },
  { id: 5, numero: "5", titulo: "Consentimiento Informado para la Realización de Estudios de Investigación", archivo: "5. CONSENTIMIENTO INFORMADO PARA LA REALIZACION DE ESTUDIOS DE INVESTIGACIÓN.pdf", tipo: "pdf", categoria: "investigacion", codigo: "F-GQ-063", version: "0", vigente: "Agosto 2015" },
  { id: 6, numero: "6", titulo: "Consentimiento Informado para Realización de Procedimientos Durante la Pandemia del Nuevo Coronavirus (COVID-19)", archivo: "6. CONSENTIMIENTO INFORMADO PARA REALIZACIÓN DE PROCEDIMIENTOS DURANTE LA PANDEMIA DEL NUEVO CORONAVIRUS (COVID-19).pdf", tipo: "pdf", categoria: "covid", codigo: "F-GQ-130", version: "1", vigente: "Abril 2020" },
  { id: 7, numero: "7", titulo: "Consentimiento Informado para Realizar la Prueba de VIH", archivo: "7. CONSENTIMIENTO INFORMADO PARA REALIZAR LA PRUEBA DE VIH.pdf", tipo: "pdf", categoria: "procedimientos", codigo: "F-DX-058", version: "1", vigente: "Septiembre 2022" },
  { id: 8, numero: "8", titulo: "Consentimiento Informado para Visita Domiciliaria", archivo: "8. CONSENTIMIENTO INFORMADO PARA VISITA DOMICILIARIA.docx", tipo: "docx", categoria: "general", codigo: "F-GQ-064", version: "1", vigente: "Abril 2020" },
  { id: 9, numero: "9", titulo: "Consentimiento Informado Psicología", archivo: "9. CONSENTIMIENTO INFORMADO PSICOLOGIA.docx", tipo: "docx", categoria: "general", codigo: "F-GQ-065", version: "1", vigente: "Abril 2020" },
  { id: 10, numero: "10", titulo: "Consentimiento Informado de Anestesia", archivo: "10. CONSENTIMIENTO INFORMADO DE ANESTESIA.pdf", tipo: "pdf", categoria: "anestesia", codigo: "F-GQ-129", version: "1", vigente: "Abril 2020" },
  { id: 12, numero: "12", titulo: "Consentimiento Informado Médico", archivo: "12. CONSENTIMIENTO INFORMADO MÉDICO.docx", tipo: "docx", categoria: "general", codigo: "F-GQ-066", version: "1", vigente: "Abril 2020" },
  { id: 13, numero: "13", titulo: "Consentimiento Informado de Fisioterapia", archivo: "13. CONSENTIMIENTO INFORMADO DE FISIOTERAPIA.docx", tipo: "docx", categoria: "general", codigo: "F-GQ-067", version: "1", vigente: "Abril 2020" },
  { id: 14, numero: "14", titulo: "Consentimiento Informado para la Obtención de Imágenes con Contenido Clínico", archivo: "14. CONSENTIMIENTO INFORMADO PARA LA OBTENCION DE IMAGENES CON CONTENIDO CLINICO.doc", tipo: "doc", categoria: "procedimientos", codigo: "F-GQ-068", version: "1", vigente: "Abril 2020" },
  { id: 16, numero: "16", titulo: "Consentimiento Informado de Enfermería", archivo: "16. CONSENTIMIENTO INFORMADO DE ENFERMERÍA.pdf", tipo: "pdf", categoria: "general", codigo: "F-GQ-069", version: "1", vigente: "Abril 2020" }
];

function getConsentById(id) {
  return consentimientos.find(c => c.id === parseInt(id));
}

// Estado global del idioma y contexto del visor
let currentLanguage = localStorage.getItem('ci_language') || 'es';
let _viewerConsent = null;
let _viewerPatient = null;
let _viewerReadOnly = false;
