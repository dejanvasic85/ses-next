# Skill: promote-to-prd

## Trigger

Use this skill when the user says:

- "turn this idea into a PRD"
- "promote idea"
- "promote to PRD"
- invokes `/promote-to-prd`

## Purpose

Run an interview-style conversation to gather enough detail, then generate a formal PRD under `docs/planning/prds/`. This is stage 2 of the planning pipeline.

## Output

- Creates: `docs/planning/prds/NNN-slug.md`
- Updates: source idea file's `prd:` and `status: accepted` fields

## CRITICAL: Do not generate the PRD immediately

You MUST run the full interview before writing anything. The interview exists to gather information that cannot be inferred from the idea file alone.

## Workflow

### Step 0 — Identify the source idea

If the user referenced a specific idea file, read it. If not, list ideas with `status: evaluating` or `status: accepted` from `docs/planning/ideas/` and ask which one to promote.

Read the source idea file fully before starting the interview.

### Step 1 — Determine next PRD number

Scan `docs/planning/prds/` for existing files. The next number is the highest existing number + 1 (zero-padded to 2 digits, e.g., `09`). Skip gaps in the existing sequence — use the true next available number.

### Round 1 — Context & scope

Ask these questions (skip any already answered by the idea file):

1. "Who is this for? (end users, client, internal team)"
2. "What problem does this solve, and how urgent is it?"
3. "What's the desired outcome — what does success look like?"
4. "Are there any constraints (budget, timeline, dependencies on other work)?"

After receiving answers, summarise what was captured and ask: "Is there anything I've missed or misunderstood before we continue?"

### Round 2 — Requirements

Based on Round 1 answers, ask:

1. "What are the must-have requirements vs. nice-to-haves?"
2. "Are there existing pages, components, or schemas this touches?"
3. "Are there any SEO, accessibility, or content considerations?"
4. "Does this need new Sanity CMS schema changes or content authoring?"

After receiving answers, summarise and ask if anything is missing.

### Round 3 — Acceptance & priority

Final clarifications:

1. "How will we verify this is done correctly? (specific acceptance criteria)"
2. "What priority should this carry? (critical / high / medium / low)"
3. "Who owns this work?"
4. "Any dependencies on other PRDs that must complete first?"

After receiving answers, summarise and confirm you have enough to write the PRD.

### Step 2 — Generate the PRD

Only after completing all three rounds, generate the PRD:

**Frontmatter:**

- `number`: auto-assigned (Step 1)
- `status`: `draft`
- `priority`: from Round 3
- `depends-on`: list of PRD numbers from Round 3
- `owner`: from Round 3
- `idea`: filename of source idea (e.g., `2026-04-add-llms-txt.md`)
- `created` / `updated`: today's date
- Infer `domain` and `tags` from context

**Body structure** (follow `docs/planning/templates/prd.md`):

- **Problem** — from Round 1 answers
- **Current State** — cross-reference the codebase for actual file paths. Use `packages/ses-next/src/` paths where relevant.
- **Requirements** — expand Round 2 answers into numbered H3 subsections. Include code snippets, Sanity schema additions, or content examples.
- **Implementation Notes** — constraints, gotchas, architectural decisions
- **Acceptance Criteria** — checkboxes from Round 3. Each item independently verifiable.

### Step 3 — Update the source idea

Patch the source idea file:

- Set `prd:` to the new PRD filename (e.g., `09-add-llms-txt.md`)
- Set `status: accepted`

### Step 4 — Confirm

Report the files created/updated and ask if the user wants to immediately create an execution plan (trigger `/plan-execution`).

## Frontmatter Schema

```yaml
---
title: ''
number: ''
status: draft
priority: medium
phase: ''
created: 'YYYY-MM-DD'
updated: 'YYYY-MM-DD'
owner: ''
idea: ''
plan: ''
depends-on: []
domain: seo
budget: ''
tags: []
---
```

Valid status values: `draft | review | approved | in-progress | completed | cancelled`

## Notes

- PRDs directory: `docs/planning/prds/`
- Template: `docs/planning/templates/prd.md`
- Existing PRDs use numbers 00–08. Next available is 09.
- Reference `ses-content-writer` skill conventions for any Sanity CMS schema or content requirements
- Never write the PRD before completing all three interview rounds
