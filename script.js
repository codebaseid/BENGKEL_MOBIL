/* ============================================================
   script.js – Clean, Fixed & Optimized
   ============================================================ */

/* ELEMENTS */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const wibClock = document.getElementById("wibClock");
const yearEl = document.getElementById("year");

/* ============================================================
   DICTIONARY (i18n)
   ============================================================ */
const DICT = {
  nav_home: { id: "Beranda", en: "Home" },
  nav_services: { id: "Layanan", en: "Services" },
  nav_map: { id: "Lokasi", en: "Location" },
  nav_contact: { id: "Kontak", en: "Contact" },

  hero_title: { id: "Perawatan Mobil Tingkat Profesional", en: "Professional Car Service" },
  hero_sub: { id: "Teknisi berpengalaman • Alat modern • Hasil terjamin", en: "Experienced technicians • Modern tools • Guaranteed results" },
  cta_contact: { id: "Hubungi Kami", en: "Contact Us" },
  cta_services: { id: "Lihat Layanan", en: "View Services" },

  meta_time: { id: "Waktu (WIB)", en: "Time (WIB)" },
  meta_open: { id: "Jam Operasional", en: "Opening Hours" },
  meta_hours: { id: "08:00 - 17:00 WIB", en: "08:00 - 17:00 WIB" },

  services_title: { id: "Layanan Kami", en: "Our Services" },
  services_sub: { id: "Ditangani oleh teknisi bersertifikat dengan proses kerja presisi.", en: "Handled by certified technicians with precise workflows." },

  srv_battery_title: { id: "Jual Aki & Cas Aki", en: "Battery Sales & Charging" },
  srv_battery_text: { id: "Penggantian aki berkualitas dan pengecasan aman menggunakan peralatan bengkel profesional.", en: "Quality battery replacement and safe charging using professional equipment." },

  srv_rewind_title: { id: "Gulung Ulang Dynamo (3 Phasa & 1 Phasa)", en: "Dynamo Rewinding (3 & 1 Phase)" },
  srv_rewind_text: { id: "Gulung ulang dynamo presisi sesuai spesifikasi pabrik untuk performa tahan lama.", en: "Precision rewinding to factory specifications." },

  srv_starter_title: { id: "Service Dynamo Starter & Alternator", en: "Starter & Alternator Service" },
  srv_starter_text: { id: "Diagnosis, perbaikan, dan tuning starter serta alternator untuk berbagai merek.", en: "Diagnostics, repairs and tuning for starters & alternators." },

  srv_radiator_title: { id: "Service Radiator", en: "Radiator Service" },
  srv_radiator_text: { id: "Pembersihan, penggantian seal, dan perbaikan kebocoran untuk mencegah overheat.", en: "Cleaning, seal replacement and leak repair." },

  srv_susp_title: { id: "Service Suspensi", en: "Suspension Service" },
  srv_susp_text: { id: "Perbaikan shockbreaker, bushing, serta align untuk kenyamanan dan stabilitas berkendara.", en: "Shock absorber and bushing repairs + wheel alignment." },

  srv_eps_title: { id: "Service Setir EPS Elektrik", en: "Electric EPS Steering Service" },
  srv_eps_text: { id: "Diagnosis EPS dengan alat modern; penggantian komponen dan kalibrasi.", en: "EPS diagnostics, parts replacement & calibration." },

  srv_chassis_title: { id: "Service Kaki-Kaki Mobil", en: "Chassis / Underbody Service" },
  srv_chassis_text: { id: "Perbaikan tie rod, ball joint, arm, serta pemeriksaan geometrik roda.", en: "Tie rod, ball joint, arm repairs and alignment." },

  map_title: { id: "Lokasi Bengkel", en: "Workshop Location" },
  map_sub: { id: "Kunjungi kami untuk konsultasi dan pengecekan langsung.", en: "Visit us for consultation and inspection." },

  contact_title: { id: "Kontak & Informasi", en: "Contact & Info" },
  contact_sub: { id: "Hubungi kami untuk booking servis atau konsultasi teknis.", en: "Contact us for booking or technical consultation." }
};

/* ============================================================
   i18n Translation
   ============================================================ */
function translatePage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (DICT[key]) {
      el.textContent = lang === "en" ? DICT[key].en : DICT[key].id;
    }
  });
}

function setLanguage(lang) {
  body.setAttribute("data-lang", lang);
  localStorage.setItem("bft_lang", lang);
  if (langToggle) langToggle.textContent = lang === "en" ? "EN" : "ID";
  translatePage(lang);
}

/* ============================================================
   THEME HANDLER
   ============================================================ */
function setTheme(theme) {
  body.classList.remove("theme-light", "theme-dark");

  if (theme === "dark") {
    body.classList.add("theme-dark");
    themeToggle.textContent = "Gelap";
  } else {
    body.classList.add("theme-light");
    themeToggle.textContent = "Cerah";
  }

  localStorage.setItem("bft_theme", theme);
}

/* ============================================================
   WIB CLOCK
   ============================================================ */
function startWIBClock() {
    function update() {
        const now = new Date();

        // WIB = UTC + 7
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const wib = new Date(utc + (7 * 3600000));

        let hh = String(wib.getHours()).padStart(2, "0");
        let mm = String(wib.getMinutes()).padStart(2, "0");
        let ss = String(wib.getSeconds()).padStart(2, "0");

        if (wibClock) wibClock.textContent = `${hh}:${mm}:${ss} WIB`;
    }
    update();
    setInterval(update, 1000);
}

/* ============================================================
   MOBILE NAV
   ============================================================ */
function toggleMobileNav() {
  const isOpen = body.classList.toggle("nav-open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", isOpen);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("bft_theme");
  setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  const savedLang = localStorage.getItem("bft_lang") || "id";
  setLanguage(savedLang);

  document.querySelectorAll(".coming").forEach(c => {
    c.style.display = "none";
  });

  startWIBClock();

  themeToggle?.addEventListener("click", () => {
    setTheme(body.classList.contains("theme-dark") ? "light" : "dark");
  });

  langToggle?.addEventListener("click", () => {
    setLanguage(body.getAttribute("data-lang") === "en" ? "id" : "en");
  });

  menuToggle?.addEventListener("click", toggleMobileNav);

  document.querySelectorAll(".nav-menu a").forEach(a =>
    a.addEventListener("click", () => {
      if (body.classList.contains("nav-open")) toggleMobileNav();
    })
  );

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && body.classList.contains("nav-open")) toggleMobileNav();
  });
});

/* ============================================================
   GALLERY FILTER & VIEWER
   ============================================================ */

const filterBtns = document.querySelectorAll(".gf-btn");
const galleryItems = document.querySelectorAll(".g-item");
const viewer = document.getElementById("viewer");
const viewerContent = document.getElementById("viewerContent");
const viewerClose = document.getElementById("viewerClose");

/* FILTER */
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    galleryItems.forEach(item => {
      const isMatch = filter === "all" || item.classList.contains(filter);
      item.style.display = isMatch ? "block" : "none";
    });

    document.querySelectorAll(".coming").forEach(c => {
      c.style.display = "none";
    });
  });
});

/* VIEWER OPEN */
galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    viewer.classList.add("show");
    body.style.overflow = "hidden"; // lock scroll

    viewerContent.innerHTML = "";

    const media = item.querySelector("img, video").cloneNode(true);
    if (media.tagName === "VIDEO") media.controls = true;

    viewerContent.appendChild(media);
  });
});

/* VIEWER CLOSE */
function closeViewer() {
  viewer.classList.remove("show");
  body.style.overflow = "";
}

viewerClose.addEventListener("click", closeViewer);
viewer.addEventListener("click", e => {
  if (e.target === viewer) closeViewer();

});

/* ============================================================
   AUTO REFRESH WHEN USER RETURNS TO TAB
   ============================================================ */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        window.location.href = "index.html";
    }
});

/* =========================================================
 LAZY LOAD IMAGES (BLUR-UP EFFECT)
 ===========================================================*/
const lazyImages = document.querySelectorAll(".lazy-img");

const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        img.src = img.dataset.src;

        img.onload = () => {
            img.classList.add("loaded");
        };

        observer.unobserve(img);
    });
}, {
    root: null,
    threshold: 0.1
});

lazyImages.forEach(img => lazyObserver.observe(img));