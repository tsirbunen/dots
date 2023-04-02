import { Context } from '../../Context'
import { OptionDB } from '../../models/option/types'
import { Vote as VoteSchema } from '../../types/graphql-schema-types.generated'
import { getAuthenticatedPerson, getPersonIdFromContext } from '../../utils/get-authenticated-person'
import { VoteProvider } from './provider'

interface IVoteOptionResolvers {
  votes: (_parent: OptionDB, args: unknown, _context: Context) => Promise<VoteSchema[]>
}

export const VoteOptionResolvers: IVoteOptionResolvers = {
  votes: async (parent, _args, context) => {
    const provider = context.injector.get(VoteProvider)
    let personId = getAuthenticatedPerson(context)
    if (!personId) {
      personId = getPersonIdFromContext(context)
    }
    return await provider.findVotesByOptionId(parent.id, personId)
  }
}
