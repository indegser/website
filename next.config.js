const moduleExports = {
  env: {
    VERCEL_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.mdx?$/,
        use: ["raw-loader"],
      }
    );

    return config;
  },
};

module.exports = moduleExports;
