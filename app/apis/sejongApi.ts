import Axios from 'axios'
import { apiClient } from './apiLib'
import { IStory } from 'types/dataTypes'

const markdown = async (id: string) => {
  try {
    const url = `https://choseh.s3.ap-northeast-2.amazonaws.com/${id}.md`
    const { data } = await Axios.get(url)
    return data
  } catch (err) {
    return ''
  }
}

const BASE_URL = 'http://localhost:3001/api'

const sejongApi = {
  markdown,
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
  getStories: () => {
    return apiClient<IStory[]>(BASE_URL + '/story')
  },
}

export default sejongApi
