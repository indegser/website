module.exports = {
  env: {
    NOW_NAME: process.env.NOW_NAME,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
