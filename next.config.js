require('dotenv').config()
const path = require('path')

const {
  NOW_GITHUB_COMMIT_REF: GITHUB_REF,
  NOW_GITHUB_COMMIT_SHA: GITHUB_SHA,
  SEJONG_URL,
} = process.env

module.exports = {
  env: {
    GITHUB_REF,
    GITHUB_SHA,
    SEJONG_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.resolve.modules.push(path.resolve(__dirname, 'src'))

    return config
  },
}
