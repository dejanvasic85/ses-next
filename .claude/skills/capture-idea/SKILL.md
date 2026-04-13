# Skill: capture-idea

## Trigger

Use this skill when the user says:

- "I have an idea"
- "capture idea"
- "new idea"
- invokes `/capture-idea`

## Purpose

Capture a raw idea quickly into `docs/planning/ideas/` with a date-prefixed filename and YAML frontmatter. Ideas are stage 1 of the planning pipeline: captured → evaluated → promoted to PRD.

## Output

Creates: `docs/planning/ideas/YYYY-MM-slug.md`

## Workflow

### Step 1 — Gather the idea

Ask the user to describe their idea in 1-3 sentences if they haven't already. Capture:

- What is the idea? (title, one-liner)
- What problem or opportunity does it address?
- Any context (what prompted this — a conversation, data, observation)?

### Step 2 — Infer metadata

From the description, determine:

- **slug**: kebab-case from the title (e.g., "Add llms.txt file" → `add-llms-txt-file`)
- **domain**: one of `seo | engineering | content | design | infrastructure`
- **source**: one of `client-request | analytics | competitor-research | internal | seo-data`
- **priority**: default `unset` unless the user signals urgency
- **status**: always `captured` on creation

### Step 3 — Create the file

Filename format: `YYYY-MM-slug.md` using today's date for YYYY-MM.

Use the template at `docs/planning/templates/idea.md`. Populate all frontmatter fields. Write short placeholder content under each section heading — enough to capture the idea clearly. Leave `prd: ""` blank (filled when promoted).

### Step 4 — Confirm

Tell the user the file was created at `docs/planning/ideas/YYYY-MM-slug.md` and ask if they want to immediately evaluate it (status: evaluating) or leave it as captured for later triage.

## Frontmatter Schema

```yaml
---
title: ''
status: captured
priority: unset
source: internal
captured: 'YYYY-MM-DD'
domain: seo
prd: ''
tags: []
---
```

Valid status values: `captured | evaluating | accepted | rejected | deferred`
Valid priority values: `critical | high | medium | low | unset`
Valid source values: `client-request | analytics | competitor-research | internal | seo-data`
Valid domain values: `seo | engineering | content | design | infrastructure`

## Template Sections

```markdown
## Problem / Opportunity

## Context

## Rough Scope

## Success Signal

## Open Questions

## References
```

## Notes

- Ideas directory: `docs/planning/ideas/`
- Template: `docs/planning/templates/idea.md`
- Date prefix uses YYYY-MM (year-month) not full date — ideas are a chronological stream
- After creation, update `docs/planning/ideas/_index.md` dashboard if it exists (or note it needs updating)
