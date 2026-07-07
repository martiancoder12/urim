# URIM — The Legal Prediction Engine

Landing page for **URIM**, a research program of Laboratoires Structure Inc.
*Litigation, computed. The probable outcome, the path that reaches it, tested against every decided case.*

> URIM is an analytical instrument for legal professionals. Its outputs are probabilistic
> estimates, not legal advice. All figures on the page are illustrative.

## Stack

- Static single page — no build step. `index.html` + `assets/`.
- Animation: GSAP 3.12 (core, ScrollTrigger, ScrollToPlugin) from cdnjs; the page stays fully
  readable with JavaScript disabled and honors `prefers-reduced-motion`.
- API: Vercel serverless functions in `api/` backed by Neon Postgres
  (`access_requests`, `subscribers`).

## Development

```sh
npm install                  # only needed for the API dependency
npx http-server . -p 8123    # static preview (forms need the deployed API)
vercel dev                   # full local preview including /api
```

`DATABASE_URL` must be set (Neon connection string) — locally via `.env` (git-ignored),
on Vercel via project environment variables.

## Structure

```
index.html            page markup
assets/css/urim.css   animation + base styles
assets/js/urim.js     animation engine + form submission
api/access.js         POST /api/access    — early-access requests
api/subscribe.js      POST /api/subscribe — benchmark newsletter
reference/            original design comps (frozen)
PLAN.md               implementation plan & phase log
```

© 2026 Laboratoires Structure Inc. — Order, out of chaos.
