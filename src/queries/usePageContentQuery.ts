import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { notionApi } from '@src/apis/notion';
import { ListBlockChildrenType } from '@src/types/notion';

export const usePageContentQuery = (id: string) => {
  return useInfiniteQuery(createPageContentQueryConfig(id));
};

export const createPageContentQueryConfig = (
  id: string
): UseInfiniteQueryOptions<ListBlockChildrenType> => ({
  queryKey: ['page', 'content', id],
  queryFn: ({ pageParam: startCursor }) =>
    notionApi.retrieveBlockChildren({
      block_id: id,
      page_size: 50,
      start_cursor: startCursor || undefined,
    }),
  getNextPageParam: (current) => {
    return current.next_cursor || undefined;
  },
});
