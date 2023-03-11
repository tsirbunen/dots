import { Injectable } from 'graphql-modules'
import { VoteDB } from '../../models/vote/types'
import { Vote } from '../../models/vote/vote-model'
import { Vote as VoteSchema } from '../../types/graphql-schema-types.generated'
import { removeFields } from '../../utils/remove-fields'

@Injectable()
export class VoteProvider {
  async findVotesByOptionId(optionId: string, personId?: string): Promise<VoteSchema[]> {
    const votes = await Vote.findVotesByOptionId(optionId)
    console.log(personId)
    const votesWithNames = this.nameVoters(votes)
    return votesWithNames.map((vote) => {
      if (!personId || vote.voterId !== personId) {
        return removeFields(vote, ['voterId'])
      }
      return vote
    })
  }

  nameVoters(votes: VoteDB[]): VoteDB[] {
    const voterIdNameMap: Record<string, string> = {}
    const voterNames = new Set<string>()
    let voterIndex = 0
    for (let i = 0; i < votes.length; i++) {
      const vote = votes[i]
      const voterId = vote.voterId
      let name = vote.name ? vote.name : voterIdNameMap[voterId]
      if (!name) {
        while (true) {
          name = `voter-${voterIndex}`
          voterIndex += 1
          if (!voterNames.has(name)) break
        }
      }
      voterNames.add(name)
      if (!voterIdNameMap[voterId]) voterIdNameMap[voterId] = name
    }

    return votes.map((vote) => {
      return { ...vote, name: voterIdNameMap[vote.voterId] }
    })
  }
}
