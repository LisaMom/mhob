

var CONTACT_DATA = [
  {
    icon:   '<i class="fa-solid fa-phone"></i>',
    type:   'Call Us',
    detail: '+855 12 345 678<br>+855 98 765 432<br>ម៉ោង ៨ព្រឹក – ៦ល្ងាច',
  },
  {
    icon:   '<i class="fa-solid fa-comment-dots"></i>',
    type:   'Live Chat',
    detail: 'ជជែកផ្ទាល់ជាមួយក្រុម<br>របស់យើងតាម Telegram<br>ឬ Facebook Messenger',
  },
  {
    icon:   '<i class="fa-solid fa-envelope"></i>',
    type:   'Email Us',
    detail: 'info@mhob.com.kh<br>support@mhob.com.kh<br>យើងឆ្លើយក្នុង ២៤ម៉ោង',
  },
];

// ─────────────────────────────────────────────

var contactCards = CONTACT_DATA.map(function(c) {
  return '<div class="contact-card">'
    + '<div class="contact-icon">' + c.icon + '</div>'
    + '<div class="contact-type">' + c.type + '</div>'
    + '<div class="contact-detail">' + c.detail + '</div>'
    + '</div>';
}).join('');

document.getElementById('about-contact-root').innerHTML = `
  <section class="contact-section">
    <div class="container">
      <div class="section-center-header">
        <h2 class="section-title">ទំនាក់ទំនងមកកាន់យើង</h2>
      </div>
      <div class="contact-grid">
        ${contactCards}
      </div>
    </div>
  </section>
`;