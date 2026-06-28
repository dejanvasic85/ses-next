---
title: 'On-Page Ranking Uplift: Execution Plan'
number: '011'
status: in-progress
created: '2026-06-27'
updated: '2026-06-28T12:00:00'
owner: ''
idea: '2026-06-on-page-ranking-uplift-near-miss-pages.md'
started: '2026-06-28'
completed: ''
estimated-hours: '3-5 hrs/month, multi-month'
tags: ['seo', 'on-page', 'location-pages', 'internal-linking', 'ctr']
---

# 011 — On-Page Ranking Uplift: Execution Plan

## Overview

This is the active SEO plan, driven by the June 2026 scorecard (`docs/seo-geo/scorecards/2026-06.md`).
The data reframed the priority: the site has strong demand (~15,700 impressions/28d) but ~0.32% CTR
because average position is ~32 (page 3–4). This is a **ranking-position problem, not a
content-volume problem.** The plan raises rankings and CTR on pages that already have demand, worked
across several months within the 3–5 hr/month retainer. It folds in all three June SEO ideas as
phases. Almost all work is **Sanity content editing** (`seoTitle`, `seoDescription`, `intro` fields)
plus internal linking — minimal code. Each month's work feeds the next monthly scorecard, which
measures movement and selects the next page to optimise.

How the content fields reach the SERP (verified in codebase):

- **Location pages** — `seoTitle` → metadata title, `seoDescription` → meta description, `intro`
  (PortableText) → on-page H1/intro. Rendered in `packages/ses-next/src/app/locations/[locationSlug]/page.tsx`.
- **Service pages** — `seoTitle` → title, `description` → meta description. Rendered in
  `packages/ses-next/src/app/services/[...slug]/page.tsx`.
- **Blog posts** — `title` → page title, `description` → meta description. Rendered in
  `packages/ses-next/src/app/blog/[slug]/page.tsx`.

Because these are Sanity fields, most tasks need **no code changes and no deploy** — they take effect
on the next ISR revalidation (daily).

---

## Phase 1 — Near-miss western-suburb pages (Month 1, priority)

Push the page-1-adjacent keywords (pos 8–14) over the line. Highest ROI: small on-page gains here
convert directly to clicks.

### Task 1.1 — Optimise the Altona North location page

Targets: `electrician altona north` (pos 12.98, 89 impr) and `commercial electrician altona north`
(pos 8.05, 39 impr).

**Files to change:**

- Sanity `locationPage` document `electrician-altona-north` — `seoTitle`, `seoDescription`, `intro`.

**Steps:**

1. Rewrite `seoTitle` to lead with the keyword + suburb, e.g. "Electrician Altona North | Local &
   Commercial | Same-Day | SES".
2. Rewrite `seoDescription` (130–160 chars) with a CTA and a differentiator (5.0★, 19 yrs, REC 24794).
3. Strengthen the `intro` so the first sentence naturally contains "electrician in Altona North" and a
   commercial-electrician phrase.

**Verification:** GSC position for both keywords improves in the next scorecard; live page title/meta
reflect the new copy after revalidation.

---

### Task 1.2 — Optimise the Altona location page (commercial intent)

Target: `commercial electrician altona` (pos 12.07, 97 impr).

**Files to change:**

- Sanity `locationPage` document `electrician-altona` — `seoTitle`, `seoDescription`, `intro`.

**Steps:**

1. Add explicit commercial-electrician language to `seoTitle`/`intro` (the term has commercial intent).
2. Decide routing: if `/services/commercial-electrician` ranks better for this term than the location
   page, optimise that page instead and cross-link. Check GSC per-page data first.

**Verification:** `commercial electrician altona` moves toward top 10 in the next scorecard.

---

### Task 1.3 — Optimise the Seddon location page

Target: `electrician seddon` (pos 9.85, 61 impr) — already bottom of page 1.

**Files to change:**

- Sanity `locationPage` document `electrician-seddon` — `seoTitle`, `seoDescription`, `intro`.

**Steps:**

1. Tighten `seoTitle`/`intro` around "electrician Seddon"; it only needs a small nudge to hold page 1.
2. Add a compelling `seoDescription` to lift CTR now that it's visible on page 1.

**Verification:** Holds/improves top-10 position and gains its first clicks in the next scorecard.

---

### Task 1.4 — Optimise the Mains Upgrades service page

Target: `mains power upgrade melbourne` (pos 13.71, 52 impr). Best-performing service page already
(11 clicks/930 impr), so it has authority to push.

**Files to change:**

- Sanity `service` document `mains-upgrades` — `seoTitle`, `description`.

**Steps:**

1. Add "mains power upgrade" phrasing to `seoTitle` (currently strong on "mains upgrades").
2. Refresh `description` meta with a same-day / licensed CTA.

**Verification:** Keyword moves toward top 10; page clicks rise.

---

### Task 1.5 — Internal linking to the near-miss pages

Concentrate internal link equity on the Phase 1 pages.

**Files to change:**

- Likely no code — links added via Sanity content (homepage service-area section, related
  location/service `intro` bodies). Confirm whether the homepage service-area list is CMS-driven or in
  `packages/ses-next/src/app/page.tsx` before editing.

**Steps:**

1. Ensure the homepage links to the Altona North, Altona, and Seddon location pages with descriptive
   anchor text (the suburb + "electrician").
2. Add contextual links between related location pages (nearby suburbs) and from `mains-upgrades` to
   the location pages, and vice versa.

**Verification:** Internal links resolve; `pnpm build` passes; pages show increased internal links in a
crawl.

---

## Phase 2 — Rescue the electrical-testing guide (Month 2)

Implements `2026-06-rescue-electrical-testing-guide-high-impressions.md`. The guide draws 3,540
impressions at pos ~14 with 3 clicks — the single biggest click opportunity on the site.

### Task 2.1 — Refresh the guide's title and meta

**Files to change:**

- Sanity `blog-post` document `comprehensive-guide-to-electrical-testing` — `title`, `description`.

**Steps:**

1. Sharpen `title` for click-through while keeping "electrical testing" + "Melbourne".
2. Rewrite `description` to a compelling 130–160 char snippet.

**Verification:** CTR on the guide rises in the next scorecard.

### Task 2.2 — Expand depth and freshness

**Files to change:**

- Sanity `blog-post` body (Portable Text) for the guide.

**Steps:**

1. Add a section answering a high-impression sub-query (e.g. "electrical safety testing" pos 24, or
   "switchboard testing" pos 26) to broaden the page's ranking surface.

**Verification:** Guide ranks for additional queries in the next scorecard.

### Task 2.3 — Wire the guide to its service page

**Files to change:**

- Sanity: the guide body + `service` document `electrical-testing` (`seoTitle`, `description`, and a
  body link if the schema supports it).

**Steps:**

1. Add bidirectional internal links between the guide and `/services/electrical-testing` (pos 56).
2. Assign clear primary intent to each (avoid cannibalisation): service page = transactional, guide =
   informational.

**Verification:** `/services/electrical-testing` climbs off page 5 in the next scorecard.

---

## Phase 3 — CTR / snippet audit (Month 3)

Implements `2026-06-ctr-and-snippet-audit-for-ranking-pages.md`. Fixes pages that already rank on
page 1 but earn ~0 clicks (e.g. `/services` pos 8.29, `/faq` pos 3.05) — a snippet problem, not a rank
problem.

### Task 3.1 — Identify low-CTR page-1 pages

**Steps:**

1. From the latest GSC Pages export, list pages at position ≤ 12 with disproportionately low CTR.

### Task 3.2 — Rewrite their titles and meta descriptions

**Files to change:**

- Sanity `seoTitle`/`seoDescription` (location, service) and `title`/`description` (blog) for the
  identified pages.

**Steps:**

1. Front-load value (suburb, "licensed", "same-day") in titles.
2. Write 130–160 char meta descriptions with a CTA and a differentiator.
3. For pages ranking well but getting no clicks (e.g. `/services` hub), assess whether the issue is the
   snippet or a query/intent mismatch — may flag a separate IA idea.

**Verification:** CTR on audited pages improves in the next scorecard, independent of position change.

---

## Sanity CMS Steps (summary)

This plan is predominantly CMS content work. Per month:

- [x] Phase 1: edit `seoTitle`/`seoDescription`/`intro` on `electrician-altona-north`,
      `electrician-altona`, `electrician-seddon` (locationPage) and `mains-upgrades` (service). _(completed 2026-06-28)_
- [x] Phase 1: add internal links concentrating equity on the above. _(already live via CMS-driven homepage serviceAreas — confirmed 2026-06-28)_
- [x] Phase 2: edit the `comprehensive-guide-to-electrical-testing` blog post + `electrical-testing`
      service; add bidirectional links. _(completed 2026-06-28)_
- [x] Phase 3: rewrite titles/meta on low-CTR page-1 pages identified from GSC. *(completed 2026-06-28 — /faq and /services hardcoded metadata updated in code)*

All edits are non-destructive (Sanity document history retains prior versions) and take effect on the
next ISR revalidation.

---

## Measurement Loop

This plan is bound to the monthly scorecard. Each month:

1. Do that month's phase (above).
2. At the next CSV drop, the scorecard diffs the tracked keywords (`tracked-keywords.md`) against the
   prior month and attributes movement to the work done.
3. If a near-miss reaches page 1 and holds, graduate it and pull the next near-miss from the latest
   export into the plan.

---

## Verification Checklist

Run in order before pushing any code changes (most months have none — content-only):

- [ ] `pnpm format`
- [ ] `pnpm lint`
- [ ] `pnpm type:check`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e`

---

## Rollback Plan

1. All Sanity content edits are non-destructive — restore any field from document history.
2. Internal-link or metadata code changes (if any) revert via git and redeploy.
3. If an optimisation drops a keyword's position, restore the prior `seoTitle`/`intro` from Sanity
   history and note the regression in the next scorecard.
