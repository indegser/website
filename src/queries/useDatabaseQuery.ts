import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { notionApi } from '@src/apis/notion';
import { isProduction } from '@src/types/env';
import { DatabaseType, JournalPageType } from '@src/types/notion';

export const useDatabaseQuery = (id: string) => {
  return useInfiniteQuery(createDatabaseQueryConfig(id));
};

export const createDatabaseQueryConfig = (
  id: string
): UseInfiniteQueryOptions<DatabaseType<JournalPageType>> => ({
  queryKey: ['database', id],
  queryFn: async ({ pageParam: startCursor }) => {
    return notionApi.queryDatabase({
      database_id: id,
      page_size: 20,
      start_cursor: startCursor || undefined,
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
    });
  },
  refetchOnWindowFocus: false,
  getNextPageParam: (current) => {
    return current.next_cursor || undefined;
  },
});
