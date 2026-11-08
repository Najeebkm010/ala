/* ============================================================
   ALA Dates Atelier — Main Script
   ============================================================ */

'use strict';

/* ── Date Varieties Data ── */
const WHATSAPP_NUMBER = '971562561401';
const CONTACT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBG42wa4QFuD8ID6jLHgcFvk_oNcZ7fxtW6ejPJCygPWalH62frkdY7PB122Gp57xdDw/exec';

// Add each WhatsApp Business product/category link here when available.
// Blank values use the general chat and prefill a message for that variety.
const WHATSAPP_CATEGORY_LINKS = {
  Medjool: '', Ajwa: '', Mabroom: '', Sagai: '', Safawi: '', Sukkari: '',
  Khudri: '', Khalas: '', Rabea: '', Safri: '', Anbara: '', Wanan: '',
  'Deglet Noor': '', Zahidi: '', Barhi: '', 'Sagai Premium': '', Rutab: '',
  Maktoum: '', 'Mabroom Royal': '', Khenaizi: '', Lulu: '', Fard: '',
  Amber: '', 'Majdool Reserve': '', 'Seasonal Select': ''
};

const VARIETIES = [
  {
    name: 'Medjool',
    note: 'Soft caramel',
    image: 'Medjool.jpg'
  },
  {
    name: 'Ajwa',
    note: 'Rich and mellow',
    image: 'Ajwa.jpg'
  },
  {
    name: 'Mabroom',
    note: 'Chewy and elegant',
    image: 'Mabroom.jpg'
  },
  {
    name: 'Sagai',
    note: 'Two lovely textures',
    image: 'Sagai.jpg'
  },
  {
    name: 'Safawi',
    note: 'Soft caramel',
    image: 'Safawi.jpg'
  },
  {
    name: 'Sukkari',
    note: 'Rich and mellow',
    image: 'Sukkari.png'
  },
  {
    name: 'Kudhari',
    note: 'Chewy and elegant',
    image: 'Khudari.png'
  },
  {
    name: 'Khalas',
    note: 'Two lovely textures',
    image: 'khalas.png'
  },
  { 
    name: 'Rabia', 
    note: 'Light and sweet', 
    image: 'Rabia.png'
  },
  { 
    name: 'Safri', 
    note: 'Firm and delicate', 
    image: 'Safari.png' 
  },
  { 
    name: 'Amber', 
    note: 'Large and luxurious', 
    image: 'Ambar.jpg' 
  },
  { 
    name: 'Sukkari Rutab', 
    note: 'Soft golden sweetness', 
    image: 'Sukkari Rutab.png' 
  },
  { 
    name: 'Mashrook', 
    note: 'Delicate texture', 
    image: 'Mashrook.png' },
  { 
    name: 'Zahedi',
    note: 'Delicately nutty', 
    image: 'Zahedi.jpg' 
  },
  { 
    name: 'Barni', 
    note: 'Soft and buttery', 
    image: 'Barni.png' 
  },
  { 
    name: 'Saudi Majdool', 
    note: 'A crisp-soft contrast', 
    image: 'Saudi Majdool.png' 
  },
  { 
    name: 'Siri', 
    note: 'Rich and satisfying', 
    image: 'Siri.png' },
  { 
    name: 'Lulu', 
    note: 'Silky and delicate', 
    image: 'Lulu.png' 
  },
  {
    name: 'Fard', 
    note: 'Naturally semi-dry', 
    image: 'Fard.png' 
  },
  { 
    name: 'Kimia', 
    note: 'A seasonal favourite', 
    image: 'Kimia.png' 
  },
];

/* ── Render Variety Grid ── */
(function renderVarieties() {
  const grid = document.getElementById('variety-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  VARIETIES.forEach(({ name, note, image }) => {
    const card = document.createElement('article');
    card.className = 'variety-card reveal';

    const img = document.createElement('img');
    img.className = 'variety-thumb';
    img.src = `assets/images/thumbs/${image}`;
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

    const details = document.createElement('div');
    details.className = 'variety-details';
    details.appendChild(pNote);

    const orderLink = document.createElement('a');
    orderLink.className = 'variety-order';
    orderLink.target = '_blank';
    orderLink.rel = 'noopener noreferrer';
    orderLink.setAttribute('aria-label', `Order ${name} on WhatsApp`);
    orderLink.href = WHATSAPP_CATEGORY_LINKS[name] || `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I would like to order ${name} dates.`)}`;
    orderLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.1 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5H7.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"/></svg><span>Order on WhatsApp</span>';
    details.appendChild(orderLink);

    card.append(img, pName, details);
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);

  let activeCard = null;
  const setActiveCard = card => {
    if (activeCard === card) return;
    if (activeCard) activeCard.classList.remove('is-highlighted');
    activeCard = card;
    if (activeCard) activeCard.classList.add('is-highlighted');
  };

  grid.addEventListener('pointerover', event => {
    const card = event.target.closest('.variety-card');
    if (card && grid.contains(card)) setActiveCard(card);
  });
  grid.addEventListener('pointerleave', () => setActiveCard(null));
  grid.addEventListener('focusin', event => {
    const card = event.target.closest('.variety-card');
    if (card && grid.contains(card)) setActiveCard(card);
  });
  grid.addEventListener('focusout', event => {
    const nextCard = event.relatedTarget && event.relatedTarget.closest
      ? event.relatedTarget.closest('.variety-card')
      : null;
    if (!nextCard || !grid.contains(nextCard)) setActiveCard(null);
  });
})();

/* ── Enquiry Form ── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const message = form.querySelector('.form-message');
    message.classList.remove('show', 'error');

    if (!CONTACT_SCRIPT_URL) {
      message.textContent = 'The enquiry form is ready. Connect your Google Apps Script web app URL in js/main.js to start receiving enquiries.';
      message.classList.add('show', 'error');
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => body.append(key, value));

    try {
      // Google Apps Script does not expose a browser-readable CORS response.
      // The script URL and form fields are sent; a resolved request means it was accepted for processing.
      await fetch(CONTACT_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body });
      form.reset();
      message.textContent = 'Thank you. Your enquiry has been sent, and our team will be in touch soon.';
      message.classList.add('show');
    } catch (error) {
      message.textContent = 'We could not send your enquiry. Please try WhatsApp or email info@aladatesme.com.';
      message.classList.add('show', 'error');
    } finally {
      button.disabled = false;
      button.innerHTML = 'Send Enquiry <span aria-hidden="true">→</span>';
    }
  });
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
 *    Tall sections like #collection almost never reach
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
      else link.removeAttribute('aria-current');
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
