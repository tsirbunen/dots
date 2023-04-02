import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { Errors } from '../../utils/errors'
import { TokenDetails } from '../../utils/token-handling'

export function isPollOwner(originalSchema: GraphQLSchema, directiveName: string): GraphQLSchema {
  return mapSchema(originalSchema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isPollOwnerDirective = getDirective(originalSchema, fieldConfig, directiveName)?.[0]

      if (isPollOwnerDirective != null) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = function (source, args, context, info) {
          if (args.input || args.pollId) {
            const authenticationData = context.authenticationData
            const pollId = args.input?.pollId ?? args.pollId

            if (authenticationData) {
              const ownerPollId = (authenticationData as TokenDetails).pollId
              if (ownerPollId === pollId) {
                return resolve(source, args, context, info)
              }
            }
          }
          throw new Error(Errors.notAuthorized)
        }
      }
      return fieldConfig
    }
  })
}
