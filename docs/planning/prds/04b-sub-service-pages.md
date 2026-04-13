---
title: 'Sub-Service Pages & Content Model'
number: '04b'
status: completed
priority: high
phase: '2'
created: '2026-03-01'
updated: '2026-03-01'
owner: ''
idea: ''
plan: ''
depends-on: ['04a']
domain: seo
budget: ''
tags: ['sub-services', 'sanity', 'routing', 'seo']
---

# 04b — Sub-Service Pages & Content Model

## Problem

SES offers specific services (switchboard upgrades, smoke alarm compliance, EV charger installation) that sit naturally under existing parent services but have no dedicated pages. Competitors have sub-service pages targeting these keywords. The current Sanity content model has no concept of parent/child service relationships — all 7 services are flat and equal.

## Scope

This PRD covers:

- Sanity schema changes to support parent/child service relationships
- Creating 3 sub-service pages under existing parent services
- Nested URL routing in Next.js
- Breadcrumb and internal linking updates on parent pages

It does **not** cover new top-level services (PRD-04c) or location pages (PRD-04d).

## Decisions (Resolved)

### 1. URL structure → Nested

Sub-services use nested URLs under their parent for clean breadcrumbs and SEO hierarchy:

```
/services/electrical-testing/switchboard-upgrades
/services/electrical-testing/smoke-alarms
/services/renewable-energy/ev-charger-installation
```

### 2. Content model → Same as parent services

Sub-service pages use the same Sanity `service` document type as parent services, with all the same fields (hero, description, gallery, FAQ, related blog posts). The only difference is the `parentService` reference field being populated.

## Service Hierarchy

| Parent Service     | New Sub-Service         | URL                                                  |
| ------------------ | ----------------------- | ---------------------------------------------------- |
| Electrical Testing | Switchboard Upgrades    | `/services/electrical-testing/switchboard-upgrades`  |
| Electrical Testing | Smoke Alarms            | `/services/electrical-testing/smoke-alarms`          |
| Renewable Energy   | EV Charger Installation | `/services/renewable-energy/ev-charger-installation` |

Future sub-services (not in this PRD):

| Parent Service   | Potential Sub-Service       |
| ---------------- | --------------------------- |
| Air Conditioning | Split System Installation   |
| Data and TV      | NBN Setup & Troubleshooting |

## Sanity Schema Changes

### Add `parentService` reference to service document

```js
{
  name: 'parentService',
  title: 'Parent service',
  type: 'reference',
  to: [{ type: 'service' }],
  description: 'If set, this service appears as a sub-service under the parent. Leave empty for top-level services.',
}
```

### Add `slug` field (if not already present)

Confirm the existing service schema has a `slug` field. The nested URL will be built from `parentService.slug + slug`, so both parent and child need slugs.

### Add `showOnHomepage` field (from PRD-04a)

If not already implemented in PRD-04a, this field must be present. Sub-services default to `showOnHomepage: false`.

## Routing

### Next.js Pages Router

The current route is `pages/services/[id].tsx`. To support nesting:

**Option A — Catch-all route:**

Replace `pages/services/[id].tsx` with `pages/services/[...slug].tsx`. This handles both:

- `/services/electrical-testing` → `slug = ['electrical-testing']`
- `/services/electrical-testing/switchboard-upgrades` → `slug = ['electrical-testing', 'switchboard-upgrades']`

The `getStaticPaths` function generates paths for all services (parent and child). The `getStaticProps` function resolves the service document from the slug array.

**Option B — Explicit nested route:**

Keep `pages/services/[id].tsx` for parents. Add `pages/services/[id]/[sub].tsx` for children.

**Recommendation:** Option A (catch-all) is more flexible and avoids duplicating the page component.

## New Sub-Service Pages

### 1. `/services/electrical-testing/switchboard-upgrades`

**Target keywords:** switchboard upgrade melbourne, electrical switchboard replacement, old fuse box upgrade

**Title tag:** `Switchboard Upgrades Melbourne | SES`

**Meta description:** `Need a switchboard upgrade in Melbourne? Licensed electricians replacing old ceramic fuse boxes with modern safety switches. Free quotes. Call (03) 4050 7937.`

**Content structure:**

- H1: Switchboard Upgrades Melbourne
- Signs you need a switchboard upgrade (ceramic fuses, frequent tripping, burning smell, no safety switch)
- What's involved in an upgrade (process overview, timeframe)
- Old ceramic fuse box vs modern safety switch (visual comparison if photos available)
- Victorian compliance requirements
- Pricing guidance (range, not exact — check with Karl)
- FAQ section (3-4 questions with schema)
- CTA: Phone number + contact form

### 2. `/services/electrical-testing/smoke-alarms`

**Target keywords:** smoke alarm installation melbourne, smoke alarm compliance victoria, smoke alarm electrician

**Title tag:** `Smoke Alarm Installation & Compliance Melbourne | SES`

**Meta description:** `Smoke alarm installation, testing and compliance for Melbourne homes and rentals. Meet Victorian legislation requirements. Licensed electricians. Call (03) 4050 7937.`

**Content structure:**

- H1: Smoke Alarm Installation & Compliance Melbourne
- Victorian legislation requirements (residential, rental properties)
- Types of smoke alarms (photoelectric vs ionisation, interconnected vs standalone)
- Installation and testing services
- Compliance for landlords and property managers
- FAQ section (3-4 questions with schema)
- CTA

### 3. `/services/renewable-energy/ev-charger-installation`

**Target keywords:** ev charger installation melbourne, home ev charging electrician, electric car charger install

**Title tag:** `EV Charger Installation Melbourne | SES`

**Meta description:** `Home and commercial EV charger installation in Melbourne. Licensed electricians. Level 2 charging, switchboard upgrades included. Free quotes. Call (03) 4050 7937.`

**Content structure:**

- H1: EV Charger Installation Melbourne
- Types of chargers (Level 1, Level 2, DC fast charging — residential focus)
- Home vs commercial installation considerations
- Electrical requirements and switchboard compatibility
- Available rebates/incentives (Victorian and federal — research current programs)
- Brands supported
- FAQ section (3-4 questions with schema)
- CTA

## Parent Page Updates

Each parent service page that gains sub-services needs a new section:

### "Related Services" or "Specialist Services" section

Automatically populated from Sanity by querying services where `parentService` references the current page. Renders as cards (same style as hub page) below the main content, above the FAQ.

Example on `/services/electrical-testing`:

```
H2: Specialist Electrical Testing Services

[Card: Switchboard Upgrades] [Card: Smoke Alarms]
```

This section only renders if child services exist — no empty state needed.

## Internal Linking

- Parent page → sub-service pages (via "Related Services" section above)
- Sub-service pages → parent page (via breadcrumb + contextual text link)
- Sub-service pages → other related sub-services ("You might also need...")
- Hub page `/services/` → shows only top-level services (sub-services discoverable through parents)
- Blog posts → link to sub-service pages where relevant (e.g., solar battery blog → EV charger page)

## Breadcrumbs

Sub-service pages get a 3-level breadcrumb:

```
Home → Services → Electrical Testing → Switchboard Upgrades
```

Using `BreadcrumbJsonLd` from next-seo (per PRD-01):

```tsx
<BreadcrumbJsonLd
  itemListElements={[
    { position: 1, name: 'Home', item: 'https://www.sesmelbourne.com.au' },
    { position: 2, name: 'Services', item: 'https://www.sesmelbourne.com.au/services/' },
    { position: 3, name: 'Electrical Testing', item: 'https://www.sesmelbourne.com.au/services/electrical-testing' },
    {
      position: 4,
      name: 'Switchboard Upgrades',
      item: 'https://www.sesmelbourne.com.au/services/electrical-testing/switchboard-upgrades',
    },
  ]}
/>
```

## Structured Data

Each sub-service page gets:

- **Service schema** (per PRD-01) with `serviceType` specific to the sub-service
- **BreadcrumbJsonLd** (3-level, as above)
- **FAQPageJsonLd** for the FAQ section

## Content

- Each page should be 800-1200 words
- Include at least one real project photo per page (ask Karl via OneDrive)
- Reference Australian Standards where relevant (AS/NZS 3000, AS 3786 for smoke alarms)
- Karl reviews each page for technical accuracy before publish

## Acceptance Criteria

- [ ] `parentService` reference field added to Sanity service schema
- [ ] Nested URL routing working (`/services/[parent]/[child]`)
- [ ] Existing parent service pages unaffected by routing change
- [ ] Switchboard Upgrades page live under Electrical Testing
- [ ] Smoke Alarms page live under Electrical Testing
- [ ] EV Charger Installation page live under Renewable Energy
- [ ] Parent pages show "Related Services" section with child cards
- [ ] All sub-service pages have Service schema, BreadcrumbJsonLd, and FAQPageJsonLd
- [ ] All sub-service pages have optimised title tags and meta descriptions
- [ ] Sub-service pages have `showOnHomepage: false`
- [ ] All new pages appear in sitemap
- [ ] Hub page `/services/` continues to show only top-level services
