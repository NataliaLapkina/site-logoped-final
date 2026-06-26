document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  function setBurgerExpanded(isExpanded) {
    if (!burger) return;
    burger.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    burger.setAttribute("aria-label", isExpanded ? "Закрыть меню" : "Открыть меню");
    burger.textContent = isExpanded ? "×" : "☰";
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("active");
      setBurgerExpanded(nav.classList.contains("active"));
    });

    document.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        setBurgerExpanded(false);
      });
    });
  }

  document.querySelectorAll(".faq-item").forEach(function (item) {
    const button = item.querySelector(".faq-question");
    const icon = button ? button.querySelector("span") : null;

    if (button && icon) {
      button.addEventListener("click", function () {
        item.classList.toggle("active");
        icon.textContent = item.classList.contains("active") ? "−" : "+";
      });
    }
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".section").forEach(function (section) {
    section.querySelectorAll(".reveal").forEach(function (element, index) {
      element.style.setProperty("--reveal-delay", (index * 0.07) + "s");
    });
  });

  document.querySelectorAll(".hero .reveal").forEach(function (element) {
    element.classList.add("visible");
  });

  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("visible");
    });
  } else {
    const observer = new IntersectionObserver(function (entries, io) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    });

    document.querySelectorAll(".reveal").forEach(function (element) {
      if (!element.classList.contains("visible")) {
        observer.observe(element);
      }
    });
  }

  const whatsappBtn = document.querySelector(".float-btn.whatsapp");
  if (whatsappBtn && !prefersReducedMotion) {
    whatsappBtn.classList.add("pulse-once");
    whatsappBtn.addEventListener("animationend", function () {
      whatsappBtn.classList.remove("pulse-once");
    }, { once: true });
  }

  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
      },
      { passive: true }
    );
  }

  function onlyDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function formatRuPhone(digits) {
    const d = onlyDigits(digits);
    const normalized = d.startsWith("8") ? "7" + d.slice(1) : d;
    const x = normalized.startsWith("7") ? normalized.slice(1) : normalized;

    const p1 = x.slice(0, 3);
    const p2 = x.slice(3, 6);
    const p3 = x.slice(6, 8);
    const p4 = x.slice(8, 10);

    let out = "+7";
    if (p1) out += " (" + p1;
    if (p1 && p1.length === 3) out += ")";
    if (p2) out += " " + p2;
    if (p3) out += "-" + p3;
    if (p4) out += "-" + p4;
    return out;
  }

  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      phoneInput.value = formatRuPhone(onlyDigits(phoneInput.value));
    });
  }
});
