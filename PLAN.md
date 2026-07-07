# URIM — Technical Implementation Plan

**Project:** URIM landing page ("The Legal Prediction Engine" · Laboratoires Structure)
**Date:** 2026-07-07

## Current state

| File | Role |
|---|---|
| `reference/URIM v4.dc.html` | Static design comp (reference — do not edit) |
| `reference/URIM_v4_animated.html` | Animated version, GSAP 3.12.5 (reference — bug-fixed) |
| `index.html` + `assets/` + `api/` | **Production source of truth** (repo root = deployable Vercel project) |

## Phase 0 — Animation bug-fix pass ✅ (done, verified in browser)

Root causes of the scroll-down conflicts, all fixed in `URIM_v4_animated.html`:

1. **`pinSpacing` silently disabled** — the two pinned set-pieces (№03 Panel, №05 Critical Path) sit inside `display:flex` column parents; ScrollTrigger auto-disables pin spacing there, so the next section scrolled *over* the pinned visualization. Fixed with explicit `pinSpacing: true`. This was the visible overlap.
2. **Trigger creation order** — page-wide reveal triggers were created before the pins, so everything below the pins measured wrong scroll positions (the Ledger played before it was visible). Fixed: set-pieces init first in document order + `ScrollTrigger.sort()`.
3. **FIG captions inside pinned wrappers** were animated by the global reveal batch, whose triggers can't resolve against a pinned parent. Now owned by the pin timelines; `pinnedContainer` set on the heartbeat-pulse trigger.
4. **CSS `scroll-behavior:smooth` vs pinned scrub** (documented GSAP conflict) — removed; anchor links now use ScrollToPlugin with a 60px nav offset (native jump remains the no-JS fallback via `scroll-margin-top`).
5. **Boot overlay didn't lock scroll** — `once:true` reveals fired unseen and the hero intro fought the hero-exit scrub. Boot now locks `overflow`, pins scroll to top (`scrollRestoration: manual`), honors `#deep-links` after boot.
6. **Pins on small viewports** — set-pieces are taller than mobile viewports; below 900px they now play as one-shot timelines instead of pinning.
7. **Polish/perf** — interstitial parallax reaches full opacity while readable (not at exit); `will-change`/blur layers released after one-shot reveals; `ScrollTrigger.refresh()` after form-swap layout changes; reduced-motion canvas repaints after resize.

Verified at 1280×800 and <900px: zero console errors, exact trigger geometry (ledger fires at 72% viewport), pin spacers propagate (+2560px doc height), anchor nav lands 60px under the nav.

## Phase 1 — Production structure ✅ (done)

```
index.html            # markup; proper <head> (lang, meta, OG, favicon, theme-color)
assets/css/urim.css   # animation layer + base styles (extracted)
assets/js/urim.js     # animation engine (extracted, bug-fixed) + form submission
api/access.js         # POST /api/access — Neon insert, validation, consent required
api/subscribe.js      # POST /api/subscribe — idempotent email insert
```

- GSAP core / ScrollTrigger / ScrollToPlugin from cdnjs (page degrades gracefully without JS).
- Fonts: Google Fonts with `display=swap` + preconnect.

## Phase 2 — Pre-launch backlog (next passes)

1. ~~**Form backend**~~ ✅ Neon Postgres via `@neondatabase/serverless`; tables `access_requests`, `subscribers`; `DATABASE_URL` in Vercel env (never committed). Remaining: spam protection (rate limit / honeypot), ops email notification on new requests.
2. **Self-host fonts + GSAP** — Québec Law 25 / PIPEDA posture on the page argues against shipping visitor IPs to Google Fonts; bundle WOFF2 + vendored GSAP.
3. **Social/OG image** — 1200×630 card; real canonical URL once the domain exists.
4. **FR locale** — nav already stubs `FR (en préparation)`; plan `/fr/` mirror.
5. **A11y audit** — focus states exist; add skip-link, verify contrast on `--t3`, keyboard-test forms.
6. **Performance** — Lighthouse pass; subset the mono font; consider `content-visibility:auto` on below-fold sections.
7. **Deploy** — static host (Vercel/Netlify); cache-immutable assets, HTML no-cache.

## Decisions / conventions

- Single-page, dependency-light, no build step — files in `site/` deploy as-is.
- The two v4 HTML files stay as references; all future work happens in `site/`.
- Breakpoints: pins ≥900px; nav links hide <1120px; lang switch hides <760px.
