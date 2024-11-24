import { z } from 'zod';

export const excerptSchema = z.object({
  excerpt: z.string().describe('Excerpt'),
});
