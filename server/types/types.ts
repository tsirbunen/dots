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
  optionId: string
  voterId: string
  name?: string | null
  deletedAt?: Date | null
  createdAt?: Date
  updatedAt?: Date
}

export interface VoteInputType {
  optionId: string
  voterId: string
  name?: string | null
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
export interface OptionType {
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
  ownerName: string | null
  question: string
  options: string[]
  dataClass: DataClassType
  isAnonymous: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
  showStatusWhenVoting: boolean
}
export interface OptionEditDataType {
  optionId?: string
  content: string
}
export interface EditPollInputType {
  pollId: string
  question?: string
  options?: OptionEditDataType[]
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

export type PollFullDataType = Omit<PollType, 'ownerId'> & { owner: PersonType; options: OptionType[]; token?: string }

export enum PollValidationFieldEnum {
  OPTIONS_COUNT = 'OPTIONS_COUNT',
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
  OPTIONS_COUNT: { min: OPTION_COUNT_MIN, max: OPTION_COUNT_MAX, title: 'Options count', key: 'options' },
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

export type keyOfCreateOrEditPollInputType = 'totalVotesCountMax' | 'optionVotesCountMax' | 'options'

export enum PollState {
  EDIT = 'EDIT',
  VOTE = 'VOTE',
  CLOSED = 'CLOSED'
}

export interface PersonType {
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
