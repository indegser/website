import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { notionApi } from '@src/apis/notion';

export const useIndexQuery = (id: string) => {
  return useQuery(createIndexQueryConfig(id));
};

export const createIndexQueryConfig = (
  id: string
): UseQueryOptions<DatabaseObjectResponse> => ({
  queryKey: ['index', id],
  queryFn: async () => {
    return notionApi.retrieveDatabase({
      database_id: id,
    });
  },
});
