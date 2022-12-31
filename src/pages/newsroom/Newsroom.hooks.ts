import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { journalApi } from "@src/apis/journal";

export const useJournalQuery = () => {
  const { query, isReady } = useRouter();
  const subject = query.subject?.toString();

  return useInfiniteQuery({
    queryKey: ["journalList", subject],
    queryFn: ({ pageParam }: { pageParam?: string }) => {
      return journalApi.fetchJournalList({ pageParam, subject });
    },
    enabled: isReady,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      return lastPage.next_cursor || undefined;
    },
  });
};
