import { apiClient } from './apiLib'
import { IStory } from 'types/dataTypes'
import env from 'config/env'

const BASE_URL =
  env.gitBranch === 'master'
    ? 'https://sejong.now.sh/api'
    : 'http://localhost:3001/api' //'https://sejong-edge.now.sh/api'

const sejongApi = {
  authenticate: ({ email, password }) => {
    return apiClient<any>(BASE_URL + '/user/authenticate', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
  createStory: (data) => {
    return apiClient(BASE_URL + '/story', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
  getStory: (slug: string) => {
    const fragment = `/story/${encodeURIComponent(slug)}`
    return apiClient<IStory>(BASE_URL + fragment)
  },
  updateStory: (data) => {
    return apiClient(BASE_URL + '/story', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
  getStories: () => {
    return apiClient<IStory[]>(BASE_URL + '/story')
  },
}

export default sejongApi
