import { Context } from '../../Context'
import { Poll } from '../../models/poll-model'
import { AnswerType } from '../../types/types'

import { AnswerProvider } from './provider'

interface AnswerPollResolversType {
  answers: (parent: Poll, args: unknown, context: Context) => Promise<AnswerType[]>
}

export const AnswerPollResolvers: AnswerPollResolversType = {
  answers: async (parent, _args, context) => {
    const provider = context.injector.get(AnswerProvider)
    return await provider.findAnswersByPollId(parent.id)
  }
}
