/* script.js - theme, language, wib clock, mobile nav */
/* Paste this whole file into script.js */

const body = document.body;
const themeToggle = document.getElementById("themeToggle") || document.querySelector('[id="themeToggle"]');
const langToggle = document.getElementById("langToggle") || document.querySelector('[id="langToggle"]');
const menuToggle = document.getElementById("menuToggle") || document.querySelector('[id="menuToggle"]');
const navMenu = document.getElementById("navMenu") || document.querySelector('.nav-menu');
const wibClock = document.getElementById("wibClock");
const yearEl = document.getElementById("year");

/* i18n dictionary */
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
  srv_battery_text: { id: "Penggantian aki berkualitas dan pengecasan aman menggunakan peralatan bengkel profesional.", en: "Quality battery replacement and safe charging using professional-grade equipment." },

  srv_rewind_title: { id: "Gulung Ulang Dynamo (3 Phasa & 1 Phasa)", en: "Dynamo Rewinding (3 & 1 Phase)" },
  srv_rewind_text: { id: "Gulung ulang dynamo presisi sesuai spesifikasi pabrik untuk performa tahan lama.", en: "Precision dynamo rewinding to factory specifications for long-lasting performance." },

  srv_starter_title: { id: "Service Dynamo Starter & Alternator", en: "Starter & Alternator Service" },
  srv_starter_text: { id: "Diagnosis, perbaikan, dan tuning starter serta alternator untuk berbagai merek.", en: "Full diagnostics, repair and tuning for starters and alternators of various brands." },

  srv_radiator_title: { id: "Service Radiator", en: "Radiator Service" },
  srv_radiator_text: { id: "Pembersihan, penggantian seal, dan perbaikan kebocoran untuk mencegah overheat.", en: "Cleaning, seal replacement and leak repair to prevent overheating." },

  srv_susp_title: { id: "Service Suspensi", en: "Suspension Service" },
  srv_susp_text: { id: "Perbaikan shockbreaker, bushing, serta align untuk kenyamanan dan stabilitas berkendara.", en: "Shock absorber, bushing repair and wheel alignment for comfort and stability." },

  srv_eps_title: { id: "Service Setir EPS Elektrik", en: "Electric EPS Steering Service" },
  srv_eps_text: { id: "Diagnosis EPS dengan alat modern; penggantian komponen dan kalibrasi.", en: "EPS system diagnosis with modern tools; parts replacement and calibration." },

  srv_chassis_title: { id: "Service Kaki-Kaki Mobil", en: "Chassis / Underbody Service" },
  srv_chassis_text: { id: "Perbaikan tie rod, ball joint, arm, serta pemeriksaan geometrik roda.", en: "Tie rod, ball joint and arm repairs plus wheel geometry checks." },

  map_title: { id: "Lokasi Bengkel", en: "Workshop Location" },
  map_sub: { id: "Kunjungi kami untuk konsultasi dan pengecekan langsung.", en: "Visit us for consultation and on-site inspection." },

  contact_title: { id: "Kontak & Informasi", en: "Contact & Info" },
  contact_sub: { id: "Hubungi kami untuk booking servis atau konsultasi teknis.", en: "Contact us to book service or technical consultation." }
};

/* Helper: translate elements with data-i18n attribute */
function translatePage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const entry = DICT[key];
    if (!entry) return;
    el.textContent = (lang === 'en') ? entry.en : entry.id;
  });
}

/* Theme handling */
function setTheme(theme) {
  body.classList.remove('theme-light','theme-dark');
  if (theme === 'dark') {
    body.classList.add('theme-dark');
    localStorage.setItem('bft_theme','dark');
    if (themeToggle) themeToggle.textContent = 'Gelap';
  } else {
    body.classList.add('theme-light');
    localStorage.setItem('bft_theme','light');
    if (themeToggle) themeToggle.textContent = 'Cerah';
  }
}

/* Language handling */
function setLanguage(lang) {
  body.setAttribute('data-lang', lang);
  localStorage.setItem('bft_lang', lang);
  if (langToggle) langToggle.textContent = (lang === 'en') ? 'EN' : 'ID';
  translatePage(lang);
}

/* WIB clock (UTC+7) */
function startWIBClock() {
  function update() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const wib = new Date(utc + (7 * 3600000));
    const hh = String(wib.getHours()).padStart(2,'0');
    const mm = String(wib.getMinutes()).padStart(2,'0');
    const ss = String(wib.getSeconds()).padStart(2,'0');
    if (wibClock) wibClock.textContent = `${hh}:${mm}:${ss}`;
  }
  update();
  setInterval(update, 1000);
}

/* Mobile nav toggle */
function toggleMobileNav() {
  const open = document.body.classList.toggle('nav-open');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}

/* Init on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearElLocal = document.getElementById('year');
  if (yearElLocal) yearElLocal.textContent = new Date().getFullYear();

  // Theme: saved or system
  const savedTheme = localStorage.getItem('bft_theme');
  if (savedTheme) setTheme(savedTheme);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  // Language
  const savedLang = localStorage.getItem('bft_lang') || 'id';
  setLanguage(savedLang);

  // Clock
  startWIBClock();

  // Hooks
  if (themeToggle) themeToggle.addEventListener('click', () => {
    setTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark');
  });

  if (langToggle) langToggle.addEventListener('click', () => {
    setLanguage(document.body.getAttribute('data-lang') === 'en' ? 'id' : 'en');
  });

  if (menuToggle) menuToggle.addEventListener('click', toggleMobileNav);

  // Close mobile nav on link click
  document.querySelectorAll('.nav-menu a').forEach(a => a.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) toggleMobileNav();
  }));

  // Close nav on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) toggleMobileNav();
  });
});

/* ================================
   GALLERY FILTER & VIEWER
================================ */

const filterBtns = document.querySelectorAll(".gf-btn");
const galleryItems = document.querySelectorAll(".g-item");
const viewer = document.getElementById("viewer");
const viewerContent = document.getElementById("viewerContent");
const viewerClose = document.getElementById("viewerClose");

/* FILTER */
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".gf-btn.active")?.classList.remove("active");
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        galleryItems.forEach(item => {
            if (filter === "all" || item.classList.contains(filter)) {
                item.style.display = "block";
                item.style.opacity = 1;
            } else {
                item.style.opacity = 0;
                setTimeout(() => item.style.display = "none", 200);
            }
        });
    });
});

/* MODAL VIEWER (CLICK ITEM) */
galleryItems.forEach(item => {
    item.addEventListener("click", e => {
        viewer.classList.add("show");
        viewerContent.innerHTML = ""; // reset

        if (item.querySelector("img")) {
            const img = item.querySelector("img").cloneNode(true);
            viewerContent.appendChild(img);
        } else if (item.querySelector("video")) {
            const vid = item.querySelector("video").cloneNode(true);
            vid.controls = true;
            viewerContent.appendChild(vid);
        }
    });
});

/* CLOSE VIEWER */
viewerClose.addEventListener("click", () => viewer.classList.remove("show"));
viewer.addEventListener("click", e => {
    if (e.target === viewer) viewer.classList.remove("show");
});