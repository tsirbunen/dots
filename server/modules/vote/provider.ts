import { Injectable } from 'graphql-modules'
import { VoteDB } from '../../models/vote/types'
import { Vote } from '../../models/vote/vote-model'
import { Vote as VoteSchema } from '../../types/graphql-schema-types.generated'
import hash from 'hash-it'

@Injectable()
export class VoteProvider {
  async findVotesByOptionId(optionId: string, personId: string | undefined): Promise<VoteSchema[]> {
    const votes = await Vote.findVotesByOptionId(optionId)
    const votesWithNames = this.nameVoters(votes)
    const votesWithModifiedVoterIds = votesWithNames.map((vote) => {
      if (vote.voterId === personId) return vote
      return this.replaceVoterIdWithHash(vote)
    })

    return votesWithModifiedVoterIds
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

  replaceVoterIdWithHash(vote: VoteDB): VoteDB {
    return { ...vote, voterId: hash(vote.voterId).toString() }
  }
}
