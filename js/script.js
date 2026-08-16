/* ==========================================================
   CROWN & CARE DENTAL CENTER — SCRIPT
   ========================================================== */

/* ----------------------------------------------------------
   1. IMAGE CONFIGURATION
   Central place to change image paths/filenames. If the
   client's actual filenames differ, update them here only.
---------------------------------------------------------- */
const IMAGES = {
  logo: "images/logo.png",
  services: "images/services.png",
  clinic1: "images/clinic-1.png",
  clinic2: "images/clinic-2.png",
  clinic3: "images/clinic-3.png",
  wisdomTooth: "images/wisdom-tooth.png",
  braces: "images/braces.png"
};

/* Graceful fallback: called from onerror="" on each <img>.
   Hides the broken <img> and reveals the neighboring
   .*-fallback element instead of showing a broken-image icon. */
function handleImgFallback(imgEl, key){
  imgEl.style.display = "none";
  const fallback = imgEl.parentElement.querySelector(
    '[id="' + imgEl.id + 'Fallback"]'
  ) || imgEl.nextElementSibling;
  if (fallback) fallback.hidden = false;
}

/* ----------------------------------------------------------
   2. SERVICES DATA — drives the services grid
---------------------------------------------------------- */
const SERVICES = [
  {
    name: "Cleaning",
    desc: "Professional dental cleaning and preventive care.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><path d="M9 10.5c.6.8 1.4 1 3 1s2.4-.2 3-1"/></svg>'
  },
  {
    name: "Restoration",
    desc: "Dental restoration and repair procedures.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9c0 5.5-8 12-8 12S4 14.5 4 9a8 8 0 0 1 16 0Z"/><path d="M9.5 8.5 11 10l3.5-3.5"/></svg>'
  },
  {
    name: "Dentures",
    desc: "Comfortable solutions for replacing missing teeth.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10c0-3 2-6 8-6s8 3 8 6-1 3-1 5-1 4-3 4-2-2-4-2-2 2-4 2-3-2-3-4-1-2-1-5Z"/></svg>'
  },
  {
    name: "Crowns &amp; Bridges",
    desc: "Restorative solutions designed to restore function and appearance.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18V9l4-3 4 3 4-3 4 3v9Z"/><path d="M4 18h16"/></svg>'
  },
  {
    name: "Extraction &amp; Odontectomy",
    desc: "Professional tooth extraction procedures.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8c0 4.5-5.5 9-8 13-2.5-4-8-8.5-8-13a8 8 0 0 1 16 0Z" transform="translate(2 0) scale(.72)"/><path d="M15 5l6 6M21 5l-6 6" stroke-width="1.8"/></svg>'
  },
  {
    name: "Orthodontics",
    desc: "Braces and orthodontic treatment options.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15c2 2 14 2 16 0"/><circle cx="6" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="16" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="15" r="1" fill="currentColor" stroke="none"/><path d="M6 15V9m12 6V9" stroke-width="1.4"/></svg>'
  },
  {
    name: "Dental Implants",
    desc: "Tooth replacement solutions using dental implants.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8l-1.5 5H9.5Z"/><path d="M11 9v11m2-11v11" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'
  },
  {
    name: "Periodontal Treatments",
    desc: "Care focused on gum health.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6.5v5C4 16.5 7.5 20.5 12 22c4.5-1.5 8-5.5 8-10.5v-5Z"/><path d="M9 12l2 2 4-4" stroke-width="1.7"/></svg>'
  },
  {
    name: "Root Canal Treatment",
    desc: "Treatment for teeth affected by infection or damage.",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6l1 6-2 2 1 9-3 1-3-1 1-9-2-2Z"/></svg>'
  }
];

function renderServices(){
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  grid.innerHTML = SERVICES.map(function(s, i){
    return (
      '<div class="service-card reveal" style="--delay:' + (i % 3) + '">' +
        '<div class="service-icon">' + s.icon + '</div>' +
        '<h3>' + s.name + '</h3>' +
        '<p>' + s.desc + '</p>' +
      '</div>'
    );
  }).join("");
  // newly injected .reveal elements need to be observed
  observeReveals();
}

/* ----------------------------------------------------------
   3. STICKY NAV + MOBILE STICKY CTA ON SCROLL
---------------------------------------------------------- */
const nav = document.getElementById("nav");
const mobileStickyCta = document.getElementById("mobileStickyCta");
const hero = document.querySelector(".hero");

function onScroll(){
  const y = window.scrollY;
  if (nav) nav.dataset.stuck = y > 6 ? "true" : "false";
  const heroHeight = hero ? hero.offsetHeight : 500;
  if (mobileStickyCta) mobileStickyCta.dataset.show = y > heroHeight * 0.6 ? "true" : "false";
}
window.addEventListener("scroll", onScroll, { passive: true });

/* ----------------------------------------------------------
   4. MOBILE MENU
---------------------------------------------------------- */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");

function setMobileMenu(open){
  mobileMenu.dataset.open = open ? "true" : "false";
  mobileMenuBackdrop.dataset.open = open ? "true" : "false";
  hamburgerBtn.dataset.open = open ? "true" : "false";
  hamburgerBtn.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.style.overflow = open ? "hidden" : "";
}
if (hamburgerBtn){
  hamburgerBtn.addEventListener("click", function(){
    setMobileMenu(mobileMenu.dataset.open !== "true");
  });
}
if (mobileMenuBackdrop){
  mobileMenuBackdrop.addEventListener("click", function(){ setMobileMenu(false); });
}
document.querySelectorAll(".mobile-menu a").forEach(function(a){
  a.addEventListener("click", function(){ setMobileMenu(false); });
});

/* ----------------------------------------------------------
   5. SCROLL REVEAL
---------------------------------------------------------- */
let revealObserver;
function observeReveals(){
  if (!("IntersectionObserver" in window)){
    document.querySelectorAll(".reveal").forEach(function(el){ el.dataset.revealed = "true"; });
    return;
  }
  if (!revealObserver){
    revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.dataset.revealed = "true";
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
  }
  document.querySelectorAll(".reveal:not([data-revealed])").forEach(function(el){
    revealObserver.observe(el);
  });
}

/* ----------------------------------------------------------
   6. APPOINTMENT MODAL
---------------------------------------------------------- */
const modalOverlay = document.getElementById("modalOverlay");
const openBookingBtn = document.getElementById("openBookingBtn");
const bookLinks = document.querySelectorAll('a[href="#book"]');
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalDoneBtn = document.getElementById("modalDoneBtn");
const modalFormView = document.getElementById("modalFormView");
const modalSuccessView = document.getElementById("modalSuccessView");
const appointmentForm = document.getElementById("appointmentForm");

function openModal(){
  modalOverlay.dataset.open = "true";
  document.body.style.overflow = "hidden";
  modalFormView.hidden = false;
  modalSuccessView.hidden = true;
}
function closeModal(){
  modalOverlay.dataset.open = "false";
  document.body.style.overflow = "";
}

if (openBookingBtn) openBookingBtn.addEventListener("click", openModal);
bookLinks.forEach(function(link){
  link.addEventListener("click", function(e){
    e.preventDefault();
    openModal();
  });
});
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (modalDoneBtn) modalDoneBtn.addEventListener("click", function(){
  closeModal();
  appointmentForm.reset();
});
if (modalOverlay){
  modalOverlay.addEventListener("click", function(e){
    if (e.target === modalOverlay) closeModal();
  });
}
document.addEventListener("keydown", function(e){
  if (e.key === "Escape" && modalOverlay.dataset.open === "true") closeModal();
});

if (appointmentForm){
  appointmentForm.addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
      fullName: document.getElementById("fullName").value,
      mobileNumber: document.getElementById("mobileNumber").value,
      email: document.getElementById("email").value,
      preferredService: document.getElementById("preferredService").value,
      preferredDate: document.getElementById("preferredDate").value,
      preferredTime: document.getElementById("preferredTime").value,
      message: document.getElementById("message").value
    };

    // TODO: Connect appointment form to backend/API
    // Example (future): fetch('/api/appointments', { method: 'POST', body: JSON.stringify(data) })
    console.log("Appointment request (not yet sent anywhere):", data);

    modalFormView.hidden = true;
    modalSuccessView.hidden = false;
  });
}

/* ----------------------------------------------------------
   7. GALLERY LIGHTBOX
---------------------------------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll("[data-lightbox]").forEach(function(item){
  item.addEventListener("click", function(){
    const img = item.querySelector("img");
    if (!img || img.style.display === "none") return; // no image to enlarge if it fell back
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.dataset.open = "true";
    document.body.style.overflow = "hidden";
  });
});
function closeLightbox(){
  lightbox.dataset.open = "false";
  document.body.style.overflow = "";
}
if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightbox){
  lightbox.addEventListener("click", function(e){
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener("keydown", function(e){
  if (e.key === "Escape" && lightbox.dataset.open === "true") closeLightbox();
});

/* ----------------------------------------------------------
   8. DIRECTIONS BUTTON — configurable Google Maps URL
   No API key required. Update CLINIC_MAPS_QUERY if the
   clinic's exact Google Maps listing/address changes.
---------------------------------------------------------- */
const CLINIC_MAPS_QUERY = "Crown %26 Care Dental Center, 1906-A Taft Avenue, Malate, Manila";
const CLINIC_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + CLINIC_MAPS_QUERY;
const CLINIC_MAPS_EMBED_URL = "https://maps.google.com/maps?q=" + CLINIC_MAPS_QUERY + "&output=embed";

const directionsBtn = document.getElementById("directionsBtn");
if (directionsBtn) directionsBtn.href = CLINIC_MAPS_URL;

const mapEmbed = document.getElementById("mapEmbed");
if (mapEmbed) mapEmbed.src = CLINIC_MAPS_EMBED_URL;

/* ----------------------------------------------------------
   9. FOOTER YEAR
---------------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ----------------------------------------------------------
   10. INIT
---------------------------------------------------------- */
renderServices();
observeReveals();
onScroll();
