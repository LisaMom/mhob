

const NAV_LINKS = [
  { label: 'ទំព័រដើម', href: '/' },
  { label: 'ម្ហូប',    href: '/src/pages/Product_Page/product.html' },
  { label: 'អំពីយើង', href: '/src/pages/About_Page/about.html' },
];

const LOGO = {
  icon: '<i class="bi bi-egg-fill"></i>',
  text: 'ម្ហូប',
  href: '/',
  img:  '/src/assets/logo.png',
};

function _isLoggedIn()  { return !!localStorage.getItem('mhob_token'); }
function _getUser()     { const u = localStorage.getItem('mhob_user'); return u ? JSON.parse(u) : null; }
function _logout()      { localStorage.removeItem('mhob_token'); localStorage.removeItem('mhob_user'); window.location.href = '/'; }

function _isActive(href) {
  const path = window.location.pathname;
  if (href === '/') return path === '/' || path === '/index.html';
  return path.includes(href.split('/').pop().replace('.html',''));
}

function _avatar(src, name, size = 32) {
  const initial = (name || '?').charAt(0).toUpperCase();
  const style = `width:${size}px;height:${size}px;border-radius:50%;border:2px solid var(--green-main);overflow:hidden;background:var(--green-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:${Math.round(size*.42)}px;font-weight:700;color:var(--green-main);`;
  return `<div style="${style}">
    ${src
      ? `<img src="${src}" alt="${name}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'">`
      : initial}
  </div>`;
}

function _authHTML() {
  if (_isLoggedIn()) {
    const user  = _getUser();
    const name  = user?.full_name?.split(' ')[0] || 'Profile';
    const email = user?.email || '';
    const avatar = user?.profile_image || '';

    return `
      <!-- Profile dropdown trigger -->
      <div class="nav-profile-wrap" id="profileWrap">
        <button class="nav-profile-btn" id="profileToggle" aria-label="Profile menu">
          ${_avatar(avatar, name, 30)}
          <span class="nav-profile-name">${name}</span>
          <i class="fa-solid fa-chevron-down nav-profile-chevron"></i>
        </button>

        <!-- Dropdown -->
        <div class="nav-dropdown" id="profileDropdown" aria-hidden="true">
          <div class="nav-dropdown-header">
            ${_avatar(avatar, name, 40)}
            <div>
              <div class="nav-dropdown-name">${user?.full_name || name}</div>
              <div class="nav-dropdown-email">${email}</div>
            </div>
          </div>
          <div class="nav-dropdown-divider"></div>
          <a href="/src/pages/Profile_Page/profile.html" class="nav-dropdown-item">
            <i class="fa-regular fa-user"></i> គណនីខ្ញុំ
          </a>
          <a href="/src/pages/Product_Page/product.html" class="nav-dropdown-item">
            <i class="fa-solid fa-utensils"></i> ម្ហូបរបស់ខ្ញុំ
          </a>
          <div class="nav-dropdown-divider"></div>
          <button onclick="_logout()" class="nav-dropdown-item nav-dropdown-logout">
            <i class="fa-solid fa-right-from-bracket"></i> ចេញពីគណនី
          </button>
        </div>
      </div>`;
  }

  /* Not logged in */
  return `
  
    <a href="/src/pages/Login_Page/register.html" class="nav-lang-btn"
      style="background:var(--green-medium);color:white;border-color:var(--green-main);">
      ចុះឈ្មោះ
    </a>`;
}

function _linksHTML(mobile = false) {
  return NAV_LINKS.map(l => `
    <a href="${l.href}" class="${mobile ? 'nav-mobile-link' : 'nav-text'} ${_isActive(l.href) ? 'active' : ''}">
      ${l.label}
    </a>`).join('');
}

const _css = `
  /* ── Win2K Navbar extras ── */

  /* Profile button — Win2K raised panel */
  .nav-profile-wrap  { position: relative; }
  .nav-profile-btn   {
    display: flex; align-items: center; gap: 4px;
    padding: 2px 8px 2px 3px; border-radius: 0;
    border: none;
    background: linear-gradient(180deg, #4080d0 0%, #1850b0 100%);
    cursor: pointer; transition: none;
    font-family: 'Tahoma', sans-serif;
    box-shadow: inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.3);
    min-height: 22px;
  }
  .nav-profile-btn:hover    {
    background: linear-gradient(180deg, #5090e0 0%, #2060c0 100%);
    outline: 1px dotted rgba(255,255,255,0.5); outline-offset: -2px;
  }
  .nav-profile-name         { font-size: 11px; font-weight: 700; color: white; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .nav-profile-chevron      { font-size: 9px; color: rgba(255,255,255,0.8); transition: none; }
  .nav-profile-btn.open .nav-profile-chevron { transform: none; }

  /* Dropdown — Win2K context menu style */
  .nav-dropdown {
    position: absolute; top: calc(100% + 2px); right: 0;
    background: #d4d0c8; border-radius: 0;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4),
      inset 1px 1px 0 #ffffff, inset -1px -1px 0 #404040,
      inset 2px 2px 0 #d4d0c8, inset -2px -2px 0 #808080;
    border: none;
    min-width: 180px; z-index: 9999; overflow: hidden;
    opacity: 0; pointer-events: none; transform: translateY(-2px);
    transition: opacity 0.08s, transform 0.08s;
  }
  .nav-dropdown.open { opacity: 1; pointer-events: all; transform: translateY(0); }

  .nav-dropdown-header {
    padding: 6px 10px; display: flex; align-items: center; gap: 8px;
    background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
    border-bottom: 1px solid #404040;
  }
  .nav-dropdown-name  { font-size: 11px; font-weight: 700; color: white; font-family: 'Tahoma', sans-serif; }
  .nav-dropdown-email { font-size: 10px; color: rgba(255,255,255,0.8); margin-top: 1px; font-family: 'Tahoma', sans-serif; }
  .nav-dropdown-divider { height: 1px; background: #808080; margin: 2px 0; box-shadow: 0 1px 0 #ffffff; }
  .nav-dropdown-item {
    display: flex; align-items: center; gap: 8px;
    padding: 4px 12px; font-size: 11px; color: #000000;
    text-decoration: none; transition: none;
    font-family: 'Tahoma', sans-serif; cursor: pointer;
    background: none; border: none; width: 100%; text-align: left;
  }
  .nav-dropdown-item i { width: 14px; color: #008080; }
  .nav-dropdown-item:hover { background: #000080; color: white; text-decoration: none; }
  .nav-dropdown-item:hover i { color: white; }
  .nav-dropdown-logout { color: #800000; }
  .nav-dropdown-logout i { color: #800000; }
  .nav-dropdown-logout:hover { background: #000080; color: white; }

  /* Search bar — Win2K address bar */
  .nav-search-bar {
    display: none;
    background: #d4d0c8;
    border-top: 1px solid #808080;
    border-bottom: 1px solid #ffffff;
    padding: 4px 8px;
  }
  .nav-search-bar.open { display: block; }
  .nav-search-inner {
    max-width: 600px; margin: 0 auto; display: flex; align-items: center; gap: 6px;
    background: white;
    box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #d4d0c8;
    padding: 2px 8px;
    border: none;
  }
  .nav-search-inner i { color: #808080; font-size: 11px; flex-shrink: 0; }
  .nav-search-inner input {
    flex: 1; border: none; background: transparent; outline: none;
    font-family: 'Tahoma', 'Suwannaphum', sans-serif; font-size: 11px; color: #000;
  }
  .nav-search-inner input::placeholder { color: #888; }
  .nav-search-close {
    background: #d4d0c8;
    border: none;
    box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #404040, inset 2px 2px 0 #d4d0c8, inset -2px -2px 0 #808080;
    cursor: pointer; color: #000; padding: 1px 6px;
    font-size: 10px; line-height: 1; flex-shrink: 0;
    font-family: 'Tahoma', sans-serif; min-height: 18px;
  }
  .nav-search-close:hover { outline: 1px dotted #000; outline-offset: -2px; }

  /* Mobile menu — Win2K Start menu style */
  .nav-mobile-menu {
    display: none; flex-direction: column;
    background: #d4d0c8;
    border: none;
    border-bottom: 2px solid #404040;
    box-shadow: inset -1px 0 0 #ffffff;
    padding: 4px 4px 8px;
  }
  .nav-mobile-menu.open { display: flex; }
  .nav-mobile-link {
    padding: 4px 10px; font-size: 12px; color: #000000;
    text-decoration: none; border-radius: 0;
    transition: none; font-family: 'Suwannaphum', 'Tahoma', sans-serif;
  }
  .nav-mobile-link:hover, .nav-mobile-link.active {
    background: #000080; color: white; text-decoration: none;
  }
  .nav-mobile-divider { height: 1px; background: #808080; margin: 4px 0; box-shadow: 0 1px 0 #ffffff; }
  .nav-mobile-auth { display: flex; flex-direction: column; gap: 4px; padding: 2px 0; }
  .nav-mobile-auth-btn {
    padding: 4px 10px; border-radius: 0;
    font-family: 'Tahoma', sans-serif; font-size: 11px; font-weight: 400;
    text-align: center; text-decoration: none; border: none; cursor: pointer; transition: none;
    background: #d4d0c8;
    box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #404040, inset 2px 2px 0 #d4d0c8, inset -2px -2px 0 #808080;
    min-height: 22px; color: #000;
  }
  .nav-mobile-auth-btn.outline { background: #d4d0c8; color: #000; }
  .nav-mobile-auth-btn.filled  { background: #000080; color: white; box-shadow: none; border: 1px solid #000040; }
  .nav-mobile-auth-btn:hover   { outline: 1px dotted #000; outline-offset: -2px; }
  /* Mobile profile row */
  .nav-mobile-profile {
    display: flex; align-items: center; gap: 8px;
    padding: 4px 8px; border-radius: 0;
    background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
    text-decoration: none;
  }
  .nav-mobile-profile-info { flex: 1; min-width: 0; }
  .nav-mobile-profile-name  { font-size: 11px; font-weight: 700; color: white; font-family: 'Tahoma', sans-serif; }
  .nav-mobile-profile-email { font-size: 10px; color: rgba(255,255,255,0.8); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Tahoma', sans-serif; }
  .nav-mobile-logout {
    background: #d4d0c8; border: none;
    box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #404040, inset 2px 2px 0 #d4d0c8, inset -2px -2px 0 #808080;
    padding: 4px 10px;
    font-family: 'Tahoma', sans-serif;
    font-size: 11px; color: #800000; cursor: pointer; text-align: center; transition: none;
    min-height: 22px;
  }
  .nav-mobile-logout:hover { outline: 1px dotted #800000; outline-offset: -2px; }

  /* Active nav-text link */
  .nav-text.active { background: rgba(0,0,128,0.5) !important; color: white !important; }

  /* Hamburger animation */
  .hamburger.open span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }

  /* Responsive — hide desktop links on mobile */
  @media (max-width: 768px) {
    .nav-links, .nav-actions { display: none !important; }
    .hamburger { display: flex !important; }
  }
  @media (min-width: 769px) {
    .nav-mobile-menu { display: none !important; }
    .hamburger       { display: none !important; }
  }
`;

const _html = `
  <style>${_css}</style>

  <nav class="navbar" id="navbar">
    <div class="nav-container">

      <!-- Win2K Start button + Logo -->
      <a href="${LOGO.href}" class="nav-logo" style="text-decoration:none;display:flex;align-items:center;gap:0;">
        <div style="background:linear-gradient(180deg,#4caf50 0%,#2e7d32 100%);color:white;font-family:'Tahoma',sans-serif;font-weight:900;font-size:12px;padding:2px 10px 2px 6px;display:flex;align-items:center;gap:5px;min-height:26px;box-shadow:inset 1px 1px 0 rgba(255,255,255,0.3),inset -1px -1px 0 rgba(0,0,0,0.3);letter-spacing:0.5px;border-right:1px solid #1b5e20;">
          <img src="${LOGO.img}" alt="${LOGO.text}" style="height:18px;object-fit:contain;" onerror="this.style.display='none'"/>
          <span style="font-style:italic;">ម្ហូប</span>
        </div>
      </a>

      <!-- Center links — uses .nav-links .nav-text from style.css -->
      <div class="nav-links">
        ${_linksHTML(false)}
      </div>

      <!-- Right actions — uses .nav-actions .nav-icon-btn .nav-lang-btn from style.css -->
      <div class="nav-actions">
        <button class="nav-icon-btn" id="searchToggle" title="ស្វែងរក" aria-label="Search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <button class="nav-icon-btn" id="themeToggle" title="Dark / Light" aria-label="Toggle theme">
          <i class="fa-regular fa-moon"></i>
        </button>
        ${_authHTML()}
      </div>

      <!-- Hamburger — uses .hamburger from style.css -->
      <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Inline search bar -->
    <div class="nav-search-bar" id="navSearchBar" role="search">
      <div class="nav-search-inner">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="navSearchInput" type="text" placeholder="ស្វែងរកម្ហូប ឬភោជនីយដ្ឋាន..."
          aria-label="Search food" onkeydown="if(event.key==='Enter')_navSearch()"/>
        <button class="nav-search-close" onclick="_toggleSearch()" aria-label="Close search">✕</button>
      </div>
    </div>

    <!-- Mobile menu (below navbar) -->
    <div class="nav-mobile-menu" id="mobileMenu" aria-hidden="true">
      ${_linksHTML(true)}

      <div class="nav-mobile-divider"></div>
      <button class="nav-mobile-auth-btn outline" id="themeToggleMobile">
        <i class="fa-regular fa-moon"></i>
      </button>

      <div class="nav-mobile-divider"></div>

      <div class="nav-mobile-auth" id="mobileAuth"></div>
    </div>
  </nav>
`;


const navRoot = document.getElementById('navbar-root');
if (navRoot) navRoot.innerHTML = _html;

/* ── Mobile auth area ── */
(function _buildMobileAuth() {
  const el = document.getElementById('mobileAuth');
  if (!el) return;
  if (_isLoggedIn()) {
    const user  = _getUser();
    const name  = user?.full_name?.split(' ')[0] || 'Profile';
    const avatar = user?.profile_image || '';
    el.innerHTML = `
      <a href="/src/pages/Profile_Page/profile.html" class="nav-mobile-profile" style="text-decoration:none;">
        ${_avatar(avatar, name, 40)}
        <div class="nav-mobile-profile-info">
          <div class="nav-mobile-profile-name">${user?.full_name || name}</div>
          <div class="nav-mobile-profile-email">${user?.email || ''}</div>
        </div>
        <i class="fa-solid fa-chevron-right" style="color:var(--text-light);font-size:1.125rem;"></i>
      </a>
      <button class="nav-mobile-logout" onclick="_logout()">
        <i class="fa-solid fa-right-from-bracket"></i> ចេញពីគណនី
      </button>`;
  } else {
    el.innerHTML = `
      <a href="/src/pages/Login_Page/register.html" class="nav-mobile-auth-btn filled">ចុះឈ្មោះ</a>`;
  }
})();


document.getElementById('hamburger')?.addEventListener('click', function() {
  const menu   = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');
  this.classList.toggle('open', isOpen);
  this.setAttribute('aria-expanded', isOpen);
  menu.setAttribute('aria-hidden', !isOpen);
});

document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.getElementById('hamburger');
  if (menu?.classList.contains('open') && !menu.contains(e.target) && !btn?.contains(e.target)) {
    menu.classList.remove('open');
    btn?.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
  }
});

/* Profile dropdown */
document.getElementById('profileToggle')?.addEventListener('click', function(e) {
  e.stopPropagation();
  const dd = document.getElementById('profileDropdown');
  if (!dd) return;
  const isOpen = dd.classList.toggle('open');
  this.classList.toggle('open', isOpen);
  dd.setAttribute('aria-hidden', !isOpen);
});
document.addEventListener('click', (e) => {
  const dd   = document.getElementById('profileDropdown');
  const btn  = document.getElementById('profileToggle');
  if (dd?.classList.contains('open') && !btn?.contains(e.target)) {
    dd.classList.remove('open');
    document.getElementById('profileToggle')?.classList.remove('open');
  }
});

/* Theme toggle */
const savedTheme = localStorage.getItem('mhob_theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
  const icon = themeToggleBtn.querySelector('i');
  if (icon) {
    icon.className = document.body.classList.contains('dark') ? 'fa-solid fa-sun' : 'fa-regular fa-moon';
  }
}

document.getElementById('themeToggle')?.addEventListener('click', function() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('mhob_theme', isDark ? 'dark' : 'light');
  
  const icon = this.querySelector('i');
  if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-regular fa-moon';
});

/* Search toggle */
function _toggleSearch() {
  const bar = document.getElementById('navSearchBar');
  const btn = document.getElementById('searchToggle');
  if (!bar) return;
  const open = bar.classList.toggle('open');
  if (btn)  btn.style.color = open ? 'var(--green-main)' : '';
  if (open) document.getElementById('navSearchInput')?.focus();
}
document.getElementById('searchToggle')?.addEventListener('click', _toggleSearch);

/* Search submit */
function _navSearch() {
  const q = document.getElementById('navSearchInput')?.value?.trim();
  if (q) window.location.href = `/src/pages/Product_Page/product.html?q=${encodeURIComponent(q)}`;
}

/* Scroll shadow — uses existing .navbar from style.css */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
}, { passive: true });


const themeToggleMobile = document.getElementById('themeToggleMobile');

if (themeToggleMobile) {
  const icon = themeToggleMobile.querySelector('i');
  if (icon) {
    icon.className = document.body.classList.contains('dark')
      ? 'fa-solid fa-sun'
      : 'fa-regular fa-moon';
  }

  themeToggleMobile.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('mhob_theme', isDark ? 'dark' : 'light');

    const icon = this.querySelector('i');
    if (icon) {
      icon.className = isDark ? 'fa-solid fa-sun' : 'fa-regular fa-moon';
    }
  });
}
