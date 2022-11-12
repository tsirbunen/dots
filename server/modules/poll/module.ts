import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'
import { PollMutationResolvers } from './mutation-resolvers'
import { PollQueryResolvers } from './query-resolvers'

const moduleName = 'Poll'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const PollModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Mutation: PollMutationResolvers,
    Query: PollQueryResolvers
  }
})
