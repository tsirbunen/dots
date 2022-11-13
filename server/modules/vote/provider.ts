import { Injectable } from 'graphql-modules'
import { Vote } from '../../models/vote-model'
import { VoteType } from '../../types/types'

@Injectable()
export class VoteProvider {
  async findVotesByAnswerId(answerId: string): Promise<VoteType[]> {
    return await Vote.findVotesByAnswerId(answerId)
  }
}
