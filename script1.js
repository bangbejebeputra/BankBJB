// ========== TOGGLE MENU MOBILE ==========
const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.getElementById("navbarMenu");

navbarToggle.addEventListener("click", () => {
  const isOpen = navbarMenu.classList.toggle("is-open");
  navbarToggle.setAttribute("aria-expanded", isOpen);
});

// Tutup menu saat salah satu link diklik (mode mobile)
navbarMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navbarMenu.classList.remove("is-open");
    navbarToggle.setAttribute("aria-expanded", "false");
  });
});

// ========== ANIMASI ANGKA STATISTIK ==========
// Catatan: isi atribut data-target pada setiap elemen .statistik__angka
// di index.html dengan angka tujuan (contoh: data-target="1999")
const statistikItems = document.querySelectorAll(".statistik__angka");

const animasiAngka = (el) => {
  const target = parseInt(el.dataset.target, 10) || 0;
  const durasi = 1500;
  const mulai = performance.now();

  const update = (waktuSekarang) => {
    const progres = Math.min((waktuSekarang - mulai) / durasi, 1);
    el.textContent = Math.floor(progres * target).toLocaleString("id-ID");
    if (progres < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animasiAngka(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statistikItems.forEach((item) => observer.observe(item));

// ========== TAHUN FOOTER OTOMATIS ==========
document.getElementById("tahunSekarang").textContent = new Date().getFullYear();
