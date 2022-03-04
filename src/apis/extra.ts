import { getAuth } from "firebase/auth";
import { NewsType } from "../types/news.types";

const revalidateNews = (newsId: NewsType["id"]) => {
  const { currentUser } = getAuth();
  const secret = currentUser?.email;

  return fetch(`/api/revalidate?newsId=${newsId}&secret=${secret}`);
};

export const extraApi = {
  revalidateNews,
};
