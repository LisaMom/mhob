

var VALUES_DATA = [
  {
    avatar:  '/src/assets/img-about/image.png',
    title: 'រូបមន្ដម្ហូបខ្មែរ',
    desc:  'បង្ហាញពីរបៀបធ្វើម្ហូបខ្មែរគ្រប់ប្រភេទ តាំងពីសម្ល បង្អែម រហូតដល់អាហារសម្រន់។',
  },
  {
    avatar:  '/src/assets/img-about/108.jpg',
    title: 'ការណែនាំ',
    desc:  'ណែនាំពីវិធីធ្វើមួយជំហានម្ដងៗ តាមរយៈរូបភាព ឬវីដេអូខ្លីៗដែលងាយយល់ និងងាយអនុវត្តតាម។',
  },
  {
    avatar:  '/src/assets/img-about/communicate.webp',
    title: 'ភាពជាសហគមន៍',
    desc:  'ការភ្ជាប់ចំណងរវាង ចម្អិនម្ហូប អ្នកចូលចិត្តម្ហូប និងសហគមន៍',
  },
];

var valuesCards = VALUES_DATA.map(function(v) {
  return '<div class="value-card">'
    + '<img src="' + v.avatar + '" style="width: 500px;" alt="' + v.name + ' Photo" onerror="this.style.display=\'none\'">'
    + '<div class="value-title">' + v.title + '</div>'
    + '<div class="value-desc">' + v.desc + '</div>'
    + '</div>';
}).join('');

document.getElementById('about-values-root').innerHTML = `
  <section class="values-section">
    <div class="container">
      <div class="section-center-header">
        <h2 class="section-title">បេសកកម្មរបស់ពួកយើង</h2>
      </div>
      <p class="section-center-desc">
        បេសកកម្មរបស់យើង គឺរក្សា និងផ្សព្វផ្សាយមរតកម្ហូបខ្មែរ តាមរយៈការផ្ដល់ជូននូវរូបមន្តធ្វើម្ហូបដែលត្រឹមត្រូវ គ្រឿងផ្សំលម្អិត និងបច្ចេកទេសចម្អិនងាយៗ។ យើងចង់ឱ្យអ្នកប្រើប្រាស់គ្រប់រូប អាចរៀនធ្វើម្ហូបខ្មែរដែលមានរសជាតិដើម ពោរពេញដោយអនាម័យ និងសុខភាព ចេញពីផ្ទះរបស់ពួកគេផ្ទាល់។
      </p>
      <div class="values-grid">
        ${valuesCards}
      </div>
    </div>
  </section>
`;