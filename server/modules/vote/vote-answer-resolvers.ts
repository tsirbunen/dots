import { Context } from '../../Context'
import { Answer } from '../../models/answer-model'
import { VoteType } from '../../types/types'

import { VoteProvider } from './provider'

interface VoteAnswerResolversType {
  votes: (_parent: Answer, args: unknown, _context: Context) => Promise<VoteType[]>
}

export const VoteAnswerResolvers: VoteAnswerResolversType = {
  votes: async (parent, _args, context) => {
    const provider = context.injector.get(VoteProvider)
    return await provider.findVotesByAnswerId(parent.id)
  }
}
