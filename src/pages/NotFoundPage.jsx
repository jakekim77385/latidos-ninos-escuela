import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  return (
    <div className="page-wrapper">
      <div className="container content-section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>404</p>
        <h1 style={{ marginBottom: '1rem' }}>
          {isEs ? 'Página no encontrada' : 'Page not found'}
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray-50)', marginBottom: '2rem', lineHeight: 1.6 }}>
          {isEs
            ? 'La página que busca no existe. Puede haber sido movida o la dirección es incorrecta.'
            : 'The page you are looking for does not exist. It may have been moved or the address is incorrect.'}
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1.1rem',
            border: '1px solid var(--black)',
            fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--black)', textDecoration: 'none',
            transition: 'background 0.12s, color 0.12s',
          }}
          onMouseOver={e => { e.currentTarget.style.background = 'var(--black)'; e.currentTarget.style.color = 'var(--white)'; }}
          onMouseOut={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--black)'; }}
        >
          ← {isEs ? 'Volver al inicio' : 'Back to home'}
        </Link>
      </div>
    </div>
  );
}
