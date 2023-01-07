import { Context } from '../../Context'
import { FindPollInputType, PollType } from '../../types/types'
import { getPersonIdIfAuthenticated } from '../../utils/get-id-of-owner-performing-query'
import { createJWT } from '../../utils/token-handling'
import { PollProvider } from './provider'

type QueriedPoll = Omit<PollType, 'options'> | null

interface PollQueryResolversType {
  findPoll: (_parent: unknown, args: { input: FindPollInputType }, _context: Context) => Promise<QueriedPoll>
  getPollCountInDatabase: (_parent: unknown, _args: unknown, _context: Context) => Promise<number>
  findPollsByCode: (_parent: unknown, args: { codes: string[] }, _context: Context) => Promise<QueriedPoll[]>
}

export const PollQueryResolvers: PollQueryResolversType = {
  findPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    const poll = await provider.findPollByIdOrCode(input)
    return poll as QueriedPoll
  },

  getPollCountInDatabase: async (_parent, _args, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.getPollCountInDatabase()
  },

  findPollsByCode: async (_parent, { codes }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getPersonIdIfAuthenticated(context)
    const polls = await provider.findPollsByCode(codes)
    if (!personId) {
      return polls
    }
    const pollsOwnedByOwner = await provider.findAllPollsOwnedByOwner(personId)
    const token = createJWT({ pollIds: pollsOwnedByOwner.map((poll) => poll.ownerId), ownerId: personId })
    const pollsOwnedByOwnerWithToken = pollsOwnedByOwner.map((poll) => {
      return { ...poll, token }
    })
    const pollsNotOwned = polls.filter((poll) => poll.ownerId !== personId)
    return [...pollsOwnedByOwnerWithToken, ...pollsNotOwned]
  }
}
