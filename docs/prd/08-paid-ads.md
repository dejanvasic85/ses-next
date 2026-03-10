# 08 — Paid Ads Relaunch

**Priority:** Medium
**Phase:** 3 (Month 3+, after SEO foundation is solid)
**Status:** Paused

## Context

Paid ads (Google Ads) are currently paused due to poor tracking and targeting. Karl is open to restarting when the time is right. This document outlines the prerequisites and strategy for a successful relaunch.

## Why Not Now

Restarting paid ads before fixing the fundamentals would waste budget:

1. **No conversion tracking** — Can't measure ROI without proper form submission and call tracking
2. **Landing pages not optimised** — Service pages rank at position 44-66; they need content and meta improvements before driving paid traffic to them
3. **No dedicated landing pages** — Generic service pages don't match specific ad intent well
4. **Missing structured data** — No review stars or rich snippets to improve ad quality score

## Prerequisites (Complete Before Relaunch)

| Prerequisite                                   | PRD Reference | Status  |
| ---------------------------------------------- | :-----------: | :-----: |
| Structured data on all pages                   |    PRD-01     |  To Do  |
| Optimised title tags and meta descriptions     |    PRD-02     |  To Do  |
| Emergency Electrician service page live        |    PRD-04     | Planned |
| At least 3 location pages live                 |    PRD-05     | Planned |
| GA4 conversion tracking for contact form       |       —       |  To Do  |
| Call tracking setup (optional but recommended) |       —       |  To Do  |

## Recommended Setup

### Conversion Tracking

Before spending on ads, implement:

1. **GA4 form submission event** — Track when the contact form is submitted. This should fire a `generate_lead` event that can be imported as a Google Ads conversion.
2. **Phone click tracking** — Track clicks on the phone number link as a secondary conversion.
3. **Optional: Call tracking** — Services like CallRail or CallTracking Metrics provide dynamic number insertion to attribute phone calls to specific ads/keywords. Cost: ~$50-100/month.

### Campaign Structure

**Campaign 1: Emergency (high intent, high CPC)**

- Keywords: "emergency electrician melbourne", "24 hour electrician near me"
- Landing page: `/services/emergency-electrician`
- Budget: $15-25/day
- Schedule: Mon-Fri 7am-6pm (business hours only, urgent issues prioritised)

**Campaign 2: Core Services (medium intent)**

- Keywords: "electrician altona", "electrician [suburb]", "air conditioning installation melbourne"
- Landing pages: Relevant service or location pages
- Budget: $10-20/day
- Schedule: Business hours + evenings

**Campaign 3: Specialist Services (lower volume, lower CPC)**

- Keywords: "solar panel installation melbourne", "data cabling electrician", "ev charger installation"
- Landing pages: Specific service pages
- Budget: $5-10/day
- Schedule: Business hours

### Budget Recommendation

Start small and scale based on results:

- Month 1: $500-750 total (testing phase)
- Month 2: Optimise based on conversion data
- Month 3+: Scale what works, cut what doesn't

### Targeting

- Geographic: Melbourne metro, with bid adjustments for western suburbs (higher bids closer to Altona)
- Device: Mobile priority (most emergency searches are mobile)
- Demographics: Homeowners 25-65
- Negative keywords: "electrician jobs", "electrician salary", "electrician apprenticeship", "DIY electrical"

## Timeline

| Month     | Action                               |
| --------- | ------------------------------------ |
| Month 1-2 | Complete SEO foundation (PRDs 01-03) |
| Month 2   | Set up conversion tracking in GA4    |
| Month 2-3 | Create landing pages (PRDs 04-05)    |
| Month 3   | Soft launch with $500 test budget    |
| Month 4+  | Optimise and scale                   |

## Budget Communication

Paid ads budget is separate from the $140/month subscription. Recommend discussing with Karl:

- Google Ads spend: $500-750/month to start
- Management fee: Discuss whether this falls under the $100/month SEO allocation or is billed separately
- Reporting: Monthly ad spend report with conversions and cost-per-lead

## Acceptance Criteria

- [ ] GA4 conversion tracking live and verified
- [ ] At least 3 optimised landing pages ready
- [ ] Google Ads account reviewed and restructured
- [ ] Negative keyword list created
- [ ] Karl approves monthly ad budget
- [ ] First campaign launched with proper tracking
