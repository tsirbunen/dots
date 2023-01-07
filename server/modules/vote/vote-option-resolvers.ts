import { Context } from '../../Context'
import { Option } from '../../models/option-model'
import { VoteType } from '../../types/types'

import { VoteProvider } from './provider'

interface VoteOptionResolversType {
  votes: (_parent: Option, args: unknown, _context: Context) => Promise<VoteType[]>
}

export const VoteOptionResolvers: VoteOptionResolversType = {
  votes: async (parent, _args, context) => {
    const provider = context.injector.get(VoteProvider)
    return await provider.findVotesByOptionId(parent.id)
  }
}
