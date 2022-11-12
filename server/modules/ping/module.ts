import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'
import { PingQueryResolvers } from './query-resolvers'

const moduleName = 'Ping'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const PingModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Query: PingQueryResolvers
  }
})
