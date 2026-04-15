import { useTranslation } from 'react-i18next';
import PrintButton from '../components/PrintButton';

const CHECKLIST_SITUATIONS = ['newEnrollment', 'reingreso', 'refugee'];

export default function FullGuide() {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === 'es';
  const today = new Date().toLocaleDateString(isEs ? 'es-PA' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  /* ── All data from translations ─────────────────────────────────── */
  const adminNewDocs      = t('admin.newEnrollment.docs.items',  { returnObjects: true });
  const adminNewSteps     = t('admin.newEnrollment.steps.items', { returnObjects: true });
  const adminReDocs       = t('admin.reingreso.docs.items',      { returnObjects: true });
  const adminReSteps      = t('admin.reingreso.steps.items',     { returnObjects: true });
  const adminInsts        = t('admin.institutions.items',        { returnObjects: true });
  const adminDenialSteps  = t('admin.denial.steps',    { returnObjects: true });
  const adminDenialConts  = t('admin.denial.contacts', { returnObjects: true });
  const certSources       = t('health.certSources',   { returnObjects: true });
  const medicItems        = t('health.medicItems',     { returnObjects: true });
  const chronicItems      = t('health.chronicItems',   { returnObjects: true });
  const insItems          = t('health.insuranceItems', { returnObjects: true });
  const studentItems      = t('emotional.studentItems',   { returnObjects: true });
  const parentItems       = t('emotional.parentItems',    { returnObjects: true });
  const counselorItems    = t('emotional.counselorItems', { returnObjects: true });
  const gradingItems      = t('academic.gradingItems',  { returnObjects: true });
  const planeItems        = t('academic.planeItems',    { returnObjects: true });
  const acResourceItems   = t('academic.resourceItems', { returnObjects: true });
  const tipItems          = t('academic.tipItems',      { returnObjects: true });
  const rights            = t('refugee.rights',           { returnObjects: true });
  const withoutDocsItems  = t('refugee.withoutDocsItems', { returnObjects: true });
  const withDocsItems     = t('refugee.withDocsItems',    { returnObjects: true });
  const languageItems     = t('refugee.languageItems',    { returnObjects: true });
  const orgs              = t('refugee.orgs',             { returnObjects: true });
  const refDenialSteps    = t('refugee.denial.steps',    { returnObjects: true });
  const refDenialConts    = t('refugee.denial.contacts', { returnObjects: true });
  const institutions      = t('resources.institutions', { returnObjects: true });
  const categories        = t('resources.categories',   { returnObjects: true });
  const hoursLabel        = t('resources.hoursLabel');
  const faqSections       = t('faq.sections', { returnObjects: true });

  const grouped = Object.keys(categories).reduce((acc, cat) => {
    acc[cat] = institutions.filter(i => i.category === cat);
    return acc;
  }, {});

  /* ── Section header helper ──────────────────────────────────────── */
  const SectionHeader = ({ num, navKey }) => (
    <div className="guide-section-header">
      <span className="guide-section-num">{num}</span>
      <span className="guide-section-title">{t(`nav.${navKey}`)}</span>
    </div>
  );

  const tocItems = [
    ['01', t('nav.checklist')],
    ['02', t('nav.admin')],
    ['03', t('nav.health')],
    ['04', t('nav.emotional')],
    ['05', t('nav.academic')],
    ['06', t('nav.refugee')],
    ['07', t('nav.resources')],
    ['08', t('nav.faq')],
  ];

  return (
    <div className="page-wrapper">

      {/* ══ PRINT — COVER PAGE (hidden on screen) ════════════════════ */}
      <div className="guide-cover">
        <div className="guide-cover-logo">
          <span className="guide-cover-mark">GE</span>
          <div>
            <div className="guide-cover-title">
              {isEs ? 'Guía de Reingreso Escolar' : 'School Re-Entry Guide'}
            </div>
            <div className="guide-cover-country">República de Panamá · MEDUCA</div>
          </div>
        </div>

        <div className="guide-cover-toc">
          {tocItems.map(([num, label]) => (
            <div key={num} className="guide-cover-toc-entry">
              <span className="guide-cover-toc-num">{num}</span>
              <span className="guide-cover-toc-label">{label}</span>
            </div>
          ))}
        </div>

        <div>
          <div className="guide-cover-date">{today}</div>
          <div className="guide-cover-disclaimer">
            {isEs
              ? '⚠ Guía orientativa. Verifique requisitos actuales directamente con MEDUCA o su centro educativo.'
              : '⚠ Reference guide only. Verify current requirements directly with MEDUCA or your school.'}
          </div>
        </div>
      </div>

      {/* ══ SCREEN — page header ═════════════════════════════════════ */}
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">
            {isEs ? 'GUÍA COMPLETA · 8 SECCIONES' : 'COMPLETE GUIDE · 8 SECTIONS'}
          </p>
          <h1>
            {isEs ? 'Guía Completa de Reingreso Escolar' : 'Complete School Re-Entry Guide'}
          </h1>
          <p>
            {isEs
              ? 'Todos los módulos en un solo documento apto para imprimir y guardar como PDF.'
              : 'All modules in a single print-ready document. Save as PDF from the print dialog.'}
          </p>
        </div>
      </div>

      <div className="container content-section">
        <PrintButton sectionKey="guide" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        {/* ══ 01 — VERIFICACIÓN ══════════════════════════════════════ */}
        <div className="guide-section">
          <SectionHeader num="01" navKey="checklist" />
          {CHECKLIST_SITUATIONS.map(situation => {
            const items = t(`checklist.items.${situation}`, { returnObjects: true });
            return (
              <div key={situation} className="card" style={{ marginBottom: '1rem' }}>
                <p className="card-label">{t(`checklist.situations.${situation}`)}</p>
                {items.map((item, i) => (
                  <div key={i} className="check-item-wrap">
                    <div className="check-item-row" style={{ cursor: 'default' }}>
                      <div className="check-box" />
                      <span className="check-text">{item.text}</span>
                    </div>
                    {/* Always-visible detail panel in full guide */}
                    <div className="guide-check-detail">
                      <p className="check-panel-detail">{item.detail}</p>
                      <div className="check-panel-meta">
                        <span className="check-panel-where-label">{t('checklist.detailWhere')}:</span>
                        <span className="check-panel-where"> {item.where}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

        </div>

        {/* ══ 02 — TRÁMITES ══════════════════════════════════════════ */}
        <div className="guide-section">
          <SectionHeader num="02" navKey="admin" />

          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">
              <span className="admin-tab-tag" style={{ marginRight: '0.5rem' }}>A</span>
              {t('admin.newEnrollment.title')}
            </p>
            <div className="grid-2">
              <div>
                <p className="sub-label">{t('admin.newEnrollment.docs.title')}</p>
                {adminNewDocs.map((doc, i) => (
                  <div key={i} className="doc-item">
                    <div className="doc-icon">{doc.icon}</div>
                    <div><div className="doc-name">{doc.name}</div><div className="doc-detail">{doc.detail}</div></div>
                  </div>
                ))}
              </div>
              <div>
                <p className="sub-label">{t('admin.newEnrollment.steps.title')}</p>
                <div className="steps-list">
                  {adminNewSteps.map((step, i) => (
                    <div key={i} className="step-item">
                      <div className="step-num">0{i + 1}</div>
                      <div className="step-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">
              <span className="admin-tab-tag" style={{ marginRight: '0.5rem' }}>B</span>
              {t('admin.reingreso.title')}
            </p>
            <div className="grid-2">
              <div>
                <p className="sub-label">{t('admin.reingreso.docs.title')}</p>
                {adminReDocs.map((doc, i) => (
                  <div key={i} className="doc-item">
                    <div className="doc-icon">{doc.icon}</div>
                    <div><div className="doc-name">{doc.name}</div><div className="doc-detail">{doc.detail}</div></div>
                  </div>
                ))}
              </div>
              <div>
                <p className="sub-label">{t('admin.reingreso.steps.title')}</p>
                <div className="steps-list">
                  {adminReSteps.map((step, i) => (
                    <div key={i} className="step-item">
                      <div className="step-num">0{i + 1}</div>
                      <div className="step-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('admin.institutions.title')}</p>
            {adminInsts.map((inst, i) => (
              <div key={i} className="institution-card">
                <div>
                  <div className="institution-name">{inst.name}</div>
                  <div className="institution-role">{inst.role}</div>
                </div>
                <span className="institution-web">{inst.web}</span>
              </div>
            ))}
          </div>

          <div className="card denial-card">
            <p className="card-label denial-label">{t('admin.denial.title')}</p>
            <p className="denial-desc">{t('admin.denial.desc')}</p>
            <div className="notice-box denial-legal">{t('admin.denial.legalNote')}</div>
            <div className="steps-list">
              {adminDenialSteps.map((step, i) => (
                <div key={i} className="step-item">
                  <div className="step-num">{step.num}</div>
                  <div>
                    <div className="step-text" style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{step.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray-50)', lineHeight: 1.5 }}>{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="sub-label" style={{ marginTop: '1.5rem' }}>{t('admin.denial.contactsTitle')}</p>
            <div className="denial-contacts">
              {adminDenialConts.map((c, i) => (
                <div key={i} className="denial-contact-item">
                  <div className="denial-contact-name">{c.name}</div>
                  <div className="denial-contact-phone">{c.phone}</div>
                  <div className="denial-contact-role">{c.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 03 — SALUD ═════════════════════════════════════════════ */}
        <div className="guide-section">
          <SectionHeader num="03" navKey="health" />
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('health.certTitle')}</p>
            <p style={{ fontSize: '0.83rem', marginBottom: '1rem', color: 'var(--gray-70)' }}>{t('health.certDesc')}</p>
            <ul className="bullet-list">{certSources.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('health.medicTitle')}</p>
            {medicItems.map((item, i) => (
              <div key={i} className="info-item">
                <div className="info-icon">{item.icon}</div>
                <div className="info-text">{item.text}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('health.chronicTitle')}</p>
            <p style={{ fontSize: '0.83rem', marginBottom: '1rem', color: 'var(--gray-70)' }}>{t('health.chronicDesc')}</p>
            <ul className="bullet-list">{chronicItems.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div className="card">
            <p className="card-label">{t('health.insuranceTitle')}</p>
            <p style={{ fontSize: '0.83rem', marginBottom: '1rem', color: 'var(--gray-70)' }}>{t('health.insuranceDesc')}</p>
            <ul className="bullet-list">{insItems.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        </div>

        {/* ══ 04 — EMOCIONAL ═════════════════════════════════════════ */}
        <div className="guide-section">
          <SectionHeader num="04" navKey="emotional" />
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('emotional.studentTitle')}</p>
            <div className="emo-grid">
              {studentItems.map((item, i) => (
                <div key={i} className="emo-item">
                  <div className="emo-icon">{item.icon}</div>
                  <div className="emo-title">{item.title}</div>
                  <div className="emo-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('emotional.parentTitle')}</p>
            <div className="emo-grid">
              {parentItems.map((item, i) => (
                <div key={i} className="emo-item">
                  <div className="emo-icon">{item.icon}</div>
                  <div className="emo-title">{item.title}</div>
                  <div className="emo-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <p className="card-label">{t('emotional.counselorTitle')}</p>
            <p style={{ fontSize: '0.83rem', marginBottom: '1rem', color: 'var(--gray-70)' }}>{t('emotional.counselorDesc')}</p>
            <ul className="bullet-list">{counselorItems.map((item, i) => <li key={i}>{item}</li>)}</ul>
            <div className="notice-box" style={{ marginTop: '1.25rem', marginBottom: 0 }}>{t('emotional.counselorAction')}</div>
          </div>
        </div>

        {/* ══ 05 — ACADÉMICO ═════════════════════════════════════════ */}
        <div className="guide-section">
          <SectionHeader num="05" navKey="academic" />
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('academic.gradingTitle')}</p>
            {gradingItems.map((item, i) => (
              <div key={i} className="info-item">
                <div className="info-icon">{item.icon}</div>
                <div><div className="info-title">{item.title}</div><div className="info-text">{item.text}</div></div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('academic.planeTitle')}</p>
            <p style={{ fontSize: '0.83rem', color: 'var(--gray-70)', marginBottom: '1rem' }}>{t('academic.planeDesc')}</p>
            <div className="steps-list">
              {planeItems.map((item, i) => (
                <div key={i} className="step-item">
                  <div className="step-num">0{i + 1}</div>
                  <div className="step-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('academic.resourcesTitle')}</p>
            {acResourceItems.map((item, i) => (
              <div key={i} className="doc-item">
                <div className="doc-icon">{item.icon}</div>
                <div><div className="doc-name">{item.name}</div><div className="doc-detail">{item.text}</div></div>
              </div>
            ))}
          </div>
          <div className="card">
            <p className="card-label">{t('academic.tipsTitle')}</p>
            <ul className="bullet-list">{tipItems.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
          </div>
        </div>

        {/* ══ 06 — REFUGIADOS ════════════════════════════════════════ */}
        <div className="guide-section">
          <SectionHeader num="06" navKey="refugee" />
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('refugee.rightsTitle')}</p>
            <p style={{ fontSize: '0.83rem', color: 'var(--gray-70)', marginBottom: '1.25rem', lineHeight: 1.6 }}>{t('refugee.rightsDesc')}</p>
            {rights.map((r, i) => (
              <div key={i} className="rights-item">
                <div className="rights-icon">{r.icon}</div>
                <div className="rights-text">{r.text}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('refugee.withoutDocsTitle')}</p>
            {withoutDocsItems.map((item, i) => (
              <div key={i} className="doc-item">
                <div className="doc-icon">{item.icon}</div>
                <div><div className="doc-name">{item.title}</div><div className="doc-detail">{item.text}</div></div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('refugee.withDocsTitle')}</p>
            <div className="steps-list">
              {withDocsItems.map((item, i) => (
                <div key={i} className="step-item">
                  <div className="step-num">{item.icon}</div>
                  <div>
                    <div className="step-text" style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray-50)', lineHeight: 1.5 }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('refugee.languageTitle')}</p>
            <ul className="bullet-list">{languageItems.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <p className="card-label">{t('refugee.orgsTitle')}</p>
            {orgs.map((org, i) => (
              <div key={i} className="org-card">
                <div className="org-badge">{org.name}</div>
                <div className="org-fullname">{org.fullName}</div>
                <div className="org-role">{org.role}</div>
              </div>
            ))}
          </div>
          <div className="card denial-card denial-card-urgent">
            <p className="card-label denial-label">{t('refugee.denial.title')}</p>
            <p className="denial-desc">{t('refugee.denial.desc')}</p>
            <div className="notice-box denial-legal denial-legal-urgent">{t('refugee.denial.legalNote')}</div>
            <div className="steps-list">
              {refDenialSteps.map((step, i) => (
                <div key={i} className="step-item">
                  <div className="step-num">{step.num}</div>
                  <div>
                    <div className="step-text" style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{step.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray-50)', lineHeight: 1.5 }}>{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="sub-label" style={{ marginTop: '1.5rem' }}>{t('refugee.denial.contactsTitle')}</p>
            <div className="denial-contacts">
              {refDenialConts.map((c, i) => (
                <div key={i} className="denial-contact-item denial-contact-urgent">
                  <div className="denial-contact-name">{c.name}</div>
                  <div className="denial-contact-phone">{c.phone}</div>
                  <div className="denial-contact-role">{c.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 07 — DIRECTORIO ════════════════════════════════════════ */}
        <div className="guide-section">
          <SectionHeader num="07" navKey="resources" />
          <p className="resources-disclaimer">{t('resources.disclaimer')}</p>
          <div className="card">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <p className={`resource-category-title${cat === 'emergency' ? ' emergency-cat-title' : ''}`}>
                  {categories[cat]}
                </p>
                {items.map((inst, i) => (
                  <div key={i} className={`resource-card${cat === 'emergency' ? ' resource-card-emergency' : ''}`}>
                    <div>
                      <div className="resource-abbr">{inst.name}</div>
                      <div className="resource-full">{inst.fullName}</div>
                    </div>
                    <div className="resource-desc">
                      {inst.description}
                      {inst.hours && (
                        <div className="resource-hours">
                          <span className="resource-hours-label">{hoursLabel}:</span> {inst.hours}
                        </div>
                      )}
                    </div>
                    <div className="resource-contacts">
                      {inst.web   && <span className="resource-web">{inst.web}</span>}
                      {inst.phone && <span className={`resource-phone${cat === 'emergency' ? ' emergency-phone' : ''}`}>{inst.phone}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══ 08 — PREGUNTAS ═════════════════════════════════════════ */}
        <div className="guide-section">
          <SectionHeader num="08" navKey="faq" />
          <div className="card">
            {Object.entries(faqSections).map(([key, section]) => (
              <div key={key} style={{ marginBottom: '1.5rem' }}>
                <p className="sub-label" style={{ marginBottom: '0.75rem' }}>{section.title}</p>
                {section.items.map((item, i) => (
                  <div key={i} className="guide-faq-item">
                    <div className="guide-faq-q">{item.q}</div>
                    <div className="guide-faq-a">{item.a}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
