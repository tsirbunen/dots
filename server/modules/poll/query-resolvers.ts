import { Context } from '../../Context'
import { FindPollInputType, PollType } from '../../types/types'

import { PollProvider } from './provider'

interface PollQueryResolversType {
  findPoll: (
    _parent: unknown,
    args: { input: FindPollInputType },
    _context: Context
  ) => Promise<Omit<PollType, 'answers'> | null>
}

export const PollQueryResolvers: PollQueryResolversType = {
  findPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.findPollByIdOrCode(input)
  }
}
