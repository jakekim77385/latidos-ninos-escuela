import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import PrintButton from '../components/PrintButton';
import PrintHeader from '../components/PrintHeader';

const SITUATIONS = ['newEnrollment', 'reingreso', 'refugee'];

const STORAGE_KEY = 'checklist_state';

export default function ChecklistPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const defaultSituation = SITUATIONS.includes(searchParams.get('situation'))
    ? searchParams.get('situation')
    : 'newEnrollment';
  const [selected, setSelected] = useState(defaultSituation);
  const [checked, setChecked]   = useState({});
  const [expanded, setExpanded] = useState(null);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch (_) {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch (_) {}
  }, [checked]);

  const items = t(`checklist.items.${selected}`, { returnObjects: true });
  const doneCount = items.filter(item => checked[`${selected}-${item.id}`]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;
  const allDone = doneCount === items.length;

  const toggleCheck = (e, id) => {
    e.stopPropagation();
    const key = `${selected}-${id}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleExpand = (id) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  const handleSituationChange = (s) => {
    setSelected(s);
    setExpanded(null);
  };

  const resetChecklist = () => {
    const next = { ...checked };
    items.forEach(item => { delete next[`${selected}-${item.id}`]; });
    setChecked(next);
    setExpanded(null);
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">01 — {t('nav.checklist')}</p>
          <h1>{t('checklist.title')}</h1>
          <p>{t('checklist.subtitle')}</p>
        </div>
      </div>

      <div className="container content-section">
        <PrintHeader sectionNum="01" sectionTitle={t('nav.checklist')} />
        <PrintButton sectionKey="checklist" />
        <div className="last-updated-stamp">{t('footer.updated')}</div>

        {/* Print-only: show selected situation name */}
        <div className="print-situation-label">
          <span className="print-situation-tag">01</span>
          {t(`checklist.situations.${selected}`)}
        </div>

        <div className="card">
          <p className="card-label">{t('checklist.selectSituation')}</p>
          <div className="checklist-selector">
            {SITUATIONS.map(s => (
              <button
                key={s}
                className={`situation-btn${selected === s ? ' active' : ''}`}
                onClick={() => handleSituationChange(s)}
              >
                {t(`checklist.situations.${s}`)}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="progress-label">
            {t('checklist.progress')}: {doneCount}/{items.length} — {pct}% {t('checklist.completed')}
          </p>

          {/* Items */}
          {items.map(item => {
            const key     = `${selected}-${item.id}`;
            const done    = !!checked[key];
            const open    = expanded === item.id;
            return (
              <div key={item.id} className={`check-item-wrap${done ? ' done' : ''}${open ? ' open' : ''}`}>

                {/* Main row */}
                <div className="check-item-row" onClick={() => toggleExpand(item.id)}>
                  {/* Checkbox — separate click target */}
                  <div
                    className={`check-box${done ? ' checked' : ''}`}
                    onClick={(e) => toggleCheck(e, item.id)}
                    title={done ? 'Marcar como pendiente' : 'Marcar como completado'}
                  >
                    {done ? '✓' : ''}
                  </div>

                  <span className={`check-text${done ? ' done-text' : ''}`}>{item.text}</span>

                  <span className="check-expand-icon">{open ? '−' : '+'}</span>
                </div>

                {/* Detail panel — always in DOM; screen hides unless open, print always shows */}
                <div className="check-panel">
                  <p className="check-panel-detail">{item.detail}</p>
                  <div className="check-panel-meta">
                    <span className="check-panel-where-label">{t('checklist.detailWhere')}:</span>
                    <span className="check-panel-where">{item.where}</span>
                  </div>
                  {item.link && (
                    <Link to={item.link} className="check-panel-link">
                      {t('checklist.detailMore')} →
                    </Link>
                  )}
                  <button
                    className={`check-panel-btn${done ? ' btn-undo' : ''}`}
                    onClick={(e) => toggleCheck(e, item.id)}
                  >
                    {done ? '↩ Marcar como pendiente' : '✓ Marcar como completado'}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Completion banner */}
          {allDone && (
            <div className="checklist-complete">
              <div className="checklist-complete-title">{t('checklist.readyTitle')}</div>
              <p className="checklist-complete-desc">{t('checklist.readyDesc')}</p>
              <div className="checklist-complete-actions">
                <PrintButton sectionKey="checklist" />
                <button className="reset-btn" onClick={resetChecklist}>
                  {t('checklist.resetBtn')}
                </button>
              </div>
            </div>
          )}

          {/* Reset link (always visible at bottom) */}
          {!allDone && doneCount > 0 && (
            <button className="reset-link" onClick={resetChecklist}>
              {t('checklist.resetBtn')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
