---
title: 'New Top-Level Service Pages'
number: '04c'
status: completed
priority: critical
phase: '2'
created: '2026-03-01'
updated: '2026-03-01'
owner: ''
idea: ''
plan: ''
depends-on: ['04a', '04b']
domain: seo
budget: ''
tags: ['service-pages', 'emergency', 'commercial', 'seo']
---

# 04c — New Top-Level Service Pages

## Problem

SES has no dedicated pages for emergency or commercial electrical services despite strong keyword signals for both. These are distinct service categories, not sub-services of an existing page.

## Keyword Evidence

| Service    | Query                                   | Monthly Impressions | Current Position |
| ---------- | --------------------------------------- | ------------------: | :--------------: |
| Emergency  | emergency electrician melbourne         |                 641 |       54.0       |
| Emergency  | melbourne emergency electricians        |                 681 |       50.7       |
| Emergency  | emergency electrical services melbourne |                 750 |       59.1       |
| Emergency  | 24 hour electrician altona              |                 460 |       5.8        |
| Emergency  | emergency electrician altona            |                 421 |       9.9        |
| Commercial | commercial electrician altona           |               1,689 |       28.6       |
| Commercial | commercial electricians altona          |                 979 |       18.5       |
| Commercial | commercial electrician altona north     |                 801 |       6.5        |

The emergency and commercial keywords combined represent 5,000+ monthly impressions with near-zero clicks. Dedicated pages are the only way to compete.

## Scope

This PRD covers:

- Creating 2 new top-level service pages (Emergency Electrician, Commercial Electrician)
- Adding them to the services hub page
- Structured data, meta tags, and internal linking

These are top-level services (`parentService: null`). They appear on the `/services/` hub page alongside existing services.

## Decisions (Resolved)

### 1. Homepage visibility → Not on homepage grid initially

Both new pages get `showOnHomepage: false` at launch. The existing 7 services + "View all services" card (PRD-04a) stay as-is. Karl can toggle these on later if he wants to swap out a lower-priority service.

### 2. Emergency page framing → Business hours only

Karl confirmed: **no after-hours emergency callouts**. Mon–Fri 7am–6pm only. The page must frame this as "fast same-day response" and "priority booking for urgent issues" — never as 24/7 or after-hours service.

> **Note:** The current homepage title tag says "24/7 Emergency Electrical Services" (updated in PRD-02). This needs to be revisited — it's misleading if SES doesn't offer after-hours callouts. Flag for PRD-02 update.

## New Pages

### 1. `/services/emergency-electrician` — CRITICAL

**Target keywords:** emergency electrician melbourne, same day electrician, urgent electrical repairs

**Title tag:** `Emergency Electrician Melbourne — Fast Same-Day Response | SES`

**Meta description:** `Same-day emergency electrical services in Melbourne. Safety switch trips, power outages, sparking outlets. Licensed electricians, fast response Mon–Fri 7am–6pm. Call (03) 4050 7937.`

**Content structure:**

```
H1: Emergency Electrician Melbourne — Fast Same-Day Response

Intro:
- What SES offers for urgent electrical issues
- Clear statement: Mon–Fri 7am–6pm, priority same-day booking
- Phone number prominent

H2: What Is an Electrical Emergency?
- Power outage to your property
- Sparking or smoking power points
- Safety switch keeps tripping
- Burning smell from wiring or switchboard
- Storm damage to electrical systems
- Exposed or damaged wiring

H2: How Our Emergency Response Works
- Call or message during business hours
- Same-day priority booking (subject to availability)
- Licensed electrician dispatched from Altona North base
- Fast response across western Melbourne suburbs
- Clear: NOT a 24/7 service — frame positively

H2: Emergency Electrical Service Areas
- Altona, Altona North, Newport, Yarraville, Footscray,
  Williamstown, Moonee Ponds, Ascot Vale
- Link to location pages (when PRD-04d is live)

H2: What to Do While You Wait
- Safety advice: turn off power at switchboard, don't touch exposed wiring, etc.
- When to call 000 (immediate danger, fire)
- This section adds genuine value and builds trust

H2: Frequently Asked Questions (with FAQPageJsonLd)
- "How quickly can you respond to an electrical emergency?"
- "Do you offer after-hours emergency callouts?" (honest answer: no, business hours only)
- "How much does an emergency electrician cost in Melbourne?"
- "Should I turn off my power if the safety switch keeps tripping?"

CTA: Phone number + contact form
```

**Word count target:** 800-1200 words

### 2. `/services/commercial-electrician` — CRITICAL

**Target keywords:** commercial electrician altona, commercial electrical services melbourne, commercial electrician western suburbs

**Title tag:** `Commercial Electrician Melbourne — Reliable Business Electrical Services | SES`

**Meta description:** `Commercial electrical services for Melbourne businesses. Fit-outs, maintenance contracts, compliance testing. Licensed, insured, 19+ years experience. Call (03) 4050 7937.`

**Content structure:**

```
H1: Commercial Electrician Melbourne — Reliable Electrical Services for Business

Intro:
- SES serves both residential and commercial clients
- 19+ years experience, fully licensed and insured
- Western Melbourne focus but serving all metro areas

H2: Commercial Electrical Services
- Office and retail fit-outs
- Electrical maintenance contracts
- Compliance testing and tagging (test & tag)
- Emergency lighting installation and testing
- Data and communications cabling for offices
- Switchboard upgrades for commercial premises
- Energy-efficient lighting upgrades
- Link to relevant sub-service pages where they exist

H2: Industries We Work With
- Hospitality and food service (links to catering-maintenance)
- Retail
- Offices and co-working spaces
- Warehouses and light industrial
- Strata and property management

H2: Why Choose SES for Commercial Work
- Licensed and insured (REC number)
- CEC accredited (relevant for commercial solar)
- Minimal disruption — work scheduled around business hours
- Ongoing maintenance agreements available

H2: Frequently Asked Questions (with FAQPageJsonLd)
- "Do you offer commercial electrical maintenance contracts?"
- "Can you work outside business hours to avoid disruption?"
- "What commercial electrical compliance testing do you offer?"

CTA: Request a commercial quote (phone + form)
```

**Word count target:** 800-1200 words

## Structured Data

Each page gets:

- **Service schema** with `serviceType` ("Emergency Electrical Service" / "Commercial Electrical Service")
- **BreadcrumbJsonLd**: Home → Services → Emergency Electrician
- **FAQPageJsonLd** for FAQ section

## Internal Linking

- `/services/` hub page → both new pages (automatic via Sanity query)
- Emergency page → location pages (when live), switchboard upgrades, smoke alarms
- Commercial page → catering maintenance, electrical testing, telecommunications
- Relevant blog posts → link to these pages (update existing posts where appropriate)
- Both pages → contact form / phone CTA

## Content

- Karl reviews both pages for technical accuracy before publish
- Include real job photos where possible (ask Karl via OneDrive)
- Emergency page: reference Energy Safe Victoria for safety advice
- Commercial page: reference relevant Australian Standards for compliance work
- Both pages must be genuinely useful content, not keyword-stuffed landing pages

## Footer & Navigation

- Neither page is added to the footer services list initially (footer stays as-is per PRD-04a)
- Both pages are discoverable via the `/services/` hub page
- Both pages appear in sitemap

## Acceptance Criteria

- [ ] `/services/emergency-electrician` live with 800+ words of unique content
- [ ] `/services/commercial-electrician` live with 800+ words of unique content
- [ ] Both pages have `showOnHomepage: false` and `parentService: null`
- [ ] Both pages appear on `/services/` hub page
- [ ] Both pages have Service schema, BreadcrumbJsonLd, and FAQPageJsonLd
- [ ] Both pages have optimised title tags and meta descriptions
- [ ] Emergency page clearly states business hours only — no 24/7 or after-hours language
- [ ] Internal links added to/from related service pages and blog posts
- [ ] Both pages appear in sitemap
- [ ] PRD-02 homepage title tag flagged for review (remove "24/7" if misleading)
