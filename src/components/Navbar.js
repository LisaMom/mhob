

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
  /* ── Navbar extras — only things NOT in style.css ── */

  /* Profile button */
  .nav-profile-wrap  { position: relative; }
  .nav-profile-btn   {
    display: flex; align-items: center; gap: 6px;
    padding: 4px 10px 4px 4px; border-radius: 50px;
    border: 1.5px solid #e8e8e8; background: white; cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'Suwannaphum', serif;
  }
  .nav-profile-btn:hover    { border-color: var(--green-main); box-shadow: 0 2px 12px rgba(61,122,53,0.15); }
  .nav-profile-name         { font-size: 1.125rem; font-weight: 600; color: var(--text-dark); max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .nav-profile-chevron      { font-size: 1.125rem; color: var(--text-light); transition: transform 0.22s; }
  .nav-profile-btn.open .nav-profile-chevron { transform: rotate(180deg); }

  /* Dropdown */
  .nav-dropdown {
    position: absolute; top: calc(100% + 8px); right: 0;
    background: white; border-radius: 14px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.13); border: 1px solid #f0f0f0;
    min-width: 190px; z-index: 9999; overflow: hidden;
    opacity: 0; pointer-events: none; transform: translateY(-6px);
    transition: opacity 0.18s, transform 0.18s;
  }
  .nav-dropdown.open { opacity: 1; pointer-events: all; transform: translateY(0); }

  .nav-dropdown-header {
    padding: 12px 16px; display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid #f5f5f5;
  }
  .nav-dropdown-name  { font-size: 1.125rem; font-weight: 700; color: var(--text-dark); }
  .nav-dropdown-email { font-size: 1.125rem; color: var(--text-light); margin-top: 1px; }
  .nav-dropdown-divider { height: 1px; background: #f5f5f5; margin: 3px 0; }
  .nav-dropdown-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 16px; font-size: 1.25rem; color: var(--text-dark);
    text-decoration: none; transition: background 0.15s;
    font-family: 'Suwannaphum', serif; cursor: pointer;
    background: none; border: none; width: 100%; text-align: left;
  }
  .nav-dropdown-item i { width: 14px; color: var(--green-main); }
  .nav-dropdown-item:hover { background: #f5faf4; }
  .nav-dropdown-logout { color: #ef4444; }
  .nav-dropdown-logout i { color: #ef4444; }
  .nav-dropdown-logout:hover { background: #fff5f5; }

  /* Search bar */
  .nav-search-bar {
    display: none; background: white; border-top: 1px solid #f0f0f0; padding: 10px 24px;
  }
  .nav-search-bar.open { display: block; }
  .nav-search-inner {
    max-width: 600px; margin: 0 auto; display: flex; align-items: center; gap: 10px;
    background: #f5f5f5; border-radius: 50px; padding: 8px 16px;
  }
  .nav-search-inner i { color: #aaa; font-size: 1.25rem; flex-shrink: 0; }
  .nav-search-inner input {
    flex: 1; border: none; background: transparent; outline: none;
    font-family: 'Suwannaphum', serif; font-size: 1.25rem; color: var(--text-dark);
  }
  .nav-search-inner input::placeholder { color: #bbb; }
  .nav-search-close {
    background: none; border: none; cursor: pointer; color: #aaa; padding: 0;
    font-size: 1.25rem; line-height: 1; flex-shrink: 0;
  }
  .nav-search-close:hover { color: var(--green-main); }

  /* Mobile menu */
  .nav-mobile-menu {
    display: none; flex-direction: column;
    background: white; border-top: 1px solid #f0f0f0; padding: 12px 16px 20px;
  }
  .nav-mobile-menu.open { display: flex; }
  .nav-mobile-link {
    padding: 11px 12px; font-size: 1.25rem; color: var(--text-dark);
    text-decoration: none; border-radius: var(--radius-sm);
    transition: background 0.15s; font-family: 'Suwannaphum', serif;
  }
  .nav-mobile-link:hover, .nav-mobile-link.active {
    background: var(--green-light); color: var(--green-main); font-weight: 700;
  }
  .nav-mobile-divider { height: 1px; background: #f0f0f0; margin: 8px 0; }
  .nav-mobile-auth { display: flex; flex-direction: column; gap: 8px; padding: 4px 0; }
  .nav-mobile-auth-btn {
    padding: 10px 14px; border-radius: var(--radius-sm);
    font-family: 'Suwannaphum', serif; font-size: 1.125rem; font-weight: 600;
    text-align: center; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s;
  }
  .nav-mobile-auth-btn.outline { border: 1.5px solid var(--green-main); color: var(--green-main); background: white; }
  .nav-mobile-auth-btn.filled  { background: var(--green-main); color: white; border: 1.5px solid var(--green-main); }
  .nav-mobile-auth-btn:hover   { opacity: 0.85; }
  /* Mobile profile row */
  .nav-mobile-profile {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: var(--radius-sm); background: var(--green-light);
  }
  .nav-mobile-profile-info { flex: 1; min-width: 0; }
  .nav-mobile-profile-name  { font-size: 1.125rem; font-weight: 700; color: var(--text-dark); }
  .nav-mobile-profile-email { font-size: 1.125rem; color: var(--text-light); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nav-mobile-logout {
    background: none; border: 1.5px solid #f0f0f0; padding: 10px 14px;
    border-radius: var(--radius-sm); font-family: 'Suwannaphum', serif;
    font-size: 1.125rem; color: #ef4444; cursor: pointer; text-align: center; transition: all 0.2s;
  }
  .nav-mobile-logout:hover { background: #fff5f5; border-color: #fecaca; }

  /* Active nav-text link */
  .nav-text.active { color: var(--green-main); font-weight: 700; }

  /* Hamburger animation */
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

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

      <!-- Logo — uses .nav-logo from style.css -->
      <a href="${LOGO.href}" class="nav-logo">
        <img src="${LOGO.img}" alt="${LOGO.text}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <div class="logo-placeholder" style="display:none;">
          <span class="logo-icon">${LOGO.icon}</span>
          <span style="font-family:'Moul',serif;font-size:1.25rem;color:var(--green-dark);">${LOGO.text}</span>
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