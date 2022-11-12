import { GraphQLClient } from 'graphql-request'

const TEST_HOST = 'localhost'
const TEST_SERVER_URL = `http://${TEST_HOST}:3001`
const TEST_ENDPOINT = `${TEST_SERVER_URL}/graphql`

export function getGraphQLClient() {
  return new GraphQLClient(TEST_ENDPOINT)
}
