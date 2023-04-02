import {
  OPTION_COUNT_MAX,
  OPTION_COUNT_MIN,
  OPTION_VOTES_COUNT_MAX,
  OPTION_VOTES_COUNT_MIN,
  TOTAL_VOTES_COUNT_MAX,
  TOTAL_VOTES_COUNT_MIN
} from './constant-values'

export const nullable = (type: string | number | object): object => {
  return {
    anyOf: [
      {
        type: 'null'
      },
      type
    ]
  }
}

export const ID = {
  type: 'string',
  pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
}

export const DATE = {
  type: 'string',
  description: 'Time elapsed since January 1st, 1970, UTC, as exemplified by 1646474004529',
  pattern: '^[0-9]{1,13}$'
}

export const DATETIME = {
  type: 'object',
  isDateTime: true
}

export enum ModelClass {
  VOTES = 'VOTES',
  POLLS = 'POLLS',
  PERSON = 'PERSONS',
  OPTION = 'OPTIONS'
}

export const getValidationErrorMessages = (model: ModelClass): Record<string, string> => {
  return {
    id: `${model}: id must be of type string`,
    optionId: `${model}: optionId must be of type string`,
    voterId: `${model}: voterId must be of type string`,
    name: `${model}: name must be of type string`,
    createdAt: `${model}: createdAt must be of type date time`,
    updatedAt: `${model}: updatedAt must be of type date time`,
    deletedAt: `${model}: deletedAt must be of type date time or null`,
    code: `${model}: code must be of type string`,
    ownerId: `${model}: ownerId must be of type string`,
    question: `${model}: question must be of type string`,
    options: `${model}: options must be an array of ${OPTION_COUNT_MIN}-${OPTION_COUNT_MAX} unique strings`,
    dataClass: `${model}: dataClass must be of type dataClass`,
    isAnonymous: `${model}: isAnonymous must be of type string`,
    totalVotesCountMax: `${model}: totalVotesCountMax must be of type integer in range ${TOTAL_VOTES_COUNT_MIN}...${TOTAL_VOTES_COUNT_MAX}`,
    optionVotesCountMax: `${model}: optionVotesCountMax must be of type integer in range ${OPTION_VOTES_COUNT_MIN}...${OPTION_VOTES_COUNT_MAX}`,
    showStatusWhenVoting: `${model}: showStatusWhenVoting must be of type boolean`,
    state: `${model}: state must be of type PollState`
  }
}

export const getRequiredErrorMessage = (missingProperty: string): string => {
  return `Property ${missingProperty} is required but is missing from input`
}
