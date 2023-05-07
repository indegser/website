import { useQueries, UseQueryOptions } from '@tanstack/react-query';

import { notionApi } from '@src/apis/notion';
import { JournalPageType } from '@src/types/notion';

export const usePageQueries = (ids: string[]) => {
  return useQueries({ queries: ids.map((id) => createPageQueryConfig(id)) });
};

export const createPageQueryConfig = (
  id: string
): UseQueryOptions<JournalPageType> => ({
  queryKey: ['page', id],
  queryFn: () => notionApi.retrievePage<JournalPageType>({ page_id: id }),
});
