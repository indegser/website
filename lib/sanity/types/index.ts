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

export const categorySchema = z.object({
  _id: z.string(),
  title: z.string(),
});

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
  })
  .partial();

export const postFeedSchema = postSchema.omit({});

export type Post = z.infer<typeof postSchema>;
export type PostFeed = z.infer<typeof postFeedSchema>;
export type LinkPreview = z.infer<typeof linkPreviewSchema>;
