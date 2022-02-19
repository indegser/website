import { environment } from "./env.types";

export const STORY_DEFAULT_PAGE_SIZE = 20;

export const ORIGIN =
  environment === "production"
    ? "https://www.indegser.pro"
    : `https://${process.env.VERCEL_URL}` ?? "";
