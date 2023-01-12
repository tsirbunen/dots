import { ID, nullable, DATETIME, getValidationErrorMessages, ModelClass } from '../../utils/common-json-schemas'

export const insertVoteSchema = {
  type: 'object',
  required: ['id', 'optionId', 'voterId'],
  properties: {
    id: ID,
    optionId: ID,
    voterId: ID,
    name: nullable({ type: 'string' }),
    createdAt: DATETIME,
    updatedAt: DATETIME,
    deletedAt: nullable(DATETIME)
  },
  errorMessage: {
    properties: getValidationErrorMessages(ModelClass.VOTES)
  }
}
