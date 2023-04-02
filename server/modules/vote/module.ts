import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'
import { VoteProvider } from './provider'
import { VoteOptionResolvers } from './vote-option-resolvers'

const moduleName = 'VoteModule'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const VoteModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Option: VoteOptionResolvers
  },
  providers: [VoteProvider]
})
