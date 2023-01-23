import { useQueries } from "@tanstack/react-query";

import { supabase } from "@src/sdks/supabase";

export const useJournalQueries = (journalIds: string[] = []) => {
  return useQueries({
    queries: journalIds.map((id) => {
      return {
        queryKey: ["journal", id],
        queryFn: () =>
          supabase
            .from("pages")
            .select("data")
            .eq("id", id)
            .single()
            .then((result) => result.data.data),
      };
    }),
  });
};
