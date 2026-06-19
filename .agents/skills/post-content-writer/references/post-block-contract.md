# Post Block Contract

All publishable generated content should fit the generic `post` renderer.

## Draft Shape

```ts
type PostDraft = {
  _type: 'post';
  title: string;
  slug: { _type: 'slug'; current: string };
  excerpt: string;
  contentKind: string;
  sourceMeta: SourceMeta;
  body: PostBodyBlock[];
};
```

`contentKind` examples:

- `essay`
- `reading-question`
- `harmony-pattern`

## Source Metadata

```ts
type SourceMeta = {
  originSkill: string;
  sourceProject?: string;
  sourceId?: string;
  sourceUrl?: string;
  schemaVersion: number;
  generatedAt?: string;
};
```

Use metadata for auditability. Do not put internal pipeline details in visible reader prose.

## Portable Text Prose

Use normal Portable Text blocks for paragraphs, headings, lists, quotes, links, and inline code.

Minimal paragraph:

```json
{
  "_type": "block",
  "style": "normal",
  "children": [{ "_type": "span", "text": "Paragraph text." }]
}
```

Minimal heading:

```json
{
  "_type": "block",
  "style": "h2",
  "children": [{ "_type": "span", "text": "Section title" }]
}
```

## Custom Blocks

Use custom blocks only when the renderer needs structured data.

### callout

```ts
type CalloutBlock = {
  _type: 'callout';
  tone: 'note' | 'question' | 'warning' | 'takeaway';
  title?: string;
  body: PortableTextBlock[];
};
```

### progressionExample

Use for one chord progression.

```ts
type ProgressionExampleBlock = {
  _type: 'progressionExample';
  id: string;
  meter: Meter;
  gridUnit: GridUnit;
  progression: Progression;
};
```

### progressionCompare

Use for before/after reharmonization examples.

```ts
type ProgressionCompareBlock = {
  _type: 'progressionCompare';
  id: string;
  meter: Meter;
  gridUnit: GridUnit;
  before: Progression;
  after: Progression;
};
```

### voiceMotion

```ts
type VoiceMotionBlock = {
  _type: 'voiceMotion';
  title: string;
  motions: Array<{
    label: string;
    path: string[];
    explanation: string;
  }>;
};
```

### usageNotes

```ts
type UsageNotesBlock = {
  _type: 'usageNotes';
  items: string[];
};
```

### relatedTerms

```ts
type RelatedTermsBlock = {
  _type: 'relatedTerms';
  termIds: string[];
};
```

## Renderer Rule

If a block type is added here, add the matching Sanity schema and Portable Text renderer before relying on it for production content.
