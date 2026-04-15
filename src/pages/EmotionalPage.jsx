import { useTranslation } from 'react-i18next';
import PrintButton from '../components/PrintButton';
import PrintHeader from '../components/PrintHeader';

export default function EmotionalPage() {
  const { t } = useTranslation();
  const studentItems   = t('emotional.studentItems',   { returnObjects: true });
  const parentItems    = t('emotional.parentItems',    { returnObjects: true });
  const counselorItems = t('emotional.counselorItems', { returnObjects: true });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">04 — {t('nav.emotional')}</p>
          <h1>{t('emotional.title')}</h1>
          <p>{t('emotional.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="04" sectionTitle={t('emotional.title')} />
        <PrintButton sectionKey="emotional" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        {/* Student — grid */}
        <div className="card">
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

        {/* Parent — same grid layout as student for consistency */}
        <div className="card">
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

        {/* Counselor */}
        <div className="card">
          <p className="card-label">{t('emotional.counselorTitle')}</p>
          <p style={{ fontSize: '0.83rem', marginBottom: '1rem', color: 'var(--gray-70)' }}>{t('emotional.counselorDesc')}</p>
          <ul className="bullet-list">
            {counselorItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <div className="notice-box" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            {t('emotional.counselorAction')}
          </div>
        </div>
      </div>
    </div>
  );
}
