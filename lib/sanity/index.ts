import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'em8nd69q',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
