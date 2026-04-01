/* product-grid.js — Final, self-contained (no external deps) */
const ProductGrid = (() => {

  let state = {
    tab: 'posts', page: 1, limit: 12,
    query: '', cat: '', diff: '', sort: '',
  };

  /* ── inline helpers (no dependency on api.js functions) ── */
  function _stars(r) {
    const f = Math.round(r||0);
    return '<i class="bi bi-star-fill" style="color:#f59e0b;"></i>'.repeat(Math.max(0,Math.min(5,f))) + 
           '<i class="bi bi-star-fill" style="color:#ddd; opacity:0.3;"></i>'.repeat(Math.max(0,5-f));
  }
  function _trunc(s, n) {
    s = s||''; n = n||70;
    return s.length > n ? s.slice(0,n)+'…' : s;
  }
  const FOOD_FB = [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
  ];
  const REST_FB = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
  ];
  function _img(url, fallbacks) {
    if (!url || url==='string' || url==='null' || url.includes('example.com'))
      return fallbacks[Math.floor(Math.random()*fallbacks.length)];
    return url;
  }

  /* ── grid element ── */
  function getGrid() { return document.getElementById('products-grid'); }

  function skeleton() {
    const g = getGrid();
    if (g) g.innerHTML = Array(8).fill(
      '<div class="skeleton-card" style="height:220px;border-radius:var(--radius-md);"></div>'
    ).join('');
    const p = document.getElementById('pagination-root');
    if (p) p.innerHTML = '';
  }

  function showMsg(icon, msg) {
    const g = getGrid();
    if (g) g.innerHTML = `
      <div style="grid-column:1/-1;background:white;border-radius:var(--radius-md);
        padding:60px 24px;text-align:center;box-shadow:var(--shadow-sm);">
        <div style="font-size:3rem;margin-bottom:12px;">${icon}</div>
        <p style="color:var(--text-light);font-size:0.88rem;line-height:1.8;">${msg}</p>
      </div>`;
  }

  /* ── filter ── */
  function applyFilter(items) {
    let r = [...items];
    if (state.query) {
      const q = state.query.toLowerCase();
      r = r.filter(i => (i.title||i.name||'').toLowerCase().includes(q) ||
                        (i.description||'').toLowerCase().includes(q));
    }
    if (state.cat)
      r = r.filter(i => (i.category||'').toLowerCase().includes(state.cat) ||
                        (i.cuisine||'').toLowerCase().includes(state.cat) ||
                        (i.cuisine_types||[]).join(' ').toLowerCase().includes(state.cat));
    if (state.diff && state.tab==='posts')
      r = r.filter(i => i.difficulty_level === state.diff);
    if (document.getElementById('chk-trending')?.checked)
      r = r.filter(i => i.is_trending || (i.likes_count||0)>0);
    if (state.sort==='newest')  r.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
    if (state.sort==='popular') r.sort((a,b)=>(b.likes_count||b.popularity_score||0)-(a.likes_count||a.popularity_score||0));
    if (state.sort==='rating')  r.sort((a,b)=>(b.average_rating||0)-(a.average_rating||0));
    if (state.sort==='name')    r.sort((a,b)=>(a.title||a.name||'').localeCompare(b.title||b.name||''));
    return r;
  }

  /* ══════════════
     CARD BUILDERS
  ══════════════ */
  function postCard(p) {
    const img  = _img(p.image_url, FOOD_FB);
    const dc   = {easy:'var(--green-main)',medium:'var(--gold)',hard:'#ef4444'};
    const dl   = {easy:'ងាយ',medium:'មធ្យម',hard:'លំបាក'};
    const diff = p.difficulty_level||'';
    const url  = `/src/pages/Product_details/detail.html?type=post&id=${p.id}`;
    const safeTitle = (p.title||'—').replace(/'/g,'&#39;');
    return `
      <div class="food-card" onclick="location.href='${url}'" style="cursor:pointer;">
        <div class="food-card-img" style="position:relative;overflow:hidden;">
          <img src="${img}" alt="${safeTitle}"
            style="width:100%;height:100%;object-fit:cover;display:block;"
            onerror="this.src='${FOOD_FB[0]}'"/>
          ${diff?`<span style="position:absolute;top:7px;left:7px;background:${dc[diff]};
            color:white;font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;">
            ${dl[diff]}</span>`:''}
          ${(p.tags||[]).length?`<span style="position:absolute;top:7px;right:7px;
            background:rgba(0,0,0,0.5);color:white;font-size:0.62rem;padding:2px 7px;border-radius:20px;">
            ${p.tags[0]}</span>`:''}
        </div>
        <div class="food-card-body">
          <div class="food-card-title">${p.title||'—'}</div>
          <div class="food-card-desc">${_trunc(p.description,70)}</div>
          <div class="food-card-footer">
            <span class="food-card-views">
              <i class="fa-regular fa-heart" style="color:#ef4444;font-size:0.7rem;"></i>
              ${p.likes_count||0}
              ${p.cooking_time_minutes?`&nbsp;·&nbsp;<i class="fa-regular fa-clock"
                style="font-size:0.7rem;"></i>&nbsp;${p.cooking_time_minutes}ន'`:''}
            </span>
            <button class="food-card-btn"
              onclick="event.stopPropagation();location.href='${url}'">មើល</button>
          </div>
        </div>
      </div>`;
  }

  function foodCard(f) {
    const img  = _img(f.image_url, FOOD_FB);
    const url  = `/src/pages/Product_details/detail.html?type=food&id=${f.id}`;
    const safeName = (f.name||'—').replace(/'/g,'&#39;');
    return `
      <div class="food-card" onclick="location.href='${url}'" style="cursor:pointer;">
        <div class="food-card-img" style="position:relative;overflow:hidden;">
          <img src="${img}" alt="${safeName}"
            style="width:100%;height:100%;object-fit:cover;display:block;"
            onerror="this.src='${FOOD_FB[0]}'"/>
          ${f.is_trending?`<span style="position:absolute;top:7px;left:7px;
            background:linear-gradient(135deg,#ef4444,#f59e0b);color:white;
            font-size:0.62rem;font-weight:700;padding:2px 7px;border-radius:20px;">
            <i class="bi bi-fire"></i> ពេញ</span>`:''}
          ${f.price?`<span style="position:absolute;bottom:7px;right:7px;
            background:var(--green-main);color:white;font-size:0.7rem;font-weight:700;
            padding:2px 8px;border-radius:20px;">
            $${parseFloat(f.price).toFixed(2)}</span>`:''}
        </div>
        <div class="food-card-body">
          <div class="food-card-title">${f.name||'—'}</div>
          <div class="food-card-desc">${_trunc(f.description,70)}</div>
          <div class="food-card-footer">
            <span class="food-stars">${_stars(f.average_rating)}</span>
            <button class="food-card-btn"
              onclick="event.stopPropagation();location.href='${url}'">មើល</button>
          </div>
        </div>
      </div>`;
  }

  function restaurantCard(r) {
    const img     = _img(r.image_url, REST_FB);
    const cuisine = (r.cuisine_types||[]).filter(c=>c&&c!=='string').slice(0,2).join(', ')||'ម្ហូបខ្មែរ';
    const price   = (r.price_range&&r.price_range!=='string') ? r.price_range : '';
    const url     = `/src/pages/Product_details/detail.html?type=restaurant&id=${r.id}`;
    const safeName = (r.name||'—').replace(/'/g,'&#39;');
    return `
      <div class="food-card" onclick="location.href='${url}'" style="cursor:pointer;">
        <div class="food-card-img" style="position:relative;overflow:hidden;">
          <img src="${img}" alt="${safeName}"
            style="width:100%;height:100%;object-fit:cover;display:block;"
            onerror="this.src='${REST_FB[0]}'"/>
          ${r.is_trending?`<span style="position:absolute;top:7px;left:7px;
            background:linear-gradient(135deg,#ef4444,#f59e0b);color:white;
            font-size:0.62rem;font-weight:700;padding:2px 7px;border-radius:20px;">
            <i class="bi bi-fire"></i> ពេញ</span>`:''}
          ${price?`<span style="position:absolute;bottom:7px;right:7px;
            background:var(--green-dark);color:white;font-size:0.7rem;font-weight:700;
            padding:2px 8px;border-radius:20px;">${price}</span>`:''}
        </div>
        <div class="food-card-body">
          <div class="food-card-title">${r.name||'—'}</div>
          <div class="food-card-desc">${cuisine}</div>
          <div class="food-card-footer">
            <span class="food-stars">${_stars(r.average_rating)}
              <span style="font-size:0.68rem;color:var(--text-light);margin-left:2px;">
                (${r.rating_count||0})</span></span>
            <button class="food-card-btn"
              onclick="event.stopPropagation();location.href='${url}'">មើល</button>
          </div>
        </div>
      </div>`;
  }

  /* ── pagination ── */
  function renderPagination(total) {
    const pages = Math.ceil(total/state.limit);
    const el = document.getElementById('pagination-root');
    if (!el||pages<=1) { if(el) el.innerHTML=''; return; }
    const c = state.page;
    const range = pages<=7 ? Array.from({length:pages},(_,i)=>i+1)
      : c<=4 ? [1,2,3,4,5,'…',pages]
      : c>=pages-3 ? [1,'…',pages-4,pages-3,pages-2,pages-1,pages]
      : [1,'…',c-1,c,c+1,'…',pages];
    el.innerHTML = `
      <button class="page-btn" onclick="ProductGrid.goPage(${c-1})" ${c===1?'disabled':''}>
        <i class="fa-solid fa-chevron-left" style="font-size:0.7rem;"></i></button>
      ${range.map(p=>p==='…'
        ? `<span style="padding:0 4px;color:var(--text-light);align-self:center;">…</span>`
        : `<button class="page-btn ${p===c?'active':''}" onclick="ProductGrid.goPage(${p})">${p}</button>`
      ).join('')}
      <button class="page-btn" onclick="ProductGrid.goPage(${c+1})" ${c===pages?'disabled':''}>
        <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></button>`;
  }

  /* ════════════
     MAIN LOAD
  ════════════ */
  async function load() {
    skeleton();
    try {
      let raw = [];
      if      (state.tab==='posts')       raw = await FoodPostsAPI.list(0,100);
      else if (state.tab==='food-items')  raw = await FoodItemsAPI.list(0,100);
      else if (state.tab==='restaurants') raw = await RestaurantsAPI.list(0,100);
      if (!Array.isArray(raw)) raw = [];

      const filtered = applyFilter(raw);
      const start    = (state.page-1)*state.limit;
      const pageData = filtered.slice(start, start+state.limit);

      const labels = {posts:'រូបមន្ត','food-items':'ម្ហូប',restaurants:'ភោជនីយដ្ឋាន'};
      if (window.ProductToolbar) ProductToolbar.setCount(filtered.length, labels[state.tab]||'ធាតុ');

      renderPagination(filtered.length);

      if (raw.length===0) { showMsg('<i class="bi bi-egg-fill"></i>','មិនទាន់មានទិន្នន័យ<br/><small>ចុចបន្ថែម!</small>'); return; }
      if (pageData.length===0) { showMsg('<i class="bi bi-search"></i>','រកមិនឃើញ — ប្ដូរតម្រង'); return; }

      const g = getGrid();
      if (!g) return;
      if      (state.tab==='posts')       g.innerHTML = pageData.map(postCard).join('');
      else if (state.tab==='food-items')  g.innerHTML = pageData.map(foodCard).join('');
      else if (state.tab==='restaurants') g.innerHTML = pageData.map(restaurantCard).join('');

      if (window.ProductSidebar) {
        const counts = {all:filtered.length};
        filtered.forEach(i => {
          const k = (i.category||i.cuisine||'').toLowerCase().replace(/\s+/g,'');
          if (k&&k!=='string') counts[k]=(counts[k]||0)+1;
        });
        ProductSidebar.updateCounts(counts);
      }
    } catch(e) {
      console.error('[ProductGrid]',e);
      showMsg('error',`Error: ${e.message}`);
    }
  }

  function loadTab(tab) {
    state.tab=tab; state.page=1; state.query=''; state.cat=''; state.diff='';
    load();
  }

  return {
    load, loadTab,
    setTab:      t => loadTab(t),
    search:      q => { state.query=q; state.page=1; if(window.ProductToolbar) ProductToolbar.syncSearch(q); load(); },
    filterCat:   c => { state.cat=c;  state.page=1; load(); },
    filterDiff:  d => { state.diff=d; state.page=1; load(); },
    sortBy:      s => { state.sort=s; load(); },
    reload:      ()=> load(),
    goPage:      p => { state.page=p; window.scrollTo({top:150,behavior:'smooth'}); load(); },
  };
})();