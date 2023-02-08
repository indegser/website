type AppEnvType = 'production' | 'preview' | 'development';

export const environment =
  (process.env.NEXT_PUBLIC_VERCEL_ENV as AppEnvType) || 'development';

export const isProduction = environment === 'production';
export const isServer = typeof window == 'undefined';
