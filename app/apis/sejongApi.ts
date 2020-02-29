import axios from 'axios'
import env from 'config/env'

console.log('GOT', process.env.GOT)

const urls = {
  develop: 'https://sejong-edge.now.sh',
  master: 'https://sejong.indegser.com',
}

const BASE_URL = urls[env.gitBranch] || urls.develop

const getHistories = () => axios.get(BASE_URL + '/api/history')

const createHistory = (link: string) =>
  axios.post(BASE_URL + '/api/history', { link })

const sejongApi = {
  getHistories,
  createHistory,
}

export default sejongApi
