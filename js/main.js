/* ============================================================
   ALA Dates Atelier — Main Script
   ============================================================ */

'use strict';

/* ── Date Varieties Data ── */
const VARIETIES = [
  { name: 'Medjool',        note: 'Soft · Caramel',     thumb: 1 },
  { name: 'Ajwa',           note: 'Rich · Sacred',      thumb: 2 },
  { name: 'Mabroom',        note: 'Chewy · Elegant',    thumb: 3 },
  { name: 'Sagai',          note: 'Dual Texture',       thumb: 4 },
  { name: 'Safawi',         note: 'Deep Sweetness',     thumb: 5 },
  { name: 'Sukkari',        note: 'Honey Notes',        thumb: 1 },
  { name: 'Khudri',         note: 'Balanced Bite',      thumb: 2 },
  { name: 'Khalas',         note: 'Toffee Finish',      thumb: 3 },
  { name: 'Rabea',          note: 'Mild Sweet',         thumb: 4 },
  { name: 'Safri',          note: 'Firm · Dry',         thumb: 5 },
  { name: 'Anbara',         note: 'Large · Rare',       thumb: 1 },
  { name: 'Wanan',          note: 'Golden Soft',        thumb: 2 },
  { name: 'Deglet Noor',    note: 'Fine Texture',       thumb: 3 },
  { name: 'Zahidi',         note: 'Nutty Tone',         thumb: 4 },
  { name: 'Barhi',          note: 'Buttery Soft',       thumb: 5 },
  { name: 'Sagai Premium',  note: 'Crunch + Soft',      thumb: 1 },
  { name: 'Rutab',          note: 'Seasonal Fresh',     thumb: 2 },
  { name: 'Maktoum',        note: 'Dense Body',         thumb: 3 },
  { name: 'Mabroom Royal',  note: 'Long · Refined',     thumb: 4 },
  { name: 'Khenaizi',       note: 'Dark Finish',        thumb: 5 },
  { name: 'Lulu',           note: 'Silky Bite',         thumb: 1 },
  { name: 'Fard',           note: 'Semi-Dry',           thumb: 2 },
  { name: 'Amber',          note: 'Sweet Lux',          thumb: 3 },
  { name: 'Majdool Reserve',note: 'Gifting Grade',      thumb: 4 },
  { name: 'Seasonal Select',note: 'Limited Lot',        thumb: 5 },
];

/* ── Render Variety Grid ── */
(function renderVarieties() {
  const grid = document.getElementById('variety-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  VARIETIES.forEach(({ name, note, thumb }) => {
    const card = document.createElement('article');
    card.className = 'variety-card reveal';

    const img = document.createElement('img');
    img.className = 'variety-thumb';
    img.src = `assets/images/thumbs/thumb-${thumb}.jpg`;
    img.alt = `${name} dates`;
    img.width = 200;
    img.height = 200;
    img.loading = 'lazy';
    img.decoding = 'async';

    const pName = document.createElement('p');
    pName.className = 'variety-name';
    pName.textContent = name;

    const pNote = document.createElement('p');
    pNote.className = 'variety-note';
    pNote.textContent = note;

    card.append(img, pName, pNote);
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
})();

/* ── Mobile Navigation ── */
(function initNav() {
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  const close = () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
})();

/* ── Scroll Reveal ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();

/* ── Active Nav Link Highlighting ── */
/*
 * FIX: replaced IntersectionObserver approach with scroll-position logic.
 *
 * WHY THE OLD CODE BROKE:
 *  - threshold:0.45 means 45% of the section must be visible at once.
 *    Tall sections like #collection (25-card grid) almost never reach
 *    that threshold, so the observer callback never fires for them.
 *  - The early `if (!entry.isIntersecting) return` meant stale active
 *    states were never cleared when a section scrolled out of view.
 *
 * NEW APPROACH:
 *  - On every scroll (throttled via rAF), find whichever section's top
 *    edge is closest to — but still above — the middle of the viewport.
 *  - That section is "active". Works regardless of section height.
 */
(function initActiveNav() {
  const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  if (!links.length) return;

  // Build [link, section] pairs — skip any href that has no matching element
  const pairs = links
    .map(link => [link, document.getElementById(link.getAttribute('href').slice(1))])
    .filter(([, section]) => section);

  if (!pairs.length) return;

  function setActive(activeLink) {
    pairs.forEach(([link]) => {
      const on = link === activeLink;
      link.classList.toggle('is-active', on);
      if (on) link.setAttribute('aria-current', 'page');
      else     link.removeAttribute('aria-current');
    });
  }

  function update() {
    // The trigger line is 40% down the viewport
    const trigger = window.scrollY + window.innerHeight * 0.4;

    // Walk pairs in reverse; pick the last section whose top is above trigger
    let best = pairs[0];
    for (const pair of pairs) {
      const [, section] = pair;
      if (section.offsetTop <= trigger) best = pair;
    }
    setActive(best[0]);
  }

  // Throttle with requestAnimationFrame so it stays smooth
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });

  // Run once on load
  update();
})();

/* ── Copyright Year ── */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();