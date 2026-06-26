---
title: 'On-page ranking uplift for near-miss western-suburb pages'
status: in-progress
source: seo-data
captured: '2026-06-27'
domain: seo
plan: '011-on-page-ranking-uplift/plan.md'
tags:
  - seo
  - on-page
  - location-pages
  - internal-linking
  - ctr
---

# On-page ranking uplift for near-miss western-suburb pages

## Problem / Opportunity

The June 2026 GSC export shows strong demand (~15,700 impressions/28d) but only ~50 clicks
(**0.32% CTR**) because the site's average position is **~32 (page 3–4)**, below the click threshold.
This is a **ranking-position problem, not a content-volume problem** — writing more blog posts won't
fix it. The fastest-converting opportunity is a cluster of high-relevance keywords already sitting at
**positions 8–14**, one push from page 1, where small on-page gains convert directly into clicks.

## Context

Triggered by the first SEO scorecard (`docs/seo-geo/scorecards/2026-06.md`). The near-miss keywords
and their backing pages:

| Keyword                             | Impr. | Pos   | Backing page                                                     |
| ----------------------------------- | ----- | ----- | ---------------------------------------------------------------- |
| commercial electrician altona       | 97    | 12.07 | /locations/electrician-altona + /services/commercial-electrician |
| electrician altona north            | 89    | 12.98 | /locations/electrician-altona-north                              |
| commercial electrician altona north | 39    | 8.05  | /locations/electrician-altona-north                              |
| electrician seddon                  | 61    | 9.85  | /locations/electrician-seddon                                    |
| mains power upgrade melbourne       | 52    | 13.71 | /services/mains-upgrades                                         |

Location pages render via `packages/ses-next/src/app/locations/[locationSlug]/page.tsx` and are
content-driven: the `locationPage` Sanity schema already has `seoTitle`, `seoDescription`, `intro`,
`suburb`, and `services` fields. So most of this work is **Sanity content editing**, not code —
tightening titles, H1/intro copy, and meta around the exact target keyword, plus adding internal links
that point at these pages from the homepage and topically-related pages to concentrate link equity.

## Rough Scope

- Audit the 4–5 backing pages' current `seoTitle` / `intro` against the exact target keyword phrasing.
- Rewrite `seoTitle` and `seoDescription` in Sanity to lead with the keyword + suburb, compelling CTA.
- Strengthen on-page H1/intro copy to include the target keyword naturally (Sanity `intro` field).
- Add contextual internal links pointing to these pages from the homepage service/area sections and
  from related location/service pages, to concentrate internal link equity.
- Track position movement month-over-month in the scorecard's tracked-keyword set.

## Success Signal

At least 2–3 of the tracked near-miss keywords move from positions 8–14 onto page 1 (top 10), with a
measurable rise in clicks/CTR for their backing pages in the next monthly scorecard.

## Open Questions

- Is the ceiling on these terms a content issue or a backlink/authority issue? On-page first; if pages
  reach the page-1 boundary and stall, the next lever is local citations / GBP signals.
- Should commercial-electrician intent route to the location pages or the dedicated
  `/services/commercial-electrician` page? Decide per-keyword from which page already ranks.

## References

- `docs/seo-geo/scorecards/2026-06.md` — June baseline scorecard
- `docs/seo-geo/scorecards/tracked-keywords.md` — confirmed tracked keyword set
- `packages/ses-next/src/app/locations/[locationSlug]/page.tsx`
- `packages/ses-content/schemas/locationPage.ts`
