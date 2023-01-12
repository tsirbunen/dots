import { CreatePollInput, PollState, DataClass } from '../../types/graphql-schema-types.generated'
import { OptionDBWithVotesDB, OptionEditData } from '../option/types'
import { PersonDB } from '../person/types'

export type CreatePollFullInput = CreatePollInput & { id: string; code: string; state: PollState }
export type PollFull = PollDB & {
  owner: PersonDB
  options: OptionDBWithVotesDB[]
  token?: string
}
export interface PollDB {
  id: string
  code: string
  ownerId: string
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
export interface EditPollInputType {
  pollId: string
  question?: string
  options?: OptionEditData[]
  dataClass?: DataClass
  isAnonymous?: boolean
  totalVotesCountMax?: number
  optionVotesCountMax?: number
  showStatusWhenVoting?: boolean
}

export type OptionInEditing = PollDB & { content: string; dataClass: DataClass }
