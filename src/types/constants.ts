import { environment } from "./env";

export const STORY_DEFAULT_PAGE_SIZE = 20;

export const CDN_ORIGIN = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const ORIGIN =
  environment === "production"
    ? "https://www.indegser.com"
    : environment === "preview"
    ? "https://edge.indegser.com"
    : "http://localhost:3000";

export const CONTENT_SERVER = "https://content.indegser.com";

export const GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "";
