// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      'cdn.sanity.io',
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') || '',
    ],
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/index/82649fda5ba84801a464d7ef2f7552b3',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
