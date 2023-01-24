import { supabase } from "@src/sdks/supabase";
import { JournalPageType } from "@src/types/notion";

type FetchJournalListParameters = {
  offset?: number;
  pageSize?: number;
};

const fetchJournalList = async ({
  offset = 0,
  pageSize = 20,
}: FetchJournalListParameters) => {
  return supabase
    .from("journal")
    .select("data")
    .order("last_edited_time", { ascending: false })
    .range(offset, offset + pageSize)
    .then((result) => {
      const hasMore = result.data.length > pageSize;
      return {
        nextOffset: hasMore ? offset + pageSize : undefined,
        data: result.data
          .slice(0, pageSize)
          .map((item) => item.data as JournalPageType),
      };
    });
};

export const journalApi = {
  fetchJournalList,
};
