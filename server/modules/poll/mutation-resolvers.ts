import { Context } from '../../Context'
import { CreatePollInputType, PollType } from '../../types/types'

import { PollProvider } from './provider'

interface PollMutationResolversType {
  createPoll: (_parent: unknown, args: { input: CreatePollInputType }, _context: Context) => Promise<PollType>
}

export const PollMutationResolvers: PollMutationResolversType = {
  createPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.createPoll(input)
  }
}
