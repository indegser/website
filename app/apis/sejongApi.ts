import env from 'config/env'
import { GraphQLClient } from 'graphql-request'
import { Variables } from 'graphql-request/dist/src/types'
import Axios from 'axios'
import { tokenStoreApi } from 'stores/tokenStore'

const urls = {
  develop: 'https://sejong-edge.now.sh',
  master: 'https://sejong.indegser.com',
  // local: 'http://localhost:3001',
}

const BASE_URL = urls[env.gitBranch] || urls.develop

const request = (endpoint, query: string, variables?: Variables) => {
  const headers: { authorization?: string } = {}
  const token = tokenStoreApi.getState().token

  if (token) {
    headers.authorization = token
  }

  const client = new GraphQLClient(endpoint, {
    headers,
  })

  return client.request(query, variables)
}

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
    history: createHistory(input: $input) {
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

const markdown = async (id: string) => {
  try {
    const url = `https://choseh.s3.ap-northeast-2.amazonaws.com/${id}.md`
    const { data } = await Axios.get(url)
    return data
  } catch (err) {
    return ''
  }
}

const getBooks = query => {
  return request(BASE_URL + '/api/book', query)
}

const sejongApi = {
  getHistories,
  createHistory,
  book,
  choseh,
  markdown,
  getBooks,
}

export default sejongApi
