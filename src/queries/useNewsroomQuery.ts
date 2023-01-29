import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { journalApi } from "@src/apis/journal";

export const useNewsroomQuery = () => {
  return useInfiniteQuery(createNewsroomQueryConfig());
};

type X = ReturnType<typeof journalApi["fetchJournalList"]>;

export const createNewsroomQueryConfig = (): UseInfiniteQueryOptions<
  Awaited<X>
> => ({
  queryKey: ["newsroom"],
  queryFn: async ({ pageParam = 0 }) => {
    return journalApi.fetchJournalList({ offset: pageParam, pageSize: 20 });
  },
  getNextPageParam: (current) => {
    return current.nextOffset;
  },
});
