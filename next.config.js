/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  /**
   * Env 이름을 Sanity와 Next 동일하게 쓰기 위해
   * Vercel secret에서 스튜디오 변수를 관리하고 이를
   * 클라이언트에서도 쓸 수 있도록 NEXT_PULBIC prefix 없이도 사용할 수 있도록 env를 추가 설정함.
   */
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
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
