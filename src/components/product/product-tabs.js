/* product-tabs.js — Fixed */
const ProductTabs = (() => {
  const TABS = [
    { id:'posts',       label:'រូបមន្តសហគមន៍',    icon:'fa-solid fa-users' },
    { id:'food-items',  label:'ម្ហូបភោជនីយដ្ឋាន',  icon:'fa-solid fa-utensils' },
    { id:'restaurants', label:'ភោជនីយដ្ឋាន',        icon:'fa-solid fa-store' },
  ];
  let active = 'posts';

  function render() {
    const root = document.getElementById('tabs-root');
    if (!root) return;
    root.innerHTML = `
      <div class="tab-pills">
        ${TABS.map(t => `
          <button class="filter-btn ${t.id === active ? 'active' : ''}"
            id="tab-${t.id}"
            onclick="ProductTabs.switch('${t.id}')">
            <i class="${t.icon}"></i> ${t.label}
          </button>`).join('')}
      </div>`;
  }

  function switchTab(id) {
    active = id;
    // Update button styles
    TABS.forEach(t => {
      const btn = document.getElementById(`tab-${t.id}`);
      if (btn) btn.classList.toggle('active', t.id === id);
    });
    // Show/hide difficulty filter
    const sb = document.getElementById('sb-diff');
    if (sb) sb.style.display = id === 'posts' ? '' : 'none';
    // Always force reload — even if same tab (needed after create)
    if (window.ProductGrid) ProductGrid.loadTab(id);
  }

  function getActive() { return active; }
  return { render, switch: switchTab, getActive };
})();
ProductTabs.render();