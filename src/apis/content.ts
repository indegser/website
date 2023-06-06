import { cache } from 'react';

import { notionApi } from './notion';

import { ContentType } from '@src/types/notion';

const getPage = cache((page_id: string) =>
  notionApi.retrievePage<ContentType>({ page_id })
);

const getContent = cache((block_id: string) =>
  notionApi.retrieveBlockChildren({
    block_id,
    page_size: 100,
  })
);

export const pageApi = {
  getPage,
  getContent,
};
