require('dotenv').config()
const path = require('path')

const { GITHUB_REF } = process.env

console.log('can destruct?', GITHUB_REF)

module.exports = {
  env: {
    GITHUB_REF: process.env.GITHUB_REF,
    GITHUB_SHA: process.env.GITHUB_SHA,
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
