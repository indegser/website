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

export const categorySchema = z.object({
  _id: z.string(),
  title: z.string(),
});

export const threadSchema = z
  .object({
    _id: z.string(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    content: z.array(z.any()),
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

export const postSchema = z
  .object({
    _id: z.string(),
    title: z.string(),
    excerpt: z.string(),
    cover: refSchema,
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
