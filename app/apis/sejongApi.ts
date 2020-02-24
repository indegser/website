import axios from 'axios'

const urls = {
  'seoul-edge': 'https://sejong-edge.now.sh',
  seoul: 'https://sejong.indegser.com',
}

const BASE_URL = urls[process.env.NOW_NAME] || 'https://sejong-edge.now.sh'

const getHistories = () => axios.get(BASE_URL + '/api/history')

const createHistory = (link: string) =>
  axios.post(BASE_URL + '/api/history', { link })

const sejongApi = {
  getHistories,
  createHistory,
}

export default sejongApi
