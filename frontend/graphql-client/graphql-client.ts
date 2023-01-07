import { ApolloClient, InMemoryCache } from '@apollo/client'

const server = 'localhost'

const API_URI = `http://${server}:3001/graphql`

export const graphqlClient = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache()
})
