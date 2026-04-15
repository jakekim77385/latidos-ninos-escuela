import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SECTIONS = [
  { key: 'checklist', path: '/checklist', num: '01' },
  { key: 'admin',     path: '/admin',     num: '02' },
  { key: 'health',    path: '/health',    num: '03' },
  { key: 'emotional', path: '/emotional', num: '04' },
  { key: 'academic',  path: '/academic',  num: '05' },
  { key: 'refugee',   path: '/refugee',   num: '06' },
  { key: 'resources', path: '/resources', num: '07' },
  { key: 'faq',       path: '/faq',       num: '08' },
  { key: 'docs',      path: '/docs',      num: '09' },
];

export default function SectionNav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const idx  = SECTIONS.findIndex(s => s.path === pathname);
  if (idx === -1) return null; // home or unknown — don't render

  const prev = idx > 0                   ? SECTIONS[idx - 1] : null;
  const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;

  return (
    <div className="section-nav">
      <div className="container">
        <div className="section-nav-inner">

          {prev ? (
            <Link to={prev.path} className="section-nav-link section-nav-prev">
              <span className="section-nav-arrow">←</span>
              <span>
                <span className="section-nav-num">{prev.num}</span>
                {t(`nav.${prev.key}`)}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link to={next.path} className="section-nav-link section-nav-next">
              <span>
                <span className="section-nav-num">{next.num}</span>
                {t(`nav.${next.key}`)}
              </span>
              <span className="section-nav-arrow">→</span>
            </Link>
          ) : <div />}

        </div>
      </div>
    </div>
  );
}
