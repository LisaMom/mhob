/* product-sidebar.js */
const ProductSidebar = (() => {

  const CATS = [
    { icon:'<i class="bi bi-grid-fill"></i>', label:'ទាំងអស់',       value:'' },
    { icon:'<i class="bi bi-bowl-fill"></i>', label:'អង្ករ',          value:'rice' },
    { icon:'<i class="bi bi-egg-fried"></i>', label:'ស៊ុប/នំបញ្ចុក',  value:'noodle' },
    { icon:'<i class="bi bi-cup-straw"></i>', label:'សាច់',           value:'meat' },
    { icon:'<i class="bi bi-fire"></i>',      label:'ត្រី/សមុទ្រ',    value:'seafood' },
    { icon:'<i class="bi bi-tree-fill"></i>', label:'បន្លែ',          value:'vegetable' },
    { icon:'<i class="bi bi-cake2-fill"></i>', label:'បង្អែម',         value:'dessert' },
    { icon:'<i class="bi bi-cup-hot-fill"></i>', label:'ភេសជ្ជៈ',        value:'drink' },
    { icon:'<i class="bi bi-box-seam-fill"></i>', label:'អាហារសម្រន់',   value:'snack' },
  ];

  function render() {
    const root = document.getElementById('sidebar-root');
    if (!root) return;
    root.innerHTML = `
      <!-- Categories -->
      <div class="sidebar-card">
        <div class="sidebar-title"><i class="fa-solid fa-layer-group"></i> ប្រភេទ</div>
        <div class="cat-list">
          ${CATS.map(c=>`
            <button class="cat-item ${c.value===''?'active':''}" data-cat="${c.value}"
              onclick="ProductSidebar.selectCat('${c.value}',this)">
              <span>${c.icon}</span>${c.label}
              <span class="cat-count" id="cnt-${c.value||'all'}">—</span>
            </button>`).join('')}
        </div>
      </div>

      <!-- Meal time -->
      <div class="sidebar-card">
        <div class="sidebar-title"><i class="fa-regular fa-clock"></i> ពេលវេលា</div>
        ${[{l:'អាហារព្រឹក',v:'breakfast'},{l:'អាហារថ្ងៃ',v:'lunch'},{l:'អាហារល្ងាច',v:'dinner'}].map(m=>`
          <label class="meal-check">
            <input type="checkbox" value="${m.v}" onchange="ProductSidebar.applyFilters()"/>
            ${m.l}
          </label>`).join('')}
      </div>

      <!-- Difficulty (posts) -->
      <div class="sidebar-card" id="sb-diff">
        <div class="sidebar-title"><i class="fa-solid fa-signal"></i> កម្រិត</div>
        <div class="cat-list">
          ${[{i:'<i class="bi bi-emoji-smile-fill"></i>',l:'ងាយ',v:'easy'},{i:'<i class="bi bi-emoji-neutral-fill"></i>',l:'មធ្យម',v:'medium'},{i:'<i class="bi bi-emoji-angry-fill"></i>',l:'លំបាក',v:'hard'}].map(d=>`
            <button class="cat-item" data-diff="${d.v}"
              onclick="ProductSidebar.selectDiff('${d.v}',this)">
              <span>${d.i}</span>${d.l}
            </button>`).join('')}
        </div>
      </div>

      <!-- Quick filters -->
      <div class="sidebar-card">
        <div class="sidebar-title"><i class="fa-solid fa-sliders"></i> តម្រង</div>
        <label class="meal-check">
          <input type="checkbox" id="chk-trending" onchange="ProductSidebar.applyFilters()"/>
          <i class="fa-solid fa-fire" style="color:#ef4444;font-size:0.75rem;"></i> ពេញនិយម
        </label>
      </div>`;
  }

  function selectCat(val, btn) {
    document.querySelectorAll('.cat-item[data-cat]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    if (window.ProductGrid) ProductGrid.filterCat(val);
  }

  function selectDiff(val, btn) {
    const was = btn.classList.contains('active');
    document.querySelectorAll('.cat-item[data-diff]').forEach(b=>b.classList.remove('active'));
    if (!was) { btn.classList.add('active'); if (window.ProductGrid) ProductGrid.filterDiff(val); }
    else { if (window.ProductGrid) ProductGrid.filterDiff(''); }
  }

  function applyFilters() {
    if (window.ProductGrid) ProductGrid.reload();
  }

  function getMeals() {
    return [...document.querySelectorAll('.meal-check input[type=checkbox]:not(#chk-trending)')]
      .filter(el=>el.checked).map(el=>el.value);
  }
  function getTrending() { return document.getElementById('chk-trending')?.checked || false; }

  function updateCounts(map) {
    CATS.forEach(c => {
      const el = document.getElementById(`cnt-${c.value||'all'}`);
      if (el) el.textContent = (map[c.value||'all'] ?? '—');
    });
  }

  return { render, selectCat, selectDiff, applyFilters, getMeals, getTrending, updateCounts };
})();
ProductSidebar.render();