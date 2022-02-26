import { newsApi } from "apis/newsApi";
import { NewsType } from "types/news.types";
import { useNewsQuery, useNewsQueryKey } from "queries/useNewsQuery";
import { Descendant } from "slate";
import { mutate } from "swr";
import debounce from "lodash-es/debounce";
import { extraApi } from "apis/extra";
import { captureException } from "@sentry/nextjs";

export const useNewsContent = () => {
  const key = useNewsQueryKey();
  const { data: news } = useNewsQuery();

  const autoSaveNewsContent = async (nextContent: Descendant[]) => {
    const nextNews: NewsType = {
      ...news,
      content: JSON.stringify(nextContent),
    };

    mutate(key, nextNews, false);

    try {
      await newsApi.updateNewsById(nextNews);
      await extraApi.revalidateNews(nextNews.id);
    } catch (err) {
      captureException(err);
    }

    mutate(key);
  };

  return {
    autoSaveNewsContent: debounce(autoSaveNewsContent, 1000),
  };
};
