import { supabase } from "apis/supabase";
import { useNewsQuery } from "queries/useNewsQuery";
import { useTagsQuery } from "queries/useTagsQuery";
import { NewsType, TagType } from "types/news.types";

export const useNewsTag = () => {
  const { data: news, mutate } = useNewsQuery();
  const { data: tags } = useTagsQuery();

  const tag = tags?.find((tag) => tag.id === news?.tag)?.name;

  const updateNewsTag = async (tag: TagType) => {
    mutate({ ...news, tag: tag.id }, false);

    await supabase
      .from<NewsType>("news")
      .update({ tag: tag.id })
      .match({ id: news.id });

    mutate();
  };

  return {
    tag: tag ?? "News",
    tags,
    isReady: Boolean(news) && Boolean(tags),
    updateNewsTag,
  };
};
