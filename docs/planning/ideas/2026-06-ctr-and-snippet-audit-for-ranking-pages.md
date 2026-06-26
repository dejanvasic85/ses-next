---
title: 'CTR / snippet audit for already-ranking pages'
status: captured
source: seo-data
captured: '2026-06-27'
domain: seo
plan: ''
tags:
  - seo
  - ctr
  - meta-descriptions
  - title-tags
  - serp
---

# CTR / snippet audit for already-ranking pages

## Problem / Opportunity

Some pages already rank on page 1 but still earn ~0 clicks — e.g. `/services` at position 8.29 with
136 impressions and 0 clicks, `/faq` at pos 3.05 with 0 clicks. A page-1 position with no clicks is a
**snippet problem**, not a ranking problem: the title/meta description isn't compelling enough (or the
query intent doesn't match the page). This is distinct from the near-miss work — here the rank is fine,
the SERP listing is the leak.

## Context

From the June 2026 scorecard. Sitewide CTR is 0.32% vs a healthy 2–4%. Part of that is low rank
(addressed by the near-miss + electrical-testing-guide ideas), but part is poor SERP presentation on
pages that *do* rank. Title tags and meta descriptions come from Sanity `seoTitle`/`seoDescription`
(location/service pages) and `title`/`description` (blog posts), so this is mostly content tuning.

## Rough Scope

- Identify page-1 / near-page-1 pages (pos ≤ 12) with disproportionately low CTR from GSC Pages data.
- Rewrite their meta titles to front-load the value proposition (suburb, "licensed", "same-day").
- Rewrite meta descriptions to 130–160 chars with a clear CTA and a differentiator (5.0★, 19 yrs, REC).
- Re-check after 28 days; CTR uplift is observable without rank change.

## Success Signal

Measurable CTR improvement on the audited pages in the next scorecard, independent of position change.

## Open Questions

- For pages ranking well but getting no clicks (e.g. `/services` hub), is the issue the snippet or a
  query/intent mismatch (people want a specific service, not a hub)? May indicate a routing/IA fix.

## References

- `docs/seo-geo/scorecards/2026-06.md`
- `packages/ses-content/schemas/locationPage.ts`, `service.ts`, `blog-post.ts`
