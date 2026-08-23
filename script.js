/* ============================================
   IMPÉRIO DA BARBA – SCRIPT PREMIUM
   Dark/Light | Share Modal | Animações
============================================ */

/* ============================================
   DARK / LIGHT MODE
============================================ */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (themeToggle) {
  // Inicializa tema
  if (savedTheme) {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);
  } else {
    document.body.classList.add("dark");
    updateThemeIcon("dark");
  }

  // Alterna tema
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    document.body.classList.remove("dark", "light");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector("i");
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }
}

/* ============================================
   COMPARTILHAMENTO – MODAL PREMIUM
============================================ */
const cardLink = "https://imperio-da-barba.vercel.app";

const shareBtn = document.getElementById("shareBtn");
const shareModal = document.getElementById("shareModal");
const closeShare = document.getElementById("closeShare");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const shareLinkBtn = document.getElementById("shareLinkBtn");

// Abrir modal com animação
shareBtn?.addEventListener("click", () => {
  shareModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

// Fechar modal
function closeShareModal() {
  shareModal.classList.remove("show");
  document.body.style.overflow = "";
}

closeShare?.addEventListener("click", closeShareModal);

// Fechar clicando fora do modal
shareModal?.addEventListener("click", (e) => {
  if (e.target === shareModal) {
    closeShareModal();
  }
});

// Fechar com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && shareModal?.classList.contains("show")) {
    closeShareModal();
  }
});

// Copiar link com feedback melhorado
copyLinkBtn?.addEventListener("click", async () => {
  const message = `Confira meu cartão digital profissional: ${cardLink}`;
  try {
    await navigator.clipboard.writeText(message);
    const originalText = copyLinkBtn.innerHTML;
    copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    copyLinkBtn.style.background = "#22C55E";
    copyLinkBtn.style.color = "#fff";
    setTimeout(() => {
      copyLinkBtn.innerHTML = originalText;
      copyLinkBtn.style.background = "";
      copyLinkBtn.style.color = "";
    }, 2000);
  } catch {
    alert("Copie o link manualmente: " + cardLink);
  }
});

// Compartilhar link nativo
shareLinkBtn?.addEventListener("click", async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: "Cartão Digital Profissional - Império da Barba",
        text: "Confira meu cartão digital profissional:",
        url: cardLink
      });
    } else {
      await navigator.clipboard.writeText(cardLink);
      const originalText = shareLinkBtn.innerHTML;
      shareLinkBtn.innerHTML = '<i class="fas fa-check"></i> Link copiado!';
      setTimeout(() => {
        shareLinkBtn.innerHTML = originalText;
      }, 2000);
    }
  } catch {
    // Usuário cancelou ou erro
  }
});

/* ============================================
   ANIMAÇÃO DE ENTRADA
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  if (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px) scale(0.98)";
    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0) scale(1)";
    }, 100);
  }
});

/* ============================================
   PULSE NO BOTÃO PRINCIPAL (APENAS PRIMEIRO)
============================================ */
const firstBtn = document.querySelector(".btn-primary");
if (firstBtn) {
  setInterval(() => {
    firstBtn.style.transform = "scale(1.03)";
    firstBtn.style.boxShadow = "0 8px 30px rgba(212, 175, 55, 0.4)";
    setTimeout(() => {
      firstBtn.style.transform = "scale(1)";
      firstBtn.style.boxShadow = "";
    }, 600);
  }, 3000);
}

/* ============================================
   TOOLTIP PARA BOTÕES DE WHATSAPP/LOCALIZAÇÃO
============================================ */
document.querySelectorAll(".btn-whatsapp, .btn-location").forEach(btn => {
  const tooltipText = btn.classList.contains("btn-whatsapp") ? "WhatsApp" : "Localização";
  btn.addEventListener("mouseenter", (e) => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip-custom";
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
      position: fixed;
      background: rgba(0,0,0,0.8);
      color: #fff;
      padding: 4px 12px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 500;
      pointer-events: none;
      z-index: 999;
      transform: translateY(-8px);
      backdrop-filter: blur(4px);
    `;
    document.body.appendChild(tooltip);
    const rect = btn.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px";
    btn._tooltip = tooltip;
  });

  btn.addEventListener("mouseleave", () => {
    if (btn._tooltip) {
      btn._tooltip.remove();
      delete btn._tooltip;
    }
  });
});