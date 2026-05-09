/* ============================================================
   ALTAVIA — reusable site chrome (nav + footer)
   web components, render synchronously to avoid FOUC.
   usage: <altavia-nav current="home"></altavia-nav>
          <altavia-footer></altavia-footer>
   ============================================================ */

/* import the logo asset so Vite resolves it to the hashed filename in
   production. plain '/assets/img/...' string literals are NOT rewritten
   by Vite, so the dev path 404s on the built site. */
import ASSET_ISOTIPO from '../img/logo-isotipo.png';

const NAV_LINKS = [
  { id: 'home',       label: 'Inicio',     href: '/index.html'        },
  { id: 'soluciones', label: 'Soluciones', href: '/soluciones.html'   },
  { id: 'proceso',    label: 'Proceso',    href: '/index.html#proceso' },
  { id: 'nosotros',   label: 'Nosotros',   href: '/nosotros.html'     },
  { id: 'referidos',  label: 'Referidos',  href: '/referidos.html'    },
];

/* ------------------------------------------------------------
   <altavia-nav current="home">
   ------------------------------------------------------------ */
class AltaviaNav extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';
    const links = NAV_LINKS.map(l => {
      const isCurrent = l.id === current;
      return `<li><a href="${l.href}"${isCurrent ? ' aria-current="page"' : ''}>${l.label}</a></li>`;
    }).join('');

    this.innerHTML = `
      <nav class="site-nav" aria-label="Principal">
        <a class="site-nav__brand" href="/index.html" aria-label="ALTAVIA energies — inicio">
          <img src="${ASSET_ISOTIPO}" alt="" width="32" height="32" />
          <span class="site-nav__brand-text">ALTAVIA</span>
        </a>
        <div class="site-nav__pillbox">
          <span class="site-nav__pill" aria-hidden="true"></span>
          <ul class="site-nav__links">${links}</ul>
        </div>
        <a class="site-nav__cta" href="/index.html#contacto">Diagnóstico sin costo</a>
        <button class="site-nav__burger" aria-label="Abrir menú" aria-expanded="false">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M0 1h16M0 6h16M0 11h10"/></svg>
        </button>
      </nav>
    `;

    const burger = this.querySelector('.site-nav__burger');
    const nav    = this.querySelector('.site-nav');
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });

    this.initMorphPill();
  }

  initMorphPill() {
    const pillbox = this.querySelector('.site-nav__pillbox');
    const pill    = this.querySelector('.site-nav__pill');
    const links   = Array.from(this.querySelectorAll('.site-nav__links a'));
    if (!pillbox || !pill || !links.length) return;

    const activeLink = this.querySelector('.site-nav__links a[aria-current="page"]') || links[0];
    let pillTarget = activeLink;

    // Move the pill to a given anchor (link element) — measured against pillbox
    // Vertical centering happens in CSS via top:50% + translateY(-50%); JS overrides
    // the transform here so we must compose both axes.
    const moveTo = (anchor, withTransition = true) => {
      if (!anchor) return;
      const boxRect = pillbox.getBoundingClientRect();
      const aRect   = anchor.getBoundingClientRect();
      pill.style.transition = withTransition ? '' : 'none';
      pill.style.transform  = `translate(${(aRect.left - boxRect.left).toFixed(2)}px, -50%)`;
      pill.style.width      = `${aRect.width.toFixed(2)}px`;

      // mark whichever link the pill is currently behind so its text turns white
      links.forEach(a => a.classList.toggle('is-pill-active', a === anchor));
      pillTarget = anchor;
    };

    // Place at active link (no animation on initial placement)
    requestAnimationFrame(() => {
      moveTo(activeLink, false);
      requestAnimationFrame(() => { pill.style.transition = ''; });
    });

    // Hover/focus: morph pill to hovered link
    links.forEach(a => {
      a.addEventListener('mouseenter', () => moveTo(a));
      a.addEventListener('focus',      () => moveTo(a));
    });

    // Leave the pillbox area → return to active link
    pillbox.addEventListener('mouseleave', () => moveTo(activeLink));

    // Resize keeps pill aligned to the current target
    window.addEventListener('resize', () => moveTo(pillTarget, false));
  }
}

/* ------------------------------------------------------------
   <altavia-footer>
   ------------------------------------------------------------ */
class AltaviaFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="wrap">
          <div class="site-footer__top">
            <div class="site-footer__brand">
              <a class="logo" href="/index.html">
                <img src="${ASSET_ISOTIPO}" alt="" width="48" height="48" />
                <span>ALTAVIA</span>
              </a>
              <h3>El motor que impulsa la transición energética inteligente.</h3>
              <div class="site-footer__contact">
                <div class="row"><span aria-hidden="true">↳</span><span>Av. Desierto de los Leones 5004, Tetelpan,<br/>Álvaro Obregón, 01700, CDMX, México</span></div>
                <div class="row"><span aria-hidden="true">@</span><a href="mailto:contacto@altaviaenergies.com">contacto@altaviaenergies.com</a></div>
                <div class="row"><span aria-hidden="true">☏</span><a href="tel:+525543544733">55 43 54 4733</a></div>
              </div>
            </div>

            <div>
              <h5>Navegación</h5>
              <ul>
                <li><a href="/index.html">Inicio</a></li>
                <li><a href="/soluciones.html">Soluciones</a></li>
                <li><a href="/index.html#proceso">Proceso</a></li>
                <li><a href="/nosotros.html">Nosotros</a></li>
                <li><a href="/referidos.html">Referidos</a></li>
              </ul>
            </div>

            <div>
              <h5>Legal</h5>
              <ul>
                <li><a href="/privacidad.html">Política de privacidad</a></li>
                <li><a href="/terminos.html">Términos y condiciones</a></li>
              </ul>
            </div>

            <div>
              <h5>Contacto</h5>
              <ul>
                <li><a href="mailto:contacto@altaviaenergies.com">Escríbenos</a></li>
                <li><a href="/index.html#contacto">Diagnóstico sin costo</a></li>
              </ul>
            </div>
          </div>

          <div class="site-footer__bottom">
            <div>© ${new Date().getFullYear()} ALTAVIA energies — todos los derechos reservados</div>
            <div class="site-footer__socials" aria-label="Redes sociales">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M14 7h3V4h-3a4 4 0 0 0-4 4v2H7v3h3v8h3v-8h3l1-3h-4V8a1 1 0 0 1 1-1z"/></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm5.2 12.6c-.2.6-1.2 1.2-1.7 1.3-.4.1-1 .1-1.6-.1-.4-.1-.8-.3-1.4-.5-2.5-1-4.1-3.6-4.2-3.7-.1-.1-1-1.4-1-2.6s.6-1.9.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.1-.3.3-.4.4-.1.1-.3.3-.1.5.2.3.7 1.2 1.6 1.9 1 .9 1.9 1.2 2.2 1.4.3.1.5.1.6 0 .2-.1.7-.8.9-1 .2-.3.4-.2.6-.1.2.1 1.4.7 1.7.8.2.1.4.2.5.3 0 .1 0 .5-.1 1.1z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('altavia-nav', AltaviaNav);
customElements.define('altavia-footer', AltaviaFooter);

/* ------------------------------------------------------------
   interactive guarantee orb — sphere follows cursor inside ring,
   light + hard angled shadow track the position
   ------------------------------------------------------------ */
function initOrb() {
  const orb = document.querySelector('[data-orb]');
  if (!orb) return;

  const TRAVEL = 180;         // max travel radius — orb roams outside its card
  const EASE   = 0.18;        // smoothing factor per frame
  let targetX = 0, targetY = 0;
  let currX = 0,   currY = 0;
  let raf = null;

  const tick = () => {
    currX += (targetX - currX) * EASE;
    currY += (targetY - currY) * EASE;
    orb.style.setProperty('--sx', currX.toFixed(2) + 'px');
    orb.style.setProperty('--sy', currY.toFixed(2) + 'px');
    if (Math.abs(targetX - currX) > 0.05 || Math.abs(targetY - currY) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  };
  const schedule = () => { if (raf == null) raf = requestAnimationFrame(tick); };

  const updateFrom = (clientX, clientY) => {
    const rect = orb.getBoundingClientRect();
    // anchor matches CSS: sphere sits at left:70%, top:50%
    const ax = rect.left + rect.width * 0.70;
    const ay = rect.top  + rect.height * 0.50;
    let dx = clientX - ax;
    let dy = clientY - ay;
    const r = Math.hypot(dx, dy);
    if (r > TRAVEL) {
      const k = TRAVEL / r;
      dx *= k; dy *= k;
    }
    targetX = dx;
    targetY = dy;
    schedule();
  };

  // track mouse globally so the orb keeps following even when the cursor
  // leaves the visual card
  document.addEventListener('mousemove', e => updateFrom(e.clientX, e.clientY));
  document.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; schedule(); });

  // touch — single-finger drag updates as user moves over the visual
  orb.addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (t) updateFrom(t.clientX, t.clientY);
  }, { passive: true });
  orb.addEventListener('touchend', () => { targetX = 0; targetY = 0; schedule(); });
}

/* ------------------------------------------------------------
   IntersectionObserver — toggles .in-view on each major section
   so reveal animations fire as the user scrolls.
   ------------------------------------------------------------ */
function initSectionReveals() {
  const sections = document.querySelectorAll('main > section');
  if (!sections.length || !('IntersectionObserver' in window)) {
    sections.forEach(s => s.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.12 });
  sections.forEach(s => io.observe(s));
}

/* ------------------------------------------------------------
   curtain orchestration — start hero reveal immediately, then
   lift the curtain once the last word has had time to animate.
   ------------------------------------------------------------ */
function initCurtain() {
  const hero = document.querySelector('main > section.hero');
  if (!hero) {
    if (typeof window.__lift === 'function') window.__lift();
    return;
  }

  // Tag phases: phase 1 reveals during the curtain (white),
  // phase 2 reveals after lights-on (color). Boundary = first period.
  const wordEls = hero.querySelectorAll('.h-display .word');
  let phase = '1';
  let phase2Start = wordEls.length;
  let lastPhase1 = null;
  wordEls.forEach((w, idx) => {
    w.dataset.phase = phase;
    if (phase === '1') lastPhase1 = w;
    if (phase === '1' && /[.!?]\s*$/.test(w.textContent)) {
      // this word ends phase 1
      if (idx + 1 < wordEls.length) {
        phase = '2';
        phase2Start = idx + 1;
      }
    }
  });
  if (lastPhase1) lastPhase1.classList.add('is-phase1-end');
  hero.style.setProperty('--phase2-start', phase2Start);

  // Phase 1 duration only — curtain lifts after these words finish + a held pause
  const stagger = 220, transitionMs = 700, holdMs = 2000, padding = 200;
  const phase1Words = phase2Start;        // count of phase-1 words
  const total = (phase1Words - 1) * stagger + transitionMs + holdMs + padding;

  // rAF dance — newly-split spans need a paint to compute initial styles
  // before transitions can fire (otherwise the browser skips the animation).
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hero.classList.add('in-view');
      setTimeout(() => {
        if (typeof window.__lift === 'function') window.__lift();
      }, total);
    });
  });
}

/* ------------------------------------------------------------
   text splitter — wraps each word in a span with a --i index
   so CSS can stagger word-by-word reveals on section enter.
   ------------------------------------------------------------ */
function splitWords(el) {
  if (!el || el.dataset.split === '1') return;
  const ctx = { wordIdx: 0, lastWord: null };
  const PUNCT = /^[.,;:!?…)\]"”»]+$/;

  const newWordSpan = (text) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.style.setProperty('--i', ctx.wordIdx++);
    if (typeof text === 'string') span.textContent = text;
    return span;
  };

  const walk = (node, parent) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const parts = text.split(/(\s+)/);
      for (const p of parts) {
        if (p === '') continue;
        if (/^\s+$/.test(p)) {
          parent.appendChild(document.createTextNode(p));
          continue;
        }
        // pure punctuation -> attach to previous word so it can't wrap alone
        if (PUNCT.test(p) && ctx.lastWord) {
          ctx.lastWord.appendChild(document.createTextNode(p));
          continue;
        }
        const span = newWordSpan(p);
        parent.appendChild(span);
        ctx.lastWord = span;
      }
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') {
        parent.appendChild(node.cloneNode(true));
        ctx.lastWord = null;
        return;
      }
      if (node.tagName === 'EM') {
        // iridescent emphasis becomes a single word unit — preserves gradient
        const span = newWordSpan();
        span.appendChild(node.cloneNode(true));
        parent.appendChild(span);
        ctx.lastWord = span;
        return;
      }
      // descend through generic wrappers
      const clone = node.cloneNode(false);
      parent.appendChild(clone);
      for (const c of Array.from(node.childNodes)) walk(c, clone);
      return;
    }
    parent.appendChild(node.cloneNode(true));
  };

  const out = document.createDocumentFragment();
  for (const c of Array.from(el.childNodes)) walk(c, out);
  el.innerHTML = '';
  el.appendChild(out);
  el.dataset.split = '1';
}

function initWordReveals() {
  const targets = document.querySelectorAll('.h-display, .h-section, .newsletter h3');
  targets.forEach(splitWords);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initWordReveals();      // split FIRST so observer sees the spans
    initCurtain();          // start hero reveal + schedule lift
    initOrb();
    initSectionReveals();
  });
} else {
  initWordReveals();
  initCurtain();
  initOrb();
  initSectionReveals();
}
