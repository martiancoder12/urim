(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setupHeader() {
    const header = $("[data-header]");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupMenu() {
    const toggle = $("[data-menu-toggle]");
    const nav = $("[data-nav]");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    };

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    $$("a", nav).forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) setOpen(false);
    });
  }

  function setupReveals() {
    const items = $$("[data-reveal]");
    if (!items.length) return;
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
  }

  function setupHeroDemo() {
    const stage = $("[data-hero-stage]");
    if (!stage) return;

    const keys = ["screen", "compare", "monitor", "review"];
    const tabs = $$("[data-hero-tab]", stage);
    const panels = $$("[data-hero-panel]", stage);
    const motionToggle = $("[data-motion-toggle]", stage);
    const motionLabel = $("[data-motion-label]", stage);
    let activeIndex = 0;
    let paused = reducedMotion.matches;
    let timer = null;

    const show = (key) => {
      const nextIndex = keys.indexOf(key);
      if (nextIndex < 0) return;
      activeIndex = nextIndex;
      tabs.forEach((tab) => {
        const active = tab.dataset.heroTab === key;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.heroPanel === key;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = null;
    };
    const start = () => {
      stop();
      if (paused || document.hidden) return;
      timer = window.setInterval(() => show(keys[(activeIndex + 1) % keys.length]), 4600);
    };
    const updateMotionControl = () => {
      if (!motionToggle || !motionLabel) return;
      motionToggle.setAttribute("aria-pressed", String(paused));
      motionToggle.setAttribute("aria-label", paused ? "Play product preview" : "Pause product preview");
      motionLabel.textContent = paused ? "Play" : "Pause";
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        show(tab.dataset.heroTab);
        start();
      });
    });
    motionToggle?.addEventListener("click", () => {
      paused = !paused;
      updateMotionControl();
      start();
    });
    document.addEventListener("visibilitychange", start);
    reducedMotion.addEventListener?.("change", (event) => {
      paused = event.matches;
      updateMotionControl();
      start();
    });

    show(keys[0]);
    updateMotionControl();
    start();
  }

  function setupUseCases() {
    const root = $("[data-use-cases]");
    if (!root) return;
    const tabs = $$("[data-use-case-tab]", root);
    const panels = $$("[data-use-case-panel]", root);
    const show = (key) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.useCaseTab === key;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.useCasePanel === key;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
    };
    tabs.forEach((tab) => tab.addEventListener("click", () => show(tab.dataset.useCaseTab)));
  }

  function setupCarousel() {
    const track = $("[data-carousel]");
    const previous = $("[data-carousel-prev]");
    const next = $("[data-carousel-next]");
    if (!track || !previous || !next) return;

    const distance = () => {
      const card = $("article", track);
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 24;
      return (card?.getBoundingClientRect().width || 380) + gap;
    };
    previous.addEventListener("click", () => track.scrollBy({ left: -distance(), behavior: reducedMotion.matches ? "auto" : "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: distance(), behavior: reducedMotion.matches ? "auto" : "smooth" }));
  }

  function setupFaq() {
    const root = $("[data-faq]");
    if (!root) return;
    const buttons = $$("button[aria-expanded]", root);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const opening = button.getAttribute("aria-expanded") !== "true";
        buttons.forEach((candidate) => {
          const answer = candidate.closest("article")?.querySelector(".faq-answer");
          const symbol = $("span", candidate);
          candidate.setAttribute("aria-expanded", "false");
          if (answer) answer.hidden = true;
          if (symbol) symbol.textContent = "+";
        });
        if (opening) {
          const answer = button.closest("article")?.querySelector(".faq-answer");
          button.setAttribute("aria-expanded", "true");
          if (answer) answer.hidden = false;
          const symbol = $("span", button);
          if (symbol) symbol.textContent = "−";
        }
      });
    });
  }

  function setupForm() {
    const form = $("#access-form");
    const success = $("#access-done");
    const status = $("#form-status");
    if (!form || !success || !status) return;
    const submit = $("button[type='submit']", form);

    const clearFieldState = () => {
      $$("[aria-invalid='true']", form).forEach((field) => field.removeAttribute("aria-invalid"));
    };
    const firstInvalidField = () => {
      const fields = $$("input, select, textarea", form);
      return fields.find((field) => !field.checkValidity());
    };

    form.addEventListener("input", (event) => {
      if (event.target instanceof HTMLElement) event.target.removeAttribute("aria-invalid");
      status.textContent = "";
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearFieldState();
      status.textContent = "";
      const invalid = firstInvalidField();
      if (invalid) {
        invalid.setAttribute("aria-invalid", "true");
        status.textContent = "Please complete the required fields and confirm consent.";
        invalid.focus();
        return;
      }

      const data = new FormData(form);
      const payload = {
        name: data.get("name"),
        email: data.get("email"),
        firm: data.get("firm"),
        role: data.get("role"),
        jurisdiction: data.get("jurisdiction"),
        matters: data.get("matters") || "",
        consent: data.get("consent") === "on",
      };
      const originalLabel = submit.textContent;
      submit.disabled = true;
      submit.textContent = "Sending…";

      try {
        const response = await fetch("/api/access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        form.hidden = true;
        success.hidden = false;
        success.focus();
      } catch (error) {
        submit.disabled = false;
        submit.textContent = originalLabel;
        status.textContent = "We could not send the request. Please try again.";
      }
    });
  }

  setupHeader();
  setupMenu();
  setupReveals();
  setupHeroDemo();
  setupUseCases();
  setupCarousel();
  setupFaq();
  setupForm();
})();
