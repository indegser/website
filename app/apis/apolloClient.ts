import { ApolloClient, WatchQueryFetchPolicy } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import env from 'config/env'
import { tokenStoreApi } from 'stores/tokenStore'

const urls = {
  develop: 'https://sejong-edge.azurewebsites.net',
  master: 'https://sejong.indegser.com',
  // develop: 'http://localhost:3000',
}

const BASE_URL = urls[env.gitBranch] || urls.develop

const middlewareLink = new ApolloLink((operation, forward) => {
  const { token } = tokenStoreApi.getState()
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }
  return forward(operation)
})

export const createApolloClient = (uri: string) => {
  return new ApolloClient({
    link: middlewareLink.concat(createHttpLink({ uri: BASE_URL + uri, fetch })),
    cache: new InMemoryCache(),
    ssrMode: !process.browser,
  })
}

export const defaultQueryOption = {
  fetchPolicy: 'cache-and-network' as WatchQueryFetchPolicy,
  skip: !process.browser,
}

const apolloClient = createApolloClient('/graphql')

export default apolloClient
