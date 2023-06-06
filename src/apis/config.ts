import { cache } from 'react';

import { IndexConfigType } from '@src/types/indexes';

const getConfig = cache(async (id: string): Promise<IndexConfigType> => {
  const indexes = await getIndexes();
  const index = indexes.find((index) => index.id === id);
  return index || null;
});

const getIndexes = cache(async (): Promise<IndexConfigType[]> => {
  const url = new URL(process.env.EDGE_CONFIG);
  const token = url.searchParams.get('token');

  url.search = '';

  return fetch(`${url.toString()}/item/indexes`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
});

export const configApi = {
  getConfig,
  getIndexes,
};
