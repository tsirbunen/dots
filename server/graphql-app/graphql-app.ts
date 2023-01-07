import { Application, createApplication } from 'graphql-modules'
import { QueryModule } from '../modules/query/module'
import { MutationModule } from '../modules/mutation/module'
import { PollModule } from '../modules/poll/module'
import { PingModule } from '../modules/ping/module'
import { CustomScalarsModule } from '../modules/custom-scalars/module'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { OptionModule } from '../modules/option/module'
import { VoteModule } from '../modules/vote/module'
import { pollInputValidation } from '../modules/directives/poll-validation'
import { PersonModule } from '../modules/person/module'
import { isPollOwner } from '../modules/directives/is-poll-owner'

export const createGraphQLApp = (): Application => {
  return createApplication({
    modules: [
      QueryModule,
      MutationModule,
      PingModule,
      OptionModule,
      PollModule,
      VoteModule,
      PersonModule,
      CustomScalarsModule
    ],
    schemaBuilder: ({ typeDefs, resolvers }) => {
      let schema = makeExecutableSchema({ typeDefs, resolvers })
      const customDirectives = [
        {
          name: 'pollInputValidation',
          directive: pollInputValidation
        },
        {
          name: 'isPollOwner',
          directive: isPollOwner
        }
      ]
      for (const customDirective of customDirectives) {
        schema = customDirective.directive(schema, customDirective.name)
      }
      return schema
    }
  })
}
