import { environment } from "./env.types";

export const STORY_DEFAULT_PAGE_SIZE = 20;

export const ORIGIN =
  environment === "production"
    ? "https://www.indegser.pro"
    : `https://${process.env.VERCEL_URL}` ?? "http://localhost:3000";

export const GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "";

export const NOTION_CLIENT_ID = "174fb0a5-b38c-46fc-aaed-d9a94d86902e";
export const NOTION_REDIRECT_URI = `${ORIGIN}/api/notion/callback`;
