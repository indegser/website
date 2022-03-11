import { newsApi } from "@src/apis/newsApi";
import { NewsType } from "@src/types/news.types";
import dayjs from "dayjs";
import { useNewsQuery, useNewsQueryKey } from "@src/queries/useNewsQuery";
import { ChangeEventHandler, useState } from "react";
import { mutate } from "swr";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";

export const useHeadlineEditor = () => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  return editor;
};

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
