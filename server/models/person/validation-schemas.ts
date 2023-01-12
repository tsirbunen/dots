import { ID, DATE, nullable, getValidationErrorMessages, ModelClass } from '../../utils/common-json-schemas'

export const insertPersonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: ID,
    name: nullable({ type: 'string' }),
    createdAt: DATE,
    updatedAt: DATE,
    deletedAt: nullable(DATE)
  },
  errorMessage: {
    properties: getValidationErrorMessages(ModelClass.PERSON)
  }
}
