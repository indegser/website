import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { journalApi } from "@src/apis/journal";

export const useJournalQuery = (firstPage: any) => {
  const { query, isReady } = useRouter();
  const subject = query.subject?.toString();

  return useInfiniteQuery({
    queryKey: ["journalList", subject],
    queryFn: ({ pageParam }: { pageParam?: string }) => {
      return journalApi.fetchJournalList({ pageParam, subject });
    },
    enabled: isReady,
    refetchOnWindowFocus: false,
    initialData: {
      pages: [firstPage],
      pageParams: [firstPage.next_cursor || undefined],
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next_cursor || undefined;
    },
  });
};
