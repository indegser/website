import axios from 'axios'

const urls = {
  'seoul-edge': 'https://sejong-edge.indegser.com',
  seoul: 'https://sejong.indegser.com',
}

const BASE_URL = urls[process.env.NOW_NAME] || urls['seoul-edge']

export const getStories = () => {
  return axios.get(BASE_URL + '/api/story')
}
export const getHistories = () => axios.get(BASE_URL + '/api/history')
