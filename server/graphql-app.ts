import { Application, createApplication } from 'graphql-modules'
import { QueryModule } from './modules/query/module'
import { MutationModule } from './modules/mutation/module'
import { PollModule } from './modules/poll/module'
import { PingModule } from './modules/ping/module'
import { CustomScalarsModule } from './modules/custom-scalars/module'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { AnswerModule } from './modules/answer/module'
import { VoteModule } from './modules/vote/module'

export const createGraphQLApp = (): Application => {
  return createApplication({
    modules: [QueryModule, MutationModule, PingModule, AnswerModule, PollModule, VoteModule, CustomScalarsModule],
    schemaBuilder: ({ typeDefs, resolvers }) => makeExecutableSchema({ typeDefs, resolvers })
  })
}
