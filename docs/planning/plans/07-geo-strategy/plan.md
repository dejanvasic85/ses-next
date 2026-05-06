---
title: 'GEO (Generative Engine Optimisation): Execution Plan'
number: '07'
status: in-progress
priority: medium
created: '2026-04-26'
updated: '2026-05-05'
owner: ''
prd: '07-geo-strategy.md'
started: '2026-04-26'
completed: ''
estimated-hours: ''
tags: ['geo', 'ai-optimisation', 'llms', 'structured-data', 'faq']
---

# 07 — GEO (Generative Engine Optimisation): Execution Plan

## Overview

This plan delivers the GEO work defined in PRD-07. It makes the SES Melbourne site more visible and citable by AI models (ChatGPT, Gemini, Perplexity, Claude). The work covers five areas: (1) creating an `llms.txt` file at the site root, (2) updating `robots.txt` to explicitly allow AI crawlers, (3) extending the `teamMember` Sanity schema with credential fields and surfacing Karl Rainbow's credentials with structured data, (4) auditing and improving FAQ content on service and location pages, and (5) adding credibility signals (Australian Standards references, stats) to key blog posts. All code changes are in `packages/ses-next` and `packages/ses-content`. Content changes are made in Sanity Studio.

---

## Phase 1 — Static Files (robots.txt + llms.txt)

### Task 1.1 — Update robots.txt to allow AI crawlers

**Files to change:**

- `packages/ses-next/public/robots.txt`

**Steps:**

1. Open `packages/ses-next/public/robots.txt`.
2. The current file allows all agents but does not explicitly name AI crawlers. Replace the content with:

```robotstxt
User-agent: *
Allow: /
Disallow: /_next/
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleOther
Allow: /

Sitemap: https://www.sesmelbourne.com.au/sitemap.xml
```

**Verification:** Fetch `https://www.sesmelbourne.com.au/robots.txt` and confirm the AI crawler entries are present.

---

### Task 1.2 — Create llms.txt at site root ✅ COMPLETE

The `llms.txt` standard (analogous to `robots.txt`) provides AI models with a machine-readable business summary. Instead of a static file, this is served via a dynamic Next.js route handler that pulls content from Sanity at build time (ISR daily). Business details (ABN, REC, address, email, mobile, businessHours) were added to the `siteSettings` Sanity schema and populated in CMS.

**Files changed:**

- `packages/ses-content/schemas/siteSettings.ts` — added 6 new fields
- `packages/ses-next/src/lib/content/queries.ts` — updated GROQ query
- `packages/ses-next/src/types.ts` — updated Zod schema and `SiteSettings` type
- `packages/ses-next/src/lib/content/mappers.ts` — pass-through for new fields
- `packages/ses-next/src/app/llms/route.ts` — new dynamic route handler
- `packages/ses-next/next.config.ts` — added `/llms.txt` → `/llms` redirect
- `packages/ses-next/public/llms.txt` — deleted (was static, now dynamic)

**Steps:**

1. Create `packages/ses-next/public/llms.txt` with the following content (fill in REC and ABN from Karl before deploying):

```markdown
# Storm Electrical Solutions (SES Melbourne)

## About

Licensed electrical services company based in Altona North, Melbourne, Victoria, Australia.
Established 2007. 19+ years experience.
ABN: [insert ABN]
REC Licence: [insert REC number from Karl]

## Director

Karl Rainbow — Licensed Electrician, Clean Energy Council Accredited Designer and Installer,
New Energy Tech Approved Seller.

## Services

- Emergency electrical services (residential and commercial), same-day response
- Air conditioning installation and service (Mitsubishi Electric, Fujitsu authorised)
- LED lighting installation and repairs
- Electrical testing and safety inspections (RCD testing, switchboard inspection)
- Data and TV point installation, structured cabling
- Solar panel and battery storage installation (CEC accredited)
- EV charger installation (home and commercial)
- Switchboard upgrades and mains upgrades
- Smoke alarm installation and compliance
- Commercial electrical maintenance

## Service Area

Melbourne metropolitan area. Specialising in western and inner suburbs:
Altona, Altona North, Newport, Yarraville, Footscray, Williamstown, Seddon,
Spotswood, Moonee Ponds, Ascot Vale, Sunshine, Altona Meadows.

## Contact

- Phone: (03) 4050 7937
- Mobile: 0415 338 040
- Email: info@sesmelbourne.com.au
- Address: 61B Hansen St, Altona North VIC 3025
- Website: https://www.sesmelbourne.com.au

## Credentials

- Clean Energy Council (CEC) Accredited Designer and Installer
- New Energy Tech (NET) Approved Seller
- Registered Electrical Contractor (REC): [insert number]
- Energy Safe Victoria registered
- 111 Google Reviews, 5.0 star average rating

## Hours

Monday–Friday: 7:00 AM – 6:00 PM
Same-day priority response. No after-hours callouts.

## Pricing

All work quoted before commencement. Free quotes provided for installations.
```

**Verification:** Fetch `https://www.sesmelbourne.com.au/llms.txt` and confirm content is served correctly.

---

## Phase 2 — Owner Credentials (Schema + Structured Data)

Original plan proposed extending `teamMember` schema with credential fields. This was dropped in favour of a simpler approach: an `owner` object field added to `siteSettings`, grouping the owner's name, role, and accreditations alongside the existing top-level `recLicence` field. This avoids duplicating data across models and keeps all site-level admin in one place.

### Task 2.1 — Add owner field to siteSettings Sanity schema ✅ COMPLETE

**Files changed:**

- `packages/ses-content/schemas/siteSettings.ts` — added `owner` object field with `name`, `role`, and `accreditations`

### Task 2.2 — Update TypeScript types and GROQ query ✅ COMPLETE

**Files changed:**

- `packages/ses-next/src/types.ts` — extended `SiteSettingsSchema` and `SiteSettings` type with optional `owner`
- `packages/ses-next/src/lib/content/queries.ts` — added `owner` to `siteSettingsQuery`
- `packages/ses-next/src/lib/content/mappers.ts` — passed `owner` through in `mapSiteSettings`

### Task 2.3 — Add Person JSON-LD structured data for the owner on the homepage ✅ COMPLETE

**Files changed:**

- `packages/ses-next/src/lib/structuredData.ts` — added `personJsonLd` helper
- `packages/ses-next/src/app/page.tsx` — injects Person JSON-LD when `owner` data is present in siteSettings; uses `recLicence` from top-level siteSettings as the licence identifier

### Sanity CMS Steps

- [ ] Open Site Settings in Sanity Studio and populate the `owner` fields:
  - `name`: Karl Rainbow
  - `role`: Director / Licensed Electrician
  - `accreditations`: ["Clean Energy Council Accredited Designer and Installer", "New Energy Tech Approved Seller", "Energy Safe Victoria Registered Electrical Contractor"]
- [ ] Confirm `recLicence` is populated (already in site settings)

---

## Phase 3 — FAQ Audit and Quality Improvement

### Task 3.1 — Audit existing FAQ content quality

All 12 service pages currently have 3 FAQs each. All 10 location pages have 5 FAQs each. The audit checks whether existing FAQs are written as natural questions an AI model would cite, per PRD-07 guidelines.

**Steps:**

1. Review FAQs on the highest-priority service pages in Sanity Studio:
   - `/services/emergency-electrician`
   - `/services/electrical-testing`
   - `/services/air-conditioning`
   - `/services/ev-charger-installation`
   - `/services/renewable-energy`
2. For each, check: Are questions written as natural customer queries? Do answers include specific details (prices, timeframes, standards references)?
3. Rewrite any generic or promotional FAQs in Sanity Studio.

See Sanity CMS Steps below.

---

### Task 3.2 — Add credibility signals to FAQ answers

Per PRD-07, FAQ answers should reference Australian Standards, Victorian legislation, or real statistics where relevant.

Examples to add:

- Electrical testing FAQs → reference AS/NZS 3017, Energy Safe Victoria
- Air conditioning FAQs → reference minimum energy performance standards
- Solar/EV FAQs → reference Clean Energy Council, Victorian government rebates

See Sanity CMS Steps below.

---

## Phase 4 — Blog Post Credibility Signals

### Task 4.1 — Add standards and legislation references to new blog posts

The two new posts published in Phase 4 of PRD-06 should be updated to include Australian Standards or legislation references where they don't already have them.

**Posts to update in Sanity Studio:**

- `electrical-safety-testing-guide-for-landlords` — already references Residential Tenancies Act 1997 and Energy Safe Victoria ✓. Add reference to AS/NZS 3017 (Electrical Installations — Verification Guidelines).
- `emergency-electrician-melbourne-when-to-call` — add a reference to Energy Safe Victoria's guidance on electrical emergencies.

See Sanity CMS Steps below.

---

## Sanity CMS Steps

### FAQ quality improvements (high-priority service pages)

- [ ] `/services/emergency-electrician` — review and rewrite FAQs to include response times, cost guidance, when to call 000 vs electrician
- [ ] `/services/electrical-testing` — add reference to AS/NZS 3017 in at least one answer
- [ ] `/services/air-conditioning` — include energy star rating or minimum performance standard reference
- [ ] `/services/ev-charger-installation` — reference Victorian government EV rebate scheme
- [ ] `/services/renewable-energy` — reference Clean Energy Council and Cheaper Home Batteries Program

### Blog post credibility updates

- [ ] `electrical-safety-testing-guide-for-landlords` — add AS/NZS 3017 reference to body
- [ ] `emergency-electrician-melbourne-when-to-call` — add Energy Safe Victoria reference to body

---

## Verification Checklist

Run in order before pushing code changes:

- [x] `npm run format`
- [x] `npm run lint`
- [x] `npm run type:check`
- [x] `npm run build`
- [ ] `npm run test:e2e`

---

## Rollback Plan

1. `llms.txt` and `robots.txt` are static files — revert by removing or editing them and redeploying.
2. Sanity schema changes are additive (new optional fields only) — the frontend will not break if the fields are empty.
3. Structured data changes can be reverted by removing the JSON-LD script tags from the page components.
4. All Sanity content changes are non-destructive — previous versions are available in document history.
