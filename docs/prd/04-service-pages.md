# 04 — Service Page Expansion

**Priority:** High
**Phase:** 2 (Month 2-3)
**Status:** Planned

## Problem

Current service pages (7 total) are too broad and don't target specific high-volume keywords. Competitors like O'Shea have 14+ service pages, and Briggs has dedicated sub-service pages for specific electrical emergencies. Search Console data shows high-impression zero-click queries for services we offer but don't have dedicated pages for.

## Keyword Evidence

| Missing Service Page    | Related Query                           | Monthly Impressions | Current Position |
| ----------------------- | --------------------------------------- | ------------------: | :--------------: |
| Emergency Electrician   | emergency electrician melbourne         |                 641 |       54.0       |
| Emergency Electrician   | melbourne emergency electricians        |                 681 |       50.7       |
| Emergency Electrician   | emergency electrical services melbourne |                 750 |       59.1       |
| Emergency Electrician   | 24 hour electrician altona              |                 460 |       5.8        |
| Commercial Electrician  | commercial electrician altona           |               1,689 |       28.6       |
| Commercial Electrician  | commercial electricians altona          |                 979 |       18.5       |
| Switchboard Upgrades    | (new keyword target)                    |                   — |        —         |
| Smoke Alarms            | (new keyword target)                    |                   — |        —         |
| EV Charger Installation | (growing demand)                        |                   — |        —         |

## New Pages Required

### 1. `/services/emergency-electrician` — CRITICAL

**Target keywords:** emergency electrician melbourne, same day electrician, urgent electrician

**Content structure:**

- H1: Emergency Electrician Melbourne — Fast Same-Day Response
- What constitutes an electrical emergency
- Response time and availability — **business hours only (Mon–Fri 7am–6pm), no after-hours callouts** (confirmed by Karl)
- Frame as "fast same-day response" and "priority booking for urgent issues"
- Common emergency scenarios (power outage, sparking outlets, safety switch tripping, storm damage)
- Service area map or list
- CTA: Phone number prominent
- FAQ section with schema

### 2. `/services/commercial-electrician` — CRITICAL

**Target keywords:** commercial electrician altona, commercial electrical services melbourne

**Content structure:**

- H1: Commercial Electrician Melbourne — Reliable Electrical Services for Business
- Types of commercial work (fit-outs, maintenance contracts, compliance testing)
- Industries served
- Credentials and insurance
- CTA: Request a commercial quote

### 3. `/services/switchboard-upgrades` — HIGH

**Target keywords:** switchboard upgrade melbourne, electrical switchboard replacement

**Content structure:**

- H1: Switchboard Upgrades Melbourne
- Signs you need a switchboard upgrade
- Old ceramic fuse vs modern safety switch
- What's involved in an upgrade
- Pricing guidance (range, not exact)
- CTA

### 4. `/services/smoke-alarms` — HIGH

**Target keywords:** smoke alarm installation melbourne, smoke alarm compliance victoria

**Content structure:**

- H1: Smoke Alarm Installation & Compliance Melbourne
- Victorian legislation requirements
- Types of smoke alarms (photoelectric, interconnected)
- Installation and testing services
- CTA

### 5. `/services/ev-charger-installation` — HIGH

**Target keywords:** ev charger installation melbourne, home ev charging electrician

**Content structure:**

- H1: EV Charger Installation Melbourne
- Types of chargers (Level 1, 2, 3)
- Home vs commercial installation
- Electrical requirements and switchboard compatibility
- Available rebates/incentives
- CTA

## Implementation Notes

- All pages created in Sanity CMS following existing service page template
- Each page needs: unique title tag, meta description, Service schema (per PRD-01), internal links to/from related pages and blog posts
- Content should be 800-1200 words minimum (current service pages appear thin)
- Include at least one real project photo per page where possible (ask Karl)

## Content Review

Karl should review each page for technical accuracy before publish. Set up a simple review flow:

1. Dean drafts in Sanity (preview mode)
2. Karl reviews via preview link
3. Dean publishes

## Acceptance Criteria

- [ ] Emergency Electrician page live and indexed
- [ ] Commercial Electrician page live and indexed
- [ ] At least 2 additional sub-service pages live
- [ ] All new pages have structured data, optimised titles, and internal links
- [ ] All new pages appear in sitemap
- [ ] Confirm indexing in Search Console within 2 weeks of publish
