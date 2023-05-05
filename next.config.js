// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      'i.ytimg.com',
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') || '',
    ],
  },
  redirects: async () => [],
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/index/82649fda5ba84801a464d7ef2f7552b3',
      },
    ];
  },
};

module.exports = nextConfig;
