import config from '@/sanity.config';
import { createClient } from 'next-sanity';

const { projectId, dataset } = config;

export const client = createClient({
  dataset,
  projectId,
  useCdn: false,
});
