import env from 'config/env'
import request from 'graphql-request'
import { Variables } from 'graphql-request/dist/src/types'

const urls = {
  develop: 'https://sejong-edge.now.sh',
  master: 'https://sejong.indegser.com',
  // local: 'http://localhost:3001',
}

const BASE_URL = urls[env.gitBranch] || urls.develop

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

const book = (query: string, variables?: Variables) => {
  return request(BASE_URL + '/api/book', query, variables)
}

const choseh = (query: string, variables?: Variables) => {
  return request(BASE_URL + '/api/choseh', query, variables)
}

const getBooks = query => {
  return request(BASE_URL + '/api/book', query)
}

const sejongApi = {
  getHistories,
  createHistory,
  book,
  choseh,
  getBooks,
}

export default sejongApi
