import { notionApi } from "./notion";

import { environment } from "@src/types/env";
import { JournalPageType } from "@src/types/notion";

type FetchJournalListParameters = {
  subject?: string;
  pageParam?: string;
};

const fetchJournalList = ({
  subject,
  pageParam,
}: FetchJournalListParameters) => {
  return notionApi.getDatabase<JournalPageType>({
    database_id: "82649fda5ba84801a464d7ef2f7552b3",
    page_size: 5,
    start_cursor: pageParam,
    filter: {
      and: [
        {
          property: "_status",
          select: {
            equals: environment === "production" ? "Production" : "Development",
          },
        },
        subject && {
          property: "Subjects",
          rollup: {
            any: {
              rich_text: {
                contains: subject,
              },
            },
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
};

export const journalApi = {
  fetchJournalList,
};
