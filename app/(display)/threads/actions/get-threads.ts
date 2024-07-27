'use server';

import { sanityClient, threadSchema } from '@/lib/sanity';
import groq from 'groq';
import { z } from 'zod';
import { THREAD_PAGE_SIZE } from '../constants';

const paramSchema = z.object({
  pageSize: z.number().default(THREAD_PAGE_SIZE),
  lastCreatedAt: z.string().default('3000-01-01T00:00:00Z'),
});

export async function getThreads(param: z.infer<typeof paramSchema>) {
  const { pageSize, lastCreatedAt } = paramSchema.parse(param);

  const data = await sanityClient.fetch(
    groq`
  *[_type == 'thread' && _createdAt < $lastCreatedAt] | order(_createdAt desc)[0...$pageSize] {
    ...
  }
  `,
    { pageSize, lastCreatedAt },
  );

  return threadSchema.array().parse(data);
}
