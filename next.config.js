// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      "cdn.sanity.io",
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("https://", "") || "",
    ],
  },
};

module.exports = nextConfig;
