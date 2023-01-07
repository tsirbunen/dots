import { Context } from '../../Context'
import { Poll } from '../../models/poll-model'
import { OptionType } from '../../types/types'

import { OptionProvider } from './provider'

interface OptionPollResolversType {
  options: (parent: Poll, args: unknown, context: Context) => Promise<OptionType[]>
}

export const OptionPollResolvers: OptionPollResolversType = {
  options: async (parent, _args, context) => {
    const provider = context.injector.get(OptionProvider)
    return await provider.findOptionsByPollId(parent.id)
  }
}
