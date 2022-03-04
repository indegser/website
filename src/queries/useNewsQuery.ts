import { newsApi } from "apis/newsApi";
import { NewsType } from "types/news.types";
import { useRouter } from "next/router";
import useSWR from "swr";

export const buildUseNewsQueryKey = (newsId: NewsType["id"]) => {
  return `news/${newsId}`;
};

export const useNewsQuery = () => {
  const newsId = useNewsId();
  const key = useNewsQueryKey();
  return useSWR(key, () => newsApi.getNews(newsId));
};

const useNewsId = () => {
  const { query } = useRouter();
  return query.newsId?.toString() as string;
};

export const useNewsQueryKey = () => {
  const newsId = useNewsId();
  return buildUseNewsQueryKey(newsId);
};
