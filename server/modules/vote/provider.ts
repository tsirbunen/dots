import { Injectable } from 'graphql-modules'
import { Vote } from '../../models/vote/vote-model'
import { Vote as VoteSchema } from '../../types/graphql-schema-types.generated'
import { removeFields } from '../../utils/remove-fields'

@Injectable()
export class VoteProvider {
  async findVotesByOptionId(optionId: string, personId?: string): Promise<VoteSchema[]> {
    const votes = await Vote.findVotesByOptionId(optionId)
    return votes.map((vote) => {
      if (!personId || vote.voterId !== personId) {
        return removeFields(vote, ['voterId'])
      }
      return vote
    })
  }
}
