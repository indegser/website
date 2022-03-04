import { NewsType } from "../types/news.types";
import { supabase } from "./supabase";

const getAllNews = async () => {
  const response = await supabase
    .from<NewsType>("news")
    .select("*")
    .order("published_at", { ascending: false });

  return response.data;
};

const getLatestNews = async () => {
  const response = await supabase
    .from<Pick<NewsType, "id" | "published_at">>("news")
    .select("id, published_at")
    .order("published_at", { ascending: false })
    .limit(30);

  return response.data;
};

const getNews = async (newsId: NewsType["id"]) => {
  const isNew = newsId === "new";

  if (isNew) return {} as NewsType;

  const response = await supabase
    .from<NewsType>("news")
    .select("*")
    .eq("id", newsId);

  return response.data[0];
};

const createNews = async (news: Partial<NewsType>) => {
  const response = await supabase
    .from<NewsType>("news")
    .insert(news, { returning: "representation" });

  return response.data[0];
};

const updateNewsById = async (news: NewsType) => {
  const response = await supabase
    .from<NewsType>("news")
    .update(news)
    .match({ id: news.id });

  return response.data;
};

export const newsApi = {
  getNews,
  createNews,
  getAllNews,
  getLatestNews,
  updateNewsById,
};
