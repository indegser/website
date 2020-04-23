import fetch from 'node-fetch'
import produce from 'immer'
import { tokenStoreApi } from 'stores/tokenStore'

export const apiClient = async <T>(...args: Parameters<typeof fetch>) => {
  const [url, init = {}] = args

  const initWithAuth = produce(init, (draft) => {
    const { token } = tokenStoreApi.getState()
    if (draft.headers && token) {
      draft.headers['Authorization'] = `Bearer ${token}`
    }
  })
  const resp = await fetch(url, initWithAuth)
  const json: T = await resp.json()

  return json
}
