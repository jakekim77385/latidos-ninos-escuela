import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SECTIONS = [
  { key: 'checklist', path: '/checklist', tag: 'LISTA', num: '01' },
  { key: 'admin',     path: '/admin',     tag: 'TRÁM.', num: '02' },
  { key: 'health',    path: '/health',    tag: 'SALUD', num: '03' },
  { key: 'emotional', path: '/emotional', tag: 'EMOC.', num: '04' },
  { key: 'academic',  path: '/academic',  tag: 'ACAD.', num: '05' },
  { key: 'refugee',   path: '/refugee',   tag: 'REFUG.', num: '06' },
  { key: 'resources', path: '/resources', tag: 'DIR.', num: '07' },
  { key: 'faq',       path: '/faq',       tag: 'FAQ', num: '08' },
  { key: 'docs',      path: '/docs',      tag: 'DOC.', num: '09' },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  return (
    <div className="page-wrapper">
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">Panamá · MEDUCA · {isEs ? 'Guía de Reingreso' : 'School Re-Entry Guide'}</p>
          <h1>{t('home.title')}</h1>
          <p className="hero-subtitle">{t('home.subtitle')}</p>
          <p className="hero-desc">{t('home.description')}</p>
          <div className="hero-meta">
            <span className="hero-tag">{t('home.audience')}</span>
          </div>
          <p className="hero-disclaimer">{t('home.disclaimer')}</p>
        </div>
      </section>

      <div className="container">
        <div className="sections-grid-wrap">
          <div className="sections-grid">
            {SECTIONS.map(s => (
              <Link key={s.key} to={s.path} className="section-card fade-in">
                <div className="section-card-num">{s.num}</div>
                <div className="section-card-tag">{s.tag}</div>
                <h3>{t(`home.sections.${s.key}.title`)}</h3>
                <p>{t(`home.sections.${s.key}.desc`)}</p>
                <div className="section-card-arrow">{isEs ? 'Ver →' : 'View →'}</div>
              </Link>
            ))}
          </div>

          {/* Full guide PDF link */}
          <div className="guide-full-link-wrap">
            <Link to="/guide" className="guide-full-link">
              <span className="guide-full-link-icon">↓</span>
              <span>
                <span className="guide-full-link-title">
                  {isEs ? 'Guía completa — PDF' : 'Complete guide — PDF'}
                </span>
                <span className="guide-full-link-sub">
                  {isEs ? 'Todos los módulos en un solo documento' : 'All modules in a single document'}
                </span>
              </span>
              <span className="guide-full-link-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
