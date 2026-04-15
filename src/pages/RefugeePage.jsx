import { useTranslation } from 'react-i18next';
import PrintButton from '../components/PrintButton';
import PrintHeader from '../components/PrintHeader';

export default function RefugeePage() {
  const { t } = useTranslation();
  const rights           = t('refugee.rights',           { returnObjects: true });
  const withoutDocsItems = t('refugee.withoutDocsItems', { returnObjects: true });
  const withDocsItems    = t('refugee.withDocsItems',    { returnObjects: true });
  const languageItems    = t('refugee.languageItems',    { returnObjects: true });
  const orgs             = t('refugee.orgs',             { returnObjects: true });
  const denialSteps      = t('refugee.denial.steps',    { returnObjects: true });
  const denialContacts   = t('refugee.denial.contacts', { returnObjects: true });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">06 — {t('nav.refugee')}</p>
          <h1>{t('refugee.title')}</h1>
          <p>{t('refugee.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="06" sectionTitle={t('refugee.title')} />
        <PrintButton sectionKey="refugee" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        {/* Rights */}
        <div className="card">
          <p className="card-label">{t('refugee.rightsTitle')}</p>
          <p style={{ fontSize: '0.83rem', color: 'var(--gray-70)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            {t('refugee.rightsDesc')}
          </p>
          {rights.map((r, i) => (
            <div key={i} className="rights-item">
              <div className="rights-icon">{r.icon}</div>
              <div className="rights-text">{r.text}</div>
            </div>
          ))}
          <div className="notice-box" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            Decreto Ejecutivo No. 1225 de 2015 — Garantiza el acceso al sistema educativo para niños refugiados y solicitantes de asilo en Panamá, incluso sin documentación completa.
          </div>
        </div>

        {/* Without docs */}
        <div className="card">
          <p className="card-label">{t('refugee.withoutDocsTitle')}</p>
          {withoutDocsItems.map((item, i) => (
            <div key={i} className="doc-item">
              <div className="doc-icon">{item.icon}</div>
              <div>
                <div className="doc-name">{item.title}</div>
                <div className="doc-detail">{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* With docs */}
        <div className="card">
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

        {/* Language */}
        <div className="card">
          <p className="card-label">{t('refugee.languageTitle')}</p>
          <ul className="bullet-list">
            {languageItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        {/* Orgs */}
        <div className="card">
          <p className="card-label">{t('refugee.orgsTitle')}</p>
          {orgs.map((org, i) => (
            <div key={i} className="org-card">
              <div className="org-badge">{org.name}</div>
              <div className="org-fullname">{org.fullName}</div>
              <div className="org-role">{org.role}</div>
              {org.url && (
                <a
                  href={`https://${org.url}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--gray-50)', marginTop: '0.25rem', display: 'block' }}
                >
                  {org.url}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Denial Response — refugee-specific */}
        <div className="card denial-card denial-card-urgent">
          <p className="card-label denial-label">{t('refugee.denial.title')}</p>
          <p className="denial-desc">{t('refugee.denial.desc')}</p>

          <div className="notice-box denial-legal denial-legal-urgent">
            {t('refugee.denial.legalNote')}
          </div>

          <div className="steps-list">
            {denialSteps.map((step, i) => (
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
            {denialContacts.map((c, i) => (
              <div key={i} className="denial-contact-item denial-contact-urgent">
                <div className="denial-contact-name">{c.name}</div>
                <div className="denial-contact-phone">{c.phone}</div>
                <div className="denial-contact-role">{c.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
