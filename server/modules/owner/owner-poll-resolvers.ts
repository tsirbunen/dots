import { Context } from '../../Context'

import { Poll } from '../../models/poll-model'
import { OwnerType } from '../../types/types'

import { OwnerProvider } from './provider'

interface OwnerPollResolversType {
  owner: (parent: Poll, args: unknown, context: Context) => Promise<OwnerType>
}

export const OwnerPollResolvers: OwnerPollResolversType = {
  owner: async (parent, _args, context) => {
    const provider = context.injector.get(OwnerProvider)
    const owner = await provider.findOwnerById(parent.ownerId)
    return owner
  }
}
