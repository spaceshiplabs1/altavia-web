/* ============================================================
   ALTAVIA — reusable site chrome (nav + footer)
   web components, render synchronously to avoid FOUC.
   usage: <altavia-nav current="home"></altavia-nav>
          <altavia-footer></altavia-footer>
   ============================================================ */

const NAV_LINKS = [
  { id: 'home',       label: 'Inicio',                href: '/index.html#top' },
  { id: 'soluciones', label: 'Soluciones',            href: '/index.html#soluciones' },
  { id: 'proceso',    label: 'Proceso',               href: '/index.html#proceso' },
  { id: 'nosotros',   label: 'Nosotros',              href: '/index.html#nosotros' },
];

const ASSET_LOGO   = '/assets/img/logo-isotipo.png';
const ASSET_POWERD = '/assets/img/powered-by-clockwork.png';

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
          <img src="${ASSET_LOGO}" alt="" width="28" height="28" />
          <span>ALTAVIA<small>energies</small></span>
        </a>
        <ul class="site-nav__links">${links}</ul>
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
                <img src="${ASSET_LOGO}" alt="" width="32" height="32" />
                <span>ALTAVIA energies</span>
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
                <li><a href="#top">Inicio</a></li>
                <li><a href="#soluciones">Soluciones</a></li>
                <li><a href="#proceso">Proceso</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
              </ul>
            </div>

            <div>
              <h5>Legal</h5>
              <ul>
                <li><a href="#privacidad">Política de privacidad</a></li>
                <li><a href="#terminos">Términos y condiciones</a></li>
              </ul>
            </div>

            <div>
              <h5>Contacto</h5>
              <ul>
                <li><a href="mailto:contacto@altaviaenergies.com">Escríbenos</a></li>
                <li><a href="#contacto">Diagnóstico sin costo</a></li>
              </ul>
            </div>
          </div>

          <div class="site-footer__bottom">
            <div>© ${new Date().getFullYear()} ALTAVIA energies — todos los derechos reservados</div>
            <div class="site-footer__powered">
              <img src="${ASSET_POWERD}" alt="Powered by Clockwork" />
            </div>
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
