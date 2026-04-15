import { useTranslation } from 'react-i18next';
import PrintButton from '../components/PrintButton';
import PrintHeader from '../components/PrintHeader';

export default function HealthPage() {
  const { t } = useTranslation();
  const certSources  = t('health.certSources',   { returnObjects: true });
  const medicItems   = t('health.medicItems',     { returnObjects: true });
  const chronicItems = t('health.chronicItems',   { returnObjects: true });
  const insItems     = t('health.insuranceItems', { returnObjects: true });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">03 — {t('nav.health')}</p>
          <h1>{t('health.title')}</h1>
          <p>{t('health.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="03" sectionTitle={t('health.title')} />
        <PrintButton sectionKey="health" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        <div className="card">
          <p className="card-label">{t('health.certTitle')}</p>
          <p style={{ fontSize: '0.83rem', marginBottom: '1rem', color: 'var(--gray-70)' }}>{t('health.certDesc')}</p>
          <ul className="bullet-list">
            {certSources.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <div className="card">
          <p className="card-label">{t('health.medicTitle')}</p>
          {medicItems.map((item, i) => (
            <div key={i} className="info-item">
              <div className="info-icon">{item.icon}</div>
              <div className="info-text">{item.text}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <p className="card-label">{t('health.chronicTitle')}</p>
          <p style={{ fontSize: '0.83rem', marginBottom: '1rem', color: 'var(--gray-70)' }}>{t('health.chronicDesc')}</p>
          <ul className="bullet-list">
            {chronicItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="card">
          <p className="card-label">{t('health.insuranceTitle')}</p>
          <p style={{ fontSize: '0.83rem', marginBottom: '1rem', color: 'var(--gray-70)' }}>{t('health.insuranceDesc')}</p>
          <ul className="bullet-list">
            {insItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
