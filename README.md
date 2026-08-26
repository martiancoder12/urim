# URIM

> The probable outcome is useful. The reasons it may change are the product.

URIM is a decision-intelligence instrument for complex commercial disputes. It
helps legal and capital-allocation professionals evaluate a live matter as a
calibrated range, identify the events that drive that range, compare plausible
strategies, and monitor what changes over time.

URIM is a research program of **Laboratoires Structure Inc.** Its outputs are
probabilistic analytical estimates, not legal advice. Counsel remains
responsible for legal judgment, client advice, and every decision taken.

This document is the strategic source of truth for the product, brand, website,
copy, research program, and early-access funnel.

## 1. Product thesis

Litigation decisions are often presented as conclusions: likely to win, likely
to settle, too early to tell. The economic decision is harder. A client, partner,
claims leader, or funder needs to know:

1. what the current range is;
2. which facts and legal events create that range;
3. how much each uncertain event could move it;
4. what new information would justify changing course; and
5. whether the analysis was produced and validated rigorously enough to rely on.

URIM should not compete as another general legal-research chatbot. Its product
is a reviewable decision brief: outcome range, assumptions, comparator set,
critical path, sensitivities, dissent, provenance, and model version.

URIM's mathematical object is not “a probability that a case wins.” Let `D`
denote the historical comparison data, `X` the observed matter record,
`Z = (Z₁, …, Zₖ)` the unresolved factual, procedural, and legal events, `Y` the
possible terminal outcomes, `M` a candidate model, `θ` its uncertain
parameters, and `A` the decision available to the user. The intended instrument
models a joint predictive object such as `p(Y, Z, θ, M | X, D)`, then marginalizes
over unresolved events, parameter uncertainty, and model uncertainty for the
quantity relevant to the decision.

If `Y` is binary, the posterior predictive probability `q = p(Y = 1 | X, D)` is
a scalar. A displayed range around `q` is not justified by the word
“uncertainty” alone. It must be defined as one of: a posterior credible interval
for `q`; a frequentist confidence interval for an estimator of `q`; or a
distribution of `q` across an explicitly defined and weighted scenario set.
Those objects have different interpretations and must not be conflated. The
Critical Path is the declared dependency structure among the components of
`Z`; and a sensitivity is the change in the output when one stated event or
assumption is varied while the rest of the scenario is held explicit.

When the record changes, the distribution must be recomputed conditional on the
new evidence. When strategies are compared, the relevant quantity is not only
the probability of a favourable legal outcome, but the distribution of value,
cost, time, and downside under each available action. A mathematically complete
decision layer would therefore compare actions through a disclosed objective or
utility function, for example `E[U(A, Y) | X]`, together with risk constraints
that the user can inspect.

This language is a specification standard, not permission to overclaim. Public
materials must identify the actual variables, factorization or dependency
model, estimation procedure, uncertainty interval, update rule, and validation
method used in a released URIM system. A conditional scenario contrast must not
be described as a causal effect unless the required causal assumptions are
stated and defensible. If several models are combined, the combination rule and
weights must be documented and tested out of sample; “the panel converges” is
not a mathematical explanation.

The simplest expression is:

> A second opinion you can interrogate.

## 2. MANCE method, translated

MANCE established a business-to-interface decision chain:

1. choose the most valuable reachable customer;
2. identify the consequential decision they are trying to make;
3. define the trust threshold surrounding that decision;
4. shape the product and proof system around that threshold; and
5. let those choices determine content, visual language, typography, colour,
   density, interaction, and motion.

For URIM, the translated equation is:

- **60% investment memorandum:** decision-ready, comparable, economically
  explicit, and suitable for a committee or client file;
- **25% judicial reasons:** sourced, qualified, traceable, and candid about
  uncertainty; and
- **15% analytical instrument:** exact, responsive, versioned, and visibly
  engineered.

This ratio is conceptual. It does not authorize copying any institution's
documents, interfaces, trade dress, or protected assets.

The three-question URIM test is:

1. Could a senior decision-maker understand the recommendation in five minutes?
2. Could counsel inspect and challenge every material assumption?
3. Could the brief enter a client, claims, or investment file without apology?

## 3. Commercial focus

### Primary customer

URIM is unusually well calibrated to the **portfolio decision-maker for
high-stakes commercial disputes**:

- a litigation partner or practice-group leader;
- chief litigation counsel or a senior in-house disputes lawyer;
- a claims or litigation-management leader; or
- a litigation-finance investment director or underwriter.

The primary persona is accountable for a recommendation, not merely research.
They are evaluating repeated matters with material exposure, must explain their
reasoning to other sophisticated people, and can justify meaningful spend when
the instrument improves selection, settlement posture, reserve discipline, or
portfolio allocation.

### Beachhead

The initial beachhead is Canadian commercial litigation, beginning with
Ontario and Quebec matters where authoritative public data and qualified subject
matter review can support the analysis. Early work should favour a narrow set of
matter classes with repeatable procedural events and sufficiently observable
outcomes.

The exact first matter class remains a research decision. It must be selected
using data availability, outcome observability, matter value, repeat frequency,
sales access, ethical fit, and achievable validation—not aesthetic appeal.

### Buyer, user, and beneficiary

- **Economic buyer:** the partner, general counsel, claims executive, or
  investment lead who owns budget and risk.
- **Primary user:** senior counsel, underwriter, or litigation analyst preparing
  the recommendation and challenging the assumptions.
- **Beneficiary:** the client, portfolio, insured, or investment committee that
  receives a more explicit and reviewable decision.

### Why this segment can support the strongest economics

- The value at stake is high relative to a professional subscription or
  per-matter assessment.
- The customer makes repeated decisions, creating expansion and retention
  potential.
- The value can eventually be measured against decision quality, reserve
  movement, screening efficiency, and avoided diligence—not only time saved.
- Portfolio use produces structured feedback that can improve calibration.
- Institutional customers value governance, provenance, and auditability enough
  to reward the product's true moat.

This is a strategic hypothesis, not a proven market result. Pricing, acquisition
cost, close time, willingness to share matter data, and repeat usage must be
tested with real customers.

### Deliberate non-targets for the first release

- consumers seeking a prediction about their own case;
- broad public access to matter-specific legal predictions;
- solo and small practices as the primary revenue model;
- low-value, one-off disputes where diligence cost overwhelms value;
- generic legal research, drafting, discovery, or chatbot use; and
- autonomous advice or decision-making.

## 4. Customer problem

The primary customer is not asking, “Can AI predict a case?” They are asking:

> What should I recommend now, what would make me change that recommendation,
> and can I defend the reasoning to someone who was not in the room?

URIM must therefore reduce five anxieties:

1. **Black-box risk** — show inputs, assumptions, range, sensitivities, and
   dissent.
2. **False precision** — use ranges and scenarios; never turn uncertainty into
   a theatrical decimal.
3. **Confidentiality risk** — minimize matter data, document data handling, and
   never invite confidential uploads before secure infrastructure exists.
4. **Professional-responsibility risk** — keep counsel in control and make
   verification part of the workflow.
5. **Procurement risk** — provide a legible validation, security, governance,
   and model-change record.

## 5. Positioning

### We are

- A decision instrument for consequential disputes
- A structured second opinion, not a replacement for counsel
- A joint distribution over outcomes and the unresolved events on which they
  depend, translated into a reviewable professional instrument
- Calibrated ranges rather than categorical answers
- Critical-path and sensitivity analysis rather than a single score
- Transparent about evidence, assumptions, provenance, and version
- Designed for the committee room as well as the matter team
- Canadian in its first research scope and institutionally legible anywhere
- Serious enough to be challenged

### We are not

- A lawyer, law firm, legal-advice service, or autonomous decision-maker
- A general legal chatbot
- A prediction oracle
- A live court-data feed unless the data is truly live
- A substitute for legal research, evidence review, or expert judgment
- A cyberpunk simulation of sophistication
- A source of invented win rates, corpus sizes, clients, partnerships, coverage,
  validation, scarcity, or response times
- A promise to test against “every decided case” before that scope is true and
  documented

### Category language

Use **decision intelligence for complex disputes** as the public category.
“Legal prediction engine” may remain a secondary descriptor, but it must not
reduce the product to a headline probability.

## 6. Product architecture

### The decision brief

The minimum credible output should contain:

1. Matter posture and decision being considered
2. Current outcome range and calibration context
3. Material assumptions and missing evidence
4. Comparator set and inclusion logic
5. Critical path of procedural, factual, and legal events
6. Sensitivity of the range to each material event
7. Alternative strategy or settlement scenarios
8. Specialist-model agreement and dissent
9. Sources and provenance
10. Model, data, analyst-review, and brief version
11. Last-updated time and reason for any revision
12. Human-review statement and limitations

### Core jobs

- **Screen:** decide whether a matter merits deeper diligence, funding, or
  particular counsel attention.
- **Advise:** make a settlement, reserve, strategy, or client recommendation
  more explicit.
- **Compare:** evaluate plausible paths side by side rather than defending one
  inherited narrative.
- **Monitor:** update the range only when a defined fact, ruling, or assumption
  changes.
- **Review:** allow another expert to reproduce, challenge, or annotate the
  reasoning.

### Product sequence

Matter record → comparator set → specialist panel → calibrated distribution →
critical path → decision brief → monitored updates.

The “Optimal Panel” and “Critical Path” names may be retained as product
concepts. Claims about multi-model deliberation, cross-examination, convergence,
or specific model providers must match the implementation and contractual
reality before publication.

## 7. Evidence standard

URIM earns trust by publishing what it can prove and declining to decorate what
it cannot.

### Validation principles

- use temporally held-out decisions wherever feasible;
- version data, labels, features, prompts, models, and evaluation code;
- publish matter-class and jurisdiction boundaries;
- report calibration and discrimination, not only accuracy;
- include baselines and confidence intervals;
- document abstentions, missing data, exclusions, and failure modes;
- separate development, validation, and live monitoring sets;
- prevent result leakage and post-outcome information from entering the test;
- maintain a dated model-change log; and
- submit public methodology claims to qualified legal, statistical, privacy,
  and security review.

No numerical performance figure may appear on the public site until it is real,
dated, reproducible, scoped, and linked to a methodology note. Illustrative
figures may appear only inside an unmistakably labelled product specimen.

## 8. Brand character

The voice is **measured, exact, candid, calm, and consequential**.

It should:

- begin with the decision, not the technology;
- distinguish estimates, evidence, assumptions, and judgment;
- use short declarative language around high-stakes concepts;
- explain uncertainty as useful information;
- preserve counsel's authority and responsibility;
- say what is illustrative, under research, or not yet validated; and
- invite scrutiny rather than demand belief.

It should not:

- say “know,” “prove,” “guarantee,” or “every” when the evidence supports only
  an estimate or bounded scope;
- manufacture urgency, scarcity, prestige, or exclusivity;
- anthropomorphize models as judges unless the metaphor clarifies a real
  mechanism;
- use courtroom clichés, gavels, columns, scales, or faux-Latin ornament;
- call a mailing list a live scorecard; or
- turn professional risk into an adversarial “win more” fantasy.

## 9. Visual system

The public site must present URIM as a credible enterprise legal-tech product
whose interface leads naturally into a reviewable decision brief. The owner has
selected the LexisNexis Protégé product page as a structural benchmark for the
public-site rhythm: large product-led headlines, spacious white sections,
selective colour, interface demonstrations, clear workflow navigation, and
restrained enterprise polish. This is inspiration, not replication. URIM must
use original copy, product interfaces, icons, assets, and interaction details;
it must not reproduce LexisNexis trade dress or protected material.

### Colour roles

- **Canvas White:** dominant public-site canvas and clarity signal
- **Soft Lavender / Ice:** product-demonstration and workflow surfaces
- **Deep Navy:** primary text, navigation structure, evidence sections, and
  institutional contrast
- **Signal Red:** primary actions and the most consequential state changes
- **Warm Orange:** controlled gradient support for conversion actions
- **Graphite:** secondary text and supporting interface labels
- **Rule:** quiet dividers, table structure, and card boundaries

Neon green, CRT scanlines, terminal rain, chrome gradients, and default-black
surfaces are retired. They imply hacker culture and opaque machinery when the
customer needs sobriety and reviewability.

### Typography

- A strong, highly legible sans carries public-site headlines, interface,
  explanatory prose, forms, navigation, and the URIM wordmark.
- Monospace is reserved for matter IDs, versions, timestamps, and compact data.

Typography should feel confident, contemporary, and enterprise-ready. The
decision brief itself may retain denser editorial hierarchy, but the marketing
surface should not resemble a court filing or traditional law-firm website.

### Layout

- Use a wide enterprise grid on large screens and deliberate, independently
  composed mobile layouts.
- Lead with a split hero: a concise commercial proposition beside an original,
  interactive URIM product demonstration.
- Follow with a sticky product navigation bar, centered positioning copy,
  large workflow showcases, use-case tabs, capability cards, governance, FAQ,
  and conversion.
- Alternate generous white space with pale product-demo surfaces and one dark
  evidence section.
- Keep interface specimens specific enough to explain URIM, while labeling all
  unvalidated numerical examples as illustrative.

### Motion

Motion severity is low.

- Functional feedback is immediate.
- Initial entry may use one short composed sequence.
- Product-preview states may advance slowly and must include a visible pause
  control; direct user choice always takes priority.
- Below-fold sections may settle by a few pixels once.
- No boot screen, ambient canvas, marquee, magnetic button, scroll hijacking,
  pinned reading sequence, continuous glow, or decorative flicker.
- Every interaction works without animation and respects reduced motion.

If movement does not clarify a change in evidence, scenario, state, or focus,
remove it.

## 10. Website conversion strategy

The website has one primary job: secure a qualified conversation with a
portfolio decision-maker or senior matter owner.

Until the mathematical engine has been implemented, bounded, and validated,
the public website must frame URIM as **coming soon** and **under development**.
All product interfaces and numerical outputs must remain explicitly
illustrative. The site may explain the intended mathematical object and the
standards it must satisfy, but it must not imply that a production model,
validated estimate, live matter assessment, or generally available product
already exists.

The page should answer, in order:

1. What decision does URIM improve?
2. What would I receive?
3. Can I inspect how the estimate was formed?
4. Is uncertainty handled honestly?
5. Does this fit my role and matter portfolio?
6. What happens if I request a briefing?

The primary call to action is **Request a portfolio briefing**. It must not
promise product access, turnaround, capacity, or cohort size that operations
cannot support.

The qualification form should collect only what is needed for a useful response:

- name;
- work email;
- organization;
- role;
- jurisdiction;
- broad matter or portfolio context; and
- contact consent.

Do not request party names, facts, documents, confidential information, or
privileged strategy through the public form.

## 11. Research and commercial roadmap

### Phase 0 — Credibility before prediction

- select one matter class and jurisdictional scope;
- define the outcome labels and observability rules;
- produce the research protocol and threat model;
- obtain lawful, maintainable data access;
- build comparator-set and temporal-validation pipelines;
- interview target buyers and primary users; and
- test the decision-brief format with illustrative, non-client facts.

### Phase 1 — Assisted assessments

- analyst- and counsel-reviewed briefs;
- explicit assumptions and abstention rules;
- per-matter learning with consent and separation controls;
- versioned validation note;
- secure intake outside the marketing site; and
- paid design-partner engagements when evidence and operations justify them.

### Phase 2 — Portfolio instrument

- recurring monitoring;
- matter comparison;
- scenario and reserve views;
- governed team collaboration;
- portfolio calibration; and
- enterprise security, retention, permissions, and audit controls.

### Phase 3 — Decision infrastructure

- APIs and workflow integrations;
- jurisdiction and matter-class expansion based on validation;
- independent model and process assurance;
- longitudinal portfolio learning; and
- institutional procurement at scale.

Do not build broad workflow software before the decision brief itself produces
repeatable value.

## 12. Decision framework

When several choices are viable, prefer the one that improves the strongest
combination of:

1. Decision value at stake
2. Trust and professional defensibility
3. Validation feasibility
4. Repeat usage and expansion potential
5. Data lawfulness and maintainability
6. Operational simplicity
7. Security and confidentiality
8. Product distinctiveness
9. Time to credible evidence

Never choose an option solely because it looks advanced, produces an impressive
demo, or copies a well-funded legal-technology company.

## 13. Measures of progress

Do not use traffic, mailing-list size, or gross leads as primary success
measures. Track:

- qualified briefing requests by buyer type;
- briefing-to-design-partner conversion;
- time from intake to reviewable brief;
- abstention rate and causes;
- calibration by matter class and jurisdiction;
- rate of material assumption changes;
- repeat matters per organization;
- percentage of briefs used in a real decision meeting;
- decision-maker comprehension and challenge quality;
- renewal or portfolio-expansion rate;
- support and analyst burden per brief; and
- security, privacy, and data-quality incidents.

Numerical targets should be added only after a real baseline exists.

## 14. Current assumptions to validate

- Portfolio decision-makers value critical-path transparency more than a single
  probability.
- Canadian commercial-dispute data can support one narrow, credible first
  matter class.
- A reviewed decision brief can command more value than a self-serve research
  seat during the initial phase.
- Customers will provide enough non-privileged structured context to improve an
  assessment.
- Validation can be explained clearly enough for counsel and procurement to
  evaluate it.
- The product can reduce decision uncertainty without encouraging over-reliance.
- A focused Canadian wedge can later expand into larger institutional markets.

These are hypotheses. The website must not present them as proven facts.

## 15. Claims and launch gates

Before public commercial launch, verify:

- trademark and naming clearance;
- lawful access to every material data source;
- accuracy of product and model-provenance language;
- methodology, validation, and evaluation claims;
- privacy impact assessment and retention schedule;
- privilege and confidentiality workflow;
- security architecture and incident process;
- terms, privacy notice, consent language, and regulatory posture;
- professional-responsibility review in each supported jurisdiction;
- French-language requirements for Quebec commercialization;
- accessible English and French product and policy surfaces where required;
- human-review responsibilities and escalation rules;
- pricing, service scope, response time, and support ownership; and
- database migration and operations notification for the public briefing form.

## 16. Current website implementation

The public site is a static, progressively enhanced single page:

```text
index.html            page markup and product specimen
assets/css/urim.css   design system, responsive layout, and restrained motion
assets/js/urim.js     product previews, tabs, carousel, FAQ, navigation, and form
assets/favicon.svg    compact URIM mark for browser and bookmark surfaces
api/access.js         POST /api/access — briefing requests
api/subscribe.js      retained legacy endpoint; not promoted in the current UI
migrations/           database changes required by the briefing form
scripts/validate.mjs  local structural and claims-safety checks
reference/            frozen earlier design comps
PLAN.md               implementation history
```

The site has no front-end build step. The form API uses Vercel serverless
functions and Neon Postgres via `DATABASE_URL`.

The canonical production URL is `https://urim.ca/`. Vercel remains the
application host, with the apex DNS managed through Cloudflare.

```sh
npm install
npm test
npx http-server . -p 8123
vercel dev
```

Run the database migration in `migrations/001_access_email.sql` before deploying
the updated access endpoint. Do not place a live database URL or client matter
information in the repository.

## 17. Working protocol

At the start of every URIM work session:

1. Read this document completely.
2. Identify the current research phase and buyer decision being improved.
3. Inspect the current work and preserve unrelated or user-authored changes.
4. Separate verified facts, product intent, illustrative specimens, and open
   assumptions.
5. Apply the 60% memorandum / 25% judicial reasons / 15% instrument model.
6. Apply the three-question URIM test.
7. Protect confidentiality, privilege, and human professional judgment.
8. Remove any public claim that outruns dated evidence.
9. Prefer the smallest credible experiment that produces useful evidence.
10. Record durable strategic decisions here.

If a request conflicts with this charter, surface the conflict. The owner may
intentionally change the strategy; do not drift silently.

## 18. Research inputs

The current direction is informed by, but not limited to:

- Thomson Reuters, *Future of Professionals Report 2026: Actionable insights for
  law firm leaders* — client pressure, fiduciary-grade expectations, traceable
  reasoning, and governance.
- Canadian Bar Association, *Ethics of Artificial Intelligence for the Legal
  Practitioner* — confidentiality, competence, supervision, disclosure, and
  independent judgment.
- Barreau du Québec, *Intelligence artificielle générative — Guide pratique pour
  une utilisation responsable* — responsible-use expectations in Quebec.
- Lex Machina and Premonition public product materials — current legal-analytics
  category conventions and institutional buyer segments.
- MANCE `README.md` and Phase 1 design brief — the customer-to-product-to-design
  method adapted here.

References are strategic inputs, not evidence that URIM has equivalent data,
capability, performance, adoption, or customer relationships.

---

© 2026 Laboratoires Structure Inc. — Order, out of chaos.
