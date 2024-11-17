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
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  images: {
    minimumCacheTTL: 31536000,
    loaderFile: './components/image-loader.ts',
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
    ],
  },
};

module.exports = nextConfig;
