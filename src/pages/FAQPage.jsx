import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PrintButton from '../components/PrintButton';
import PrintHeader from '../components/PrintHeader';

const SECTION_META = {
  general:       { tag: 'GEN.' },
  newEnrollment: { tag: 'A' },
  reentry:       { tag: 'B' },
  refugee:       { tag: 'C' },
};

function FAQAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={i} className={`faq-item${openIdx === i ? ' open' : ''}`}>
          <button
            className="faq-q"
            onClick={() => toggle(i)}
            aria-expanded={openIdx === i}
          >
            <span className="faq-q-text">{item.q}</span>
            <span className="faq-icon">{openIdx === i ? '−' : '+'}</span>
          </button>
          {/* Always in DOM — screen hides unless parent .open, print always shows */}
          <div className="faq-answer">{item.a}</div>
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  const { t } = useTranslation();
  const sections = t('faq.sections', { returnObjects: true });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">08 — FAQ</p>
          <h1>{t('faq.title')}</h1>
          <p>{t('faq.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="08" sectionTitle={t('faq.title')} />
        <PrintButton sectionKey="faq" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className="section-block">
            <div className="faq-section-header">
              <span className="admin-tab-tag">{SECTION_META[key]?.tag}</span>
              <h2 className="faq-section-title">{section.title}</h2>
            </div>
            <div className="card">
              <FAQAccordion items={section.items} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
