export interface VoteDB {
  createdAt: Date
  deletedAt?: Date
  id: string
  name?: string | null
  optionId: string
  updatedAt: Date
  voterId: string
}

export type VoteDBPartial = Pick<VoteDB, 'id' | 'optionId' | 'voterId' | 'name'>
export type VoteDBMinimal = Omit<VoteDBPartial, 'id'> & { pollId: string }
