---
title: 'GEO (Generative Engine Optimisation): Execution Plan'
number: '07'
status: completed
priority: medium
created: '2026-04-26'
updated: '2026-05-06'
owner: ''
prd: '07-geo-strategy.md'
started: '2026-04-26'
completed: '2026-05-06'
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

## Phase 2 — Karl Rainbow Credentials (Schema + Structured Data)

### Task 2.1 — Extend teamMember Sanity schema with credential fields

**Files to change:**

- `packages/ses-content/schemas/teamMember.ts`

**Steps:**

1. Open `packages/ses-content/schemas/teamMember.ts`.
2. Add the following fields after `avatar`:

```ts
{
  name: 'bio',
  type: 'text',
  title: 'Bio',
  description: 'Short professional bio (2-3 sentences)',
  rows: 3,
},
{
  name: 'licenceNumber',
  type: 'string',
  title: 'REC Licence Number',
},
{
  name: 'accreditations',
  type: 'array',
  title: 'Accreditations',
  of: [{ type: 'string' }],
  description: 'e.g. "Clean Energy Council Accredited Designer and Installer"',
},
{
  name: 'yearsExperience',
  type: 'number',
  title: 'Years of Experience',
},
```

**Verification:** Deploy the schema change (`npm run deploy -w ses-content` or via Sanity Studio) and confirm the new fields appear on Karl's team member document.

---

### Task 2.2 — Update TypeScript types for TeamMember

**Files to change:**

- `packages/ses-next/src/types.ts`

**Steps:**

1. Open `packages/ses-next/src/types.ts`.
2. Extend `TeamMemberSchema` (line 243) to include the new optional fields:

```ts
export const TeamMemberSchema = z.object({
  _id: z.string(),
  _type: z.literal('teamMember'),
  name: z.string(),
  role: z.string(),
  avatar: z.object({
    asset: SanityAssetSchema,
  }),
  bio: z.string().optional(),
  licenceNumber: z.string().optional(),
  accreditations: z.array(z.string()).optional(),
  yearsExperience: z.number().optional(),
});
```

3. Update `TeamMember` type (line 343) to match.

---

### Task 2.3 — Add Person JSON-LD structured data for Karl on the homepage

AI models use `Person` schema to attribute expertise to content.

**Files to change:**

- `packages/ses-next/src/lib/structuredData.ts` — add `personJsonLd` helper
- `packages/ses-next/src/app/page.tsx` — inject the Person JSON-LD

**Steps:**

1. In `packages/ses-next/src/lib/structuredData.ts`, add:

```ts
type PersonJsonLdInput = {
  name: string;
  role: string;
  licenceNumber?: string;
  accreditations?: string[];
  yearsExperience?: number;
  url: string;
};

export const personJsonLd = ({
  name,
  role,
  licenceNumber,
  accreditations,
  yearsExperience,
  url,
}: PersonJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name,
  jobTitle: role,
  worksFor: {
    '@type': 'Organization',
    name: 'Storm Electrical Solutions',
    url: 'https://www.sesmelbourne.com.au',
  },
  url,
  ...(licenceNumber && { identifier: licenceNumber }),
  ...(accreditations && {
    hasCredential: accreditations.map((name) => ({ '@type': 'EducationalOccupationalCredential', name })),
  }),
  ...(yearsExperience && {
    description: `${yearsExperience}+ years experience as a licensed electrician in Melbourne.`,
  }),
});
```

2. In `packages/ses-next/src/app/page.tsx`, fetch the team members and inject a `<script type="application/ld+json">` tag for Karl Rainbow using the `personJsonLd` helper.

---

### Task 2.4 — Update Karl's credentials in Sanity Studio

See Sanity CMS Steps below.

---

## Phase 3 — FAQ Audit and Quality Improvement ✅ COMPLETE

### Task 3.1 — Audit existing FAQ content quality ✅ COMPLETE

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

### Task 3.2 — Add credibility signals to FAQ answers ✅ COMPLETE

Per PRD-07, FAQ answers should reference Australian Standards, Victorian legislation, or real statistics where relevant.

Changes applied via Sanity MCP on 2026-05-06:

- `electrical-testing` — added AS/NZS 3017 reference to safety switch/circuit breaker answer
- `ev-charger-installation` — added new FAQ: "Is there a Victorian government rebate for EV charger installation?" referencing ZEV Subsidy and Cheaper EVs initiative
- `renewable-energy` — named "Cheaper Home Batteries Program" explicitly in rebates answer alongside Solar Homes Program
- `emergency-electrician` — replaced duplicate 24/7 FAQ with cost FAQ: "How much does an emergency electrician call-out cost in Melbourne?"
- `air-conditioning` — replaced generic brands FAQ with sizing/MEPS FAQ: "What size air conditioner do I need for my room?"

See Sanity CMS Steps below.

---

## Phase 4 — Blog Post Credibility Signals ✅ COMPLETE

### Task 4.1 — Add standards and legislation references to new blog posts ✅ COMPLETE

Changes applied via Sanity MCP on 2026-05-06:

- `electrical-safety-testing-guide-for-landlords` — added a new "The Australian Standard Governing Electrical Inspections" h3 section explaining AS/NZS 3017 scope, test report requirements, and its role in demonstrating compliance to Energy Safe Victoria, insurers, and Consumer Affairs Victoria.
- `emergency-electrician-melbourne-when-to-call` — added a new "Energy Safe Victoria's Guidance on Electrical Emergencies" h2 section with 4 ESV-sourced safety principles (DIY prohibition, fire evacuation before isolation, post-flood power ban, Certificate of Electrical Safety requirement) plus confirmation of SES's ESV registration.

See Sanity CMS Steps below.

---

## Sanity CMS Steps

### Karl Rainbow credentials update

- [x] Open Karl Rainbow's `teamMember` document in Sanity Studio (after schema deployment in Task 2.1)
- [x] Add `bio`: "Karl Rainbow is a licensed electrician and the director of Storm Electrical Solutions. With 19+ years of experience across residential, commercial, and renewable energy projects in Melbourne, Karl holds Clean Energy Council accreditation as a Designer and Installer and is a New Energy Tech Approved Seller."
- [x] Add `licenceNumber`: REC number provided by Karl ✓
- [x] Add `accreditations`: ["Clean Energy Council Accredited Designer and Installer", "New Energy Tech Approved Seller", "Energy Safe Victoria Registered Electrical Contractor"]
- [x] Add `yearsExperience`: 19

### FAQ quality improvements (high-priority service pages)

- [x] `/services/emergency-electrician` — replaced duplicate 24/7 FAQ with cost FAQ (no call-out fee, quoted upfront)
- [x] `/services/electrical-testing` — added AS/NZS 3017 reference to safety switch/circuit breaker answer
- [x] `/services/air-conditioning` — replaced brands FAQ with sizing/MEPS FAQ referencing Energy Rating Label
- [x] `/services/ev-charger-installation` — added new FAQ referencing ZEV Subsidy and Cheaper EVs initiative
- [x] `/services/renewable-energy` — named Cheaper Home Batteries Program explicitly alongside Solar Homes Program

### Blog post credibility updates

- [x] `electrical-safety-testing-guide-for-landlords` — added AS/NZS 3017 section explaining verification guidelines and test report obligations
- [x] `emergency-electrician-melbourne-when-to-call` — added Energy Safe Victoria guidance section with 4 key safety principles

---

## Verification Checklist

Run in order before pushing code changes:

- [x] `npm run format`
- [x] `npm run lint`
- [x] `npm run type:check`
- [x] `npm run build`
- [x] `npm run test:e2e`

---

## Rollback Plan

1. `llms.txt` and `robots.txt` are static files — revert by removing or editing them and redeploying.
2. Sanity schema changes are additive (new optional fields only) — the frontend will not break if the fields are empty.
3. Structured data changes can be reverted by removing the JSON-LD script tags from the page components.
4. All Sanity content changes are non-destructive — previous versions are available in document history.
