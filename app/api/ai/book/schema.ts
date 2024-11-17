import { z } from 'zod';

export const bookSchema = z.object({
  book: z.object({
    title: z.string().describe('Title of a book'),
    description: z.string().describe('2-3 sentences describing this book'),
    authors: z.array(z.string()),
    publishedAt: z.string(),
    recommendation: z
      .string()
      .describe(
        'a book recommendation note written by Walter Isaacson, 3-4 sentences',
      ),
  }),
});
