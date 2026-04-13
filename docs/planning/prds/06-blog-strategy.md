---
title: 'Blog Content Strategy'
number: '06'
status: approved
priority: high
phase: '2-3'
created: '2026-03-01'
updated: '2026-03-01'
owner: ''
idea: ''
plan: ''
depends-on: []
domain: seo
budget: ''
tags: ['blog', 'content', 'seo', 'internal-linking']
---

# 06 — Blog Content Strategy

## Problem

11 blog posts are indexed, but only 1 generates meaningful clicks (29 clicks for "Comprehensive Guide to Electrical Testing"). The remaining 10 posts have a combined 5 clicks. Blog titles are often creative rather than keyword-targeted, and content doesn't match search intent for high-volume queries.

## Current Blog Performance

| Blog Post                                        | Impressions | Clicks | Position |
| ------------------------------------------------ | ----------: | -----: | :------: |
| comprehensive-guide-to-electrical-testing        |      11,508 |     29 |   37.5   |
| importance-of-electrical-testing                 |       5,487 |      3 |   64.1   |
| benefits-of-structured-cabling                   |         641 |      0 |   67.8   |
| maximising-efficiency-of-your-air-conditioner    |         233 |      0 |   69.6   |
| unleash-the-power-of-your-entertainment          |         197 |      1 |   48.9   |
| illuminate-your-space                            |         179 |      0 |   63.1   |
| stay-connected-and-protected-role-of-ups-systems |         150 |      0 |   49.8   |
| duel-power-of-efficient-lighting                 |          79 |      1 |   53.8   |
| harnessing-the-power-of-renewables               |          35 |      0 |   26.1   |
| VEEC-guide-air-conditioning                      |           5 |      0 |   6.0    |
| ensuring-safety-and-efficiency                   |           2 |      0 |   32.5   |

## Key Issues

1. **Creative titles don't match search queries.** "Illuminate Your Space" doesn't target any keyword. Should be something like "LED Downlight Installation Guide Melbourne."
2. **Two posts cannibalise each other.** "comprehensive-guide-to-electrical-testing" and "importance-of-electrical-testing" compete for the same keywords.
3. **Content lacks local targeting.** Posts are generic national content without Melbourne/suburb references.
4. **No internal linking.** Blog posts don't link to service pages and vice versa.

## Phase 1: Optimise Existing Posts

Before creating new content, uplift the existing 11 posts:

### Quick Wins (title/heading rewrites)

| Current Slug                                     | Proposed Title Rewrite                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| illuminate-your-space                            | LED Lighting Installation Guide: What Melbourne Homeowners Need to Know         |
| duel-power-of-efficient-lighting                 | Energy-Efficient Lighting: How to Reduce Your Melbourne Electricity Bill        |
| unleash-the-power-of-your-entertainment          | Home Theatre & Entertainment System Wiring Guide                                |
| harnessing-the-power-of-renewables               | Solar Panel Installation in Melbourne: Your Complete Guide                      |
| benefits-of-structured-cabling                   | Structured Cabling for Melbourne Homes and Offices                              |
| maximising-efficiency-of-your-air-conditioner    | Air Conditioner Maintenance Tips: Keep Your Split System Running Efficiently    |
| stay-connected-and-protected-role-of-ups-systems | UPS Systems for Home: Protect Your Network During Power Outages                 |
| VEEC-guide-air-conditioning                      | Victorian Energy Efficiency Certificates (VEECs): Air Conditioning Rebate Guide |

### Consolidation

Consider merging "importance-of-electrical-testing" into "comprehensive-guide-to-electrical-testing" with a 301 redirect. Two posts competing for the same keyword dilutes ranking power.

### Internal Linking Pass

Every blog post should link to:

- The most relevant service page
- 1-2 other related blog posts
- The contact page or form

Every service page should link to:

- 2-3 relevant blog posts in a "Related Articles" section

## Phase 2: New Content Calendar

Target 2 posts per month, aligned to keyword opportunities from Search Console data.

### Priority Topics (based on impression data)

| Topic                                         | Target Keyword                      | Monthly Impressions |          Linked Service Page          |
| --------------------------------------------- | ----------------------------------- | ------------------: | :-----------------------------------: |
| Electrical safety testing guide for landlords | electrical safety testing           |               1,341 |     /services/electrical-testing      |
| Signs you need a switchboard upgrade          | switchboard upgrade melbourne       |                 TBD | /services/switchboard-upgrades (new)  |
| Split system vs ducted AC comparison          | split system installation melbourne |                ~200 |      /services/air-conditioning       |
| How to choose a solar battery in 2026         | solar battery melbourne             |                 TBD |      /services/renewable-energy       |
| NBN troubleshooting and data point guide      | melbourne data electrician          |                 619 |         /services/data-and-tv         |
| Smoke alarm legislation Victoria guide        | smoke alarm compliance victoria     |                 TBD |     /services/smoke-alarms (new)      |
| EV charger home installation guide            | ev charger installation melbourne   |                 TBD |      /services/ev-charger (new)       |
| Emergency electrician: when to call one       | emergency electrician melbourne     |                 641 | /services/emergency-electrician (new) |

### Content Format

Each blog post should:

- Be 800-1200 words
- Use question-format H2 headings (matches how people ask AI models)
- Include at least 1 statistic or external reference for credibility
- Include a clear CTA linking to the relevant service page
- Have FAQ schema for 2-3 questions at the bottom
- Mention Melbourne/local suburbs naturally
- Be published through Sanity CMS

### GEO-Optimised Writing Style

For AI model discoverability, blog content should:

- Lead with clear, factual statements (not marketing fluff)
- Use structured headings that match natural language questions
- Include credentials and qualifications where relevant
- Cite Australian standards and regulations by number
- Provide specific, practical advice rather than generic information

## Acceptance Criteria

- [ ] All 11 existing blog posts have updated title tags and meta descriptions
- [ ] Cannibalising posts identified and consolidated (with 301 redirects)
- [ ] Internal links added between all blog posts and service pages
- [ ] Content calendar created for next 3 months
- [ ] First 2 new posts published following the optimised template
