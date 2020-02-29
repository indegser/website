const env = {
  sha: process.env.COMMIT_SHA,
  branch: process.env.COMMIT_BRANCH,
}

console.log(
  `Running on sha: ${env.sha || 'local'}. branch: ${env.branch || 'local'}`
)

export default env
