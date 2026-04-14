---
title: 'Services Hub Page & Navigation'
number: '04a'
status: completed
priority: critical
phase: '2'
created: '2026-03-01'
updated: '2026-03-01'
owner: ''
idea: ''
plan: ''
depends-on: ['01', '02', '03']
domain: seo
budget: ''
tags: ['services-hub', 'navigation', 'sanity', 'seo']
---

# 04a — Services Hub Page & Navigation

## Problem

The site has no `/services/` index page. The "Services" link in the main navigation points to `/#services` — a hash anchor on the homepage. This creates several issues:

1. **Google indexes `/#services` as a separate URL** — it's not a real page, just a scroll target. This dilutes the homepage signal (flagged in PRD-03).
2. **No crawlable services landing page** — Google and AI models have no single page that defines "what SES does" with links to all service pages.
3. **No place to link new services** — as we add sub-services (PRD-04b) and new parent services (PRD-04c), there's no hub to house them. The homepage grid can't grow indefinitely.
4. **Footer lists all 7 services** — this needs to scale as we add pages, or link through to the hub.

The homepage currently renders all 7 services as a card grid in the `/#services` section. The nav and footer both use hash anchors (`/#contact`, `/#services`, `/#about`) for on-page sections.

## Scope

This PRD covers only:

- Creating the `/services/` hub page
- Updating site navigation to point to it
- Updating the homepage services section to reference the hub
- Sitemap and schema updates for the new page

It does **not** cover creating new service pages (PRD-04b, 04c) or location pages (PRD-04d).

## Decisions (Resolved)

### 1. Homepage services grid → Keep as-is + fill empty grid slot

The homepage grid keeps all 7 existing service cards. The empty 8th grid slot (visible in the current 4-column layout's last row) becomes a styled "View all services →" card that links to `/services/`. New services added in future PRDs will only appear on the hub page, not the homepage grid.

This requires a `showOnHomepage` boolean field on the Sanity service schema so the homepage query can filter. All 7 existing services get `showOnHomepage: true`. New services default to `false`.

### 2. Hash anchors → Fix `/#services` only

The nav "Services" link changes from `/#services` to `/services/`. The `/#contact` and `/#about` hash anchors remain as-is for now. Contact page will be addressed as part of PRD-08 (paid ads prerequisites — need a proper conversion landing page).

### 3. Footer → Keep existing list + add hub link

The footer keeps listing all 7 current services. A "See all services →" link is added below the list, pointing to `/services/`. This keeps it consistent with the homepage approach — existing content stays, hub link added.

## Requirements

### 1. Create `/services/` Hub Page

**Route:** `pages/services/index.tsx` (or Sanity-managed page)

**URL:** `https://www.sesmelbourne.com.au/services/`

**Title tag:** `Electrical Services Melbourne | Storm Electrical Solutions`

**Meta description:** `Licensed Melbourne electricians offering air conditioning, lighting, electrical testing, solar, data cabling and more. 19+ years experience. Free quotes. Call (03) 4050 7937.`

**Content structure:**

```
H1: Electrical Services Melbourne

Intro paragraph:
- What SES offers (residential, commercial, emergency)
- Credentials (licensed, CEC accredited, 19+ years)
- Service area (western Melbourne suburbs)

H2: Our Services
- Card grid or list of ALL service pages (existing 7 + new ones as they're added)
- Each card: service name, short description, thumbnail, link to service page
- Cards should pull dynamically from Sanity (all documents of type "service" where parentService is null — future-proofing for PRD-04b)

H2: Service Areas
- Brief mention of suburbs served
- Link to location hub page (when PRD-04d is implemented)
- For now, can be a text list: Altona, Altona North, Newport, Yarraville, Footscray, Williamstown, etc.

CTA: Contact form or phone number
```

**Structured data:**

Add a `CollectionPage` or `WebPage` schema with links to individual service pages. The existing `LocalBusinessJsonLd` should NOT be duplicated here — it lives on the homepage (PRD-01).

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Electrical Services Melbourne",
  "description": "Licensed electrical services...",
  "url": "https://www.sesmelbourne.com.au/services/",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://www.sesmelbourne.com.au/services/air-conditioning"
      }
      // ... all service pages
    ]
  }
}
```

### 2. Update Main Navigation

**Current:**

```
Home | Contact (/#contact) | Services (/#services) | About (/#about) | FAQ | Blog
```

**Proposed (minimum — Decision #2, Option B):**

```
Home | Contact (/#contact) | Services (/services/) | About (/#about) | FAQ | Blog
```

The "Services" nav link changes from `/#services` to `/services/`. This is a one-line change in the nav component.

**File:** Likely `packages/ses-next/src/components/Layout.tsx` or equivalent nav component. Confirm in codebase.

### 3. Update Homepage Services Section

The existing 7 service cards stay as-is. The empty 8th grid slot in the last row becomes a "View all services →" card:

- Styled distinctly from service cards (e.g., bordered/outlined card with arrow icon, no image)
- Links to `/services/`
- Text: "View all services →" or "See all our electrical services →"

The `## Our Services` section keeps its `id="services"` anchor so any existing `/#services` links (GMB, social profiles, bookmarks) still scroll to it. We're only changing the nav link, not breaking external references.

**Sanity schema update required:** Add `showOnHomepage` boolean to the service document type. The homepage query filters to `showOnHomepage == true`. All 7 existing services get this set to `true`. Future sub-services (PRD-04b) and new parent services (PRD-04c) can be toggled independently.

```js
// Addition to existing service document schema
{
  name: 'showOnHomepage',
  title: 'Show on homepage',
  type: 'boolean',
  description: 'Display this service in the homepage services grid',
  initialValue: false,
}
```

### 4. Update Footer

Keep the existing footer services list (all 7 services). Add a "See all services →" link at the bottom of the list, pointing to `/services/`.

As new services are added in PRD-04b/04c, only those with `showOnHomepage: true` would appear in the footer — or alternatively, the footer continues to list all top-level services. This can be revisited when the service count grows beyond 9-10.

### 5. Sitemap

Add `/services/` to sitemap.xml. This page should have:

- `priority: 0.9` (high — it's a key landing page)
- `changefreq: weekly`

Ensure `/#services` is NOT in the sitemap (should already be handled by PRD-03).

### 6. Internal Links

- Homepage services section → `/services/` (View all link)
- `/services/` → each individual service page
- Each individual service page → `/services/` (breadcrumb: Home → Services → [Service Name])
- Blog posts about services → `/services/` where contextually relevant

## Sanity CMS Changes

**Required schema update:** Add `showOnHomepage` boolean to the existing service document type. This is needed for:

- Homepage grid filtering (this PRD)
- Future-proofing: sub-services (PRD-04b) default to `false`, new parent services (PRD-04c) can be toggled on

The hub page itself does NOT need a new Sanity document type. It queries all `service` documents (where `parentService` is null, once that field exists from PRD-04b) and renders them dynamically.

## Implementation Notes

- **Sanity schema change is required** — adding `showOnHomepage` to the service document type. Set all 7 existing services to `true`. This is a non-breaking additive change.
- The `/services/` route must not conflict with the existing `/services/[id]` dynamic route. In Next.js Pages Router, `pages/services/index.tsx` and `pages/services/[id].tsx` coexist fine.
- Existing links to `/#services` from external sources (Google My Business, social profiles, etc.) still work — the homepage anchor ID stays. We're only changing the internal nav link.
- BreadcrumbJsonLd (PRD-01) on service pages should be updated to include the services hub as a breadcrumb level.
- The 8th grid slot "View all services" card needs to match the existing card dimensions but be visually distinct (no image, bordered/outlined style, arrow icon).

## Acceptance Criteria

- [ ] `/services/` page live and rendering all current service pages as cards
- [ ] Main nav "Services" link points to `/services/` (not `/#services`)
- [ ] Homepage 8th grid slot renders "View all services →" card linking to `/services/`
- [ ] `showOnHomepage` field added to Sanity service schema; all 7 existing services set to `true`
- [ ] Footer services list unchanged + "See all services →" link added below
- [ ] `/services/` has title tag, meta description, and CollectionPage schema
- [ ] `/services/` appears in sitemap
- [ ] BreadcrumbJsonLd on service pages includes `/services/` as parent
- [ ] `/#services` anchor still works on homepage for external links (backward compatibility)
- [ ] `/#contact` and `/#about` hash anchors left untouched
