# URIM — Product and implementation log

## Current state — 2026-08-26

The public site has been rebuilt around the product strategy in `README.md` and
the owner's selected enterprise legal-tech visual benchmark. The active
direction targets institutional, repeat dispute decision-makers and presents
URIM through a product-led landing page whose workflow demonstrations lead into
the reviewable decision brief.

### Production source

| File | Role |
|---|---|
| `index.html` | Public product narrative, illustrative brief, qualification form |
| `assets/css/urim.css` | Enterprise legal-tech design system and responsive layouts |
| `assets/js/urim.js` | Product previews, tabs, carousel, FAQ, navigation, and form submission |
| `assets/favicon.svg` | Production favicon derived from the URIM identity |
| `api/access.js` | Briefing-request endpoint |
| `api/subscribe.js` | Legacy subscriber endpoint, retained but not promoted |
| `migrations/001_access_email.sql` | Adds contact email to access requests |
| `scripts/validate.mjs` | Structural, asset, and public-claims checks |
| `reference/` | Frozen v4 cybernetic / couture direction |

## Product decisions in this rebuild

1. **Primary customer:** portfolio decision-makers responsible for repeated,
   high-value commercial disputes.
2. **Primary conversion:** request a portfolio briefing, not generic early
   access or a newsletter subscription.
3. **Primary artifact:** a decision brief containing a range, assumptions,
   critical path, sensitivities, sources, and versions.
4. **Public proof rule:** no numerical performance or corpus claim until it is
   real, dated, reproducible, scoped, and linked to method.
5. **Visual model:** product-led enterprise presentation inspired structurally
   by the LexisNexis Protégé page, expressed with original URIM copy, interfaces,
   icons, colours, and assets. The underlying product remains 60% investment
   memorandum, 25% judicial reasons, and 15% analytical instrument.
6. **Motion model:** slow, pausable product-preview cycling, direct workflow
   controls, subtle below-fold settling, and no decorative spectacle.
7. **Privacy posture:** the public form explicitly rejects confidential or
   privileged matter information.
8. **Refinement status:** this redesign is local and awaiting owner review before
   the next production deployment.

## Historical direction retained in reference

The earlier v4 implementation used a black-and-neon couture/cybernetic visual
system with a boot sequence, matrix-like canvas, simulated live ledger, pinned
GSAP set pieces, and large illustrative corpus and replication figures. Its
animation engineering was carefully debugged and remains preserved in
`reference/URIM_v4_animated.html`.

That direction is no longer the production product surface. The change is
strategic, not a repudiation of craft: the institutional buyer's trust threshold
requires calmer presentation, explicit uncertainty, fewer unsupported signals,
and a closer resemblance between the website and the intended decision brief.

## Required before deployment

1. Apply `migrations/001_access_email.sql` to the production Neon database.
2. Confirm the `access_requests` table and database retention policy.
3. Add rate limiting or equivalent abuse control to the public endpoint.
4. Configure an operational notification or review queue for new requests.
5. Verify privacy and consent copy with qualified Quebec/Canadian counsel.
6. Confirm trademark, entity, and public product-description language.
7. Decide whether the deployment is an English research preview or a Quebec
   commercial surface requiring full French parity.
8. Completed: set `https://urim.ca/` as the canonical URL and converted
   social-image metadata to absolute URLs. The branded 1200×630 card is present
   at `assets/og.png`.
9. Run the validation suite and a proportionate accessibility/performance review.

## Research next steps

### Gate 0 — Select the wedge

- Score candidate matter classes by data access, outcome observability, repeat
  frequency, matter value, sales access, ethical fit, and validation feasibility.
- Conduct structured interviews across partners, in-house disputes, claims, and
  litigation finance.
- Confirm the buyer/user split and the first budget owner.

### Gate 1 — Define the brief

- Test the current specimen with 5–8 target professionals.
- Observe which fields support an actual recommendation and which create noise.
- Define abstention, missing-evidence, and human-review states.

### Gate 2 — Validate the method

- Publish outcome-label rules and the temporal validation protocol.
- Build the first comparator-set pipeline using lawful, maintainable sources.
- Report calibration, baselines, confidence intervals, exclusions, and failures.

### Gate 3 — Assisted design partners

- Move matter intake to an approved secure environment.
- Produce counsel-reviewed, versioned briefs for bounded pilot matters.
- Measure briefing use, decision comprehension, repeat demand, and analyst burden.

### Gate 4 — Portfolio product

- Add monitoring, matter comparison, team review, permissions, audit history,
  retention controls, and portfolio-level calibration only after the assisted
  brief shows repeated value.

---

Laboratoires Structure Inc. — Order, out of chaos.
