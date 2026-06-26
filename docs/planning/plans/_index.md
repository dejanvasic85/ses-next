---
updated: '2026-06-27'
---

# Execution Plans

## Summary

| Status      | Count |
| ----------- | ----- |
| Planning    | 1     |
| Ready       | 0     |
| In Progress | 0     |
| Blocked     | 0     |
| Completed   | 4     |
| **Total**   | **5** |

## Plans

| #                                                               | Title                                                                    | Status    | Idea                                                                                                         | Started    | Completed  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------ | ---------- | ---------- |
| [06](./06-blog-strategy/plan.md)                                | Blog Content Strategy: Execution Plan                                    | completed | —                                                                                                            | 2026-04-25 | 2026-05-06 |
| [07](./07-geo-strategy/plan.md)                                 | GEO (Generative Engine Optimisation): Execution Plan                     | completed | —                                                                                                            | 2026-04-26 | 2026-05-06 |
| [09](./09-hardcoded-business-content/plan.md)                   | Move Hardcoded Business Content into Sanity SiteSettings: Execution Plan | completed | [hardcoded-business-content-to-sanity](../ideas/2026-05-hardcoded-business-content-to-sanity.md)             | 2026-05-07 | 2026-05-08 |
| [010](./010-enhance-ci-pipeline-format-and-lint-checks/plan.md) | Enhance CI Pipeline Checks for Formatting and Linting: Execution Plan    | completed | [enhance-ci-pipeline-format-and-lint-checks](../ideas/2026-04-enhance-ci-pipeline-format-and-lint-checks.md) | 2026-05-20 | 2026-05-20 |
| [011](./011-on-page-ranking-uplift/plan.md)                     | On-Page Ranking Uplift: Execution Plan                                   | planning  | [on-page-ranking-uplift-near-miss-pages](../ideas/2026-06-on-page-ranking-uplift-near-miss-pages.md)         | —          | —          |

## Blockers

_Nothing blocked._

## Notes

- **Plan 06** — All phases complete: redirect, tag/linking improvements, internal links + body CTAs, 2 new blog posts, content calendar. ISR revalidation bug fixed. Remaining: update title tags/meta on all 11 existing posts.
- **Plan 07** — Phase 1 complete: robots.txt updated for AI crawlers, dynamic `/llms` route handler created (replaces static file), `siteSettings` Sanity schema extended with business details, published to CMS. Phase 2 complete: `owner` object field added to `siteSettings` schema (name, role, accreditations); Person JSON-LD helper added to `structuredData.ts`; homepage injects Person JSON-LD when owner data is present. **2026-06-27: `owner.accreditations` (CEC, NET, ESV) and `owner.role` populated in Sanity** — Person JSON-LD credentials now active. Phases 3 & 4 (FAQ quality + blog credibility) previously completed.
- **Plan 011** — New active SEO plan, driven by the June 2026 scorecard. Shifts focus from content volume to ranking position. Multi-month, content-led (Sanity `seoTitle`/`seoDescription`/`intro` + internal linking). Phase 1: near-miss western-suburb pages; Phase 2: rescue electrical-testing guide; Phase 3: CTR/snippet audit. Bound to the monthly scorecard loop in `docs/seo-geo/`.
