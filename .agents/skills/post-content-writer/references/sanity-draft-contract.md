# Sanity Draft Contract

Generated content should be written as a draft or reviewable document unless the user explicitly asks to publish.

## Default Write Behavior

- Create or update a Sanity `post` draft.
- Keep `publishedAt` unset unless publishing is explicitly requested.
- Preserve stable `slug.current`.
- Preserve `sourceMeta.sourceId` when updating generated content.
- Do not overwrite a manually edited post without surfacing the diff.

## Dataset Routing

- `reading-question` and `harmony-pattern` drafts must always be created or updated in the Sanity `production` dataset.
- Do not upload those content kinds to the `development` dataset, even when running from `.env.local`.
- Use `scripts/upload-post-draft.mjs`; it routes those content kinds to `production` and reports the target dataset in dry-run and write output.

## Upsert Identity

Prefer this identity order:

1. existing Sanity document id
2. `sourceMeta.sourceId`
3. `slug.current`

## Required Checks Before Upload

1. The draft has `_type: "post"`.
2. `title`, `slug.current`, `excerpt`, `contentKind`, and `body` exist.
3. `body` is an array.
4. Every custom block type has a schema and renderer in this repository.
5. The user did not ask for publish, or publish intent is explicit.

## Current Limitation

If the repository schema does not yet include a proposed field such as `contentKind` or `sourceMeta`, update the Sanity schema and runtime contract first. Do not upload content that the current schema cannot represent.
