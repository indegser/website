import { environment } from "./env.types";

export const STORY_DEFAULT_PAGE_SIZE = 20;

export const ORIGIN =
  environment === "production"
    ? "https://www.indegser.com"
    : environment === "preview"
    ? "https://edge.indegser.com"
    : "http://localhost:3000";

export const GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "";
