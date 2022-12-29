import { useQueries } from "@tanstack/react-query";

import { notionApi } from "@src/apis/notion";

export const useContentGroupQuery = (ids: string[]) => {
  return useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["journal", id],
        queryFn: () =>
          notionApi.getBlockChildren({ block_id: id, page_size: 100 }),
      };
    }),
  });
};
