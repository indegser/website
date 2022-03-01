import { newsApi } from "apis/newsApi";
import { NewsType } from "types/news.types";
import {
  buildUseNewsQueryKey,
  useNewsQuery,
  useNewsQueryKey,
} from "queries/useNewsQuery";
import { Descendant } from "slate";
import { mutate } from "swr";
import debounce from "lodash-es/debounce";
import { extraApi } from "apis/extra";
import { captureException } from "@sentry/nextjs";
import { useRouter } from "next/router";

export const useNewsContent = () => {
  const key = useNewsQueryKey();
  const router = useRouter();
  const { data: news } = useNewsQuery();

  const autoSaveNewsContent = async (nextContent: Descendant[]) => {
    const nextNews: NewsType = {
      title: "Hello World!!",
      ...news,
      content: JSON.stringify(nextContent),
    };

    if (!nextNews.id) {
      // const result = await newsApi.createNews(nextNews);
      // mutate(buildUseNewsQueryKey(result.id), nextNews, false);
      // router.replace(`/newsroom/${result.id}`, null, { shallow: true });
      return;
    }

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
