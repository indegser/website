import Axios from 'axios'
import { apiClient } from './apiLib'

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
}

export default sejongApi
