---
updated: '2026-06-28'
---

# Execution Plans

## Summary

| Status      | Count |
| ----------- | ----- |
| Planning    | 0     |
| Ready       | 0     |
| In Progress | 1     |
| Blocked     | 0     |
| Completed   | 5     |
| **Total**   | **6** |

## Plans

| #                                                               | Title                                                                    | Status      | Idea                                                                                                                                                                                                                 | Started    | Completed  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------- |
| [06](./06-blog-strategy/plan.md)                                | Blog Content Strategy: Execution Plan                                    | completed   | —                                                                                                                                                                                                                    | 2026-04-25 | 2026-05-06 |
| [07](./07-geo-strategy/plan.md)                                 | GEO (Generative Engine Optimisation): Execution Plan                     | completed   | —                                                                                                                                                                                                                    | 2026-04-26 | 2026-05-06 |
| [09](./09-hardcoded-business-content/plan.md)                   | Move Hardcoded Business Content into Sanity SiteSettings: Execution Plan | completed   | [hardcoded-business-content-to-sanity](../ideas/2026-05-hardcoded-business-content-to-sanity.md)                                                                                                                     | 2026-05-07 | 2026-05-08 |
| [010](./010-enhance-ci-pipeline-format-and-lint-checks/plan.md) | Enhance CI Pipeline Checks for Formatting and Linting: Execution Plan    | completed   | [enhance-ci-pipeline-format-and-lint-checks](../ideas/2026-04-enhance-ci-pipeline-format-and-lint-checks.md)                                                                                                         | 2026-05-20 | 2026-05-20 |
| [011](./011-on-page-ranking-uplift/plan.md)                     | On-Page Ranking Uplift: Execution Plan                                   | in-progress | [on-page-ranking-uplift-near-miss-pages](../ideas/2026-06-on-page-ranking-uplift-near-miss-pages.md)                                                                                                                 | 2026-06-28 | —          |
| [013](./013-sanity-typegen-and-domain-services/plan.md)         | Sanity TypeGen + Domain Content Services: Execution Plan                 | completed   | [configure-sanity-type-generation](../ideas/2026-05-configure-sanity-type-generation.md), [split-content-service-into-domain-sanity-services](../ideas/2026-05-split-content-service-into-domain-sanity-services.md) | 2026-06-28 | 2026-06-28 |

## Blockers

_Nothing blocked._

## Notes

- **Plan 06** — All phases complete: redirect, tag/linking improvements, internal links + body CTAs, 2 new blog posts, content calendar. ISR revalidation bug fixed. Remaining: update title tags/meta on all 11 existing posts.
- **Plan 07** — Phase 1 complete: robots.txt updated for AI crawlers, dynamic `/llms` route handler created (replaces static file), `siteSettings` Sanity schema extended with business details, published to CMS. Phase 2 complete: `owner` object field added to `siteSettings` schema (name, role, accreditations); Person JSON-LD helper added to `structuredData.ts`; homepage injects Person JSON-LD when owner data is present. **2026-06-27: `owner.accreditations` (CEC, NET, ESV) and `owner.role` populated in Sanity** — Person JSON-LD credentials now active. Phases 3 & 4 (FAQ quality + blog credibility) previously completed.
- **Plan 011** — All 3 phases executed 2026-06-28. Phase 1: Altona North, Altona, Seddon location pages + Mains Upgrades service page optimised in Sanity; internal links confirmed live. Phase 2: electrical testing guide title/meta sharpened, two new body sections added (electrical safety testing + switchboard testing), bidirectional links to service page. Phase 3: `/faq` and `/services` hardcoded metadata rewritten in code (committed). Next: July scorecard on 2026-07-20 to measure impact.
- **Plan 013** — Sanity TypeGen setup + domain content services split. Combines two captured engineering ideas into one cohesive refactor.
