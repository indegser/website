import { newsApi } from "apis/newsApi";
import dayjs from "dayjs";
import { useNewsQuery, useNewsQueryKey } from "queries/useNewsQuery";
import { ChangeEventHandler, useMemo } from "react";
import { mutate } from "swr";
import { NewsType } from "types/news.types";

export const useNewsDate = () => {
  const { data: news } = useNewsQuery();
  const newsQueryKey = useNewsQueryKey();

  const displayDate = useMemo(() => {
    return dayjs(news.published_at).locale("en").format("MMMM D, YYYY");
  }, [news.published_at]);

  const inputValue = useMemo(() => {
    return dayjs(news.published_at).format("YYYY-MM-DDThh:mm");
  }, [news.published_at]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const nextPublishedAt = dayjs(event.target.value).format();
    const nextNews: NewsType = { ...news, published_at: nextPublishedAt };
    mutate(newsQueryKey, nextNews, false);

    await newsApi.updateNewsById(nextNews);
  };

  return {
    inputValue,
    displayDate,
    handleChange,
  };
};
