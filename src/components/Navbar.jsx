import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAV_ITEMS = [
  { key: 'home',      path: '/' },
  { key: 'checklist', path: '/checklist' },
  { key: 'admin',     path: '/admin' },
  { key: 'health',    path: '/health' },
  { key: 'emotional', path: '/emotional' },
  { key: 'academic',  path: '/academic' },
  { key: 'refugee',   path: '/refugee' },
  { key: 'resources', path: '/resources' },
  { key: 'faq',       path: '/faq' },
  { key: 'docs',      path: '/docs' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">

        {/* ─ Top row: brand + lang ─ */}
        <div className="navbar-top">
          <NavLink to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">GE</span>
            <span className="brand-text">Guía Escolar</span>
            <span className="brand-sep">/</span>
            <span className="brand-sub">Panamá</span>
          </NavLink>

          <div className="navbar-right">
            <div className="lang-toggle">
              <button
                className={`lang-btn${i18n.language === 'es' ? ' active' : ''}`}
                onClick={() => i18n.changeLanguage('es')}
              >ES</button>
              <button
                className={`lang-btn${i18n.language === 'en' ? ' active' : ''}`}
                onClick={() => i18n.changeLanguage('en')}
              >EN</button>
            </div>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
            >{menuOpen ? '✕' : '☰'}</button>
          </div>
        </div>

        {/* ─ Bottom row: nav links ─ */}
        <div className={`navbar-bottom${menuOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </div>

      </div>
    </nav>
  );
}
