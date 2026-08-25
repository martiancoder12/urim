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

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    $$("a", nav).forEach((link) => link.addEventListener("click", () => setOpen(false)));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) setOpen(false);
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

  const scenarios = {
    base: {
      outcome: 68,
      low: 61,
      high: 75,
      swing: "Jurisdiction motion · ±14 pts",
      event: "Motion decision",
      summary: "Current record. The jurisdiction motion remains the largest unresolved swing factor.",
      motionDetail: "Pending · ±14 point sensitivity",
      motionStatus: "Open",
      conclusion: "Claim path remains viable",
      pathStatus: "Review",
      change: "No event has been resolved. The displayed range remains conditional.",
      state: "base",
    },
    granted: {
      outcome: 79,
      low: 72,
      high: 84,
      swing: "Expert evidence · ±9 pts",
      event: "Expert admissibility ruling",
      summary: "The motion survives. The lower jurisdiction risk raises the range and moves attention to expert evidence.",
      motionDetail: "Survived · observed event",
      motionStatus: "Observed",
      conclusion: "Claim path strengthens",
      pathStatus: "Strengthened",
      change: "Jurisdiction risk resolves favourably. The next material dependency becomes expert admissibility.",
      state: "granted",
    },
    denied: {
      outcome: 31,
      low: 23,
      high: 41,
      swing: "Forum and appeal posture · ±11 pts",
      event: "Forum or appeal decision",
      summary: "The motion fails. The current path breaks and the decision shifts toward forum, appeal, and settlement options.",
      motionDetail: "Failed · path-breaking event",
      motionStatus: "Adverse",
      conclusion: "Current claim path breaks",
      pathStatus: "Reassess",
      change: "An adverse jurisdiction decision breaks the current sequence. Later events no longer support the same thesis.",
      state: "denied",
    },
  };

  function setupScenario() {
    const root = $("[data-scenario]");
    if (!root) return;

    const buttons = $$("[data-scenario-button]", root);
    const steps = $$("[data-step]", root);

    const apply = (key) => {
      const data = scenarios[key];
      if (!data) return;

      buttons.forEach((button) => {
        const active = button.dataset.scenarioButton === key;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      const setText = (selector, value, context = document) => {
        const node = $(selector, context);
        if (node) node.textContent = value;
      };

      setText("[data-scenario-outcome]", data.outcome, root);
      setText("[data-scenario-copy]", data.summary, root);
      setText("[data-motion-detail]", data.motionDetail, root);
      setText("[data-motion-status]", data.motionStatus, root);
      setText("[data-path-conclusion]", data.conclusion, root);
      setText("[data-path-range]", `Reviewed range · ${data.low}–${data.high}%`, root);
      setText("[data-path-status]", data.pathStatus, root);
      setText("[data-change-note]", data.change, root);

      setText("[data-outcome]", data.outcome);
      setText("[data-range]", `${data.low}–${data.high}%`);
      setText("[data-swing]", data.swing);
      setText("[data-event]", data.event);

      const band = $("[data-range-band]");
      const point = $("[data-range-point]");
      if (band) {
        band.style.left = `${data.low}%`;
        band.style.width = `${data.high - data.low}%`;
      }
      if (point) point.style.left = `${data.outcome}%`;

      steps.forEach((step) => step.classList.remove("is-strengthened", "is-broken", "is-dimmed"));
      const motion = $("[data-step='motion']", root);
      const outcome = $("[data-step='outcome']", root);

      if (data.state === "granted") {
        motion?.classList.add("is-strengthened");
        outcome?.classList.add("is-strengthened");
      }

      if (data.state === "denied") {
        motion?.classList.add("is-broken");
        $$("[data-step='expert'], [data-step='precedent']", root).forEach((step) => step.classList.add("is-dimmed"));
        outcome?.classList.add("is-broken");
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => apply(button.dataset.scenarioButton));
    });

    apply("base");
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
  setupScenario();
  setupForm();
})();
