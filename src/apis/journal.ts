import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { notionApi } from './notion';

import { isProduction } from '@src/types/env';
import { JournalPageType } from '@src/types/notion';

const queryJournalDatabase = (
  args: Omit<QueryDatabaseParameters, 'database_id'>
) => {
  return notionApi.queryDatabase<JournalPageType>({
    database_id: '82649fda5ba84801a464d7ef2f7552b3',
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    filter: isProduction
      ? {
          property: 'Status',
          status: {
            equals: 'Done',
          },
        }
      : undefined,
    ...args,
  });
};

const retrieveJournalPage = (id: string) => {
  return notionApi.retrievePage({ page_id: id });
};

const fetchJournalBlocks = async (id: string) =>
  notionApi.retrieveBlockChildren({ block_id: id });

export const journalApi = {
  queryJournalDatabase,
  retrieveJournalPage,
  fetchJournalBlocks,
};
