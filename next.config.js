require('dotenv').config()

exports.default = {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
