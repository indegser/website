import fetch from 'node-fetch'
import env from 'config/env'
import { IChoseh } from 'types/dataTypes'

const BASE_URL =
  env.gitBranch === 'local' ? 'http://localhost:3001' : 'https://choseh.now.sh'

const chosehApi = {
  getChoseh: async (id: string) => {
    const resp = await fetch(BASE_URL + `/api/${id}`)
    const json: IChoseh = await resp.json()

    return json
  },
  writeChoseh: async (body) => {
    const resp = await fetch(BASE_URL + '/api', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    return
  },
}

export default chosehApi
