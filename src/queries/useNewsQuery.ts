import { newsApi } from "apis/newsApi";
import { NewsType } from "types/news.types";
import { useRouter } from "next/router";
import useSWR from "swr";

export const buildUseNewsQueryKey = (newsId: NewsType["id"]) => {
  return `news/${newsId}`;
};

export const useNewsQuery = () => {
  const key = useNewsQueryKey();
  return useSWR(key, () => newsApi.getNews(key.split("/")[1]));
};

export const useNewsQueryKey = () => {
  const newsId = useRouter().query.newsId?.toString();
  return buildUseNewsQueryKey(newsId);
};
