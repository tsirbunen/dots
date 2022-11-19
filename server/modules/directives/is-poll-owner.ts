import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { TokenDetails } from '../../types/types'
import { getNotAuthenticatedToPerformThisActionErrorMessage } from '../../utils/error-messages'

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
              const ownerPollIds = (authenticationData as TokenDetails).pollIds
              if (ownerPollIds.includes(pollId)) {
                return resolve(source, args, context, info)
              }
            }
          }
          throw new Error(getNotAuthenticatedToPerformThisActionErrorMessage())
        }
      }
      return fieldConfig
    }
  })
}
