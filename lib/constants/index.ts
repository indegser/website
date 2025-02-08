type AppEnvType = 'production' | 'preview' | 'development';

export const environment =
  (process.env.VERCEL_ENV as AppEnvType) || 'development';

export const isProduction = environment === 'production';
export const isServer = typeof window == 'undefined';

export const GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? '';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export const getURL = () => {
  if (isProduction) {
    return 'https://www.indegser.com';
  }

  return (
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || 'http://localhost:3000'
  );
};

export const INDEGSER_DATABASE_ID = '82649fda5ba84801a464d7ef2f7552b3';
