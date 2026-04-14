---
title: 'Create a global contact modal accessible from site navigation'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: design
prd: ''
tags:
  - contact
  - conversion
  - ux
  - modal
---

## Problem / Opportunity

Contact access currently relies on hash-link navigation to the homepage contact section, which is less direct on non-home routes and adds friction for users ready to enquire immediately.

## Context

Navigation links currently point contact to `/#contact` in both navbar and footer (`packages/ses-next/src/components/Navbar.tsx`, `packages/ses-next/src/components/Footer.tsx`). This means users on deeper pages must navigate to or scroll within the homepage contact section.

A reusable modal component already exists at `packages/ses-next/src/components/Modal.tsx`, but it is not wired into the primary contact flow. The existing contact flow is implemented in `packages/ses-next/src/components/Contact.tsx` + `packages/ses-next/src/components/ContactForm.tsx`, backed by `packages/ses-next/src/hooks/useContact.ts` and `/api/contact`.

## Rough Scope

- Introduce a global contact-modal entry point in navigation (desktop + mobile menu) that is available on every page.
- Reuse existing contact form logic/components inside the modal to avoid duplicate submit behavior.
- Preserve existing `/#contact` section behavior as fallback for users who prefer the full contact section.
- Add event tracking for modal open and successful submission to compare conversion performance vs section-based contact flow.

## Success Signal

- Users can open and submit a contact form from any page without route change.
- Contact initiation rate improves on non-home pages.
- No regression in existing contact form delivery and success/error handling.

## Open Questions

- Should the nav “Contact” action open modal everywhere, or only on non-home pages while keeping homepage anchor behavior?
- Should the modal include full map/address context or just a compact lead form?
- Should closing behavior and focus management follow strict accessibility patterns (focus trap, restore focus, ESC) beyond current modal defaults?

## References

- `packages/ses-next/src/components/Navbar.tsx`
- `packages/ses-next/src/components/Footer.tsx`
- `packages/ses-next/src/components/Modal.tsx`
- `packages/ses-next/src/components/Contact.tsx`
- `packages/ses-next/src/hooks/useContact.ts`
