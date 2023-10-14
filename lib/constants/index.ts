type AppEnvType = 'production' | 'preview' | 'development';

export const environment =
  (process.env.VERCEL_ENV as AppEnvType) || 'development';

export const isProduction = environment === 'production';
export const isServer = typeof window == 'undefined';

export const CDN_ORIGIN = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const ORIGIN =
  environment === 'production'
    ? 'https://www.indegser.com'
    : environment === 'preview'
    ? 'https://edge.indegser.com'
    : 'http://localhost:3000';

export const GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? '';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};
