import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PrintButton from '../components/PrintButton';
import PrintHeader from '../components/PrintHeader';

const TABS = ['newEnrollment', 'reingreso'];

export default function AdminPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('newEnrollment');

  const newDocs    = t('admin.newEnrollment.docs.items',  { returnObjects: true });
  const newSteps   = t('admin.newEnrollment.steps.items', { returnObjects: true });
  const reDocs     = t('admin.reingreso.docs.items',      { returnObjects: true });
  const reSteps    = t('admin.reingreso.steps.items',     { returnObjects: true });
  const insts      = t('admin.institutions.items',        { returnObjects: true });
  const denialSteps    = t('admin.denial.steps',    { returnObjects: true });
  const denialContacts = t('admin.denial.contacts', { returnObjects: true });

  const renderTabContent = (docs, steps, tabKey, labelTag, titleKey, docsTitle, stepsTitle) => (
    <div className={`section-block${activeTab !== tabKey ? ' screen-hidden' : ''}`}>
      <div className="card">
        <p className="card-label">
          <span className="admin-tab-tag" style={{ marginRight: '0.5rem' }}>{labelTag}</span>
          {t(titleKey)}
        </p>
        <div className="grid-2">
          <div>
            <p className="sub-label">{t(docsTitle)}</p>
            {docs.map((doc, i) => (
              <div key={i} className="doc-item">
                <div className="doc-icon">{doc.icon}</div>
                <div>
                  <div className="doc-name">{doc.name}</div>
                  <div className="doc-detail">{doc.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="sub-label">{t(stepsTitle)}</p>
            <div className="steps-list">
              {steps.map((step, i) => (
                <div key={i} className="step-item">
                  <div className="step-num">0{i + 1}</div>
                  <div className="step-text">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">02 — {t('nav.admin')}</p>
          <h1>{t('admin.title')}</h1>
          <p>{t('admin.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="02" sectionTitle={t('admin.title')} />
        <PrintButton sectionKey="admin" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        {/* Tab selector — hidden on print */}
        <div className="admin-tab-selector">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`admin-tab-btn${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="admin-tab-tag">{tab === 'newEnrollment' ? 'A' : 'B'}</span>
              {t(`admin.${tab}.title`)}
            </button>
          ))}
        </div>

        {/* Tab A: New Enrollment — screen: visible only when active, print: always visible */}
        {renderTabContent(
          newDocs, newSteps,
          'newEnrollment', 'A',
          'admin.newEnrollment.title',
          'admin.newEnrollment.docs.title',
          'admin.newEnrollment.steps.title'
        )}

        {/* Tab B: Reingreso — screen: visible only when active, print: always visible */}
        {renderTabContent(
          reDocs, reSteps,
          'reingreso', 'B',
          'admin.reingreso.title',
          'admin.reingreso.docs.title',
          'admin.reingreso.steps.title'
        )}

        {/* Institutions — always visible */}
        <div className="section-block">
          <div className="card">
            <p className="card-label">{t('admin.institutions.title')}</p>
            {insts.map((inst, i) => (
              <div key={i} className="institution-card">
                <div>
                  <div className="institution-name">{inst.name}</div>
                  <div className="institution-role">{inst.role}</div>
                </div>
                <a href={`https://${inst.web}`} target="_blank" rel="noreferrer" className="institution-web">
                  {inst.web}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Denial — always visible */}
        <div className="section-block">
          <div className="card denial-card">
            <p className="card-label denial-label">{t('admin.denial.title')}</p>
            <p className="denial-desc">{t('admin.denial.desc')}</p>
            <div className="notice-box denial-legal">{t('admin.denial.legalNote')}</div>
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
            <p className="sub-label" style={{ marginTop: '1.5rem' }}>{t('admin.denial.contactsTitle')}</p>
            <div className="denial-contacts">
              {denialContacts.map((c, i) => (
                <div key={i} className="denial-contact-item">
                  <div className="denial-contact-name">{c.name}</div>
                  <div className="denial-contact-phone">{c.phone}</div>
                  <div className="denial-contact-role">{c.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
