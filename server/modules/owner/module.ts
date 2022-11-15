import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'

import { OwnerProvider } from './provider'
import { OwnerPollResolvers } from './owner-poll-resolvers'

const moduleName = 'OwnerModule'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const OwnerModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Poll: OwnerPollResolvers
  },
  providers: [OwnerProvider]
})
