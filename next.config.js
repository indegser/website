/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'i.ytimg.com',
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') || '',
    ],
  },
};

module.exports = nextConfig;
