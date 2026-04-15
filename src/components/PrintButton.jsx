import { useTranslation } from 'react-i18next';

export default function PrintButton({ sectionKey }) {
  const { t, i18n } = useTranslation();
  const handlePrint = () => window.print();
  const isEs = i18n.language === 'es';
  return (
    <div>
      <button className="print-btn" onClick={handlePrint}>
        ↓ {t(`${sectionKey}.printBtn`)}
      </button>
      <p className="print-tip">
        {isEs
          ? 'En el cuadro de impresión: destino → "Guardar como PDF" · desmarque "Encabezados y pies de página".'
          : 'In the print dialog: destination → "Save as PDF" · uncheck "Headers and footers".'}
      </p>
    </div>
  );
}
