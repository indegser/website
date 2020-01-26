require('dotenv').config()

module.exports = {
  env: {
    NOW_NAME: process.env.NOW_NAME,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
