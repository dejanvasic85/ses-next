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

### Step 1 — Take the idea as-is

Accept whatever the user provides — a single sentence is enough. Do not ask clarifying questions upfront.

### Step 2 — Query the codebase

Before writing the file, search the codebase to understand what the idea refers to:

- Use Glob/Grep to find relevant files, components, schemas, or routes mentioned or implied by the idea
- Read any key files needed to understand current state
- Use this context to fill in the sections below with real, grounded content

Only ask the user a question if the idea is so ambiguous that you cannot make a reasonable inference about what it refers to in this codebase (e.g., a single word with no context). One targeted question maximum.

### Step 3 — Infer metadata

From the description and codebase context, determine:

- **slug**: kebab-case from the title (e.g., "Add llms.txt file" → `add-llms-txt-file`)
- **domain**: one of `seo | engineering | content | design | infrastructure`
- **source**: one of `client-request | analytics | competitor-research | internal | seo-data`
- **priority**: default `unset` unless the user signals urgency
- **status**: always `captured` on creation

### Step 4 — Create the file

Filename format: `YYYY-MM-slug.md` using today's date for YYYY-MM.

Use the template at `docs/planning/templates/idea.md`. Populate all frontmatter fields. Write concise content under each section heading based on what you found in the codebase — do not leave sections as empty placeholders. Leave `prd: ""` blank (filled when promoted).

### Step 5 — Confirm

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
