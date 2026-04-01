/* product-toolbar.js */
const ProductToolbar = (() => {

  function render() {
    const root = document.getElementById('toolbar-root');
    if (!root) return;

    root.innerHTML = `
      <div class="product-toolbar">
        <span class="toolbar-title">ផលិតផល</span>
        <span class="toolbar-count" id="tb-count">កំពុងផ្ទុក…</span>
        <div class="toolbar-gap"></div>

        <!-- Search -->
        <div class="toolbar-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="tb-q" type="text" placeholder="ស្វែងរក..."
            oninput="ProductToolbar._debounce(this.value)"
            onkeydown="if(event.key==='Enter') ProductGrid.search(this.value)"/>
        </div>

        <!-- Sort -->
        <select class="sort-select" id="tb-sort" onchange="ProductGrid.sortBy(this.value)">
          <option>តម្រៀប</option>
          <option value="newest">ថ្មីបំផុត</option>
          <option value="popular">ពេញនិយម</option>
          <option value="rating">ពិន្ទុ</option>
          <option value="name">ឈ្មោះ A–Z</option>
        </select>

        <!-- View toggle -->
        <div class="view-toggle">
          <button class="view-btn active" id="vb-grid" onclick="ProductToolbar.setView('grid')" title="Grid">
            <i class="fa-solid fa-grid-2"></i>
          </button>
          <button class="view-btn" id="vb-list" onclick="ProductToolbar.setView('list')" title="List">
            <i class="fa-solid fa-list"></i>
          </button>
        </div>

        <!-- Create buttons — visible when logged in -->
        <div id="create-btns" style="display:none;gap:6px;flex-wrap:wrap;" class="admin-btns">
          <button class="btn-admin" style="background:#6366f1;color:white;"
            onclick="openLocationModal()" title="ចាំបាច់ជាមុន">
            <i class="fa-solid fa-location-dot"></i> ទីតាំង
          </button>
          <button class="btn-admin btn-admin-green" onclick="openRestaurantModal()">
            <i class="fa-solid fa-store"></i> ភោជនីយដ្ឋាន
          </button>
          <button class="btn-admin btn-admin-gold" onclick="openFoodModal()">
            <i class="fa-solid fa-utensils"></i> ម្ហូប
          </button>
        </div>
      </div>
    `;

    // prefill search from URL
    const q = new URLSearchParams(location.search).get('q');
    if (q) { const el = document.getElementById('tb-q'); if (el) el.value = q; }

    // show create buttons if logged in
    if (Auth.isLoggedIn()) {
      const btns = document.getElementById('create-btns');
      if (btns) btns.style.display = 'flex';
    }
  }

  let _timer = null;
  function _debounce(val) {
    clearTimeout(_timer);
    _timer = setTimeout(() => { if (window.ProductGrid) ProductGrid.search(val); }, 380);
  }

  function setView(mode) {
    const grid = document.getElementById('products-grid');
    document.getElementById('vb-grid')?.classList.toggle('active', mode==='grid');
    document.getElementById('vb-list')?.classList.toggle('active', mode==='list');
    if (!grid) return;
    if (mode==='list') grid.classList.add('list-view');
    else               grid.classList.remove('list-view');
  }

  function setCount(n, label) {
    const el = document.getElementById('tb-count');
    if (el) el.textContent = `${n} ${label||'ធាតុ'}`;
  }

  function syncSearch(q) {
    ['tb-q','hero-q'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.value !== q) el.value = q;
    });
  }

  return { render, _debounce, setView, setCount, syncSearch };
})();
ProductToolbar.render();