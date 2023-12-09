/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
  images: {
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') || '',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
