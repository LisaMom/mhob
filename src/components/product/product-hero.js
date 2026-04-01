/* product-hero.js */
(function () {
  const root = document.getElementById('product-hero-root');
  if (!root) return;

  /* ── Inject scoped styles ─────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* === HERO SHELL === */
    .ph-hero {
      position: relative;
      min-height: 420px;
      overflow: hidden;
      display: flex;
      align-items: center;
      background: #0d0d0d;
      padding-top: 70px;
    }

    /* Ambient gradient blobs */
    .ph-hero::before,
    .ph-hero::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      opacity: 0.55;
      pointer-events: none;
    }
    .ph-hero::before {
      width: 520px; height: 520px;
      background: radial-gradient(circle, #c8973a 0%, transparent 70%);
      top: -160px; left: -120px;
    }
    .ph-hero::after {
      width: 400px; height: 400px;
      background: radial-gradient(circle, #7b3f00 0%, transparent 70%);
      bottom: -140px; right: -80px;
    }

    /* Subtle dot-grid texture */
    .ph-hero-grid {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
    }

    /* === LAYOUT === */
    .ph-inner {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 52px 32px 48px;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 32px;
      align-items: center;
    }

    /* === LEFT: TEXT STACK === */
    .ph-left {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* Pill badge */
    .ph-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(200, 151, 58, 0.14);
      border: 1px solid rgba(200, 151, 58, 0.38);
      color: var(--gold, #c8973a);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 99px;
      width: fit-content;
      margin-bottom: 20px;
      animation: ph-fade-up 0.5s ease both;
    }
    .ph-badge-dot {
      width: 7px; height: 7px;
      background: var(--gold, #c8973a);
      border-radius: 50%;
      animation: ph-pulse 1.8s ease-in-out infinite;
    }
    @keyframes ph-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }

    /* Main headline */
    .ph-title {
      font-family: 'Khmer OS Muol Light', 'Noto Serif Khmer', 'Battambang', serif;
      font-size: clamp(1.9rem, 4.5vw, 3.1rem);
      font-weight: 800;
      line-height: 1.2;
      color: #f5f0e8;
      margin: 0 0 16px;
      animation: ph-fade-up 0.55s 0.1s ease both;
    }
    .ph-title-accent {
      color: var(--gold, #c8973a);
      position: relative;
      display: inline-block;
    }
    .ph-title-accent::after {
      content: '';
      position: absolute;
      left: 0; bottom: -4px;
      width: 100%; height: 3px;
      background: linear-gradient(90deg, var(--gold, #c8973a), transparent);
      border-radius: 2px;
    }

    /* Sub-copy */
    .ph-subtitle {
      font-size: 0.88rem;
      color: rgba(245, 240, 232, 0.55);
      line-height: 1.65;
      max-width: 420px;
      margin: 0 0 28px;
      animation: ph-fade-up 0.55s 0.18s ease both;
    }

    /* Stat strip */
    .ph-stats {
      display: flex;
      gap: 28px;
      animation: ph-fade-up 0.55s 0.26s ease both;
    }
    .ph-stat {
      display: flex;
      flex-direction: column;
    }
    .ph-stat-num {
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--gold, #c8973a);
      line-height: 1;
    }
    .ph-stat-label {
      font-size: 0.72rem;
      color: rgba(245, 240, 232, 0.45);
      margin-top: 3px;
      letter-spacing: 0.04em;
    }
    .ph-stat-divider {
      width: 1px;
      background: rgba(255,255,255,0.1);
      align-self: stretch;
    }

    /* === RIGHT: VISUAL STACK === */
    .ph-right {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: ph-fade-in 0.7s 0.2s ease both;
    }

    /* Rotating outer ring */
    .ph-ring {
      position: absolute;
      width: 230px; height: 230px;
      border-radius: 50%;
      border: 1.5px dashed rgba(200, 151, 58, 0.28);
      animation: ph-spin 22s linear infinite;
    }
    .ph-ring-inner {
      width: 186px; height: 186px;
      border: 1.5px solid rgba(200, 151, 58, 0.12);
      animation: ph-spin 14s linear infinite reverse;
    }
    @keyframes ph-spin {
      to { transform: rotate(360deg); }
    }

    /* Glow disc */
    .ph-disc {
      width: 160px; height: 160px;
      border-radius: 50%;
      background: radial-gradient(circle at 38% 38%, #e8a83b 0%, #7b3f00 60%, #1a0e00 100%);
      box-shadow:
        0 0 0 8px rgba(200, 151, 58, 0.12),
        0 0 60px rgba(200, 151, 58, 0.35),
        0 20px 60px rgba(0,0,0,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4.8rem;
      position: relative;
      z-index: 2;
      animation: ph-float 4s ease-in-out infinite;
    }
    @keyframes ph-float {
      0%, 100% { transform: translateY(0px) rotate(-2deg); }
      50%       { transform: translateY(-12px) rotate(2deg); }
    }

    /* Orbit chips */
    .ph-orbit-chip {
      position: absolute;
      z-index: 3;
      background: rgba(20, 14, 4, 0.78);
      border: 1px solid rgba(200, 151, 58, 0.3);
      border-radius: 99px;
      padding: 6px 12px;
      font-size: 0.78rem;
      color: #f5f0e8;
      white-space: nowrap;
      backdrop-filter: blur(6px);
      box-shadow: 0 4px 18px rgba(0,0,0,0.45);
      animation: ph-float 4s ease-in-out infinite;
    }
    .ph-orbit-chip:nth-child(1) { top: -14px;  right: -28px; animation-delay: 0.6s; }
    .ph-orbit-chip:nth-child(2) { bottom: 8px; left: -40px;  animation-delay: 1.4s; }
    .ph-orbit-chip:nth-child(3) { top: 50%;    right: -52px; transform: translateY(-50%); animation-delay: 0.2s; }

    /* === KEYFRAMES === */
    @keyframes ph-fade-up {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes ph-fade-in {
      from { opacity: 0; transform: scale(0.88); }
      to   { opacity: 1; transform: scale(1); }
    }

    /* === RESPONSIVE === */
    @media (max-width: 640px) {
      .ph-inner {
        grid-template-columns: 1fr;
        padding: 40px 20px 36px;
        text-align: center;
      }
      .ph-badge    { margin-inline: auto; }
      .ph-subtitle { margin-inline: auto; }
      .ph-stats    { justify-content: center; }
      .ph-right    { margin-top: 8px; }
      .ph-orbit-chip:nth-child(3) { display: none; }
    }
  `;
  document.head.appendChild(style);

  /* ── Markup ───────────────────────────────────────────────────── */
  root.innerHTML = `
    <section class="ph-hero" aria-label="Hero">
      <div class="ph-hero-grid"></div>

      <div class="ph-inner">

        <!-- LEFT -->
        <div class="ph-left">
          <span class="ph-badge">
            <span class="ph-badge-dot"></span>
            ម្ហូបដ៏ពេញនិយម
          </span>

          <h1 class="ph-title">
            រកឃើញ<span class="ph-title-accent">រសជាតិ</span><br>
            ដែលអ្នកស្រលាញ់
          </h1>

          <p class="ph-subtitle">
            រូបមន្ត ម្ហូប និងភោជនីយដ្ឋានល្អៗ — ជ្រើសរើសពីការប្រមូលផ្ដុំដ៏ធំ
            ដែលរៀបចំតាមរសជាតិអ្នក
          </p>

          <div class="ph-stats">
            <div class="ph-stat">
              <span class="ph-stat-num">1,200+</span>
              <span class="ph-stat-label">រូបមន្ត</span>
            </div>
            <div class="ph-stat-divider"></div>
            <div class="ph-stat">
              <span class="ph-stat-num">340+</span>
              <span class="ph-stat-label">ភោជនីយដ្ឋាន</span>
            </div>
            <div class="ph-stat-divider"></div>
            <div class="ph-stat">
              <span class="ph-stat-num">50+</span>
              <span class="ph-stat-label">ប្រភេទម្ហូប</span>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="ph-right">
          <div class="ph-ring"></div>
          <div class="ph-ring ph-ring-inner"></div>

          <div class="ph-disc"><i class="bi bi-egg-fried"></i></div>

          <span class="ph-orbit-chip"><i class="bi bi-bowl-fill"></i> អាហារខ្មែរ</span>
          <span class="ph-orbit-chip"><i class="bi bi-cup-hot-fill"></i> ស៊ូស៊ី</span>
          <span class="ph-orbit-chip"><i class="bi bi-fire"></i> ម្ហូបលំដាប់</span>
        </div>

      </div>
    </section>`;
})();