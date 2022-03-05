import { NewsType } from "../types/news.types";
import { supabase } from "./supabase";

const revalidateNews = (newsId: NewsType["id"]) => {
  const currentUser = supabase.auth.user();
  const secret = currentUser?.email;

  return fetch(`/api/revalidate?newsId=${newsId}&secret=${secret}`);
};

export const extraApi = {
  revalidateNews,
};
