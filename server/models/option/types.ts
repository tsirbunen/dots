import { DataClass } from '../../types/graphql-schema-types.generated'
import { VoteDB } from '../vote/types'

export interface GroupedOptions {
  toDeleteIds: string[]
  toPatch: Array<Required<OptionEditData>>
  toCreate: OptionEditData[]
}

export interface OptionDB {
  id: string
  pollId: string
  content: string
  dataClass: DataClass
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
export type OptionDBWithVotesDB = OptionDB & { votes: VoteDB[] }

export interface OptionEditData {
  optionId?: string
  content: string
}

export interface OptionVoter {
  id: string
  voterId: string
}
