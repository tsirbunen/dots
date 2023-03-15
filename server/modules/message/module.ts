import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'
import { MessageProvider } from './provider'
import { MessageMutationResolvers } from './mutation-resolvers'
import { SubscriptionResolvers } from './subscription-resolvers'

const moduleName = 'MessageModule'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const MessageModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Mutation: MessageMutationResolvers,
    Subscription: SubscriptionResolvers
  },
  providers: [MessageProvider]
})
