/* product-modals.js — Fixed 422 errors */

function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

['modal-location','modal-restaurant','modal-food','modal-post'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal(id);
  });
});

/* ── Load locations ── */
async function loadLocationsIntoSelect(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
    sel.innerHTML = `<option value="">កំពុងផ្ទុក...</option>`;
    try {
      const locs = await LocationsAPI.list(0, 100);
      if (!locs || !locs.length) {
        sel.innerHTML = `<option value="">មិនមានទីតាំង — សូមបង្កើតជាមុន!</option>`;
        return;
      }
      sel.innerHTML = `<option value="">-- ជ្រើសទីតាំង --</option>` +
        locs.map(l => `<option value="${l.id}">${l.name} · ${l.city||''} ${l.country||''}</option>`).join('');
    } catch(e) {
      sel.innerHTML = `<option value="">${e.message}</option>`;
    }
}

/* ── Load restaurants ── */
async function loadRestaurantsIntoSelect(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
    sel.innerHTML = `<option value="">កំពុងផ្ទុក...</option>`;
    try {
      const rests = await RestaurantsAPI.list(0, 100);
      if (!rests || !rests.length) {
        sel.innerHTML = `<option value="">មិនមានភោជនីយដ្ឋាន — សូមបង្កើតជាមុន!</option>`;
        return;
      }
      sel.innerHTML = `<option value="">-- ជ្រើសភោជនីយដ្ឋាន --</option>` +
        rests.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
    } catch(e) {
      sel.innerHTML = `<option value="">${e.message}</option>`;
    }
}

/* ── Open functions ── */
function openLocationModal() {
  if (!Auth.isLoggedIn()) { location.href='/src/pages/Login_Page/login.html'; return; }
  openModal('modal-location');
}
function openRestaurantModal() {
  if (!Auth.isLoggedIn()) { location.href='/src/pages/Login_Page/login.html'; return; }
  loadLocationsIntoSelect('r-location').then(() => openModal('modal-restaurant'));
}
function openFoodModal() {
  if (!Auth.isLoggedIn()) { location.href='/src/pages/Login_Page/login.html'; return; }
  loadRestaurantsIntoSelect('f-restaurant').then(() => openModal('modal-food'));
}
function openPostModal() {
  if (!Auth.isLoggedIn()) { location.href='/src/pages/Login_Page/login.html'; return; }
  openModal('modal-post');
}

/* ══════════════════════════
   CREATE LOCATION
══════════════════════════ */
document.getElementById('form-location')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('btn-submit-location');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> កំពុងបង្កើត…';
  try {
    const name = document.getElementById('loc-name').value.trim();
    if (!name) { showToast('សូមបញ្ចូលឈ្មោះ', 'error'); return; }

    // Only send fields that have values — avoid sending empty strings
    const body = { name };
    const desc    = document.getElementById('loc-desc').value.trim();
    const address = document.getElementById('loc-address').value.trim();
    const city    = document.getElementById('loc-city').value.trim();
    const country = document.getElementById('loc-country').value.trim();
    const postal  = document.getElementById('loc-postal').value.trim();
    const phone   = document.getElementById('loc-phone').value.trim();
    const email   = document.getElementById('loc-email').value.trim();
    const img     = document.getElementById('loc-img').value.trim();
    const lat     = parseFloat(document.getElementById('loc-lat').value);
    const lng     = parseFloat(document.getElementById('loc-lng').value);

    if (desc)    body.description  = desc;
    if (address) body.address      = address;
    if (city)    body.city         = city;
    if (country) body.country      = country;
    if (postal)  body.postal_code  = postal;
    if (phone)   body.phone        = phone;
    if (img)     body.location_img = img;
    // Only add email if it looks valid
    if (email && email.includes('@')) body.email = email;
    if (!isNaN(lat)) body.latitude  = lat;
    if (!isNaN(lng)) body.longitude = lng;

    console.log('[Location] body:', body);
    const result = await LocationsAPI.create(body);
    showToast(`ទីតាំង "${result.name}" ត្រូវបានបង្កើត!`, 'success');
    closeModal('modal-location');
    document.getElementById('form-location').reset();
  } catch(err) {
    console.error('[Location] Error:', err);
    showToast(err.message || 'បង្កើតទីតាំងមិនបាន', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-plus"></i> បង្កើតទីតាំង';
  }
});

/* ══════════════════════════
   CREATE RESTAURANT
   422 fix: email must be valid, cuisine_types must be real strings
══════════════════════════ */
document.getElementById('form-restaurant')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const locId = document.getElementById('r-location').value;
  if (!locId) { showToast('សូមជ្រើសរើសទីតាំងជាមុន!', 'error'); return; }

  const name = document.getElementById('r-name').value.trim();
  if (!name) { showToast('សូមបញ្ចូលឈ្មោះភោជនីយដ្ឋាន', 'error'); return; }

  const btn = document.getElementById('btn-submit-restaurant');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> កំពុងបង្កើត…';

  try {
    // cuisine_types: split by comma, remove empty/placeholder values
    const cuisineRaw    = document.getElementById('r-cuisine').value || '';
    const cuisine_types = cuisineRaw.split(',')
      .map(s => s.trim())
      .filter(s => s && s !== 'string');
    // Must have at least one real cuisine
    if (!cuisine_types.length) cuisine_types.push('Khmer');

    // features: same cleanup
    const featuresRaw = document.getElementById('r-features').value || '';
    const features    = featuresRaw.split(',')
      .map(s => s.trim())
      .filter(s => s && s !== 'string');

    // price_range: don't send "string" placeholder
    const priceRaw  = document.getElementById('r-price').value || '';
    const priceRange = (priceRaw && priceRaw !== 'string') ? priceRaw : '$$';

    // email: only send if valid
    const emailRaw = document.getElementById('r-email').value.trim();
    const email    = (emailRaw && emailRaw.includes('@')) ? emailRaw : undefined;

    // Build body — only include fields with real values
    const body = {
      name,
      location_id:   locId,
      cuisine_types,
      price_range:   priceRange,
    };

    const desc    = document.getElementById('r-desc').value.trim();
    const phone   = document.getElementById('r-phone').value.trim();
    const website = document.getElementById('r-website').value.trim();
    const imgUrl  = document.getElementById('r-img').value.trim();
    const lat     = parseFloat(document.getElementById('r-lat').value);
    const lng     = parseFloat(document.getElementById('r-lng').value);

    if (desc)    body.description = desc;
    if (phone)   body.phone       = phone;
    if (email)   body.email       = email;
    if (website && website.startsWith('http')) body.website = website;
    if (imgUrl && imgUrl.startsWith('http'))   body.image_url = imgUrl;
    if (features.length) body.features = features;
    if (!isNaN(lat)) body.latitude  = lat;
    if (!isNaN(lng)) body.longitude = lng;

    console.log('[Restaurant] Sending body:', JSON.stringify(body, null, 2));

    const result = await RestaurantsAPI.create(body);
    showToast(`ភោជនីយដ្ឋាន "${result.name}" ត្រូវបានបង្កើត!`, 'success');
    closeModal('modal-restaurant');
    document.getElementById('form-restaurant').reset();
    if (window.ProductTabs) ProductTabs.switch('restaurants');

  } catch(err) {
    console.error('[Restaurant] Error:', err);
    showToast(err.message || 'បង្កើតភោជនីយដ្ឋានមិនបាន', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-plus"></i> បង្កើតភោជនីយដ្ឋាន';
  }
});

/* ══════════════════════════
   CREATE FOOD ITEM
══════════════════════════ */
document.getElementById('form-food')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const restId = document.getElementById('f-restaurant').value;
  if (!restId) { showToast('សូមជ្រើសរើសភោជនីយដ្ឋានជាមុន!', 'error'); return; }

  const name = document.getElementById('f-name').value.trim();
  if (!name) { showToast('សូមបញ្ចូលឈ្មោះម្ហូប', 'error'); return; }

  const btn = document.getElementById('btn-submit-food');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> កំពុងបង្កើត…';

  try {
    const toNum = id => {
      const v = parseFloat(document.getElementById(id)?.value);
      return isNaN(v) ? 0 : v; // default 0 not undefined
    };

    const ingRaw = document.getElementById('f-ingredients').value || '';
    const ingredients = ingRaw.split(',').map(s=>s.trim()).filter(Boolean);

    const imgUrl  = document.getElementById('f-img').value.trim();
    const cuisine = document.getElementById('f-cuisine').value.trim();
    const desc    = document.getElementById('f-desc').value.trim();

    const body = {
      name,
      restaurant_id:            restId,
      category:                 document.getElementById('f-category').value || 'food',
      price:                    toNum('f-price'),
      preparation_time_minutes: toNum('f-time'),
      calories:                 toNum('f-cal'),
      protein:                  toNum('f-protein'),
      carbs:                    toNum('f-carbs'),
      fat:                      toNum('f-fat'),
      ingredients,
      meal_types:               [],
    };

    if (desc)    body.description = desc;
    if (cuisine) body.cuisine     = cuisine;
    if (imgUrl && imgUrl.startsWith('http')) body.image_url = imgUrl;

    console.log('[Food] Sending body:', JSON.stringify(body, null, 2));

    const result = await FoodItemsAPI.create(body);
    showToast(`ម្ហូប "${result.name}" ត្រូវបានបង្កើត!`, 'success');
    closeModal('modal-food');
    document.getElementById('form-food').reset();
    if (window.ProductTabs) ProductTabs.switch('food-items');

  } catch(err) {
    console.error('[Food] Error:', err);
    showToast(err.message || 'បង្កើតម្ហូបមិនបាន', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-plus"></i> បង្កើតម្ហូប';
  }
});

/* ══════════════════════════
   CREATE FOOD POST
══════════════════════════ */
document.getElementById('form-post')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('p-title').value.trim();
  if (!title) { showToast('សូមបញ្ចូលចំណងជើង', 'error'); return; }

  const btn = document.getElementById('btn-submit-post');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> កំពុងផ្ញើ…';

  try {
    const toNum = id => { const v=parseInt(document.getElementById(id)?.value); return isNaN(v)?0:v; };
    const imgUrl = document.getElementById('p-img').value.trim();
    const desc   = document.getElementById('p-desc').value.trim();

    const body = {
      title,
      difficulty_level:     document.getElementById('p-diff').value || 'medium',
      cooking_time_minutes: toNum('p-time'),
      servings:             toNum('p-servings'),
      ingredients:  (document.getElementById('p-ingredients').value||'').split(',').map(s=>s.trim()).filter(Boolean),
      step_to_cook: (document.getElementById('p-steps').value||'').split('\n').map(s=>s.trim()).filter(Boolean),
      tags:         (document.getElementById('p-tags').value||'').split(',').map(s=>s.trim()).filter(Boolean),
    };

    if (desc)    body.description = desc;
    if (imgUrl && imgUrl.startsWith('http')) body.image_url = imgUrl;

    console.log('[Post] Sending body:', JSON.stringify(body, null, 2));

    const result = await FoodPostsAPI.create(body);
    showToast(`រូបមន្ត "${result.title}" ត្រូវបានបង្ហោះ!`, 'success');
    closeModal('modal-post');
    document.getElementById('form-post').reset();
    if (window.ProductTabs) ProductTabs.switch('posts');

  } catch(err) {
    console.error('[Post] Error:', err);
    showToast(err.message || 'ផ្ញើរូបមន្តមិនបាន', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> ផ្ញើ';
  }
});