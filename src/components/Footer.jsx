import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <div className="footer-brand">Guía de Reingreso Escolar</div>
          <div className="footer-sub">Panamá — © {new Date().getFullYear()}</div>
          <div className="footer-updated">{t('footer.updated')}</div>
        </div>
        <p className="footer-disclaimer">{t('footer.disclaimer')}</p>
      </div>
    </footer>
  );
}
