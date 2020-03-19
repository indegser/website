require('dotenv').config()
const path = require('path')

const {
  NOW_GITHUB_COMMIT_REF: GITHUB_REF,
  NOW_GITHUB_COMMIT_SHA: GITHUB_SHA,
} = process.env

console.log(GITHUB_REF, GITHUB_SHA)

module.exports = {
  env: {
    GITHUB_REF,
    GITHUB_SHA,
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
