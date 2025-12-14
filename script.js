/* ============================================================
   script.js – ORIGINAL + ERROR FIX ONLY
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
   DICTIONARY (i18n) — TIDAK DIUBAH
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
   FUNCTIONS (TIDAK DIUBAH)
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

function setTheme(theme) {
  body.classList.remove("theme-light", "theme-dark");
  body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  localStorage.setItem("bft_theme", theme);
}

/* ============================================================
   DOM READY — ERROR FIX DILAKUKAN DI SINI
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  setTheme(localStorage.getItem("bft_theme") || "light");
  setLanguage(localStorage.getItem("bft_lang") || "id");

  /* ===== GALLERY & VIEWER (FIX) ===== */
  const filterBtns = document.querySelectorAll(".gf-btn");
  const galleryItems = document.querySelectorAll(".g-item");
  const viewer = document.getElementById("viewer");
  const viewerContent = document.getElementById("viewerContent");
  const viewerClose = document.getElementById("viewerClose");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      galleryItems.forEach(item => {
        item.style.display =
          filter === "all" || item.classList.contains(filter)
            ? "block"
            : "none";
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      viewer.classList.add("show");
      body.style.overflow = "hidden";
      viewerContent.innerHTML = "";
      const media = item.querySelector("img, video").cloneNode(true);
      if (media.tagName === "VIDEO") media.controls = true;
      viewerContent.appendChild(media);
    });
  });

  viewerClose?.addEventListener("click", () => {
    viewer.classList.remove("show");
    body.style.overflow = "";
  });

  /* ===== LAZY LOAD (FIX) ===== */
  const lazyImages = document.querySelectorAll(".lazy-img");

  const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => img.classList.add("loaded");
      lazyObserver.unobserve(img);
    });
  }, { threshold: 0.1 });

  lazyImages.forEach(img => lazyObserver.observe(img));
});
