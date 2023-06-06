import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { notionApi } from './notion';

import { isProduction } from '@src/types/env';
import { ContentType } from '@src/types/notion';

const queryJournalDatabase = (
  args: Omit<QueryDatabaseParameters, 'database_id'>
) => {
  return notionApi.queryDatabase<ContentType>({
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

export const journalApi = {
  queryJournalDatabase,
};
