import { apiClient } from './apiLib'

const BASE_URL = `https://paris-edge.now.sh/api`

interface ParisResponse {
  info: {
    format: string
    width: number
    height: number
    channels: number
    size: number
  }
  location: string
}

const parisApi = {
  getPreviewImgUrl: (url) => {
    return apiClient<ParisResponse>(BASE_URL + '/resize', {
      method: 'POST',
      body: JSON.stringify({ image: url, width: 200 }),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
}

export default parisApi
