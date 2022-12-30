import { useInfiniteQuery } from "@tanstack/react-query";

import { notionApi } from "@src/apis/notion";
import { environment } from "@src/types/env";
import { JournalPageType } from "@src/types/notion";

export const useJournalQuery = () => {
  return useInfiniteQuery(
    ["journal"],
    ({ pageParam }: { pageParam?: string }) => {
      return notionApi.getDatabase<JournalPageType>({
        database_id: "82649fda5ba84801a464d7ef2f7552b3",
        page_size: 5,
        start_cursor: pageParam,
        filter: {
          property: "status",
          select: {
            equals: environment === "production" ? "Production" : "Development",
          },
        },
        sorts: [
          {
            timestamp: "last_edited_time",
            direction: "descending",
          },
        ],
      });
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.next_cursor,
    }
  );
};
