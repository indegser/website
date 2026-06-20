---
name: reading-question-writer
description: Turn reading questions, notes, explanations, or conversation summaries into Sanity `post` drafts using this repository's generic post body block contract. Use for question-driven learning notes that should publish as normal posts rather than separate apps or document types.
---

# Reading Question Writer

Use this skill to turn a question and its answer into a clear post draft. This skill depends on `$post-content-writer` for the shared Sanity post/block contract.

## Workflow

1. Use `$post-content-writer` and read its `references/post-block-contract.md`.
2. Read `references/writing-rules.md`.
3. Extract:
   - original question
   - short answer
   - explanation
   - key terms
   - what became clear
   - open questions
4. Produce a `post` draft with `contentKind: "reading-question"`.
5. Put source details in `sourceMeta`, not in visible body prose unless useful to readers.
6. Write body content as normal Portable Text sections.
7. Use callout blocks sparingly for the original question or main takeaway.
8. Save as draft/reviewable content by default.
9. When uploading, use `$post-content-writer`'s upload helper so `reading-question` drafts are written to the Sanity `production` dataset.

## Quality Bar

- The post should be readable without knowing the original chat.
- The title should name the concept, not just repeat the question.
- The first paragraph should answer the question directly.
- Definitions should be short and contextual.
- Open questions should stay as questions, not fake conclusions.
