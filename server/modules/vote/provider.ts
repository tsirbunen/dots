import { Injectable } from 'graphql-modules'
import { Vote } from '../../models/vote-model'
import { VoteType } from '../../types/types'

@Injectable()
export class VoteProvider {
  async findVotesByOptionId(optionId: string): Promise<VoteType[]> {
    return await Vote.findVotesByOptionId(optionId)
  }
}
