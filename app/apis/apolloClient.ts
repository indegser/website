import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
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

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: tokenStoreApi.getState().token || null,
    },
  })
  return forward(operation)
})

export const createApolloClient = (uri: string) => {
  return new ApolloClient({
    link: createPersistedQueryLink({ useGETForHashedQueries: true })
      .concat(middlewareLink)
      .concat(createHttpLink({ uri: BASE_URL + uri, fetch })),
    cache: new InMemoryCache(),
  })
}

export const bookApiClient = createApolloClient('/api/book')
export const historyApiClient = createApolloClient('/api/history')
export const chosehApiClient = createApolloClient('/api/choseh')
