import { DataClass } from '../../types/graphql-schema-types.generated'
import { ID, DATE, nullable, getValidationErrorMessages, ModelClass } from '../../utils/common-json-schemas'

export const insertOptionSchema = {
  type: 'object',
  required: ['id', 'pollId', 'content', 'dataClass'],
  properties: {
    id: ID,
    pollId: ID,
    content: { type: 'string' },
    dataClass: {
      type: 'string',
      enum: Object.keys(DataClass).map((key) => key.toUpperCase())
    },
    createdAt: DATE,
    updatedAt: DATE,
    deletedAt: nullable(DATE)
  },
  errorMessage: {
    properties: getValidationErrorMessages(ModelClass.OPTION)
  }
}

export const updateOptionSchema = {
  ...insertOptionSchema,
  required: ['id', 'content']
}
