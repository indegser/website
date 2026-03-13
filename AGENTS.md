# Repository Workflow

Use the `codex-dev-workflow` skill for any non-trivial feature, bug fix, refactor, or review request in this repository.

## Default Execution Order

1. Restate the requirement in concrete terms.
2. Read the relevant code paths before proposing changes.
3. Produce a short design and implementation plan.
4. Choose and use the minimum relevant skill set for implementation.
5. Validate the result with static checks, behavioral checks, and requirement-to-plan comparison.
6. If validation fails or the result misses the plan, iterate through implement -> validate until it passes.
7. Before recording any reusable learning, propose the exact knowledge entry to the user and wait for approval.

## Skill Selection

- Use `shadcn` for shadcn/ui components, registry items, and component composition.
- Use `vercel-react-best-practices` for React or Next.js architecture, performance, rendering, and data-flow decisions.
- Use `web-design-guidelines` for UI quality, accessibility, and UX validation.
- Use `agent-browser` for any task that changes visible UI so the agent reviews the rendered result in-browser, not only the code.
- Use `dogfood` for broader exploratory QA on large UI changes, multi-step flows, or pre-release visual and interaction testing.
- Use the minimum set of skills needed for the request, in a clear order.

## Design Change Loop

When a task changes the UI, do not treat implementation as complete after code changes alone.

Run this loop:

1. Implement the UI change.
2. Open the changed surface in a browser with `agent-browser`.
3. Review it from a professional UI/UX perspective:
   - visual hierarchy,
   - spacing and alignment,
   - typography and readability,
   - responsiveness,
   - accessibility cues,
   - interaction clarity,
   - consistency with surrounding product patterns.
4. Fix the issues found.
5. Re-open and re-review until the rendered result is acceptable.

For larger UI changes, add a `dogfood` pass after the focused `agent-browser` review.

## Validation Standard

- Run the smallest set of commands that can prove the change safely.
- Prefer repository scripts such as `pnpm lint`, `pnpm test`, and targeted checks over ad hoc validation.
- In the final verification step, explicitly compare the result against:
  - the user's requirement,
  - the implementation plan,
  - any acceptance criteria discovered in code or tests.

## Operating Rules

- Reusable operating rules must be explicitly codified rather than kept as conversational guidance.
- At the start of every new conversation, check the current git branch. If the branch is `main`, verify whether it is behind `origin/main` and update it before proceeding when safe to do so.
- When removing or replacing a tool, framework, script, or test runner, expand the verification scope beyond source files to include package scripts, lockfiles, CI workflows under `.github/workflows`, and user-facing documentation that references the removed item.
- Before codifying a new rule in `AGENTS.md` or any skill, first propose the exact wording to the user and wait for approval.
- When proposing a change to instructions, workflows, or reusable rules, include a brief self-critique focused on:
  - execution strength, meaning whether the rule will reliably change agent behavior in practice,
  - duplication risk, meaning whether the rule belongs here or is already covered elsewhere.

## Knowledge Capture Rule

- Knowledge is stored under `docs/knowledge/`.
- Do not write or update knowledge automatically.
- First propose:
  - the title,
  - why it is reusable,
  - the exact content to record.
- Record it only after the user explicitly approves.
