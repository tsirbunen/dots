import { DataClass, PollState } from '../../types/graphql-schema-types.generated'
import { ID, DATETIME, nullable, getValidationErrorMessages, ModelClass } from '../../utils/common-json-schemas'
import {
  OPTION_COUNT_MIN,
  OPTION_COUNT_MAX,
  TOTAL_VOTES_COUNT_MIN,
  TOTAL_VOTES_COUNT_MAX,
  OPTION_VOTES_COUNT_MIN,
  OPTION_VOTES_COUNT_MAX
} from '../../utils/constant-values'
import { EditPollInputType } from './types'

export const createPollSchema = {
  type: 'object',
  required: [
    'id',
    'code',
    'ownerId',
    'question',
    'options',
    'dataClass',
    'isAnonymous',
    'totalVotesCountMax',
    'optionVotesCountMax',
    'showStatusWhenVoting',
    'state'
  ],
  properties: {
    id: ID,
    code: { type: 'string' },
    ownerId: ID,
    question: { type: 'string' },
    options: {
      type: 'array',
      items: { type: 'string' },
      minItems: OPTION_COUNT_MIN,
      maxItems: OPTION_COUNT_MAX,
      uniqueItems: true
    },
    dataClass: {
      type: 'string',
      enum: Object.keys(DataClass).map((key) => key.toUpperCase())
    },
    isAnonymous: { type: 'boolean' },
    totalVotesCountMax: {
      type: 'integer',
      minimum: TOTAL_VOTES_COUNT_MIN,
      maximum: TOTAL_VOTES_COUNT_MAX
    },
    optionVotesCountMax: {
      type: 'integer',
      minimum: OPTION_VOTES_COUNT_MIN,
      maximum: OPTION_VOTES_COUNT_MAX
    },
    showStatusWhenVoting: { type: 'boolean' },
    state: {
      type: 'string',
      enum: Object.keys(PollState).map((key) => key.toUpperCase())
    },
    createdAt: DATETIME,
    updatedAt: DATETIME,
    deletedAt: nullable(DATETIME)
  },
  errorMessage: {
    properties: getValidationErrorMessages(ModelClass.POLLS)
  }
}

export const getEditPollSchema = (input: Readonly<EditPollInputType>): Record<string, string | object> => {
  const baseSchema = createPollSchema
  const properties = { ...(baseSchema.properties as Record<string, string | object>) }
  properties.options = {
    type: 'array',
    items: {
      type: 'object',
      required: ['content'],
      properties: { content: { type: 'string' }, optionId: { type: 'string' } }
    }
  }
  const required = ['pollId']
  if (input.options) {
    properties.dataClass = {
      type: 'string',
      enum: Object.keys(DataClass).map((key) => key.toUpperCase())
    }
    required.push('dataClass')
  }
  if (!!input.optionVotesCountMax || !!input.totalVotesCountMax) {
    required.push('totalVotesCountMax')
    required.push('optionVotesCountMax')
  }
  return {
    ...baseSchema,
    properties: properties as Record<string, string | object>,
    anyOf: [
      { required: ['question'] },
      { required: ['options'] },
      { required: ['dataClass'] },
      { required: ['totalVotesCountMax'] },
      { required: ['optionVotesCountMax'] },
      { required: ['showStatusWhenVoting'] },
      { required: ['isAnonymous'] }
    ],
    required
  }
}
