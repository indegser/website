---
name: reharmonization-pattern-writer
description: Write, update, or review reharmonization and harmony-pattern content as Sanity `post` drafts using typed post body blocks. Use for chord substitution, voice-leading, progression comparison, arranging, composition, or harmony explanation tasks that should publish through the generic post renderer.
---

# Reharmonization Pattern Writer

Use this skill when documenting how a chord or reharmonization pattern works: the ordinary progression, the changed progression, the sound it creates, why it works, and where to reuse it.

This skill depends on `$post-content-writer`; harmony patterns are posts with typed body blocks, not a separate app.

## Workflow

1. Use `$post-content-writer` and read `references/post-block-contract.md`.
2. Read `references/harmony-writing-rules.md`.
3. Read `references/progression-blocks.md` before writing chord examples.
4. Read `references/glossary.md` before using professional terms.
5. Read `references/knowledge-base.md` before creating a new pattern.
6. Check for overlap by target chord, inserted chord, bass motion, inner-voice motion, emotional effect, and glossary terms.
7. If the idea overlaps an existing pattern, propose updating the existing post instead of creating a new one.
8. If it is new, produce a `post` draft with `contentKind: "harmony-pattern"`.
9. Use `progressionCompare` or `progressionExample` blocks for primary chord examples.
10. Save as draft/reviewable content by default.
11. When uploading, use `$post-content-writer`'s upload helper so `harmony-pattern` drafts are written to the Sanity `production` dataset.

## Output Principles

- Pattern titles should describe what the arranger does, not just name the theory device.
- Korean prose should sound natural to a working musician.
- Professional terms are allowed only when they are established terms and listed or proposed in the glossary.
- Human-readable prose and machine-readable progression data must stay separate.
- Do not use Markdown tables, arrow-only strings, or prose-only chord lists as the primary progression example.
