import useSWR from "swr";

import { supabase } from "@src/apis/supabase";

export interface TagType {
  id: string;
  name: string;
  created_at: string;
}

export const useTagsQuery = () => {
  return useSWR("tags", async () => {
    const response = await supabase
      .from<TagType>("tags")
      .select("*")
      .order("created_at", { ascending: false });
    return response.data;
  });
};
