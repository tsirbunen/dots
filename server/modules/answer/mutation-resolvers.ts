import { Context } from '../../Context'
import { VoteInputType, VoteType } from '../../types/types'
import { AnswerProvider } from './provider'

interface AnswerMutationResolversType {
  giveAVoteToAnswer: (_parent: unknown, args: { input: VoteInputType }, _context: Context) => Promise<VoteType>
}

export const AnswerMutationResolvers: AnswerMutationResolversType = {
  giveAVoteToAnswer: async (_parent, { input }, context) => {
    const provider = context.injector.get(AnswerProvider)
    const vote = await provider.giveAVoteToAnswer(input)
    return vote as VoteType
  }
}
