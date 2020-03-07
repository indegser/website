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

const getBooks = query => {
  return request(BASE_URL + '/api/book', query)
}

const sejongApi = {
  getHistories,
  createHistory,
  getBooks,
}

export default sejongApi
