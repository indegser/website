// @ts-check

const { get } = require('@vercel/edge-config');

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
  rewrites: async () => {
    const indexes = await get('indexes');
    if (!indexes) return [];

    const { id } = indexes[0];

    return [
      {
        source: '/',
        destination: `/indexes/${id}`,
      },
    ];
  },
};

module.exports = nextConfig;
