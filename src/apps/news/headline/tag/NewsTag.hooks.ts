import { supabase } from "@src/apis/supabase";
import { useNewsQuery } from "@src/queries/useNewsQuery";
import { useTagsQuery } from "@src/queries/useTagsQuery";
import { NewsType, TagType } from "@src/types/news.types";

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
