import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const server = 'localhost'
const HTTP_URI = `http://${server}:3001/graphql`
const WS_URL = `ws://${server}:3001/ws`

const httpLink = new HttpLink({
  uri: HTTP_URI
})

// Next.js SSR causes a little problem for setting up subscriptions. See:
// https://community.apollographql.com/t/cannot-get-graphqlwslink-to-work-subscriptions-cant-resolve-fs/3444/2
const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: WS_URL
        })
      )
    : null

const splitLink =
  typeof window !== 'undefined' && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        },
        wsLink,
        httpLink
      )
    : httpLink

export const graphqlClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
