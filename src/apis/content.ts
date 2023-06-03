import { cache } from 'react';

import { notionApi } from './notion';

import { JournalPageType } from '@src/types/notion';

const getPage = cache((page_id: string) =>
  notionApi.retrievePage<JournalPageType>({ page_id })
);

export const pageApi = {
  getPage,
};
