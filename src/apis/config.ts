import { get } from '@vercel/edge-config';
import { cache } from 'react';

import { IndexConfigType } from '@src/types/indexes';

const getConfig = cache(async (id: string): Promise<IndexConfigType> => {
  const indexes = await get<IndexConfigType[]>('indexes');
  const index = indexes.find((index) => index.id === id);
  return index || null;
});

const getIndexes = cache(async () => {
  return get<IndexConfigType[]>('indexes');
});

export const configApi = {
  getConfig,
  getIndexes,
};
