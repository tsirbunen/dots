import { Context } from '../../Context'
import { EditPollInputType } from '../../models/poll/types'
import { CreatePollInput, Poll as PollSchema } from '../../types/graphql-schema-types.generated'
import { Errors } from '../../utils/errors'
import { getAuthenticatedPerson } from '../../utils/get-authenticated-person'
import { PollProvider } from './provider'

interface IPollMutationResolvers {
  createPoll: (_parent: unknown, args: { input: CreatePollInput }, _context: Context) => Promise<PollSchema>
  editPoll: (_parent: unknown, args: { input: EditPollInputType }, _context: Context) => Promise<PollSchema>
  openPoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<PollSchema>
  closePoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<PollSchema>
  deletePoll: (_parent: unknown, args: { pollId: string }, _context: Context) => Promise<PollSchema>
}

export const PollMutationResolvers: IPollMutationResolvers = {
  createPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.createPoll(input)
  },

  editPoll: async (_parent, { input }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getAuthenticatedPerson(context)
    if (!personId) throw new Error(Errors.notAuthorized)
    return await provider.editPoll(input, personId)
  },

  openPoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getAuthenticatedPerson(context)
    if (!personId) throw new Error(Errors.notAuthorized)
    return await provider.openPoll(pollId, personId)
  },

  closePoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getAuthenticatedPerson(context)
    if (!personId) throw new Error(Errors.notAuthorized)
    return await provider.closePoll(pollId, personId)
  },

  deletePoll: async (_parent, { pollId }, context) => {
    const provider = context.injector.get(PollProvider)
    const personId = getAuthenticatedPerson(context)
    if (!personId) throw new Error(Errors.notAuthorized)
    return await provider.deletePoll(pollId, personId)
  }
}
