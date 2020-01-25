const getMode = branch => {
  if (!branch) return 'LOCAL'
  switch (branch) {
    case 'master':
      return 'PROD'
    default:
      return 'STAGE'
  }
}

const MODE = getMode(process.env.NOW_GITHUB_COMMIT_REF)

module.exports = {
  env: {
    MODE,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
