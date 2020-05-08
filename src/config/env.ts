const parseGitBranch = () => {
  const ref = process.env.GITHUB_REF

  if (!ref) {
    return 'local' // local
  }

  const sliced = ref.split('/')
  return sliced[sliced.length - 1]
}

const parseGitSha = () => {
  const sha = process.env.GITHUB_SHA
  if (!sha) {
    return '*******' // local
  }

  return sha.slice(0, 7)
}

const env = {
  gitSha: parseGitSha(),
  gitBranch: parseGitBranch(),
}

console.log(`Running on sha: ${env.gitSha}. branch: ${env.gitBranch}`)

export default env
