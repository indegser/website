import useSWR from "swr";

import { newsApi } from "@src/apis/newsApi";

export const USE_NEWSROOM_QUERY_KEY = "newsroom";

export const useNewsroomQuery = () => {
  return useSWR(USE_NEWSROOM_QUERY_KEY, () => newsApi.getAllNews());
};
