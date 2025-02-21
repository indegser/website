type AppEnvType = 'production' | 'preview' | 'development';

export const environment =
  (process.env.VERCEL_ENV as AppEnvType) || 'development';

export const isProduction = environment === 'production';
export const isServer = typeof window == 'undefined';

export const isAppEnvProduction = () => {
  return process.env.VERCEL_ENV === 'production';
};

export const PRODUCTION_URL = 'https://www.indegser.com';

export const getURL = () => {
  if (isAppEnvProduction()) {
    return PRODUCTION_URL;
  }

  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';
};
