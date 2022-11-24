import { Context } from '../../Context'
import { FindPollInputType, PollType } from '../../types/types'
import { getIdOfOwnerPerformingQuery } from '../../utils/get-id-of-owner-performing-query'

import { PollProvider } from './provider'

type QueriedPoll = Omit<PollType, 'answers'> | null

interface PollQueryResolversType {
  findPoll: (_parent: unknown, args: { input: FindPollInputType }, _context: Context) => Promise<QueriedPoll>
  findAllPollsForOneOwner: (_parent: unknown, _args: unknown, _context: Context) => Promise<QueriedPoll[]>
}

export const PollQueryResolvers: PollQueryResolversType = {
  findPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    const poll = await provider.findPollByIdOrCode(input)
    return poll as QueriedPoll
  },

  findAllPollsForOneOwner: async (_parent, _args, context) => {
    const ownerId = getIdOfOwnerPerformingQuery(context)
    const provider = context.injector.get(PollProvider)
    return await provider.findAllPollsForOneOwner(ownerId)
  }
}
