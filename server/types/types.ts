import {
  OPTION_COUNT_MIN,
  OPTION_COUNT_MAX,
  TOTAL_VOTES_COUNT_MIN,
  TOTAL_VOTES_COUNT_MAX,
  OPTION_VOTES_COUNT_MIN,
  OPTION_VOTES_COUNT_MAX
} from '../utils/constant-values'

export interface VoteType {
  id: string
  answerId: string
  voterId: string
  name?: string
  deletedAt?: Date | null
  createdAt?: Date
  updatedAt?: Date
}

export interface VoteInputType {
  answerId: string
  voterId: string
  name?: string
}

export type CreatePollDatabaseInputType = CreatePollInputType & { id: string; code: string; state: PollState }

export enum DataClassType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE'
}
export interface FindPollInputType {
  id?: string
  code?: string
}
export interface AnswerType {
  id: string
  pollId: string
  content: string
  dataClass: DataClassType
  votes?: VoteType[]
  deletedAt?: Date | null
  createdAt?: Date
  updatedAt?: Date
}
export interface CreatePollInputType {
  ownerId: string
  ownerName: string
  question: string
  answers: string[]
  dataClass: DataClassType
  isAnonymous: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
  showStatusWhenVoting: boolean
}
export interface AnswerEditDataType {
  answerId?: string
  content: string
}
export interface EditPollInputType {
  pollId: string
  question?: string
  answers?: AnswerEditDataType[]
  dataClass?: DataClassType
  isAnonymous?: boolean
  totalVotesCountMax?: number
  optionVotesCountMax?: number
  showStatusWhenVoting?: boolean
}

export interface PollType {
  id: string
  ownerId: string
  code: string
  question: string
  isAnonymous: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
  showStatusWhenVoting: boolean
  state: PollState
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export type PollFullDataType = Omit<PollType, 'ownerId'> & { owner: OwnerType; answers: AnswerType[]; token?: string }

export enum PollValidationFieldEnum {
  ANSWERS_COUNT = 'ANSWERS_COUNT',
  TOTAL_VOTES_COUNT = 'TOTAL_VOTES_COUNT',
  OPTION_VOTES_COUNT = 'OPTION_VOTES_COUNT'
}

export interface PollInputFieldValidationDataType {
  min: number
  max: number
  title: string
  key: string
}

export const POLL_INPUT_FIELDS_VALIDATION_DATA: Record<PollValidationFieldEnum, PollInputFieldValidationDataType> = {
  ANSWERS_COUNT: { min: OPTION_COUNT_MIN, max: OPTION_COUNT_MAX, title: 'Answer options count', key: 'answers' },
  TOTAL_VOTES_COUNT: {
    min: TOTAL_VOTES_COUNT_MIN,
    max: TOTAL_VOTES_COUNT_MAX,
    title: 'Total votes count',
    key: 'totalVotesCountMax'
  },
  OPTION_VOTES_COUNT: {
    min: OPTION_VOTES_COUNT_MIN,
    max: OPTION_VOTES_COUNT_MAX,
    title: 'Option votes count',
    key: 'optionVotesCountMax'
  }
}

export type keyOfCreatePollInputType = keyof CreatePollInputType

export enum PollState {
  EDIT = 'EDIT',
  VOTE = 'VOTE',
  CLOSED = 'CLOSED'
}

export interface OwnerType {
  id: string
  name: string
  deletedAt?: Date | null
  createdAt?: Date
  updatedAt?: Date
}

export interface TokenDetails {
  pollIds: string[]
  ownerId: string
}

export interface Token {
  exp: number
  data: TokenDetails
  iat: number
}
