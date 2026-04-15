import { useTranslation } from 'react-i18next';

/**
 * PrintHeader — only visible when printing (@media print).
 * Renders a formal document header at the top of every printed page.
 */
export default function PrintHeader({ sectionNum, sectionTitle }) {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';
  const today = new Date().toLocaleDateString(isEs ? 'es-PA' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="print-doc-header">
      <div className="print-doc-header-top">
        <div className="print-doc-logo">
          <span className="print-doc-logo-mark">GE</span>
          <div>
            <div className="print-doc-title">
              {isEs ? 'Guía de Reingreso Escolar' : 'School Re-Entry Guide'}
            </div>
            <div className="print-doc-country">República de Panamá · MEDUCA</div>
          </div>
        </div>
        <div className="print-doc-meta">
          <div className="print-doc-section-num">{sectionNum}</div>
          <div className="print-doc-date">{today}</div>
        </div>
      </div>
      <div className="print-doc-section-bar">
        <span className="print-doc-section-label">
          {isEs ? 'Sección' : 'Section'}:
        </span>
        <span className="print-doc-section-name">{sectionTitle}</span>
      </div>
      <div className="print-doc-disclaimer">
        {isEs
          ? '⚠ Guía orientativa. Verifique requisitos actuales directamente con MEDUCA o su centro educativo.'
          : '⚠ Reference guide only. Verify current requirements directly with MEDUCA or your school.'}
      </div>
    </div>
  );
}
