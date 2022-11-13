import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'
import { AnswerMutationResolvers } from './mutation-resolvers'
import { AnswerProvider } from './provider'
import { AnswerPollResolvers } from './answer-poll-resolvers'

const moduleName = 'AnswerModule'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const AnswerModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Mutation: AnswerMutationResolvers,
    Poll: AnswerPollResolvers
  },
  providers: [AnswerProvider]
})
