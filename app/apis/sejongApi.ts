import env from 'config/env'
import Axios from 'axios'
import compress from 'graphql-query-compress'
import { tokenStoreApi } from 'stores/tokenStore'

const urls = {
  develop: 'https://sejong-edge.now.sh',
  master: 'https://sejong.indegser.com',
  // local: 'http://localhost:3001',
}

const BASE_URL = urls[env.gitBranch] || urls.develop

const request = async (endpoint, query: string, variables?: object) => {
  const headers: { authorization?: string } = {}
  const token = tokenStoreApi.getState().token

  if (token) {
    headers.authorization = token
  }

  const isMutation = query.includes('mutation')

  let request
  if (isMutation) {
    request = Axios.post(
      endpoint,
      {
        query,
        variables,
      },
      {
        headers,
      }
    )
  } else {
    const url = new URL(endpoint)

    let minified = query
    try {
      minified = compress(query)
    } catch (err) {}
    url.searchParams.append('query', minified)

    if (variables) {
      url.searchParams.append('variables', JSON.stringify(variables))
    }
    request = Axios.get(url.href)
  }

  const { data, error } = await request
  return data?.data
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

const book = (query: string, variables?: object) => {
  return request(BASE_URL + '/api/book', query, variables)
}

const choseh = (query: string, variables?: object) => {
  return request(BASE_URL + '/api/choseh', query, variables)
}

const story = (query: string, variables?: object) => {
  return request(BASE_URL + '/api/story', query, variables)
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
  story,
  markdown,
  getBooks,
}

export default sejongApi
