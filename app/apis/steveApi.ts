import fetch from 'node-fetch'
import env from 'config/env'

const BASE_URL =
  env.gitBranch === 'master'
    ? 'https://steve-indegser.now.sh'
    : 'https://steve-edge.now.sh'

const steveApi = {
  getThoughts: async (path: string) => {
    const resp = await fetch(BASE_URL + path)
    const json = await resp.json()
    return json
  },
}

export default steveApi
