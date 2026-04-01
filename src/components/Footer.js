
const FOOTER_BRAND = {
  img:  '/src/assets/footer-logo.png',
  desc: `ម្ហូប​​ ជាវេទិកាផ្តល់ការណែនាំអាហារផ្ទាល់ខ្លួនដោយផ្អែកលើ លើប្រភេទម្ហូប។ យើងសម្រួលដំណើរធ្វើម្ហូបរបស់អ្នកដោយងាយស្រួល អនុវត្តតាមការបង្រៀន និងបញ្ជីគ្រឿងផ្សំពេញលេញសម្រាប់រូបមន្តនីមួយៗ។`,
};

const FOOTER_COLUMNS = [
  {
    heading: 'ម៉ឺនុយ',
    links: [
      { label: 'ទំព័រដើម', href: '/' },
      { label: 'មុខម្ហូប',  href: '/src/pages/Product_Page/product.html' },
      { label: 'អំពីយើង', href: '/src/pages/About_Page/about.html' },
    ],
  },
  {
    heading: 'ព័ត៌មាន',
    links: [
      { label: 'ច្បាប់ប្រើប្រាស់', href: '#' },
      { label: 'គោលការណ៍',        href: '#' },
      { label: 'ជំនួយ',            href: '#' },
    ],
  },
  {
    heading: 'ទំនាក់ទំនង',
    links: [
      { label: 'Facebook', href: '#', icon: 'fa-brands fa-facebook' },
      { label: 'Telegram', href: '#', icon: 'fa-brands fa-telegram' },
      { label: 'Email',    href: '#', icon: 'fa-regular fa-envelope' },
    ],
  },
];

const FOOTER_PARTNER = {
  heading: 'សហការនិងឧបត្ថម្ភដោយ',
  img:     '/src/assets/istad.png',
  alt:     'ISTAD',
};

const FOOTER_SOCIALS = [
  { label: 'តេឡេក្រាម', href: '#', icon: 'fa-brands fa-telegram' },
  { label: 'អ៊ីម៉ែល',   href: '#', icon: 'fa-regular fa-envelope' },
  { label: 'ហ្វេសប៊ុក', href: '#', icon: 'fa-brands fa-facebook' },
];


const _colsHTML = FOOTER_COLUMNS.map(col => `
  <div class="footer-links-group">
    <h4 class="footer-heading">${col.heading}</h4>
    <ul>
      ${col.links.map(l => `
        <li>
          <a href="${l.href}">
            ${l.icon ? `<i class="${l.icon}" style="width:14px;margin-right:4px;opacity:0.7;"></i>` : ''}
            ${l.label}
          </a>
        </li>`).join('')}
    </ul>
  </div>`).join('');

const _socialsHTML = FOOTER_SOCIALS.map(s => `
  <a href="${s.href}" class="social-link">
    <i class="${s.icon}"></i> ${s.label}
  </a>`).join('');

const footerHTML = `
  <footer class="footer">
    <div class="footer-main">

      <!-- Brand -->
      <div class="footer-brand">
        <div class="footer-logo" style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
          <img src="${FOOTER_BRAND.img}" alt="${FOOTER_BRAND.name}"
            style="height:100px;object-fit:contain;"
            onerror="this.style.display='none'"/>
        </div>
        <p class="footer-desc">${FOOTER_BRAND.desc}</p>
      </div>

      ${_colsHTML}

      <!-- Partner -->
      <div class="footer-partner">
        <h4 class="footer-heading">${FOOTER_PARTNER.heading}</h4>
        <div class="istad-badge">
          <img src="${FOOTER_PARTNER.img}" alt="${FOOTER_PARTNER.alt}"
            onerror="this.style.display='none'"/>
        </div>
      </div>

    </div>
    <div class="footer-bottom">
      <div class="footer-copy">
        <i class="fa-regular fa-copyright"></i>
        Copyright 2026 mhob in Cambodia
      </div>
      <div class="footer-socials">
        ${_socialsHTML}
      </div>
    </div>
  </footer>
`;

// inject
const footerRoot = document.getElementById('footer-root');
if (footerRoot) footerRoot.innerHTML = footerHTML;