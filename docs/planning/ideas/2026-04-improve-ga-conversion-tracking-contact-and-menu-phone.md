---
title: 'Improve GA conversion tracking for contact form and menu phone clicks'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: seo
prd: ''
tags:
  - analytics
  - ga4
  - conversions
  - contact-form
  - phone-clicks
---

## Problem / Opportunity

We do not currently have clear GA conversion signals for two high-intent actions: successful contact form submissions and phone icon/menu click-to-call interactions. This limits our ability to measure lead quality and optimize conversion paths.

## Context

The app loads GTM via `packages/ses-next/src/components/GoogleTagManager.tsx`, but there is no explicit client-side conversion event push (for example via `dataLayer.push`) in the contact or navigation flows.

`packages/ses-next/src/components/ContactForm.tsx` handles reCAPTCHA and submits form data through `onSubmit`, but does not emit analytics events for submit attempts or confirmed success. The backend endpoint `packages/ses-next/src/app/api/contact/route.ts` validates and sends emails, returning success/failure JSON, but there is no analytics instrumentation tied to the response outcome.

`packages/ses-next/src/components/Navbar.tsx` includes tel links for both the mobile phone icon and a desktop menu phone link, but those click-to-call actions are not tagged for conversion tracking.

## Rough Scope

- Add a small client-side tracking utility for standardized GTM/GA event dispatch with safe no-op behavior when GTM is unavailable.
- Track contact form events with clear phases (submit attempt, success, failure) and include metadata needed for GA4 conversion reporting.
- Track phone click events from navbar mobile icon and desktop menu phone link with context (placement/device/menu type).
- Align event naming and parameters with GA4 recommended patterns, then map key events as conversions in GA.

## Success Signal

- GA4 receives reliable events for successful contact form submissions and nav phone clicks.
- At least one conversion event is configured and visible in GA Realtime and standard reports.
- Funnel visibility improves for lead pathways (contact form vs click-to-call) with actionable attribution.

## Open Questions

- Should we use GA4 recommended event names (`generate_lead`, `phone_call`) or custom names for consistency with existing dashboards?
- Do we only count confirmed form success as conversion, or also capture submit attempts as a secondary diagnostic metric?
- Should click-to-call conversion include all tel links sitewide or only the menu phone icon/link initially?

## References

- `packages/ses-next/src/components/GoogleTagManager.tsx`
- `packages/ses-next/src/components/ContactForm.tsx`
- `packages/ses-next/src/app/api/contact/route.ts`
- `packages/ses-next/src/components/Navbar.tsx`
