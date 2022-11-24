import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { CreatePollInputType, EditPollInputType } from '../../types/types'

import {
  verifyTotalAndOptionMaximaBothPresentIfOnePresent,
  verifyNumbersAndCountsInRequiredRangesIfPresent,
  verifyDataClassSpecifiedIfAnswersGiven,
  verifyAnswerOptionsAreUniqueIfPresent,
  verifyAllAnswerContentsAreOfSpecifiedDataClassIfPresent,
  verifyInputContainsAtLeastSomeFieldForEditing
} from '../../utils/validation-functions'

export function pollInputValidation(originalSchema: GraphQLSchema, directiveName: string): GraphQLSchema {
  return mapSchema(originalSchema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const pollInputValidationDirective = getDirective(originalSchema, fieldConfig, directiveName)?.[0]

      if (pollInputValidationDirective != null) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = function (source, args, context, info) {
          if (args.input) {
            const pollInput = args.input as CreatePollInputType | EditPollInputType
            verifyTotalAndOptionMaximaBothPresentIfOnePresent(pollInput)
            verifyNumbersAndCountsInRequiredRangesIfPresent(pollInput)
            verifyDataClassSpecifiedIfAnswersGiven(pollInput)
            verifyAnswerOptionsAreUniqueIfPresent(pollInput)
            verifyAllAnswerContentsAreOfSpecifiedDataClassIfPresent(pollInput)
            verifyInputContainsAtLeastSomeFieldForEditing(pollInput)
          }

          return resolve(source, args, context, info)
        }
      }
      return fieldConfig
    }
  })
}
