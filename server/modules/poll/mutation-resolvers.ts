import { Context } from '../../Context'
import { CreatePollInputType, EditPollInputType, PollType } from '../../types/types'
import { getPersonIdIfAuthenticated } from '../../utils/get-id-of-owner-performing-query'
import { createJWT } from '../../utils/token-handling'

import { PollProvider } from './provider'

interface PollMutationResolversType {
  createPoll: (
    _parent: unknown,
    args: { input: CreatePollInputType },
    _context: Context
  ) => Promise<PollType & { token: string }>
  editPoll: (_parent: unknown, args: { input: EditPollInputType }, _context: Context) => Promise<PollType>
  openPoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<PollType>
  closePoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<PollType>
  deletePoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<PollType>
}

export const PollMutationResolvers: PollMutationResolversType = {
  createPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    const createdPoll = await provider.createPoll(input)
    const token = await getUpdatedToken(provider, createdPoll.ownerId)
    return { ...createdPoll, token }
  },

  editPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getPersonIdIfAuthenticated(context)
    return await provider.editPoll(input, personId)
  },

  openPoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getPersonIdIfAuthenticated(context)
    return await provider.openPoll(pollId, personId)
  },

  closePoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getPersonIdIfAuthenticated(context)
    return await provider.closePoll(pollId, personId)
  },

  deletePoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getPersonIdIfAuthenticated(context)
    const deletedPoll = await provider.deletePoll(pollId, personId)
    const token = await getUpdatedToken(provider, deletedPoll.ownerId)
    return { ...deletedPoll, token }
  }
}

const getUpdatedToken = async (provider: PollProvider, ownerId: string): Promise<string> => {
  const allPollsOwnedByOwner = await provider.findAllPollsOwnedByOwner(ownerId)
  return createJWT({ pollIds: allPollsOwnedByOwner.map((poll) => poll.id), ownerId })
}
