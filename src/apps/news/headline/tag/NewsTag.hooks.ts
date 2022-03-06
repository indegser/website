import { supabase } from "apis/supabase";
import { useNewsQuery } from "queries/useNewsQuery";
import { NewsType, TagType } from "types/news.types";

export const useNewsTag = () => {
  const { data: news, mutate } = useNewsQuery();

  const updateNewsTag = async (tag: TagType) => {
    mutate({ ...news, tag: tag.id }, false);

    await supabase
      .from<NewsType>("news")
      .update({ tag: tag.id })
      .match({ id: news.id });

    mutate();
  };

  return {
    updateNewsTag,
  };
};
