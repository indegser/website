import { environment } from "./env.types";

export const STORY_DEFAULT_PAGE_SIZE = 20;

export const ORIGIN =
  environment === "production"
    ? "https://www.indegser.pro"
    : `https://${process.env.VERCEL_URL}` ?? "";

export const GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "";
