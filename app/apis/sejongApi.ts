import env from 'config/env'
import request from 'graphql-request'

const urls = {
  develop: 'https://sejong-edge.now.sh',
  master: 'https://sejong.indegser.com',
  local: 'http://localhost:3001',
}

const BASE_URL = urls[env.gitBranch] || urls.local

const getHistories = query => {
  return request(BASE_URL + '/api/history', query)
}

interface CreateHistoryInput {
  link: string
  comment?: string
}

const createHistory = (input: CreateHistoryInput) => {
  return request(
    BASE_URL + '/api/history',
    `
  mutation($input: CreateHistoryInput) {
    createHistory(input: $input) {
      id
    }
  }
`,
    { input }
  )
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
