import { Context } from '../../Context'
import { PersonDB } from '../../models/person/types'
import { PollDB } from '../../models/poll/types'
import { PersonProvider } from './provider'

interface IOwnerPollResolvers {
  owner: (parent: PollDB, args: unknown, context: Context) => Promise<PersonDB>
}

export const OwnerPollResolvers: IOwnerPollResolvers = {
  owner: async (parent, _args, context) => {
    const provider = context.injector.get(PersonProvider)

    const owner = await provider.findPersonById(parent.ownerId)

    return owner
  }
}
