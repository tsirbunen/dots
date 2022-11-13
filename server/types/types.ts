export type PollFullDataType = PollType & { answers: AnswerType[] }

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

export type CreatePollDatabaseInputType = CreatePollInputType & { id: string; code: string }

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
  question: string
  answers: string[]
  dataClass: DataClassType
  isAnonymous: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
  showStatusWhenVoting: boolean
}

export interface PollType {
  id: string
  code: string
  question: string
  answers: AnswerType[]
  isAnonymous: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
  showStatusWhenVoting: boolean
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
