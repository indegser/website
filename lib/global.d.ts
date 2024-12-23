/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  interface ProcessEnv {
    VERCEL_ENV: string;
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string;
    NEXT_PUBLIC_MEASUREMENT_ID: string;
    NEXT_PUBLIC_AMPLITUDE_KEY: string;
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
    EDGE_CONFIG: string;
    SANITY_TOKEN: string;
  }
}
