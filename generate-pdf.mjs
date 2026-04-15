/**
 * generate-pdf.mjs
 * Puppeteer — Spanish PDF export for every section.
 *
 * Output (PDF Spanish/):
 *   01a_Verificacion_NuevaMatricula_ES.pdf
 *   01b_Verificacion_Reingreso_ES.pdf
 *   01c_Verificacion_Refugiado_ES.pdf
 *   02_Tramites_ES.pdf
 *   03_Salud_ES.pdf
 *   04_Emocional_ES.pdf
 *   05_Academico_ES.pdf
 *   06_Refugiados_ES.pdf
 *   07_Directorio_ES.pdf
 *   08_Preguntas_ES.pdf
 *   09_Documentos_ES.pdf
 *
 * Usage:
 *   node generate-pdf.mjs          → all
 *   node generate-pdf.mjs 01       → checklist (all 3 situations)
 *   node generate-pdf.mjs 02 05    → sections 2 and 5
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'PDF Spanish');
const BASE_URL   = 'http://localhost:5173';

/* ── PDF page settings ────────────────────────────────────────────── */
const PDF_OPTS = {
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: false,
  margin: { top: '14mm', right: '20mm', bottom: '14mm', left: '20mm' },
};

/* ── Section definitions ──────────────────────────────────────────── */
const REGULAR_SECTIONS = [
  { num: '02', name: 'Tramites',    url: '/admin'      },
  { num: '03', name: 'Salud',       url: '/health'     },
  { num: '04', name: 'Emocional',   url: '/emotional'  },
  { num: '05', name: 'Academico',   url: '/academic'   },
  { num: '06', name: 'Refugiados',  url: '/refugee'    },
  { num: '07', name: 'Directorio',  url: '/resources'  },
  { num: '08', name: 'Preguntas',   url: '/faq'        },
  { num: '09', name: 'Documentos',  url: '/docs'       },
];

/* Checklists — three situations */
const CHECKLIST_SITUATIONS = [
  { suffix: 'a', key: 'newEnrollment', label: 'NuevaMatricula' },
  { suffix: 'b', key: 'reingreso',     label: 'Reingreso'      },
  { suffix: 'c', key: 'refugee',       label: 'Refugiado'      },
];

/* ── Helpers ──────────────────────────────────────────────────────── */

/** Set Spanish in localStorage and navigate to URL */
async function goSpanish(page, url) {
  // Set language via root page first
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle2', timeout: 30_000 });
  await page.evaluate(() => localStorage.setItem('i18nextLng', 'es'));
  await page.goto(BASE_URL + url, { waitUntil: 'networkidle2', timeout: 30_000 });
  await new Promise(r => setTimeout(r, 1200));
}

/** Force all accordion panels open so they appear in PDF */
async function expandAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.faq-answer').forEach(el => { el.style.display = 'block'; });
    document.querySelectorAll('.check-panel').forEach(el => { el.style.display = 'block'; });
  });
  await new Promise(r => setTimeout(r, 300));
}

/** Save PDF */
async function savePDF(page, fileName) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  await page.pdf({ path: filePath, ...PDF_OPTS });
  console.log(`    ✓ ${fileName}`);
  return fileName;
}

/* ── Section generators ───────────────────────────────────────────── */

async function generateChecklist(page) {
  const results = [];
  for (const sit of CHECKLIST_SITUATIONS) {
    const fileName = `01${sit.suffix}_Verificacion_${sit.label}_ES.pdf`;
    console.log(`\n→ [01${sit.suffix}] Verificación — ${sit.label}`);

    // Use URL param to pre-select the situation — reliable, no button click needed
    await goSpanish(page, `/checklist?situation=${sit.key}`);
    await expandAll(page);

    results.push({ ok: true, file: await savePDF(page, fileName) });
  }
  return results;
}

async function generateRegular(page, section) {
  const fileName = `${section.num}_${section.name}_ES.pdf`;
  console.log(`\n→ [${section.num}] ${section.name}`);
  await goSpanish(page, section.url);
  await expandAll(page);
  return { ok: true, file: await savePDF(page, fileName) };
}

/* ── CLI argument filtering ───────────────────────────────────────── */
const requested = process.argv.slice(2);      // e.g. ['01', '02']
const wantAll   = requested.length === 0;
const want01    = wantAll || requested.includes('01');
const wantNums  = new Set(requested);

const regularToRun = wantAll
  ? REGULAR_SECTIONS
  : REGULAR_SECTIONS.filter(s => wantNums.has(s.num));

/* ── Main ─────────────────────────────────────────────────────────── */
(async () => {
  console.log('=== Latidos — PDF Generator (Español) ===');
  console.log(`Output: ${OUTPUT_DIR}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'es-PA,es;q=0.9' });

  const all = [];

  /* 01 — Checklist (3 situations) */
  if (want01) {
    const res = await generateChecklist(page);
    all.push(...res);
  }

  /* 02-09 */
  for (const section of regularToRun) {
    try {
      const res = await generateRegular(page, section);
      all.push(res);
    } catch (err) {
      console.error(`    ✗ ERROR: ${err.message}`);
      all.push({ ok: false, file: section.num, error: err.message });
    }
  }

  await browser.close();

  /* Summary */
  console.log('\n=== Resumen ===');
  all.forEach(r => {
    const icon = r.ok ? '✓' : '✗';
    const msg  = r.ok ? r.file : `${r.file} — ${r.error}`;
    console.log(`  ${icon} ${msg}`);
  });
  console.log(`\nTotal: ${all.filter(r => r.ok).length} PDF generados.`);
})();
