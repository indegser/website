import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import fetch from 'node-fetch'
import env from 'config/env'
import { tokenStoreApi } from 'stores/tokenStore'

const urls = {
  develop: 'https://sejong-edge.now.sh',
  master: 'https://sejong.indegser.com',
  // local: 'http://localhost:3001',
}

const BASE_URL = urls[env.gitBranch] || urls.develop

export const createApolloClient = (uri: string) => {
  const headers: { authorization?: string } = {}
  const token = tokenStoreApi.getState().token

  if (token) {
    headers.authorization = token
  }

  return new ApolloClient({
    link: createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
      createHttpLink({ uri: BASE_URL + uri, fetch, headers })
    ),
    cache: new InMemoryCache(),
  })
}

export const bookApiClient = createApolloClient('/api/book')
export const historyApiClient = createApolloClient('/api/history')
