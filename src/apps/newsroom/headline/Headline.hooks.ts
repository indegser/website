import { newsApi } from "apis/newsApi";
import { NewsType } from "types/news.types";
import dayjs from "dayjs";
import { useNewsQuery, useNewsQueryKey } from "queries/useNewsQuery";
import { ChangeEventHandler } from "react";
import { mutate } from "swr";

export const useNewsPublishedAt = () => {
  const { data } = useNewsQuery();
  const newsQueryKey = useNewsQueryKey();

  const handleDateInputChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const nextPublishedAt = dayjs(event.target.value).format();
    const nextNews: NewsType = { ...data, published_at: nextPublishedAt };
    mutate(newsQueryKey, nextNews, false);

    await newsApi.updateNewsById(nextNews);

    mutate(newsQueryKey);
  };

  return {
    handleDateInputChange,
  };
};
