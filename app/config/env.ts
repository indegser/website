const env = {
  gitSha: process.env.GITHUB_SHA,
  gitBranch: process.env.GITHUB_REF,
}

console.log(
  `Running on sha: ${env.gitSha || 'local'}. branch: ${env.gitBranch ||
    'local'}`
)

export default env
