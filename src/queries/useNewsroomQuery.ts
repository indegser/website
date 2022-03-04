import { newsApi } from "apis/newsApi";
import useSWR from "swr";

export const USE_NEWSROOM_QUERY_KEY = "newsroom";

export const useNewsroomQuery = () => {
  return useSWR(USE_NEWSROOM_QUERY_KEY, () => newsApi.getAllNews());
};
