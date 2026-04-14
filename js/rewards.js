/**
 * rewards.js — Latidos Niños
 * Displays badges, progress, and encouragement
 */

(function () {
  App.initPage('rewards');

  /* ─── All Possible Badges ───────────────────────────────── */
  const ALL_BADGES = [
    { id: 'words_master',   icon: '📖', name: 'Word Master!',      desc: 'Score 8+ correct in Words Quiz'   },
    { id: 'phrases_star',   icon: '💬', name: 'Phrase Star!',      desc: 'Score 5+ correct in Phrases Quiz' },
    { id: 'alpha_master',   icon: '🔤', name: 'Alphabet Expert!',  desc: 'Score 8+ correct in Alphabet Quiz'},
    { id: 'first_star',     icon: '⭐', name: 'First Star!',       desc: 'Earn your first star'             },
    { id: 'three_stars',    icon: '🌠', name: 'Triple Star!',      desc: 'Get 3 stars in one game'          },
    { id: 'heart_collector',icon: '💖', name: 'Heart Collector',   desc: 'Collect 50 hearts'                },
    { id: 'level_2',        icon: '🚀', name: 'Level 2!',          desc: 'Reach level 2'                    },
    { id: 'level_5',        icon: '🦅', name: 'Level 5!',          desc: 'Reach level 5'                    },
  ];

  /* ─── Module Progress Config ────────────────────────────── */
  const MODULES = [
    { key: 'words',    icon: '📖', label: 'Words'    },
    { key: 'phrases',  icon: '💬', label: 'Phrases'  },
    { key: 'alphabet', icon: '🔤', label: 'Alphabet' },
  ];

  /* ─── Auto-award badges based on state ─────────────────── */
  function autoAwardBadges(s) {
    const totalStars = Object.values(s.stars).reduce((a, b) => a + b, 0);
    if (totalStars >= 1)           App.addBadge('first_star');
    if (Object.values(s.stars).some(v => v >= 3)) App.addBadge('three_stars');
    if (s.hearts >= 50)            App.addBadge('heart_collector');
    if (s.level >= 2)              App.addBadge('level_2');
    if (s.level >= 5)              App.addBadge('level_5');
  }

  /* ─── Encouragement messages ─────────────────────────────── */
  const ENCOURAGEMENTS = [
    '¡Every word you learn opens a new world! 🌍',
    '¡Keep practicing! English superstars are made, not born! 🌟',
    '¡You are amazing! Keep playing and learning! ⭐',
    '¡Mistakes help you grow! Keep going! 🚀',
    'English is your superpower! 🦸',
  ];

  /* ─── RENDER ─────────────────────────────────────────────── */
  function render() {
    const s = App.getState();
    autoAwardBadges(s);

    // Trophy banner
    document.getElementById('trophy-char').textContent    = App.getChar();
    document.getElementById('trophy-name').textContent    = `¡Hola, ${s.playerName}!`;
    document.getElementById('trophy-sub').textContent     = s.badges.length > 0
      ? `¡Has conseguido ${s.badges.length} medalla${s.badges.length > 1 ? 's' : ''}!`
      : '¡Empieza a jugar para ganar medallas!';
    document.getElementById('trophy-level').textContent   = `⭐ Nivel ${s.level}`;
    document.getElementById('trophy-hearts').textContent  = `${s.hearts} 💖 corazones`;

    // Quick stats
    const totalStars = Object.values(s.stars).reduce((a, b) => a + b, 0);
    document.getElementById('sw-hearts').textContent = s.hearts;
    document.getElementById('sw-stars').textContent  = totalStars;
    document.getElementById('sw-badges').textContent = s.badges.length;

    // Module progress
    const mpEl = document.getElementById('module-progress');
    mpEl.innerHTML = '';
    MODULES.forEach(m => {
      const stars = s.stars[m.key] || 0;
      const row   = document.createElement('div');
      row.className = 'mp-row';
      row.innerHTML = `
        <span class="mp-icon">${m.icon}</span>
        <span class="mp-name">${m.label}</span>
        <div class="mp-stars">
          ${[0,1,2].map(i => `<span class="star${i < stars ? ' filled' : ''}">⭐</span>`).join('')}
        </div>
        <div class="mp-bar-wrap">
          <div class="progress-wrap"><div class="progress-bar" style="width:${(stars/3)*100}%"></div></div>
        </div>`;
      mpEl.appendChild(row);
    });

    // Badges
    const bgEl = document.getElementById('badge-grid');
    bgEl.innerHTML = '';
    ALL_BADGES.forEach(badge => {
      const earned = s.badges.includes(badge.id);
      const el = document.createElement('div');
      el.className = 'badge-item' + (earned ? '' : ' locked');
      el.innerHTML = `
        <span class="badge-icon">${badge.icon}</span>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.desc}</div>`;
      if (earned) {
        el.title = '¡Conseguida!';
        el.style.border = '2px solid var(--yellow)';
      }
      bgEl.appendChild(el);
    });

    // Encouragement
    const day = new Date().getDay();
    document.getElementById('encourage-msg').textContent = ENCOURAGEMENTS[day % ENCOURAGEMENTS.length];
  }

  render();

  // Celebrate if recent achievement
  const s = App.getState();
  if (s.hearts > 0) {
    setTimeout(() => App.launchConfetti(30), 400);
  }
})();
