import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'
import { OptionMutationResolvers } from './mutation-resolvers'
import { OptionProvider } from './provider'
import { OptionPollResolvers } from './option-poll-resolvers'
import { MessageProvider } from '../message/provider'

const moduleName = 'OptionModule'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const OptionModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Mutation: OptionMutationResolvers,
    Poll: OptionPollResolvers
  },
  providers: [OptionProvider]
})
