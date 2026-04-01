

var TEAM_DATA = [
  { avatar: '/src/assets/team/hokcheng.jpg', name: 'Chune Hokcheng',  role: 'Leader', tg: '#', gh: '#', fb: '#' },
  { avatar: '/src/assets/team/mine.jpg', name: 'Mom Lisa',   role: 'Frontend Developer', tg: '#', gh: '#', fb: '#' },
  { avatar: '/src/assets/team/bunchhean.jpg', name: 'Chhoung Bunchhean',   role: 'Frontend Developer', tg: '#', gh: '#', fb: '#' },
  { avatar: '/src/assets/team/thana.jpg', name: 'Neang Thana',  role: 'Frontend Developer', tg: '#', gh: '#', fb: '#' },
  { avatar: '/src/assets/team/vandeth.jpg', name: 'Loeun Vandeth',   role: 'Frontend Developer', tg: '#', gh: '#', fb: '#' },
  { avatar: '/src/assets/team/sreymey.jpg', name: 'Meong chansreymey',  role: 'UX/UI Designer', tg: '#', gh: '#', fb: '#' },
  { avatar: '/src/assets/team/sokheng.jpg', name: 'Chhun sokheng',   role: 'UX/UI Designer', tg: '#', gh: '#', fb: '#' },
  { avatar: '/src/assets/team/makara.jpg', name: 'Ret Makara',   role: 'UX/UI Designer', tg: '#', gh: '#', fb: '#' },
  { avatar: '/src/assets/team/vireakboth.jpg', name: 'Chut Vireakboth',   role: 'UX/UI & Video Editor', tg: '#', gh: '#', fb: '#' },
];

var memberCards = TEAM_DATA.map(function(m) {
  return '<div class="member-card">'

    // ── Image (full width, top of card)
    + '<div class="member-avatar">'
    +   '<img src="' + m.avatar + '" alt="' + m.name + '" '
    +   'onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\'">'
    +   '<span style="display:none;align-items:center;justify-content:center;width:100%;height:100%;font-size:4rem;color:var(--text-light);"><i class="bi bi-person-fill"></i></span>'
    + '</div>'

    // ── Info below
    + '<div class="member-info">'
    +   '<div class="member-name">' + m.name + '</div>'
    +   '<div class="member-role">' + m.role + '</div>'
    +   '<div class="member-socials">'
    +     '<a class="member-social-btn btn-tg" href="' + m.tg + '"><i class="fa-brands fa-telegram"></i></a>'
    +     '<a class="member-social-btn btn-gh" href="' + m.gh + '"><i class="fa-brands fa-github"></i></a>'
    +     '<a class="member-social-btn btn-fb" href="' + m.fb + '"><i class="fa-brands fa-facebook-f"></i></a>'
    +   '</div>'
    + '</div>'

    + '</div>';
}).join('');

document.getElementById('about-team-root').innerHTML = `
  <section class="full-team-section">
    <div class="container">
      <div class="section-center-header">
        <h2 class="section-title">ក្រុមការងាររបស់យើង</h2>
      </div>
      <p class="section-center-desc">
        គ្មានសមិទ្ធិផលណាដែលអាចធ្វើទៅបានដោយគ្មានការសហការណ៍ឡើយ ហើយវាកើតចេញពីសមាជិកក្រុមដ៏អស្ចារ្យរបស់ពួកយើង។
      </p>
      <div class="team-grid">
        ${memberCards}
      </div>
    </div>
  </section>
`;