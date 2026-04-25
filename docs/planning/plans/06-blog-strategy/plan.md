---
title: 'Blog Content Strategy: Execution Plan'
number: '06'
status: in-progress
started: '2026-04-25'
priority: high
created: '2026-04-15'
updated: '2026-04-15'
owner: ''
prd: '06-blog-strategy.md'
started: ''
completed: ''
estimated-hours: ''
tags: ['blog', 'content', 'seo', 'internal-linking']
---

# 06 — Blog Content Strategy: Execution Plan

## Overview

This plan delivers the blog optimisation work defined in PRD-06. It covers three areas: (1) updating title tags and meta descriptions on all 11 existing posts in Sanity, (2) consolidating the two cannibalising electrical-testing posts with a 301 redirect, (3) adding related blog post links to service pages, and (4) publishing the first two new keyword-targeted posts. All content changes are made in Sanity CMS. The 301 redirect and "Related Blog Posts" component already exist in the codebase — this plan wires them up correctly.

---

## Phase 1 — Consolidate Cannibalising Posts

### Task 1.1 — Add 301 redirect for the weaker electrical-testing post

The post `importance-of-electrical-testing` competes with `comprehensive-guide-to-electrical-testing` for the same keywords. Redirect the weaker post to the stronger one.

**Files to change:**

- `packages/ses-next/next.config.ts` — add redirect entry

**Steps:**

1. Open `packages/ses-next/next.config.ts`.
2. In the `redirects()` array, add:
   ```ts
   {
     source: '/blog/importance-of-electrical-testing',
     destination: '/blog/comprehensive-guide-to-electrical-testing',
     permanent: true,
   },
   ```

**Verification:** Navigate to `https://www.sesmelbourne.com.au/blog/importance-of-electrical-testing` — it should 301 redirect to the comprehensive guide.

---

### Task 1.2 — Merge content from weaker post into the comprehensive guide (Sanity)

See Sanity CMS Steps below.

---

## Phase 2 — Update Existing Post Titles and Meta Descriptions

All 11 posts need updated titles and meta descriptions in Sanity. The blog post `generateMetadata` in `packages/ses-next/src/app/blog/[slug]/page.tsx` uses `post.title` as the page title and `post.description` as the meta description — both come directly from Sanity fields.

No code changes required for this phase — it is entirely Sanity content work.

See Sanity CMS Steps below.

---

## Phase 3 — Internal Linking

### Task 3.1 — Add related blog posts to service pages

The service page at `packages/ses-next/src/app/services/[...slug]/page.tsx` already renders a "Related Blog Posts" section (lines 236–276) when `filteredBlogPosts.length > 0`. It filters blog posts by matching the service's `slug` against post `tags`.

To wire up internal links, blog posts need the correct service slug added to their `tags` array in Sanity. No code changes are needed — this is a Sanity content task.

See Sanity CMS Steps below.

---

### Task 3.2 — Add related service links within blog post body

Each blog post body (Portable Text in Sanity) should contain a contextual link to the most relevant service page. This is a content editing task in Sanity.

See Sanity CMS Steps below.

---

## Phase 4 — Publish New Content

### Task 4.1 — Publish first two new keyword-targeted posts

Use the `/ses-content-writer` skill to draft each post before publishing in Sanity. Target posts (priority order):

1. **"Electrical Safety Testing Guide for Landlords"** — target keyword: `electrical safety testing`, links to `/services/electrical-testing`
2. **"Emergency Electrician Melbourne: When to Call One"** — target keyword: `emergency electrician melbourne`, links to `/services/emergency-electrician`

Each post must follow the format from PRD-06:

- 800–1200 words
- Question-format H2 headings
- At least 1 statistic or external reference
- CTA linking to the relevant service page
- FAQ schema questions at the bottom (added as `faqs` field in Sanity if supported, else in body)
- Melbourne/suburb mentions naturally placed

See Sanity CMS Steps below.

---

## Phase 5 — Content Calendar

### Task 5.1 — Create 3-month content calendar document

**Files to change:**

- `docs/planning/plans/06-blog-strategy/assets/content-calendar.md` — create calendar

**Steps:**

1. Create `docs/planning/plans/06-blog-strategy/assets/content-calendar.md` with a table covering the next 3 months (May–July 2026), scheduling 2 posts per month from the priority topics in PRD-06:

| Month     | Post Title                               | Target Keyword                      | Service Page                      |
| --------- | ---------------------------------------- | ----------------------------------- | --------------------------------- |
| May 2026  | Signs You Need a Switchboard Upgrade     | switchboard upgrade melbourne       | /services/switchboard-upgrades    |
| May 2026  | Smoke Alarm Legislation Victoria Guide   | smoke alarm compliance victoria     | /services/smoke-alarms            |
| June 2026 | Split System vs Ducted AC Comparison     | split system installation melbourne | /services/air-conditioning        |
| June 2026 | NBN Troubleshooting and Data Point Guide | melbourne data electrician          | /services/data-and-tv             |
| July 2026 | How to Choose a Solar Battery in 2026    | solar battery melbourne             | /services/renewable-energy        |
| July 2026 | EV Charger Home Installation Guide       | ev charger installation melbourne   | /services/ev-charger-installation |

**Verification:** File exists at `docs/planning/plans/06-blog-strategy/assets/content-calendar.md`. ✓

---

## Sanity CMS Steps

### Post consolidation

- [x] Open `importance-of-electrical-testing` post in Sanity Studio
- [x] Copy any unique content sections into `comprehensive-guide-to-electrical-testing`
- [x] Unpublish (do NOT delete) `importance-of-electrical-testing` — the redirect in `next.config.ts` handles the URL

### Existing post title and meta description updates

Update `title` and `description` fields for each post in Sanity Studio:

- [x] `illuminate-your-space` → Title: "LED Lighting Installation Guide: What Melbourne Homeowners Need to Know"
- [x] `duel-power-of-efficient-lighting` → Title: "Energy-Efficient Lighting: How to Reduce Your Melbourne Electricity Bill"
- [x] `unleash-the-power-of-your-entertainment` → Title: "Home Theatre & Entertainment System Wiring Guide"
- [x] `harnessing-the-power-of-renewables` → Title: "Solar Panel Installation in Melbourne: Your Complete Guide"
- [x] `benefits-of-structured-cabling` → Title: "Structured Cabling for Melbourne Homes and Offices"
- [x] `maximising-efficiency-of-your-air-conditioner` → Title: "Air Conditioner Maintenance Tips: Keep Your Split System Running Efficiently"
- [x] `stay-connected-and-protected-role-of-ups-systems` → Title: "UPS Systems for Home: Protect Your Network During Power Outages"
- [x] `VEEC-guide-air-conditioning` → Title: "Victorian Energy Efficiency Certificates (VEECs): Air Conditioning Rebate Guide"
- [x] Update `description` (meta description) on all posts above to be 130–160 chars, keyword-targeted, and include a CTA
- [x] Update `description` on `comprehensive-guide-to-electrical-testing` to reflect merged content

### Internal linking via tags

Add service slugs to each post's `tags` array so the service page "Related Blog Posts" section picks them up:

- [x] `comprehensive-guide-to-electrical-testing` → add tag `electrical-testing`
- [x] `illuminate-your-space` → add tag `lighting`
- [x] `duel-power-of-efficient-lighting` → add tag `lighting`
- [x] `harnessing-the-power-of-renewables` → add tag `renewable-energy`
- [x] `benefits-of-structured-cabling` → add tag `data-and-tv`
- [x] `maximising-efficiency-of-your-air-conditioner` → add tag `air-conditioning`
- [x] `unleash-the-power-of-your-entertainment` → add tag `data-and-tv`
- [x] `VEEC-guide-air-conditioning` → add tag `air-conditioning`

### Internal links within post bodies

Add a contextual paragraph or CTA with a link to the relevant service page in each post body (Portable Text):

- [x] `comprehensive-guide-to-electrical-testing` → link to `/services/electrical-testing`
- [x] `illuminate-your-space` → link to `/services/lighting`
- [x] `duel-power-of-efficient-lighting` → link to `/services/lighting`
- [x] `harnessing-the-power-of-renewables` → link to `/services/renewable-energy`
- [x] `benefits-of-structured-cabling` → link to `/services/data-and-tv`
- [x] `maximising-efficiency-of-your-air-conditioner` → link to `/services/air-conditioning`
- [x] `unleash-the-power-of-your-entertainment` → link to `/services/data-and-tv`
- [x] `VEEC-guide-air-conditioning` → link to `/services/air-conditioning`
- [x] `stay-connected-and-protected-role-of-ups-systems` → link to `/services/data-and-tv`

### New posts

- [x] Draft and publish "Electrical Safety Testing Guide for Landlords" (use `/ses-content-writer`)
- [x] Draft and publish "Emergency Electrician Melbourne: When to Call One" (use `/ses-content-writer`)
- [x] Add `electrical-testing` tag to first new post; add `emergency-electrician` tag to second

---

## Verification Checklist

Run in order before pushing code changes:

- [ ] `npm run format`
- [ ] `npm run lint`
- [ ] `npm run type:check`
- [ ] `npm run build`
- [ ] `npm run test:e2e`

---

## Rollback Plan

1. If the redirect causes issues, remove the entry from `redirects()` in `packages/ses-next/next.config.ts` and redeploy.
2. All Sanity content changes are non-destructive — previous versions are available in Sanity's document history. Restore from there if needed.
3. The `importance-of-electrical-testing` post is unpublished, not deleted — it can be re-published instantly if the redirect strategy changes.

---

## Assets

- `assets/content-calendar.md` — 3-month content calendar (created in Task 5.1)
