/* ==========================================================================
   STUDIOS FAAS — Official web platform
   Base behavior · © STUDIOS FAAS. All rights reserved unless stated otherwise.
   Founder, CEO & Lead Developer: Fabio Ardila
   ========================================================================== */

(() => {
  "use strict";

  /**
   * Official contact address used by the form.
   * Update this constant (and the mailto link in index.html) when the
   * production mailbox is provisioned.
   */
  const CONTACT_EMAIL = "contacto@studiosfaas.com";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLabel = document.querySelector("[data-nav-label]");

  /* ----------------------------------------------------------------------
     Header state on scroll
     ---------------------------------------------------------------------- */
  if (header) {
    const syncHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */
  const setNav = (open) => {
    if (!nav || !navToggle) return;

    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);

    if (navLabel) navLabel.textContent = open ? "Cerrar menú" : "Abrir menú";
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      setNav(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setNav(false);
        navToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (!event.target.closest(".site-header")) setNav(false);
    });

    const desktopQuery = window.matchMedia("(min-width: 861px)");
    const handleDesktop = (event) => {
      if (event.matches) setNav(false);
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktop);
    } else {
      desktopQuery.addListener(handleDesktop);
    }
  }

  /* ----------------------------------------------------------------------
     Active navigation link (scroll spy)
     ---------------------------------------------------------------------- */
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const trackedSections = navLinks
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return null;

      const section = document.querySelector(href);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  const setActiveLink = () => {
    if (!trackedSections.length) return;

    const threshold = (header ? header.offsetHeight : 0) + 120;
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

    let current = trackedSections[0];

    for (const item of trackedSections) {
      if (item.section.getBoundingClientRect().top <= threshold) current = item;
    }

    if (atBottom) current = trackedSections[trackedSections.length - 1];

    for (const item of trackedSections) {
      const isActive = item === current;

      item.link.classList.toggle("is-active", isActive);

      if (isActive) {
        item.link.setAttribute("aria-current", "location");
      } else {
        item.link.removeAttribute("aria-current");
      }
    }
  };

  let scrollTicking = false;
  const requestScrollUpdate = () => {
    if (scrollTicking) return;

    scrollTicking = true;
    window.requestAnimationFrame(() => {
      setActiveLink();
      scrollTicking = false;
    });
  };

  if (trackedSections.length) {
    setActiveLink();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) setActiveLink();
    });
  }

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window) || reducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    let observerFired = false;

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        observerFired = true;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    /**
     * Safety net: if the observer cannot run (background tab, unusual
     * browser, or a rendering engine that throttles observation), reveal
     * all content instead of leaving it invisible.
     */
    window.setTimeout(() => {
      if (observerFired) return;

      revealItems.forEach((item) => item.classList.add("is-visible"));
      revealObserver.disconnect();
    }, 800);
  }

  /* ----------------------------------------------------------------------
     Pointer-follow glow for service cards
     ---------------------------------------------------------------------- */
  const glowItems = Array.from(document.querySelectorAll("[data-glow]"));
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (glowItems.length && finePointer.matches && !reducedMotion) {
    glowItems.forEach((item) => {
      let frame = 0;

      item.addEventListener("pointermove", (event) => {
        if (frame) return;

        frame = window.requestAnimationFrame(() => {
          const rect = item.getBoundingClientRect();

          item.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
          item.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
          frame = 0;
        });
      });

      item.addEventListener("pointerleave", () => {
        if (frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }

        item.style.removeProperty("--glow-x");
        item.style.removeProperty("--glow-y");
      });
    });
  }

  /* ----------------------------------------------------------------------
     Contact form — client-side validation + mailto handoff
     ---------------------------------------------------------------------- */
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validators = {
    name: (value) => (value.trim().length >= 2 ? "" : "Escribe tu nombre (mínimo 2 caracteres)."),
    email: (value) =>
      emailPattern.test(value.trim()) ? "" : "Introduce un correo electrónico válido.",
    "project-type": (value) => (value ? "" : "Selecciona el tipo de proyecto."),
    message: (value) =>
      value.trim().length >= 10 ? "" : "Describe tu proyecto (mínimo 10 caracteres).",
  };

  if (form && status) {
    const fields = Array.from(form.querySelectorAll("input, select, textarea"));

    const getErrorElement = (field) => document.getElementById(`${field.id}-error`);

    const showError = (field, message) => {
      field.setAttribute("aria-invalid", "true");
      const errorElement = getErrorElement(field);
      if (errorElement) errorElement.textContent = message;
    };

    const clearError = (field) => {
      field.removeAttribute("aria-invalid");
      const errorElement = getErrorElement(field);
      if (errorElement) errorElement.textContent = "";
    };

    const validateField = (field) => {
      const validator = validators[field.name];
      if (!validator) return true;

      const message = validator(field.value);

      if (message) {
        showError(field, message);
        return false;
      }

      clearError(field);
      return true;
    };

    fields.forEach((field) => {
      const eventName = field.tagName === "SELECT" ? "change" : "input";

      field.addEventListener(eventName, () => {
        if (field.hasAttribute("aria-invalid")) validateField(field);
      });

      field.addEventListener("blur", () => {
        if (field.value.trim() !== "") validateField(field);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.classList.remove("is-error");
      status.textContent = "";

      let firstInvalid = null;

      fields.forEach((field) => {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        status.textContent = "Revisa los campos marcados antes de enviar.";
        status.classList.add("is-error");
        firstInvalid.focus();
        return;
      }

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const projectType = String(data.get("project-type") || "").trim();
      const message = String(data.get("message") || "").trim();

      const subject = `Nuevo proyecto — ${projectType}`;
      const body = [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Tipo de proyecto: ${projectType}`,
        "",
        message,
      ].join("\n");

      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      status.textContent =
        "Se abrió tu cliente de correo con la propuesta lista para enviar. Si no ocurre nada, escríbenos a " +
        CONTACT_EMAIL +
        ".";
    });
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */
  const yearElement = document.querySelector("[data-year]");
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());
})();
