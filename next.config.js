/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'i.ytimg.com',
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') || '',
    ],
  },
};

module.exports = nextConfig;
