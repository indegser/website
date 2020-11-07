module.exports = {
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
