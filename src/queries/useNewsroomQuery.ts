import { useInfiniteQuery } from "@tanstack/react-query";

import { journalApi } from "@src/apis/journal";

export const useNewsroomQuery = () => {
  return useInfiniteQuery(createNewsroomQueryConfig());
};

export const createNewsroomQueryConfig = () => ({
  queryKey: ["newsroom"],
  queryFn: async ({ pageParam = 0 }) => {
    return journalApi.fetchJournalList({ offset: pageParam, pageSize: 20 });
  },
  getNextPageParam: (current) => {
    return current.nextOffset;
  },
});
