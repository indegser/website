---
name: post-content-writer
description: Create, review, or normalize Sanity `post` draft content for this repository. Use when Codex needs to turn source material into generic post body blocks, design or validate Portable Text/custom blocks, prepare Sanity draft payloads, or keep content workflows aligned with the universal post renderer.
---

# Post Content Writer

Use this skill as the shared contract for publishable content in this repository. Domain skills should produce `post` drafts and `post.body` blocks, not app-specific renderers.

## Workflow

1. Read `references/post-block-contract.md`.
2. Read `references/sanity-draft-contract.md` before preparing a Sanity write.
3. Identify `contentKind` and source metadata.
4. Convert the source material into a `post` draft:
   - `title`
   - `slug`
   - `excerpt`
   - `contentKind`
   - `sourceMeta`
   - `body`
5. Use Portable Text blocks for prose.
6. Use custom blocks only when prose cannot express the content cleanly.
7. Validate body blocks with `scripts/validate-post-draft.mjs` when a JSON draft artifact exists.
8. Dry-run upload plans with `scripts/upload-post-draft.mjs`.
9. Save generated content as draft or reviewable content unless the user explicitly asks to publish.

## Rules

- Do not create a new page renderer for a content type unless the generic renderer cannot support it.
- Do not store rendered HTML in Sanity content.
- Keep human prose and machine-readable custom blocks separate.
- Prefer stable IDs and slugs over title-derived references.
- Preserve source context in `sourceMeta` so generated content remains auditable.
- Always write `reading-question` and `harmony-pattern` drafts to the Sanity `production` dataset.
- If the current Sanity schema cannot store the proposed block, stop and propose the schema addition before uploading.

## Output

When asked to produce a draft, return either:

- a concise Sanity draft summary plus the body block JSON, or
- a path to a generated JSON artifact that can be validated and uploaded.

Do not claim content was uploaded unless `scripts/upload-post-draft.mjs --write` actually ran and returned success.
