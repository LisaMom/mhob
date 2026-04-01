/* product-init.js — Fixed boot sequence */
document.addEventListener('DOMContentLoaded', () => {

  // Show FAB for logged-in users
  if (Auth.isLoggedIn()) {
    const fab = document.getElementById('fab-post');
    if (fab) fab.style.display = 'flex';
  }

  // Read URL params
  const params = new URLSearchParams(location.search);
  const q   = params.get('q')   || '';
  const tab = params.get('tab') || 'posts';
  const cat = params.get('cat') || '';

  // Set initial tab UI without triggering load yet
  if (tab !== 'posts') {
    // Just update button styles, don't call switch() yet
    document.querySelectorAll('.tab-pills .filter-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`tab-${tab}`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  // Small delay to ensure all JS modules are fully initialized
  setTimeout(() => {
    if (q)        { ProductGrid.loadTab(tab); ProductGrid.search(q); }
    else if (cat) { ProductGrid.loadTab(tab); ProductGrid.filterCat(cat); }
    else          { ProductGrid.loadTab(tab); }
  }, 100);

  // Sync hero ↔ toolbar search inputs
  const heroQ = document.getElementById('hero-q');
  const tbQ   = document.getElementById('tb-q');
  if (heroQ && tbQ) {
    heroQ.addEventListener('input', () => { if (tbQ.value !== heroQ.value) tbQ.value = heroQ.value; });
    tbQ.addEventListener('input',   () => { if (heroQ.value !== tbQ.value) heroQ.value = tbQ.value; });
  }
});