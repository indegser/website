import { useInfiniteQuery } from "@tanstack/react-query";

import { notionApi } from "@src/apis/notion";
import { environment } from "@src/types/env";

export const useJournalQuery = () => {
  return useInfiniteQuery(
    ["journal"],
    ({ pageParam }: { pageParam?: string }) => {
      return notionApi.getDatabase({
        database_id: "82649fda5ba84801a464d7ef2f7552b3",
        page_size: 1,
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
      getNextPageParam: (lastPage) => lastPage.next_cursor,
    }
  );
};
