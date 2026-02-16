/* ===============================
   IMPÉRIO DA BARBA – SCRIPT OFICIAL
   Dark/Light | Reveal | Share Modal
================================ */

/* ==================================================
   DARK / LIGHT MODE
================================================== */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (themeToggle) {
  // Inicializa tema
  if (savedTheme) {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
  } else {
    document.body.classList.add("dark");
    themeToggle.textContent = "🌙";
  }

  // Alterna tema
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");

    document.body.classList.toggle("dark", !isDark);
    document.body.classList.toggle("light", isDark);

    const theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", theme);
    themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
  });
}

/* ==================================================
   REVEAL ON SCROLL
================================================== */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 120;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);

/* ==================================================
   COMPARTILHAMENTO – CARTÃO DIGITAL
================================================== */
const cardLink = "https://imperio-da-barba.vercel.app"; // Link do cartão Império da Barba

const shareBtn = document.getElementById("shareBtn");
const shareModal = document.getElementById("shareModal");
const closeShare = document.getElementById("closeShare");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const shareLinkBtn = document.getElementById("shareLinkBtn");

// Abrir modal
shareBtn?.addEventListener("click", () => {
  shareModal.style.display = "flex";
});

// Fechar modal
closeShare?.addEventListener("click", () => {
  shareModal.style.display = "none";
});

// Fechar clicando fora do modal
shareModal?.addEventListener("click", (e) => {
  if (e.target === shareModal) {
    shareModal.style.display = "none";
  }
});

// Copiar link
copyLinkBtn?.addEventListener("click", () => {
  const message = `Confira meu cartão digital profissional: ${cardLink}`;
  navigator.clipboard.writeText(message).then(() => {
    alert("Link copiado com sucesso!");
  });
});

// Compartilhar link nativo
shareLinkBtn?.addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "Cartão Digital Profissional",
      text: "Confira meu cartão digital profissional:",
      url: cardLink
    });
  } else {
    navigator.clipboard.writeText(cardLink);
    alert("Link copiado!");
  }
});

/* ==================================================
   PULSE BOTÃO EBOOK / AGENDAMENTO
================================================== */
const ebookBtn = document.querySelector("a.btn-ebook");
if (ebookBtn) {
  setInterval(() => {
    ebookBtn.style.transform = "scale(1.06)";
    setTimeout(() => {
      ebookBtn.style.transform = "scale(1)";
    }, 1000);
  }, 2000);
}

/* ==================================================
   CARROSSEL (opcional para vídeos ou imagens)
================================================== */
document.querySelectorAll(".carousel").forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const slides = track?.querySelectorAll("img") || [];
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  if (!track || slides.length === 0) return;

  let index = 0;
  let interval = null;
  const delay = 5000;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(nextSlide, delay);
  }

  function stopAuto() {
    if (interval) clearInterval(interval);
  }

  nextBtn?.addEventListener("click", () => {
    stopAuto();
    nextSlide();
    startAuto();
  });

  prevBtn?.addEventListener("click", () => {
    stopAuto();
    prevSlide();
    startAuto();
  });

  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("touchstart", stopAuto);
  carousel.addEventListener("touchend", startAuto);

  startAuto();
});