import { useTranslation } from 'react-i18next';
import PrintButton from '../components/PrintButton';
import PrintHeader from '../components/PrintHeader';

const CATEGORY_LABELS = {
  government: 'GOB.',
  health:     'SAL.',
  support:    'APO.',
  ngo:        'ONG',
  child:      'NIN.',
  emergency:  '!',
};

export default function ResourcesPage() {
  const { t } = useTranslation();
  const institutions = t('resources.institutions', { returnObjects: true });
  const categories   = t('resources.categories',  { returnObjects: true });
  const hoursLabel   = t('resources.hoursLabel');

  const grouped = Object.keys(categories).reduce((acc, cat) => {
    acc[cat] = institutions.filter(i => i.category === cat);
    return acc;
  }, {});

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">07 — {t('nav.resources')}</p>
          <h1>{t('resources.title')}</h1>
          <p>{t('resources.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="07" sectionTitle={t('resources.title')} />
        <PrintButton sectionKey="resources" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>
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
                    {inst.web && (
                      <a
                        href={`https://${inst.web}`}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-web"
                      >
                        {inst.web}
                      </a>
                    )}
                    {inst.phone && (
                      <a href={`tel:${inst.phone}`} className={`resource-phone${cat === 'emergency' ? ' emergency-phone' : ''}`}>
                        {inst.phone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
