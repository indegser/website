import { notionApi } from './notion';

import { isProduction } from '@src/types/env';

const queryDatabase = ({
  id,
  startCursor,
}: {
  id: string;
  startCursor?: string;
}) =>
  notionApi.queryDatabase({
    database_id: id,
    page_size: 20,
    start_cursor: startCursor || undefined,
    sorts: [
      {
        timestamp: 'last_edited_time',
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
  });
export const databaseApi = {
  queryDatabase,
};
