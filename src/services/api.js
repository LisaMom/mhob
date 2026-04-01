

const API_BASE = "https://sombobaeb.cheat.casa";

// for auth
const Auth = {
  getToken: () => localStorage.getItem("mhob_token"),
  setToken: (t) => localStorage.setItem("mhob_token", t),
  removeToken: () => localStorage.removeItem("mhob_token"),
  getUser: () => {
    const u = localStorage.getItem("mhob_user");
    return u ? JSON.parse(u) : null;
  },
  setUser: (u) => localStorage.setItem("mhob_user", JSON.stringify(u)),
  removeUser: () => localStorage.removeItem("mhob_user"),
  isLoggedIn: () => !!localStorage.getItem("mhob_token"),
  isAdmin: () => {
    const u = Auth.getUser();
    return u?.role === "admin";
  },
  logout: () => {
    localStorage.removeItem("mhob_token");
    localStorage.removeItem("mhob_user");
    window.location.href = "/src/pages/Login_Page/login.html";
  },
};
 

async function apiFetch(path, options = {}) {
  const token = Auth.getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 204) return null;

  const text = await res.text();
  let data = null;
  try { if (text) data = JSON.parse(text); } catch (_) {}

  if (!res.ok) {
    let msg;
    if (Array.isArray(data?.detail)) {
      // FastAPI validation error — show field + message
      msg = data.detail.map(e => {
        const field = (e.loc || []).slice(-1)[0] || '';  // last part = field name
        return field ? `"${field}": ${e.msg}` : e.msg;
      }).join(' | ');
    } else {
      msg = data?.detail || `Request failed (${res.status})`;
    }
    console.error('API error on', path, '→', msg, data);
    throw new Error(msg);
  }
  return data;
}

  //   auth endpoints

const AuthAPI = {
  register: (body) =>
    apiFetch("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) =>
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => apiFetch("/auth/me"),


  updateProfile: async (body) => {
    const token = Auth.getToken();
    await fetch(`${API_BASE}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    const updated = await apiFetch("/auth/me");
    if (updated) Auth.setUser(updated);
    return updated;
  },

  uploadImage: async (file, imageType = "profile") => {
    const token = Auth.getToken();
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(
      `${API_BASE}/auth/profile/upload-image?image_type=${imageType}`,
      {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      },
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Upload failed");
    return data;
  },
};

async function fetchAndShowRestaurants() {
    const container = document.getElementById('restaurant-container');
    if (!container) return;
    try {
       
        const response = await fetch('https://sombobaeb.cheat.casa/locations');
        
  
        if (!response.ok) throw new Error("មិនអាចទាញទិន្នន័យបានទេ!");

        const restaurants = await response.json(); 

     
        container.innerHTML = '';

    
        restaurants.forEach(shop => {
            const card = `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <img src="${shop.location_img}" class="w-full h-48 object-cover" alt="${shop.name}">
                    <div class="p-4">
                        <h2 class="text-xl font-bold text-gray-800">${shop.name}</h2>
                        <p class="text-gray-600 text-sm mt-2">${shop.description}</p>
                        <div class="mt-4 flex justify-between items-center text-sm text-blue-500">
                            <span><i class="bi bi-geo-alt-fill"></i> ${shop.city}</span>
                            <span class="font-semibold">${shop.phone}</span>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `<p class="text-red-500">មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!</p>`;
    }
}

fetchAndShowRestaurants();

const LocationsAPI = {
  list: (skip = 0, limit = 10) =>
    apiFetch(`/locations?skip=${skip}&limit=${limit}`),
  get: (id) => apiFetch(`/locations/${id}`),
  withRestaurants: (id) => apiFetch(`/locations/${id}/restaurants`),
  nearby: (lat, lng, r = 5) =>
    apiFetch(
      `/locations/nearby/search?latitude=${lat}&longitude=${lng}&radius_km=${r}`,
    ),

  /* Admin only */
  create: (body) =>
    apiFetch("/locations", { method: "POST", body: JSON.stringify(body) }),
 
  update: (id, body) =>
    apiFetch(`/locations/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => apiFetch(`/locations/${id}`, { method: "DELETE" }),
};


const RestaurantsAPI = {
  list: (skip = 0, limit = 10) =>
    apiFetch(`/restaurants?skip=${skip}&limit=${limit}`),
  get: (id) => apiFetch(`/restaurants/${id}`),
  withFoods: (id) => apiFetch(`/restaurants/${id}/foods`),
  foodItems: (id, skip = 0, limit = 10) =>
    apiFetch(`/restaurants/${id}/food-items?skip=${skip}&limit=${limit}`),
  reviews: (id, skip = 0, limit = 10) =>
    apiFetch(`/restaurants/${id}/reviews?skip=${skip}&limit=${limit}`),

  /* Admin only */
  create: (body) =>
    apiFetch("/restaurants", { method: "POST", body: JSON.stringify(body) }),

  update: (id, body) =>
    apiFetch(`/restaurants/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (id) => apiFetch(`/restaurants/${id}`, { method: "DELETE" }),
};

  //  food items  (Admin: create/update/delete)

const FoodItemsAPI = {
  list: (skip = 0, limit = 10) =>
    apiFetch(`/food-items?skip=${skip}&limit=${limit}`),
  get: (id) => apiFetch(`/food-items/${id}`),
  reviews: (id, skip = 0, limit = 10) =>
    apiFetch(`/food-items/${id}/reviews?skip=${skip}&limit=${limit}`),

  /* Admin only */
  create: (body) =>
    apiFetch("/food-items", { method: "POST", body: JSON.stringify(body) }),

  update: (id, body) =>
    apiFetch(`/food-items/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (id) => apiFetch(`/food-items/${id}`, { method: "DELETE" }),
};


  // food posts  (Auth: create/update/delete own)

const FoodPostsAPI = {
  list: (skip = 0, limit = 10) =>
    apiFetch(`/food-posts?skip=${skip}&limit=${limit}`),
  get: (id) => apiFetch(`/food-posts/${id}`),
  byUser: (userId, skip = 0, limit = 10) =>
    apiFetch(`/users/${userId}/food-posts?skip=${skip}&limit=${limit}`),

  /* Auth required */
  create: (body) =>
    apiFetch("/food-posts", { method: "POST", body: JSON.stringify(body) }),
 
  update: (id, body) =>
    apiFetch(`/food-posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (id) => apiFetch(`/food-posts/${id}`, { method: "DELETE" }),
};


  //  review  (Auth: create / own: delete)

const ReviewsAPI = {
  get: (id) => apiFetch(`/reviews/${id}`),
  create: (body) =>
    apiFetch("/reviews", { method: "POST", body: JSON.stringify(body) }),
  
  delete: (id) => apiFetch(`/reviews/${id}`, { method: "DELETE" }),
};


  //  favorite (Auth required)

const FavoritesAPI = {
  /* Foods */
  addFood: (food_item_id) =>
    apiFetch("/favorites/foods", {
      method: "POST",
      body: JSON.stringify({ food_item_id }),
    }),
  getFoods: (skip = 0, limit = 10) =>
    apiFetch(`/favorites/foods?skip=${skip}&limit=${limit}`),
  removeFood: (food_id) =>
    apiFetch(`/favorites/foods/${food_id}`, { method: "DELETE" }),

  /* Restaurants */
  addRestaurant: (restaurant_id) =>
    apiFetch("/favorites/restaurants", {
      method: "POST",
      body: JSON.stringify({ restaurant_id }),
    }),
  getRestaurants: (skip = 0, limit = 10) =>
    apiFetch(`/favorites/restaurants?skip=${skip}&limit=${limit}`),
  removeRestaurant: (restaurant_id) =>
    apiFetch(`/favorites/restaurants/${restaurant_id}`, { method: "DELETE" }),
};


  //   Toast

function showToast(message, type = "info") {
  let toast = document.getElementById("mhob-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "mhob-toast";
  Object.assign(toast.style, {
  position: "fixed",
  bottom: "24px",
  right: "24px",
  background: "var(--color-bg-primary, white)",
  color: "var(--color-text-primary, #1a1a1a)",
  padding: "12px 20px",
  borderRadius: "12px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontFamily: '"Suwannaphum", serif',
  fontSize: "0.9rem",
  zIndex: "9999",
  minWidth: "220px",
  transform: "translateY(100px)",
  opacity: "0",
  transition: "all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
  borderLeft: "4px solid #3d7a35",
});
    document.body.appendChild(toast);
  }
  const icons = { 
    success: '<i class="bi bi-check-circle-fill"></i>', 
    error: '<i class="bi bi-exclamation-circle-fill"></i>', 
    info: '<i class="bi bi-info-circle-fill"></i>', 
    warning: '<i class="bi bi-exclamation-triangle-fill"></i>' 
  };
  const colors = {
    success: "#3d7a35",
    error: "#ef4444",
    info: "#3d7a35",
    warning: "#f59e0b",
  };
  toast.style.borderLeftColor = colors[type] || colors.info;
  toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
  requestAnimationFrame(() => {
    toast.style.transform = "translateY(0)";
    toast.style.opacity = "1";
  });
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.style.transform = "translateY(100px)";
    toast.style.opacity = "0";
  }, 3500);
}

  //  Helpers

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function renderStars(r = 0) {
  const f = Math.round(r);
  return '<i class="bi bi-star-fill" style="color:#f59e0b; font-size: 0.8rem;"></i>'.repeat(f) + 
         '<i class="bi bi-star-fill" style="color:#ddd; font-size: 0.8rem; opacity:0.3;"></i>'.repeat(5 - f);
}
function truncate(s = "", n = 100) {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

function buildFoodCard(item, onClick = "") {
  const img = item.image_url || "";
  const rating = renderStars(item.average_rating || 0);
  const price = item.price ? `$${parseFloat(item.price).toFixed(2)}` : "";
  const time = item.preparation_time_minutes
    ? `<i class="bi bi-clock"></i> ${item.preparation_time_minutes}min`
    : "";
  return `
    <div class="food-card" ${onClick ? `onclick="${onClick}"` : ""}  style="cursor:pointer;">
      <div class="food-card-img">
        ${img ? `<img src="${img}" alt="${item.name || ""}" onerror="this.parentElement.innerHTML='<i class=\"bi bi-egg-fill\" style=\"font-size:2rem; opacity:0.2;\"></i>'">` : '<i class="bi bi-egg-fill" style="font-size:2rem; opacity:0.2;"></i>'}
      </div>
      <div class="food-card-body">
        <div class="food-card-title">${item.name || item.title || ""}</div>
        <div class="food-card-desc">${truncate(item.description || "", 80)}</div>
        <div class="food-card-footer">
          <span class="food-stars">${rating}</span>
          <span style="font-size:0.75rem;color:#777;">${time} ${price}</span>
        </div>
      </div>
    </div>`;
}

function buildRestaurantCard(r, onClick = "") {
  const img = r.image_url || "";
  const cuisine = (r.cuisine_types || []).slice(0, 2).join(", ") || "—";
  const rating = renderStars(r.average_rating || 0);
  return `
    <div class="food-card" ${onClick ? `onclick="${onClick}"` : ""}  style="cursor:pointer;">
      <div class="food-card-img">
        ${img ? `<img src="${img}" alt="${r.name || ""}" onerror="this.parentElement.innerHTML='<i class=\"bi bi-shop\" style=\"font-size:2rem; opacity:0.2;\"></i>'">` : '<i class="bi bi-shop" style="font-size:2rem; opacity:0.2;"></i>'}
      </div>
      <div class="food-card-body">
        <div class="food-card-title">${r.name || ""}</div>
        <div class="food-card-desc">${cuisine}</div>
        <div class="food-card-footer">
          <span class="food-stars">${rating}</span>
          <span style="font-size:0.75rem;color:#777;">${r.price_range || ""}</span>
        </div>
      </div>
    </div>`;
}

/* ── Navbar auth state ── */
function updateNavAuth() {
  const langBtn = document.querySelector(".nav-lang-btn");
  if (!langBtn) return;
  if (Auth.isLoggedIn()) {
    const user = Auth.getUser();
    const name = user?.full_name?.split(" ")[0] || "Profile";
    langBtn.textContent = name;
    langBtn.href = "/src/pages/Profile_Page/profile.html";
  } else {
    langBtn.textContent = "ចុះឈ្មោះ";
    langBtn.href = "/src/pages/Login_Page/register.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateNavAuth();
});