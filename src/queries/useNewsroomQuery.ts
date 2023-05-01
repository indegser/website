import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { journalApi } from '@src/apis/journal';
import { DatabaseType, JournalPageType } from '@src/types/notion';

export const useNewsroomQuery = () => {
  return useInfiniteQuery(createNewsroomQueryConfig());
};

export const createNewsroomQueryConfig = (): UseInfiniteQueryOptions<
  DatabaseType<JournalPageType>
> => ({
  queryKey: ['newsroom'],
  queryFn: async ({ pageParam: startCursor }) => {
    return journalApi.queryJournalDatabase({
      page_size: 20,
      start_cursor: startCursor || undefined,
    });
  },
  refetchOnWindowFocus: false,
  getNextPageParam: (current) => {
    return current.next_cursor || undefined;
  },
});
