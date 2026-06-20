import type { Image } from 'sanity';
import z from 'zod';

export const imageSchema = z.object({
  alt: z.string(),
});

export const refSchema = z.object({
  _type: z.string(),
  asset: z.object({
    _ref: z.string(),
    _type: z.string(),
  }),
});

export const codeSchema = z.object({
  language: z.string(),
  code: z.string(),
});

export const googleMapSchema = z.object({
  q: z.string(),
});

export const categorySchema = z
  .object({
    _id: z.string(),
    title: z.string(),
  })
  .partial();

export const threadSchema = z
  .object({
    _id: z.string(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    content: z.array(z.any()),
    category: categorySchema.nullable(),
  })
  .partial();

export const linkPreviewSchema = z
  .object({
    link: z.string(),
    imageUrl: z.string(),
    title: z.string(),
    description: z.string(),
  })
  .partial();

export const slugSchema = z
  .object({
    _type: z.string(),
    current: z.string(),
  })
  .nullable();

export const sourceMetaSchema = z
  .object({
    originSkill: z.string(),
    sourceProject: z.string(),
    sourceId: z.string(),
    sourceUrl: z.string(),
    schemaVersion: z.number(),
    generatedAt: z.string(),
    primaryKeyCenter: z.string(),
    sourceTags: z.array(z.string()),
    sourceNotes: z.array(z.string()),
    glossaryTermIds: z.array(z.string()),
    duplicateKeys: z.array(z.string()),
    relatedSourceIds: z.array(z.string()),
  })
  .partial();

export type GridUnit = 'quarter' | 'eighth' | 'sixteenth';

export type Meter = {
  beatsPerBar: number;
  beatUnit: number;
};

export type ChordEvent = {
  chord: string;
  start: number;
  duration: number;
  role?: string;
  annotation?: string;
};

export type ProgressionBar = {
  index: number;
  events: ChordEvent[];
};

export type Progression = {
  bars: ProgressionBar[];
};

export type ProgressionCompare = {
  _type: 'progressionCompare';
  _key?: string;
  id: string;
  meter: Meter;
  gridUnit: GridUnit;
  before: Progression;
  after: Progression;
};

export type VoiceMotion = {
  _type: 'voiceMotion';
  _key?: string;
  title: string;
  motions: Array<{
    label: string;
    path: string[];
    explanation: string;
  }>;
};

export type UsageNotes = {
  _type: 'usageNotes';
  _key?: string;
  items: string[];
};

export type RelatedTerms = {
  _type: 'relatedTerms';
  _key?: string;
  termIds: string[];
};

export type Callout = {
  _type: 'callout';
  _key?: string;
  tone: 'note' | 'question' | 'warning' | 'takeaway';
  title?: string;
  body: Array<{
    _type: string;
    _key?: string;
    [key: string]: unknown;
  }>;
};

export const postSchema = z
  .object({
    _id: z.string(),
    title: z.string(),
    excerpt: z.string(),
    contentKind: z.string(),
    sourceMeta: sourceMetaSchema,
    slug: slugSchema,
    cover: refSchema.nullable(),
    body: z.array(z.any()),
    categories: z.array(categorySchema).nullable(),
    publishedAt: z.coerce.date(),
    _updatedAt: z.coerce.date(),
  })
  .partial();

export const postFeedSchema = postSchema.omit({});

export type Post = z.infer<typeof postSchema>;
export type PostFeed = z.infer<typeof postFeedSchema>;
export type LinkPreview = z.infer<typeof linkPreviewSchema>;
export type Code = z.infer<typeof codeSchema>;
export type SanityImage = Image;
export type Thread = z.infer<typeof threadSchema>;
export type Category = z.infer<typeof categorySchema>;
export type GoogleMap = z.infer<typeof googleMapSchema>;
