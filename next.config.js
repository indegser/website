require('dotenv').config()
const path = require('path')

const {
  NOW_GITHUB_COMMIT_REF: COMMIT_BRANCH,
  NOW_GITHUB_COMMIT_SHA: COMMIT_SHA,
} = process.env

module.exports = {
  env: {
    COMMIT_BRANCH,
    COMMIT_SHA,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.resolve.modules.push(path.resolve(__dirname, 'app'))

    return config
  },
}
