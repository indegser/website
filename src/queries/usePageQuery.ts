import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { notionApi } from '@src/apis/notion';
import { JournalPageType } from '@src/types/notion';

export const usePageQuery = (id: string) => {
  return useQuery(createPageQueryConfig(id));
};

export const createPageQueryConfig = (
  id: string
): UseQueryOptions<JournalPageType> => ({
  queryKey: ['page', id],
  queryFn: () => notionApi.retrievePage<JournalPageType>({ page_id: id }),
});
