import { Context } from '../../Context'
import { handleThrowErrorIfHasErrorMessage } from '../../tests/utils/helpers'
import { CreatePollInputType, EditPollInputType, PollType } from '../../types/types'
import { createJWT } from '../../utils/token-handling'

import { PollProvider } from './provider'

interface PollMutationResolversType {
  createPoll: (
    _parent: unknown,
    args: { input: CreatePollInputType },
    _context: Context
  ) => Promise<PollType & { token: string }>
  editPoll: (_parent: unknown, args: { input: EditPollInputType }, _context: Context) => Promise<PollType>
  openPoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<boolean>
  closePoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<boolean>
  deletePoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<boolean>
}

export const PollMutationResolvers: PollMutationResolversType = {
  createPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    const createdPoll = await provider.createPoll(input)
    const allPollsByOwner = await provider.findAllPollsForOneOwner(createdPoll.ownerId)
    const token = createJWT({ pollIds: allPollsByOwner.map((poll) => poll.id), ownerId: createdPoll.ownerId })
    return { ...createdPoll, token }
  },
  editPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    const pollOrError = await provider.editPoll(input)
    handleThrowErrorIfHasErrorMessage(pollOrError)
    return pollOrError as PollType
  },
  openPoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.openPoll(pollId)
  },
  closePoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.closePoll(pollId)
  },
  deletePoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.deletePoll(pollId)
  }
}
