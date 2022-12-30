import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { notionApi } from "@src/apis/notion";
import { environment } from "@src/types/env";
import { JournalPageType } from "@src/types/notion";

export const useJournalQuery = () => {
  const { query, isReady } = useRouter();
  const hashtag = query.hashtag?.toString();

  return useInfiniteQuery({
    queryKey: ["journalList", hashtag],
    queryFn: ({ pageParam }: { pageParam?: string }) => {
      return notionApi.getDatabase<JournalPageType>({
        database_id: "82649fda5ba84801a464d7ef2f7552b3",
        page_size: 5,
        start_cursor: pageParam,
        filter: {
          and: [
            {
              property: "_status",
              select: {
                equals:
                  environment === "production" ? "Production" : "Development",
              },
            },
            hashtag && {
              property: "Hashtags",
              multi_select: {
                contains: hashtag,
              },
            },
          ].filter(Boolean),
        },
        sorts: [
          {
            timestamp: "last_edited_time",
            direction: "descending",
          },
        ],
      });
    },
    enabled: isReady,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next_cursor || undefined,
  });
};
