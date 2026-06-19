# AGENTS.md

This repository is the Indegser website and Sanity-backed publishing surface.
Keep this file short. Put repeatable workflows in `.agents/skills`, not here.

## Commands

- `pnpm run dev`: start the Next.js app.
- `pnpm run build`: build and type-check the app through Next.js.
- `pnpm run lint`: lint `app`, `components`, and `lib`.
- `pnpm run prettier:check`: check formatting.
- `pnpm run sanity:dev`: start Sanity Studio locally.
- `pnpm run sanity:deploy`: deploy Sanity Studio.

## How To Work

- Read the relevant files before changing code.
- Prefer existing patterns over new abstractions.
- Make the smallest change that solves the request.
- Preserve user work. Do not revert changes you did not make unless explicitly asked.
- Use `rg` for searching.
- Use `apply_patch` for manual edits.
- Validate with the smallest reliable command set for the change.
- If a command fails because of sandboxing or network access, retry with a scoped approval request.

## Architecture

- Treat Sanity as the source of truth for publishable content.
- Treat this site as a generic post renderer, not a collection of app-specific renderers.
- Prefer `post` documents with Portable Text body blocks over new page-specific document types.
- Add custom Sanity block types only when the generic renderer cannot express the content cleanly.
- Keep rendering logic in `components/organs/post-portable-text`.
- Keep Sanity schemas in `lib/sanity/schema`.
- Keep runtime Sanity/Zod contracts in `lib/sanity/types`.

## Skills And Agents

- Repo-scoped skills live in `.agents/skills`.
- Use skills for repeatable project workflows, domain writing rules, content schemas, and helper scripts.
- Keep `SKILL.md` concise. Put longer domain material in `references/`.
- Put deterministic validation or upload helpers in a skill's `scripts/` directory.
- Project-scoped custom subagents live in `.codex/agents`.
- Use custom subagents only for separate roles such as independent review, investigation, or publish readiness checks.
- Do not create a plugin unless the workflow needs to be distributed outside this repository or bundled with app/MCP integrations.

## Content Pipeline

- Content-generation skills should produce validated `post.body` blocks.
- Generated content should become a Sanity draft or reviewable document by default.
- Do not auto-publish generated content unless the user explicitly asks.
- For specialized content like reading notes or harmony patterns, model the difference with `contentKind`, metadata, and typed body blocks rather than separate renderers.

## UI Changes

- If a task changes visible UI, run the app when feasible and inspect the rendered result in a browser.
- Check hierarchy, spacing, typography, responsiveness, accessibility cues, and interaction clarity.
- Fix visual or interaction issues found during review before finishing.

## Durable Knowledge

- Do not record reusable knowledge automatically.
- Before adding durable rules to `AGENTS.md` or a skill, propose the exact wording and get approval.
- Keep one-off task guidance in the conversation, not in this file.
