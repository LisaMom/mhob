

var LEADS_DATA = [
  {
    avatar: '/src/assets/mentor/reksmey.jpg',
    name:   'Mom Reksmey',
    role:   'Senior Mentor',
    tg:     '#',
    fb:     '#',
    ig:     '#',
  },
  {
    avatar: '/src/assets/mentor/sokcheat.jpg',
    name:   'Srorng Sokcheat',
    role:   'Technical Mentor',
    tg:     '#',
    fb:     '#',
    ig:     '#',
  },
];
var leadsCards = LEADS_DATA.map(function(l) {
  return '<div class="lead-card">'
    + '<div class="lead-avatar">'
    + '<img src="' + l.avatar + '" alt="' + l.name + ' Photo" onerror="this.style.display=\'none\'">'
    + '</div>'
    + '<div class="lead-name">'   + l.name   + '</div>'
    + '<div class="lead-role">'   + l.role   + '</div>'
    + '<div class="lead-socials">'
    + '<a class="lead-social-btn btn-tg" href="' + l.tg + '"><i class="fa-brands fa-telegram"></i></a>'
      + '<a class="lead-social-btn btn-gh" href="' + l.gh + '"><i class="fa-brands fa-github"></i></a>'
    + '<a class="lead-social-btn btn-fb" href="' + l.fb + '"><i class="fa-brands fa-facebook-f"></i></a>'
    + '</div>'
    + '</div>'
   
}).join('');

document.getElementById('about-team-leads-root').innerHTML = `
  <section class="team-leads-section">
    <div class="container">
      <div class="section-center-header">
        <h2 class="section-title">អ្នកណែនាំរបស់យើង</h2>
      </div>
      <p class="section-center-desc">
       សមិទ្ធិផលដ៏អស្ចារ្យមួយនេះកើតចេញពីការណែនាំដ៏មានតម្លៃ ហើយពួកយើងនឹងតែងតែគោរពនិងអរគុណអ្នកណែនាំរបស់យើង។
      </p>
      <div class="leads-grid">
        ${leadsCards}
      </div>
    </div>
  </section>
`;