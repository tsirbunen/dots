import { Context } from '../../Context'
import { CreatePollInputType, EditPollInputType, PollFullDataType, PollType } from '../../types/types'
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
}

export const PollMutationResolvers: PollMutationResolversType = {
  createPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    const createdPoll = await provider.createPoll(input)
    // TODO: Fetch all owner polls here!!!
    const token = createJWT({ pollIds: [createdPoll.id], ownerId: createdPoll.ownerId })
    return { ...createdPoll, token }
  },
  editPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.editPoll(input)
  },
  openPoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.openPoll(pollId)
  }
}
