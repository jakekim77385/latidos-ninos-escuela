import { useTranslation } from 'react-i18next';
import PrintButton from '../components/PrintButton';
import PrintHeader from '../components/PrintHeader';

export default function AcademicPage() {
  const { t } = useTranslation();
  const gradingItems  = t('academic.gradingItems',  { returnObjects: true });
  const planeItems    = t('academic.planeItems',    { returnObjects: true });
  const resourceItems = t('academic.resourceItems', { returnObjects: true });
  const tipItems      = t('academic.tipItems',      { returnObjects: true });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">05 — {t('nav.academic')}</p>
          <h1>{t('academic.title')}</h1>
          <p>{t('academic.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="05" sectionTitle={t('academic.title')} />
        <PrintButton sectionKey="academic" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        <div className="card">
          <p className="card-label">{t('academic.gradingTitle')}</p>
          {gradingItems.map((item, i) => (
            <div key={i} className="info-item">
              <div className="info-icon">{item.icon}</div>
              <div>
                <div className="info-title">{item.title}</div>
                <div className="info-text">{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <p className="card-label">{t('academic.planeTitle')}</p>
          <p style={{ fontSize: '0.83rem', color: 'var(--gray-70)', marginBottom: '1rem' }}>
            {t('academic.planeDesc')}
          </p>
          <div className="steps-list">
            {planeItems.map((item, i) => (
              <div key={i} className="step-item">
                <div className="step-num">0{i + 1}</div>
                <div className="step-text">{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="card-label">{t('academic.resourcesTitle')}</p>
          {resourceItems.map((item, i) => (
            <div key={i} className="doc-item">
              <div className="doc-icon">{item.icon}</div>
              <div>
                <div className="doc-name">{item.name}</div>
                <div className="doc-detail">{item.text}</div>
                {item.url && (
                  <a
                    href={`https://${item.url}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--gray-50)', display: 'block', marginTop: '0.2rem' }}
                  >
                    {item.url}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <p className="card-label">{t('academic.tipsTitle')}</p>
          <ul className="bullet-list">
            {tipItems.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
