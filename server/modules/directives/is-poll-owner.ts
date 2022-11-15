import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import {
  CreatePollInputType,
  keyOfCreatePollInputType,
  PollValidationFieldEnum,
  POLL_INPUT_FIELDS_VALIDATION_DATA,
  TokenDetails
} from '../../types/types'

export function isPollOwner(originalSchema: GraphQLSchema, directiveName: string): GraphQLSchema {
  return mapSchema(originalSchema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isPollOwnerDirective = getDirective(originalSchema, fieldConfig, directiveName)?.[0]

      if (isPollOwnerDirective != null) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = function (source, args, context, info) {
          if (args.input !== undefined) {
            const authenticationData = context.authenticationData
            const pollId = args.pollId
            if (authenticationData !== undefined) {
              const ownerPollIds = (authenticationData as TokenDetails).pollIds
              if (ownerPollIds.includes(pollId)) {
                return resolve(source, args, context, info)
              }
            }
          }
          throw new Error('Not authenticated to perform this action!')
        }
      }
      return fieldConfig
    }
  })
}
