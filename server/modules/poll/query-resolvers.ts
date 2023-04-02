import { Context } from '../../Context'
import { Poll as PollSchema } from '../../types/graphql-schema-types.generated'
import { PollProvider } from './provider'

interface IPollQueryResolvers {
  findPoll: (_parent: unknown, args: { code: string }, _context: Context) => Promise<Partial<PollSchema>>
  getPollCountInDatabase: (_parent: unknown, _args: unknown, _context: Context) => Promise<number>
  findPollsByCode: (_parent: unknown, args: { codes: string[] }, _context: Context) => Promise<PollSchema[]>
}

export const PollQueryResolvers: IPollQueryResolvers = {
  findPoll: async (_parent, { code }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.findPollByCode(code, context)
  },

  getPollCountInDatabase: async (_parent, _args, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.getPollCountInDatabase()
  },

  findPollsByCode: async (_parent, { codes }, context) => {
    const provider = context.injector.get(PollProvider)
    return await provider.findPollsByCode(codes, context)
  }
}
