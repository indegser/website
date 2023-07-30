/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string;
    NEXT_PUBLIC_MEASUREMENT_ID: string;
    NOTION_KEY: string;
    EDGE_CONFIG: string;
  }
}
