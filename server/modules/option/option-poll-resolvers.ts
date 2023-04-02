import { Context } from '../../Context'
import { OptionDB } from '../../models/option/types'
import { PollDB } from '../../models/poll/types'

import { OptionProvider } from './provider'

interface IOptionPollResolvers {
  options: (parent: PollDB, args: unknown, context: Context) => Promise<OptionDB[]>
}

export const OptionPollResolvers: IOptionPollResolvers = {
  options: async (parent, _args, context) => {
    const provider = context.injector.get(OptionProvider)
    return await provider.findOptionsByPollId(parent.id)
  }
}
