import axios from 'axios'
import env from 'config/env'
import request from 'graphql-request'

const urls = {
  develop: 'https://sejong-edge.now.sh',
  master: 'https://sejong.indegser.com',
}

const BASE_URL = urls[env.gitBranch] || urls.develop

const getHistories = query => {
  return request(BASE_URL + '/api/history', query)
}

const createHistory = (query, variables) => {
  return request(BASE_URL + '/api/history', query, variables)
}

const getBooks = async () => {
  const { data } = await axios.get(BASE_URL + '/api/book')
  return data
}

const sejongApi = {
  getHistories,
  createHistory,
  getBooks,
}

export default sejongApi
