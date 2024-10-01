import { z } from 'zod';

export const imageTagSchema = z.object({
  tags: z.array(
    z.object({
      alt: z.string().describe('2 or 3 sentences describing given context.'),
      keywords: z.array(z.string().describe('1-2 words')),
    }),
  ),
});
