import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PrintHeader from '../components/PrintHeader';

const TABS = ['reingreso', 'medica', 'enlaces'];

const OFFICIAL_LINKS = [
  { name: 'MEDUCA', fullName: 'Ministerio de Educación de Panamá', desc_es: 'Matrícula escolar, revalidación de estudios, formularios y trámites educativos oficiales.', desc_en: 'School enrollment, study validation, MEDUCA forms, and official educational procedures.', url: 'https://meduca.gob.pa', phone: '511-4400', icon: 'EDU.' },
  { name: 'CSS', fullName: 'Caja de Seguro Social', desc_es: 'Seguro escolar, formularios de salud y prestaciones de CSS para estudiantes inscritos.', desc_en: 'School insurance, health forms, and CSS benefits for enrolled students.', url: 'https://www.css.gob.pa', phone: '199', icon: 'CSS' },
  { name: 'Trib. Electoral', fullName: 'Registro Civil — Tribunal Electoral', desc_es: 'Partidas de nacimiento, cédulas de identidad personal, apostilla de documentos oficiales.', desc_en: 'Birth certificates, national ID cards, apostille of official documents.', url: 'https://www.tribunal-electoral.gob.pa', phone: '507-6000', icon: 'TRIB.' },
  { name: 'MINSA', fullName: 'Ministerio de Salud de Panamá', desc_es: 'Carnet de vacunación, certificados de aptitud escolar, centros de salud regionales.', desc_en: 'Vaccination cards, school fitness certificates, regional health centers.', url: 'https://www.minsa.gob.pa', phone: '512-9100', icon: 'SAL.' },
  { name: 'ONPAR', fullName: 'Oficina Nacional para la Atención de Refugiados', desc_es: 'Tarjeta de refugiado, documentación para solicitantes de asilo y personas en situación de refugio en Panamá.', desc_en: 'Refugee ID card, documentation for asylum seekers and refugees in Panama.', url: 'https://www.migracion.gob.pa', phone: '507-9500', icon: 'REF.' },
];

const REINGRESO_DEFAULT = { ciudad: 'Ciudad de Panamá', fecha: '', director: '', escuela: '', estudiante: '', grado: '', tutor: '', cedula: '', generoTutor: 'madre', genero: 'hija', fechaInicio: '', fechaFin: '', motivo: '', telefono: '' };
const MEDICA_DEFAULT    = { ciudad: 'Ciudad de Panamá', fecha: '', director: '', escuela: '', estudiante: '', grado: '', tutor: '', genero: 'hija', condicion: '', medico: '', medicamentos: '', restricciones: '', alertas: '', telefono: '' };

function getSpanishDate() {
  const d = new Date();
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildReingresoLetter(f) {
  const ciudad      = esc(f.ciudad)      || 'Ciudad de Panamá';
  const fecha       = esc(f.fecha)       || getSpanishDate();
  const director    = esc(f.director)    || '___________';
  const escuela     = esc(f.escuela)     || '___________';
  const estudiante  = esc(f.estudiante)  || '___________';
  const grado       = esc(f.grado)       || '___________';
  const tutor       = esc(f.tutor)       || '___________';
  const cedula      = esc(f.cedula)      || '___________';
  const relacion    = f.generoTutor === 'madre' ? 'madre' : f.generoTutor === 'padre' ? 'padre' : 'tutor/a legal';
  const genero      = f.genero === 'hijo' ? 'hijo' : 'hija';
  const pronombre   = f.genero === 'hijo' ? 'del estudiante' : 'de la estudiante';
  const articulo    = f.genero === 'hijo' ? 'El estudiante' : 'La estudiante';
  const fechaInicio = esc(f.fechaInicio) || '___________';
  const fechaFin    = esc(f.fechaFin)    || '___________';
  const motivo      = esc(f.motivo)      || '___________';
  const telefono    = esc(f.telefono)    || '___________';

  return `<p>${ciudad}, ${fecha}</p>
<p>Señor/a<br/><strong>${director}</strong><br/>Director/a<br/><strong>${escuela}</strong><br/>Su despacho</p>
<p><strong>Asunto:</strong> Solicitud de Reingreso Escolar</p>
<p>Estimado/a señor/a Director/a:</p>
<p>Por medio de la presente, yo <strong>${tutor}</strong>, portador/a de la cédula de identidad personal N° <strong>${cedula}</strong>, en mi calidad de <strong>${relacion}</strong> ${pronombre} <strong>${estudiante}</strong>, de <strong>${grado}</strong>, me dirijo a usted respetuosamente para solicitar el reingreso de mi <strong>${genero}</strong> al centro educativo a su digno cargo.</p>
<p>${articulo} estuvo ausente durante el período comprendido del <strong>${fechaInicio}</strong> al <strong>${fechaFin}</strong>, debido a <strong>${motivo}</strong>.</p>
<p>Adjunto a la presente carta, el certificado médico que acredita el alta y la aptitud ${pronombre} para reiniciar sus actividades escolares con normalidad.</p>
<p>Agradezco de antemano su comprensión y colaboración, y me pongo a su entera disposición para cualquier información adicional que requiera.</p>
<p>Atentamente,</p>
<br/><br/>
<p>______________________________<br/><strong>${tutor}</strong><br/>Teléfono de contacto: ${telefono}</p>`;
}

function buildMedicaLetter(f) {
  const ciudad      = esc(f.ciudad)      || 'Ciudad de Panamá';
  const fecha       = esc(f.fecha)       || getSpanishDate();
  const director    = esc(f.director)    || '___________';
  const escuela     = esc(f.escuela)     || '___________';
  const estudiante  = esc(f.estudiante)  || '___________';
  const grado       = esc(f.grado)       || '___________';
  const tutor       = esc(f.tutor)       || '___________';
  const genero      = f.genero === 'hijo' ? 'hijo' : 'hija';
  const pronombre   = f.genero === 'hijo' ? 'del estudiante' : 'de la estudiante';
  const condicion   = esc(f.condicion)     || '___________';
  const medico      = esc(f.medico)        || '___________';
  const medicamentos = esc(f.medicamentos) || '___________';
  const restricciones = esc(f.restricciones) || 'Ninguna';
  const alertas     = esc(f.alertas)      || '___________';
  const telefono    = esc(f.telefono)     || '___________';

  return `<p>${ciudad}, ${fecha}</p>
<p>Señor/a<br/><strong>${director}</strong><br/>Director/a<br/><strong>${escuela}</strong><br/>Su despacho</p>
<p><strong>Asunto:</strong> Comunicación de Condición Médica Especial ${pronombre} <strong>${estudiante}</strong></p>
<p>Estimado/a señor/a Director/a:</p>
<p>Por medio de la presente, yo <strong>${tutor}</strong>, en representación de mi <strong>${genero}</strong> <strong>${estudiante}</strong>, estudiante de <strong>${grado}</strong>, le comunico formalmente que el/la estudiante presenta la siguiente condición médica diagnosticada: <strong>${condicion}</strong>.</p>
<p>Dicha condición ha sido diagnosticada y tratada por el/la Dr./Dra. <strong>${medico}</strong>, y requiere las siguientes consideraciones especiales durante el horario escolar:</p>
<ul>
<li><strong>Medicamentos y horario de administración:</strong> ${medicamentos}</li>
<li><strong>Restricciones físicas o alimenticias:</strong> ${restricciones}</li>
<li><strong>Señales de alerta que requieren atención inmediata:</strong> ${alertas}</li>
</ul>
<p>En caso de emergencia o situación relacionada con la condición ${pronombre}, por favor contactar de inmediato a <strong>${tutor}</strong>, teléfono <strong>${telefono}</strong>.</p>
<p>Se adjunta copia del informe médico del especialista tratante para su archivo.</p>
<p>Agradezco su comprensión y colaboración.</p>
<p>Atentamente,</p>
<br/><br/>
<p>______________________________<br/><strong>${tutor}</strong><br/>Teléfono de contacto: ${telefono}</p>`;
}

function printLetter(htmlContent, title) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Times New Roman', Times, Georgia, serif; font-size: 11pt; line-height: 1.9; color: #111; padding: 28mm 30mm 32mm; }
  p  { margin-bottom: 1.25em; }
  ul { margin: 0.5em 0 1.25em 1.5em; }
  li { margin-bottom: 0.35em; }
  strong { font-weight: 600; }
</style>
</head>
<body>${htmlContent}</body>
</html>`;
  const win = window.open('', '_blank', 'width=900,height=700');
  if (!win) { alert('Permita ventanas emergentes para imprimir la carta. / Please allow pop-ups to print the letter.'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 350);
}

/* ── Sub-components ──────────────────────────────────────────────── */
function Field({ label, name, value, onChange, placeholder = '', as = 'input' }) {
  return (
    <div className="doc-field-group">
      <label className="doc-field-label">{label}</label>
      {as === 'textarea'
        ? <textarea className="doc-field-input doc-field-textarea" name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3} />
        : <input className="doc-field-input" name={name} value={value} onChange={onChange} placeholder={placeholder} />
      }
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div className="doc-field-group">
      <label className="doc-field-label">{label}</label>
      <select className="doc-field-input doc-field-select" name={name} value={value} onChange={onChange}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────── */
export default function DocumentsPage() {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === 'es';
  const [activeTab, setActiveTab]       = useState('reingreso');
  const [reingresoForm, setReingresoForm] = useState(REINGRESO_DEFAULT);
  const [medicaForm,    setMedicaForm]    = useState(MEDICA_DEFAULT);

  const handleReingreso = e => { const { name, value } = e.target; setReingresoForm(p => ({ ...p, [name]: value })); };
  const handleMedica    = e => { const { name, value } = e.target; setMedicaForm(p => ({ ...p, [name]: value })); };

  const reingresoHtml = buildReingresoLetter(reingresoForm);
  const medicaHtml    = buildMedicaLetter(medicaForm);

  const tabLabel = { reingreso: isEs ? 'Carta de Reingreso' : 'Re-Entry Letter', medica: isEs ? 'Comunicación Médica' : 'Medical Notification', enlaces: isEs ? 'Formularios Oficiales' : 'Official Forms' };

  const genderOpts  = [{ value: 'hija', label: isEs ? 'Hija' : 'Daughter' }, { value: 'hijo', label: isEs ? 'Hijo' : 'Son' }];
  const tutorOpts   = [{ value: 'madre', label: isEs ? 'Madre' : 'Mother' }, { value: 'padre', label: isEs ? 'Padre' : 'Father' }, { value: 'tutor', label: isEs ? 'Tutor/a legal' : 'Legal guardian' }];

  const commonFields = (form, handler) => (
    <>
      <Field label={isEs ? 'Ciudad' : 'City'} name="ciudad" value={form.ciudad} onChange={handler} placeholder="Ciudad de Panamá" />
      <Field label={isEs ? 'Fecha de la carta' : 'Letter date'} name="fecha" value={form.fecha} onChange={handler} placeholder={getSpanishDate()} />
      <Field label={isEs ? 'Nombre del Director/a' : "Director's name"} name="director" value={form.director} onChange={handler} placeholder={isEs ? 'Ej: María González' : 'E.g.: María González'} />
      <Field label={isEs ? 'Nombre de la escuela' : 'School name'} name="escuela" value={form.escuela} onChange={handler} placeholder={isEs ? 'Ej: Colegio José D. Espinar' : 'E.g.: Colegio José D. Espinar'} />
      <Field label={isEs ? 'Nombre completo del estudiante' : "Student's full name"} name="estudiante" value={form.estudiante} onChange={handler} placeholder={isEs ? 'Ej: Ana Pérez López' : 'E.g.: Ana Pérez López'} />
      <Field label={isEs ? 'Grado y sección' : 'Grade and section'} name="grado" value={form.grado} onChange={handler} placeholder={isEs ? 'Ej: 4° grado, Sección B' : 'E.g.: 4th grade, Section B'} />
      <Select label={isEs ? 'Género del estudiante' : "Student's gender"} name="genero" value={form.genero} onChange={handler} options={genderOpts} />
    </>
  );

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">09 — {t('nav.docs')}</p>
          <h1>{t('docs.title')}</h1>
          <p>{t('docs.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="09" sectionTitle={t('docs.title')} />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        <div className="notice-box" style={{ marginBottom: '1.5rem' }}>
          {isEs
            ? '⚠ Los modelos de carta son de referencia. Revíselos y adáptelos a su situación antes de presentarlos. No son documentos oficiales.'
            : '⚠ Letter templates are for reference only. Review and adapt them to your situation before submission. They are not official documents.'}
        </div>

        {/* Tabs */}
        <div className="doc-tab-selector">
          {TABS.map(tab => (
            <button key={tab} className={`doc-tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tabLabel[tab]}
            </button>
          ))}
        </div>

        {/* ── TAB A: REINGRESO ─────────────────────────────── */}
        {activeTab === 'reingreso' && (
          <div className="doc-form-layout">
            <div className="doc-form-panel">
              <p className="card-label" style={{ marginBottom: '1rem' }}>
                {isEs ? 'Complete los campos para generar la carta' : 'Fill in the fields to generate the letter'}
              </p>
              {commonFields(reingresoForm, handleReingreso)}
              <Field label={isEs ? 'Nombre completo del tutor/a' : "Guardian's full name"} name="tutor" value={reingresoForm.tutor} onChange={handleReingreso} placeholder={isEs ? 'Ej: Carlos Pérez' : 'E.g.: Carlos Pérez'} />
              <Field label={isEs ? 'Cédula del tutor/a' : "Guardian's ID"} name="cedula" value={reingresoForm.cedula} onChange={handleReingreso} placeholder="8-123-456" />
              <Select label={isEs ? 'Relación con el estudiante' : 'Relationship'} name="generoTutor" value={reingresoForm.generoTutor} onChange={handleReingreso} options={tutorOpts} />
              <Field label={isEs ? 'Fecha inicio de ausencia' : 'Absence start date'} name="fechaInicio" value={reingresoForm.fechaInicio} onChange={handleReingreso} placeholder={isEs ? 'Ej: 1 de marzo de 2026' : 'E.g.: March 1, 2026'} />
              <Field label={isEs ? 'Fecha fin de ausencia' : 'Absence end date'} name="fechaFin" value={reingresoForm.fechaFin} onChange={handleReingreso} placeholder={isEs ? 'Ej: 31 de marzo de 2026' : 'E.g.: March 31, 2026'} />
              <Field as="textarea" label={isEs ? 'Motivo de la ausencia' : 'Reason for absence'} name="motivo" value={reingresoForm.motivo} onChange={handleReingreso} placeholder={isEs ? 'Ej: enfermedad respiratoria severa con hospitalización' : 'E.g.: severe respiratory illness requiring hospitalization'} />
              <Field label={isEs ? 'Teléfono de contacto' : 'Contact phone'} name="telefono" value={reingresoForm.telefono} onChange={handleReingreso} placeholder="6000-0000" />
            </div>
            <div className="doc-preview-panel">
              <div className="doc-preview-header">
                <span>{isEs ? 'Vista previa' : 'Preview'}</span>
                <button className="doc-print-btn" onClick={() => printLetter(reingresoHtml, 'Carta de Reingreso Escolar')}>
                  ↓ {isEs ? 'Guardar como PDF' : 'Save as PDF'}
                </button>
              </div>
              <div className="doc-letter-paper" dangerouslySetInnerHTML={{ __html: reingresoHtml }} />
            </div>
          </div>
        )}

        {/* ── TAB B: MÉDICA ────────────────────────────────── */}
        {activeTab === 'medica' && (
          <div className="doc-form-layout">
            <div className="doc-form-panel">
              <p className="card-label" style={{ marginBottom: '1rem' }}>
                {isEs ? 'Complete los campos para generar la carta' : 'Fill in the fields to generate the letter'}
              </p>
              {commonFields(medicaForm, handleMedica)}
              <Field label={isEs ? 'Nombre completo del tutor/a' : "Guardian's full name"} name="tutor" value={medicaForm.tutor} onChange={handleMedica} placeholder={isEs ? 'Ej: Carlos Pérez' : 'E.g.: Carlos Pérez'} />
              <Field as="textarea" label={isEs ? 'Condición médica diagnosticada' : 'Diagnosed condition'} name="condicion" value={medicaForm.condicion} onChange={handleMedica} placeholder={isEs ? 'Ej: diabetes tipo 1, epilepsia, asma severa' : 'E.g.: type 1 diabetes, epilepsy, severe asthma'} />
              <Field label={isEs ? 'Médico tratante' : 'Treating doctor'} name="medico" value={medicaForm.medico} onChange={handleMedica} placeholder={isEs ? 'Ej: Dra. Rosa Jiménez' : 'E.g.: Dr. Rosa Jiménez'} />
              <Field as="textarea" label={isEs ? 'Medicamentos y horario' : 'Medications & schedule'} name="medicamentos" value={medicaForm.medicamentos} onChange={handleMedica} placeholder={isEs ? 'Ej: Insulina 5 u. a las 12:00 — refrigerada' : 'E.g.: Insulin 5 units at noon — refrigerated'} />
              <Field as="textarea" label={isEs ? 'Restricciones físicas o alimenticias' : 'Physical or dietary restrictions'} name="restricciones" value={medicaForm.restricciones} onChange={handleMedica} placeholder={isEs ? 'Ej: sin educación física; dieta sin azúcar' : 'E.g.: no PE class; sugar-free diet'} />
              <Field as="textarea" label={isEs ? 'Señales de alerta urgentes' : 'Urgent warning signs'} name="alertas" value={medicaForm.alertas} onChange={handleMedica} placeholder={isEs ? 'Ej: sudoración, temblores, pérdida de conciencia' : 'E.g.: sweating, tremors, loss of consciousness'} />
              <Field label={isEs ? 'Teléfono de emergencia' : 'Emergency phone'} name="telefono" value={medicaForm.telefono} onChange={handleMedica} placeholder="6000-0000" />
            </div>
            <div className="doc-preview-panel">
              <div className="doc-preview-header">
                <span>{isEs ? 'Vista previa' : 'Preview'}</span>
                <button className="doc-print-btn" onClick={() => printLetter(medicaHtml, 'Comunicación de Condición Médica')}>
                  ↓ {isEs ? 'Guardar como PDF' : 'Save as PDF'}
                </button>
              </div>
              <div className="doc-letter-paper" dangerouslySetInnerHTML={{ __html: medicaHtml }} />
            </div>
          </div>
        )}

        {/* ── TAB C: ENLACES OFICIALES ──────────────────────── */}
        {activeTab === 'enlaces' && (
          <div>
            <p style={{ fontSize: '0.83rem', color: 'var(--gray-50)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              {isEs
                ? 'Acceda directamente a los portales del Estado panameño. Los formularios en estos sitios son siempre la versión oficial y actualizada.'
                : 'Access official Panamanian government portals directly. Forms on these sites are always the official, up-to-date version.'}
            </p>
            <div className="doc-links-grid">
              {OFFICIAL_LINKS.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="doc-link-card">
                  <div className="doc-link-icon">{link.icon}</div>
                  <div className="doc-link-content">
                    <div className="doc-link-name">{link.name}</div>
                    <div className="doc-link-fullname">{link.fullName}</div>
                    <div className="doc-link-desc">{isEs ? link.desc_es : link.desc_en}</div>
                    {link.phone && <div className="doc-link-phone">Tel: {link.phone}</div>}
                    <div className="doc-link-url">{link.url.replace('https://','')}</div>
                  </div>
                  <div className="doc-link-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
