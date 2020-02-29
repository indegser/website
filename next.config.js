require('dotenv').config()
const path = require('path')

module.exports = {
  env: {
    GITHUB_REF: process.env.GITHUB_SHA,
    GITHUB_SHA: process.env.GITHUB_REF,
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
