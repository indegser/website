---
name: codex-dev-workflow
description: Structured implementation workflow for repository tasks that require requirement analysis, codebase reading, short design, planning, implementation with the right skills, validation, and iteration until the result matches the plan and requirements. Use for non-trivial feature work, bug fixes, refactors, and code reviews where Codex should follow a read, design, plan, implement, validate, and repeat loop, then propose reusable knowledge for approval before recording it.
---

# Codex Dev Workflow

Follow this workflow for any repository task that is large enough to need more than a small local edit.

## Core Loop

1. Restate the requirement as explicit, testable outcomes.
2. Read the relevant files, routes, components, tests, and scripts before deciding on changes.
3. Write a short design:
   - scope,
   - affected files,
   - constraints,
   - risks,
   - validation approach.
4. Write a compact plan with ordered implementation steps.
5. Select the minimum relevant skill set and state the order.
6. Implement the plan.
7. Validate the result.
8. Compare the result against both the requirement and the plan.
9. If anything is missing or failing, return to implementation and repeat until it passes.
10. After completion, propose reusable knowledge entries and wait for user approval before writing them.

## Skill Selection

- Use `shadcn` when the task involves `components.json`, shadcn/ui components, registry items, or composing design-system UI.
- Use `vercel-react-best-practices` when the task changes React or Next.js rendering, data fetching, client/server boundaries, or performance-sensitive paths.
- Use `web-design-guidelines` when validating UI quality, accessibility, interaction clarity, or visual consistency.
- Use `agent-browser` when the task changes visible UI so the rendered result can be reviewed in the browser instead of inferred from code.
- Use `dogfood` for broader exploratory QA when a UI change affects multiple pages, complex flows, or release-level confidence.
- Use multiple skills only when each one changes the outcome. State the sequence before implementation.

## Design Standard

Keep the design short and operational. It should be possible to check whether the implementation matched it.

Always identify:

- what the user wants,
- what the current code already does,
- what will change,
- how success will be verified.

Use the templates in [references/plan-template.md](./references/plan-template.md) and [references/verification-template.md](./references/verification-template.md) when the task is complex enough to benefit from structure.

## Validation Standard

Validation must cover three layers:

1. Static correctness
   - lint, type checks, formatting, or build constraints relevant to the touched code.
2. Behavioral correctness
   - targeted tests, scripts, or manual flows that exercise the changed behavior.
3. Requirement correctness
   - direct comparison of delivered behavior against the requirement and the written plan.

Prefer the smallest reliable validation set. Expand only when risk or failures justify it.

For UI-changing work, add a visual review loop. Use [references/ui-review-template.md](./references/ui-review-template.md) to review the rendered screen with `agent-browser`, fix findings, and repeat until the screen and interactions are acceptable.

## Iteration Rule

Do not stop at "implemented." Stop only when one of these is true:

- validation passes and the result matches the requirement and plan, or
- a concrete blocker remains that cannot be resolved from repository context.

When a mismatch is found, explicitly state which requirement, plan item, or validation step failed, then fix that gap and re-run validation.

For design changes, visual review findings count as validation failures. Do not stop after code passes lint or tests if the rendered result still has hierarchy, spacing, responsiveness, or usability issues.

## Knowledge Proposal Rule

Do not write knowledge immediately after finishing implementation.

First prepare a proposal using [references/knowledge-proposal-template.md](./references/knowledge-proposal-template.md). The proposal must include:

- title,
- why it is reusable,
- exact content to record,
- suggested file path under `docs/knowledge/`.

Only write the knowledge entry after the user approves the proposal.
