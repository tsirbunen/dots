import { Context } from '../../Context'
import { CustomError, VoteInputType, VoteType } from '../../types/types'
import { AnswerProvider } from './provider'

interface AnswerMutationResolversType {
  giveAVoteToAnswer: (_parent: unknown, args: { input: VoteInputType }, _context: Context) => Promise<VoteType>
}

export const AnswerMutationResolvers: AnswerMutationResolversType = {
  giveAVoteToAnswer: async (_parent, { input }, context) => {
    const provider = context.injector.get(AnswerProvider)
    const voteOrError = await provider.giveAVoteToAnswer(input)
    if ((voteOrError as CustomError).errorMessage) {
      throw new Error((voteOrError as CustomError).errorMessage)
    }
    return voteOrError as VoteType
  }
}
