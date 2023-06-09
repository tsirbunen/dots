import { Context } from '../../Context'
import { VoteDB, VoteDBMinimal } from '../../models/vote/types'
import { MessageProvider } from '../message/provider'
import { OptionProvider } from './provider'

interface IOptionMutationResolvers {
  giveAVoteToOption: (_parent: unknown, args: { input: VoteDBMinimal }, _context: Context) => Promise<VoteDB>
}

export const OptionMutationResolvers: IOptionMutationResolvers = {
  giveAVoteToOption: async (_parent, { input }, context) => {
    const provider = context.injector.get(OptionProvider)
    const insertedNewVote = await provider.giveAVoteToOption(input)

    if (insertedNewVote) {
      await context.injector.get(MessageProvider).publishMessage({
        type: 'VOTE_ADDED',
        voteId: insertedNewVote.id,
        voterId: input.voterId,
        pollId: input.pollId,
        optionId: input.optionId,
        voterName: input.name ?? undefined
      })
    }

    return insertedNewVote
  }
}
