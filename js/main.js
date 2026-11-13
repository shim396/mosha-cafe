/* ===== موشا — التفاعلات ===== */

// ===== شاشة الافتتاح الفاخرة =====
(function luxuryLoader() {
  const loader = document.getElementById("loader");
  const SHOW_MS = 4800;           // مدة العرض قبل الحركة للداخل
  let done = false;

  const finish = () => {
    if (done) return; done = true;
    loader.classList.add("out");
    document.body.classList.remove("is-loading");
    setTimeout(() => loader.classList.add("gone"), 1250);
  };
  const start = () => {
    requestAnimationFrame(() => loader.classList.add("play"));
    if (location.hash === "#preview-loader") return; // للمعاينة: تبقى الشاشة ثابتة
    setTimeout(finish, SHOW_MS);
  };

  // انتظار سريع لتحميل خطوط النصوص المساعدة (بحد أقصى 600ms)
  Promise.race([
    document.fonts.ready,
    new Promise(r => setTimeout(r, 600))
  ]).then(start);

  // تخطّي بالضغط
  loader.addEventListener("click", finish);
})();

// الهيدر عند النزول + شريط التقدّم والبارالاكس الخفيف
const nav = document.getElementById("nav");
const progressBar = document.getElementById("scrollProgress");
const storyBox = document.querySelector(".story-images");
let rafTicking = false;

function onScrollFrame() {
  rafTicking = false;
  const y = scrollY;
  nav.classList.toggle("scrolled", y > 60);
  if (progressBar) {
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  }
  if (storyBox && innerWidth > 960) {
    const rect = storyBox.getBoundingClientRect();
    const center = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
    if (Math.abs(center) < 1.2) {
      storyBox.style.setProperty("--pyA", `${(center * -18).toFixed(1)}px`);
      storyBox.style.setProperty("--pyB", `${(center * 18).toFixed(1)}px`);
    }
  } else if (storyBox) {
    storyBox.style.setProperty("--pyA", "0px");
    storyBox.style.setProperty("--pyB", "0px");
  }
}
addEventListener("scroll", () => {
  if (!rafTicking) { rafTicking = true; requestAnimationFrame(onScrollFrame); }
}, { passive: true });
onScrollFrame();

// قائمة الموبايل + إغلاق بسلاسة
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const drawerClose = document.getElementById("drawerClose");
const setDrawer = open => {
  navLinks.classList.toggle("open", open);
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
};
burger.onclick = () => setDrawer(!navLinks.classList.contains("open"));
if (drawerClose) drawerClose.onclick = () => setDrawer(false);
navLinks.querySelectorAll("a").forEach(a => a.onclick = () => setDrawer(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") setDrawer(false); });

// شفافية الناف وتبديل التباين تلقائياً فوق الأقسام الداكنة أو الوضع الليلي
const navEl = document.getElementById("nav");
function updateNavTone() {
  if (!navEl) return;
  navEl.classList.toggle("scrolled", scrollY > 60);
  const navY = 36;
  let onDark = document.documentElement.dataset.theme === "dark";
  if (!onDark) {
    for (const sec of document.querySelectorAll(".signature, .footer")) {
      const r = sec.getBoundingClientRect();
      if (r.top <= navY && r.bottom >= navY) { onDark = true; break; }
    }
  }
  navEl.classList.toggle("on-dark", onDark);
}
window.addEventListener("scroll", updateNavTone, { passive: true });

// مفتوح / مغلق حسب الوقت (الجمعة من 4 عصراً)
function updateOpenStatus() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const friday = now.getDay() === 5;
  const open = friday ? 16 * 60 : 9 * 60 + 30;
  const close = 23 * 60 + 30;
  const isOpen = mins >= open && mins < close;
  const en = document.documentElement.lang === "en";
  document.getElementById("openStatus").textContent = en
    ? (isOpen ? "We Are Open Now" : "Currently Closed")
    : (isOpen ? "نحن مفتوحون الآن" : "مغلق حالياً");
  document.getElementById("openHours").textContent = en
    ? (friday ? "Today: 4:00 PM — 11:30 PM" : "9:30 AM — 11:30 PM")
    : (friday ? "اليوم: 4:00 عصراً — 11:30 مساءً" : "9:30 صباحاً — 11:30 مساءً");
  document.querySelector(".dot-live")?.classList.toggle("closed", !isOpen);
}

// ==========================================================
// الوضع الليلي وتبديل اللغة (AR ⇄ EN)
// ==========================================================
const I18N_EN = {
  "loader.tag": "Specialty Coffee · Since Your First Cup",
  "nav.home": "Home",
  "nav.story": "Our Story",
  "nav.menu": "Menu",
  "nav.store": "Mosha Store",
  "nav.gallery": "Atmosphere",
  "nav.visit": "Visit Us",
  "nav.order": "Order Now",
  "hero.eyebrow": "MOSHA CAFE · Since the First Sip",
  "hero.sub": "Specialty Coffee <span>·</span> Desserts <span>·</span> Cozy Atmosphere",
  "hero.cta1": "Explore the Menu",
  "hero.cta2": "Our Location",
  "stamp.bot": "SPECIALTY COFFEE •",
  "story.eyebrow": "Our Story",
  "story.title": "A Cup Made for You,<br><em>A Place Your Heart Unwinds</em>",
  "story.p1": "At Mosha, we believe coffee is more than a drink — it is a moment. We select our beans carefully, roast them with love, and serve them in vintage floral cups that feel like our grandmothers' homes.",
  "story.p2": "Every corner at Mosha is designed so you can unwind comfortably, get work done, catch up with friends, or simply savor your cup.",
  "stats.followers": "Coffee Lovers & Followers",
  "stats.items": "Menu Creations",
  "stats.hours": "Hours Daily",
  "feat.1.t": "Curated Roasts",
  "feat.1.d": "Specialty Brazilian & Ethiopian beans roasted with care.",
  "feat.2.t": "Daily Desserts",
  "feat.2.d": "Fresh sweets baked and prepared daily in Mosha's kitchen.",
  "feat.3.t": "Calm Atmosphere",
  "feat.3.d": "A peaceful space, fast Wi-Fi, and photo-worthy corners.",
  "feat.4.t": "Gathering Boxes",
  "feat.4.d": "Curated coffee boxes for road trips, hosts, and gatherings.",
  "menu.eyebrow": "Menu",
  "menu.title": "Pick Today's Mood",
  "menu.note": "Prices in Yemeni Riyal · Small — Large",
  "menu.wifi": "High-speed 5G Wi-Fi available for our guests",
  "sig.eyebrow": "Mosha Signature",
  "sig.title": "Mosha Latte<br><em>The Flavor That Became Our Name</em>",
  "sig.desc": "Specialty espresso, velvety milk, and Mosha's secret touch. Try it once, and you'll come back for it every day.",
  "sig.cta": "Explore the Menu",
  "sig.badge": "Mosha Specialty Origin",
  "store.eyebrow": "Mosha Store",
  "store.title": "Take Mosha Home With You",
  "store.1.t": "Mosha Coffee Beans",
  "store.1.d": "Brazilian, Ethiopian & Colombian — freshly roasted.",
  "store.1.p": "From 35,000 YER",
  "store.2.t": "Floral Porcelain Cups",
  "store.2.d": "A classic teacup set with vintage floral motifs.",
  "store.2.p": "12,000 YER",
  "store.3.badge": "Seasonal",
  "store.3.t": "Winter Gathering Box",
  "store.3.d": "2L coffee + cups + table mats · Made for cozy evenings together.",
  "store.3.p": "14,000 YER",
  "gal.eyebrow": "Atmosphere",
  "gal.title": "Moments From Mosha",
  "gal.cta": "Follow @mosha.cofe on Instagram",
  "visit.eyebrow": "Visit Us",
  "visit.title": "We Look Forward to Seeing You",
  "visit.loc.t": "Location",
  "visit.loc.d": "Seiyun — Opposite Al-Taweelah Park",
  "visit.daily.t": "Daily",
  "visit.daily.d": "9:30 AM — 11:30 PM",
  "visit.fri.t": "Friday",
  "visit.fri.d": "4:00 PM — 11:30 PM",
  "visit.mapBtn": "Open in Maps",
  "visit.msgBtn": "Message Us",
  "visit.badge": "Mosha Cafe — Seiyun",
  "footer.tag": "Specialty Coffee · Desserts · Calm Vibes",
  "footer.copy": "Mosha Cafe — All Rights Reserved",
};

const arTextCache = {};
const arHtmlCache = {};
document.querySelectorAll("[data-i18n]").forEach(el => {
  const k = el.dataset.i18n;
  if (!(k in arTextCache)) arTextCache[k] = el.textContent;
});
document.querySelectorAll("[data-i18n-html]").forEach(el => {
  const k = el.dataset.i18nHtml;
  if (!(k in arHtmlCache)) arHtmlCache[k] = el.innerHTML;
});
const TITLE_AR = document.title;
const TITLE_EN = "Mosha Cafe | Specialty Coffee · Seiyun";

let currentLang = document.documentElement.lang === "en" ? "en" : "ar";
let currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";

function syncThemeButtons() {
  const dark = currentTheme === "dark";
  const en = currentLang === "en";
  const label = en ? (dark ? "Light Mode" : "Dark Mode") : (dark ? "الوضع النهاري" : "الوضع الليلي");
  document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
    btn.title = label;
    btn.setAttribute("aria-label", label);
    const icWrap = btn.querySelector("[data-icon]");
    if (icWrap) {
      icWrap.dataset.icon = dark ? "sun" : "moon";
      icWrap.innerHTML = icon(dark ? "sun" : "moon");
    }
    const lbl = btn.querySelector('[data-i18n="theme.label"]');
    if (lbl) lbl.textContent = label;
  });
}

function applyTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = currentTheme;
  try { localStorage.setItem("mosha-theme", currentTheme); } catch {}
  syncThemeButtons();
  updateNavTone();
}

// ===== فيديوهات الواجهة المتقلّبة =====
// ضع الفيديوهات داخل مجلد videos/ بهذه الأسماء (أي فيديو ناقص يتخطّاه تلقائياً)
const HERO_VIDEOS = ["videos/hero-1.mp4", "videos/hero-2.mp4", "videos/hero-3.mp4", "videos/hero-4.mp4"];
const SLIDE_SECONDS = 7; // مدة كل فيديو قبل ما يتقلّب

(function heroSlider() {
  const box = document.getElementById("heroMedia");
  const dotsBox = document.getElementById("heroDots");
  const ready = [];
  let current = -1, timer;

  HERO_VIDEOS.forEach((src, order) => {
    const v = document.createElement("video");
    Object.assign(v, { src, muted: true, loop: true, playsInline: true, preload: "auto" });
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    v.className = "hero-video";
    v.addEventListener("loadeddata", () => {
      v.dataset.order = order;
      box.appendChild(v);
      ready.push(v);
      ready.sort((a, b) => a.dataset.order - b.dataset.order);
      buildDots();
      if (current === -1) show(0);
    }, { once: true });
    v.addEventListener("error", () => v.remove(), { once: true });
  });

  function buildDots() {
    dotsBox.innerHTML = ready.length > 1
      ? ready.map((_, i) => `<button aria-label="فيديو ${i + 1}" style="--dur:${SLIDE_SECONDS}s"></button>`).join("")
      : "";
    dotsBox.querySelectorAll("button").forEach((b, i) => b.onclick = () => show(i));
    markDot();
  }
  function markDot() {
    dotsBox.querySelectorAll("button").forEach((b, i) => {
      b.classList.remove("active"); void b.offsetWidth; // إعادة تشغيل الشريط
      b.classList.toggle("active", i === current);
    });
  }
  function show(i) {
    const next = ready[i];
    if (!next) return;
    ready.forEach(v => { if (v !== next) { v.classList.remove("active"); setTimeout(() => v.pause(), 1400); } });
    next.currentTime = 0;
    next.play().catch(() => {});
    next.classList.add("active");
    current = i;
    markDot();
    clearTimeout(timer);
    if (ready.length > 1) timer = setTimeout(() => show((current + 1) % ready.length), SLIDE_SECONDS * 1000);
  }
  // إيقاف عند إخفاء التبويب لتوفير البطارية
  document.addEventListener("visibilitychange", () => {
    const v = ready[current]; if (!v) return;
    document.hidden ? (v.pause(), clearTimeout(timer)) : show(current);
  });
})();

// المنيو
const tabs = document.getElementById("menuTabs");
const grid = document.getElementById("menuGrid");
const fmt = p => p.split("-").map(n => Number(n).toLocaleString("en-US")).join(" — ");
let activeMenuId = MENU[0].id;

function buildMenuTabs() {
  const en = currentLang === "en";
  tabs.innerHTML = MENU.map(c => `<button class="menu-tab" data-id="${c.id}">${icon(c.icon)}<span>${en ? c.en : c.title}</span></button>`).join("");
}

function renderMenu(id) {
  activeMenuId = id;
  const cat = MENU.find(c => c.id === id);
  const en = currentLang === "en";
  const cur = en ? "YER" : "ر.ي";
  grid.innerHTML = cat.items.map((it, i) => {
    const nm = en ? (it.nameEn || it.name) : it.name;
    const tg = en ? (it.tagEn || it.tag) : it.tag;
    return `
    <div class="menu-item" style="animation-delay:${i * 40}ms">
      <div class="mi-thumb ph">${it.img ? `<img src="images/menu/${it.img}" alt="${nm}" onerror="this.remove()">` : ""}</div>
      <div class="mi-info"><span class="mi-name">${nm}</span>${tg ? `<span class="mi-tag">${tg}</span>` : ""}</div>
      <div class="mi-price">${fmt(it.price)} <small>${cur}</small></div>
    </div>`;
  }).join("");
  tabs.querySelectorAll(".menu-tab").forEach(t => t.classList.toggle("active", t.dataset.id === id));
}
tabs.onclick = e => { const b = e.target.closest(".menu-tab"); if (b) renderMenu(b.dataset.id); };

function applyLang(lang) {
  currentLang = lang === "en" ? "en" : "ar";
  const en = currentLang === "en";
  document.documentElement.lang = currentLang;
  document.documentElement.dir = en ? "ltr" : "rtl";
  document.title = en ? TITLE_EN : TITLE_AR;
  try { localStorage.setItem("mosha-lang", currentLang); } catch {}

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.dataset.i18n;
    if (k === "theme.label") return;
    if (k === "lang.other") { el.textContent = en ? "العربية" : "English"; return; }
    if (k === "lang.short") { el.textContent = en ? "AR" : "EN"; return; }
    el.textContent = en ? (I18N_EN[k] ?? arTextCache[k] ?? el.textContent) : (arTextCache[k] ?? el.textContent);
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const k = el.dataset.i18nHtml;
    el.innerHTML = en ? (I18N_EN[k] ?? arHtmlCache[k] ?? el.innerHTML) : (arHtmlCache[k] ?? el.innerHTML);
  });

  if (burger) burger.setAttribute("aria-label", en ? "Menu" : "القائمة");
  if (drawerClose) drawerClose.setAttribute("aria-label", en ? "Close menu" : "إغلاق القائمة");
  document.querySelectorAll("[data-lang-toggle]").forEach(btn => {
    const label = en ? "التبديل إلى العربية" : "Switch to English";
    btn.title = label;
    btn.setAttribute("aria-label", label);
  });

  syncThemeButtons();
  updateOpenStatus();
  buildMenuTabs();
  renderMenu(activeMenuId);
}

document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
  btn.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));
});
document.querySelectorAll("[data-lang-toggle]").forEach(btn => {
  btn.addEventListener("click", () => applyLang(currentLang === "en" ? "ar" : "en"));
});

applyTheme(currentTheme);
applyLang(currentLang);

// المعرض — 9 صور داخل images/gallery/ من 1.jpg إلى 9.jpg
const GALLERY_COUNT = 9;
const gGrid = document.getElementById("galleryGrid");
gGrid.innerHTML = Array.from({ length: GALLERY_COUNT }, (_, i) =>
  `<div class="g-item ph reveal"><img src="images/gallery/${i + 1}.jpg" alt="موشا" loading="lazy" onerror="this.remove()"></div>`
).join("");

// تكبير الصور
const lb = document.getElementById("lightbox");
gGrid.onclick = e => {
  const img = e.target.closest(".g-item")?.querySelector("img");
  if (!img) return;
  lb.querySelector("img").src = img.src;
  lb.classList.add("open");
};
lb.onclick = () => lb.classList.remove("open");
addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("open"); });

// تأخير متدرّج للبطاقات (Stagger) داخل كل شبكة + حركة الظهور + العدادات
document.querySelectorAll(".features-grid, .store-grid, .gallery-grid").forEach(box => {
  box.querySelectorAll(".reveal").forEach((el, i) => el.style.setProperty("--d", `${(i % 6) * 85}ms`));
});

const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    en.target.querySelectorAll("[data-count]").forEach(countUp);
    io.unobserve(en.target);
  });
}, { threshold: .12, rootMargin: "0px 0px -30px 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

function countUp(el) {
  const end = +el.dataset.count, start = performance.now(), dur = 1800;
  (function tick(t) {
    const p = Math.min((t - start) / dur, 1);
    const v = Math.floor(end * (1 - Math.pow(1 - p, 3)));
    el.textContent = end >= 1000 ? (v / 1000).toFixed(1) + "K" : v + "+";
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

document.getElementById("year").textContent = new Date().getFullYear();
