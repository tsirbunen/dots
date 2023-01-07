import { Context } from '../../Context'
import { VoteInputType, VoteType } from '../../types/types'
import { OptionProvider } from './provider'

interface OptionMutationResolversType {
  giveAVoteToOption: (_parent: unknown, args: { input: VoteInputType }, _context: Context) => Promise<VoteType>
}

export const OptionMutationResolvers: OptionMutationResolversType = {
  giveAVoteToOption: async (_parent, { input }, context) => {
    const provider = context.injector.get(OptionProvider)
    return await provider.giveAVoteToOption(input)
  }
}
