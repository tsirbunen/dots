import { Context } from '../../Context'

import { Poll } from '../../models/poll-model'
import { CustomError, OwnerType } from '../../types/types'

import { OwnerProvider } from './provider'

interface OwnerPollResolversType {
  owner: (parent: Poll, args: unknown, context: Context) => Promise<OwnerType | CustomError>
}

export const OwnerPollResolvers: OwnerPollResolversType = {
  owner: async (parent, _args, context) => {
    const provider = context.injector.get(OwnerProvider)
    const ownerOrError = await provider.findOwnerById(parent.ownerId)
    if ((ownerOrError as CustomError).errorMessage) {
      throw new Error((ownerOrError as CustomError).errorMessage)
    }
    return ownerOrError as OwnerType
  }
}
