---
updated: '2026-05-06'
---

# Execution Plans

## Summary

| Status      | Count |
| ----------- | ----- |
| Planning    | 1     |
| Ready       | 0     |
| In Progress | 0     |
| Blocked     | 0     |
| Completed   | 2     |
| **Total**   | **3** |

## Plans

| # | Title | Status | Priority | PRD | Started | Completed |
| - | ----- | ------ | -------- | --- | ------- | --------- |
| [06](./06-blog-strategy/plan.md) | Blog Content Strategy: Execution Plan | completed | high | [06-blog-strategy.md](../prds/06-blog-strategy.md) | 2026-04-25 | 2026-05-06 |
| [07](./07-geo-strategy/plan.md) | GEO (Generative Engine Optimisation): Execution Plan | completed | medium | [07-geo-strategy.md](../prds/07-geo-strategy.md) | 2026-04-26 | 2026-05-06 |
| [09](./09-hardcoded-business-content/plan.md) | Move Hardcoded Business Content into Sanity SiteSettings: Execution Plan | planning | high | [09-hardcoded-business-content.md](../prds/09-hardcoded-business-content.md) | — | — |

## Blockers

_Nothing blocked._

## Notes

- **Plan 06** — All phases complete: redirect, tag/linking improvements, internal links + body CTAs, 2 new blog posts, content calendar. ISR revalidation bug fixed. Remaining: update title tags/meta on all 11 existing posts (PRD acceptance criterion).
- **Plan 07** — Phase 1 complete: robots.txt updated for AI crawlers, dynamic `/llms` route handler created (replaces static file), `siteSettings` Sanity schema extended with business details, published to CMS. Phase 2 complete: `owner` object field added to `siteSettings` schema (name, role, accreditations); Person JSON-LD helper added to `structuredData.ts`; homepage injects Person JSON-LD when owner data is present. Remaining: populate owner fields in Sanity Studio, then Phases 3 & 4 (FAQ quality + blog credibility signals).
