import { supabase } from "apis/supabase";
import useSWR from "swr";

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
      .order("created_at");
    return response.data;
  });
};
