require('dotenv').config()
const path = require('path')

const { GITHUB_REF, GITHUB_SHA } = process.env

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
