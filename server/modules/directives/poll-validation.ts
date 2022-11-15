import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import {
  CreatePollInputType,
  keyOfCreatePollInputType,
  PollValidationFieldEnum,
  POLL_INPUT_FIELDS_VALIDATION_DATA
} from '../../types/types'

import {
  getPollAnswerOptionsMustBeUniqueErrorMessage,
  getPollInputFieldValueNotInRangeErrorMessage
} from '../../utils/error-messages'

export function pollValidation(originalSchema: GraphQLSchema, directiveName: string): GraphQLSchema {
  return mapSchema(originalSchema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const pollValidationDirective = getDirective(originalSchema, fieldConfig, directiveName)?.[0]

      if (pollValidationDirective != null) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = function (source, args, context, info) {
          if (args.input !== undefined) {
            const pollInput = args.input as CreatePollInputType
            Object.values(PollValidationFieldEnum).forEach((validationField) =>
              verifyFieldValueIsInRequiredRange(pollInput, validationField)
            )
            const answersSet = new Set()
            pollInput.answers.forEach((answer) => answersSet.add(answer))
            if (pollInput.answers.length > answersSet.size) {
              throw new Error(getPollAnswerOptionsMustBeUniqueErrorMessage(pollInput.answers))
            }
          }

          return resolve(source, args, context, info)
        }
      }
      return fieldConfig
    }
  })
}

function verifyFieldValueIsInRequiredRange(input: CreatePollInputType, field: PollValidationFieldEnum): void {
  const validationData = POLL_INPUT_FIELDS_VALIDATION_DATA[field]

  const fieldValue = input[validationData.key as keyOfCreatePollInputType]
  if (fieldValue < validationData.min || fieldValue > validationData.max) {
    throw new Error(
      getPollInputFieldValueNotInRangeErrorMessage(validationData.title, validationData.min, validationData.max)
    )
  }
}
