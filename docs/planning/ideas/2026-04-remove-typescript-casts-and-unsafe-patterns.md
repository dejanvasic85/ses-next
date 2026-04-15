---
title: 'Remove TypeScript casts and unsafe patterns across the codebase'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: engineering
prd: ''
tags:
  - typescript
  - type-safety
  - refactor
  - code-quality
---

## Problem / Opportunity

The codebase still uses TypeScript casts and unsafe typing patterns that can hide real type issues and weaken compile-time guarantees. Reducing or eliminating these patterns will improve safety, readability, and long-term maintainability.

## Context

There are explicit casts in frontend and CMS code, including `icon as keyof typeof IconMap` in `packages/ses-next/src/components/Services.tsx`, `social = {} as Social` in `packages/ses-next/src/components/Footer.tsx`, and structured-data/message casting patterns in backend and schema code.

In `packages/ses-next/src/lib/mailService.ts`, dynamic key access uses casts (`curr as keyof EmailData`) and AWS request payload uses `as SES.Types.SendEmailRequest`. In `packages/ses-content/schemas/service.ts`, Sanity validation relies on casts like `(value as {_ref?: string} | undefined)` and `(context.document as {_id?: string})`.

## Rough Scope

- Audit and categorize all `as` casts by risk and replaceability.
- Replace avoidable casts with stronger domain types, type guards, generic helpers, or safer narrowing.
- Refactor high-risk unsafe patterns first (runtime data paths, external API request objects, schema validation callbacks).
- Keep necessary benign patterns (e.g., limited literal narrowing) explicitly documented if retained.

## Success Signal

- Significant reduction in unsafe casts in application and schema code.
- No behavior regressions while maintaining green type checks and lint.
- Improved developer confidence when modifying typed data flows.

## Open Questions

- Should this initiative enforce a strict policy of zero `as` casts, or allow constrained exceptions like literal narrowing?
- Do we want to add lint rules to block unsafe casts in CI after refactor?
- Should migration be done incrementally by module, or as a dedicated whole-repo hardening pass?

## References

- `packages/ses-next/src/components/Services.tsx`
- `packages/ses-next/src/components/Footer.tsx`
- `packages/ses-next/src/lib/mailService.ts`
- `packages/ses-content/schemas/service.ts`
- `packages/ses-next/src/components/Team.tsx`
