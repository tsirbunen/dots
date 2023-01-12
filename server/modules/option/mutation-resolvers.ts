import { Context } from '../../Context'
import { VoteDB, VoteDBMinimal } from '../../models/vote/types'
import { OptionProvider } from './provider'

interface IOptionMutationResolvers {
  giveAVoteToOption: (_parent: unknown, args: { input: VoteDBMinimal }, _context: Context) => Promise<VoteDB>
}

export const OptionMutationResolvers: IOptionMutationResolvers = {
  giveAVoteToOption: async (_parent, { input }, context) => {
    const provider = context.injector.get(OptionProvider)
    return await provider.giveAVoteToOption(input)
  }
}
