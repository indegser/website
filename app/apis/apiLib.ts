import fetch from 'node-fetch'

export const apiClient = async <T>(...args: Parameters<typeof fetch>) => {
  const resp = await fetch(...args)
  const json: T = await resp.json()

  return json
}
