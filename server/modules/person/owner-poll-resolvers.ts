import { Context } from '../../Context'
import { Person } from '../../models/person-model'
import { Poll } from '../../models/poll-model'
import { PersonProvider } from './provider'

interface OwnerPollResolversType {
  owner: (parent: Poll, args: unknown, context: Context) => Promise<Person>
}

export const OwnerPollResolvers: OwnerPollResolversType = {
  owner: async (parent, _args, context) => {
    const provider = context.injector.get(PersonProvider)
    const owner = await provider.findPersonById(parent.ownerId)
    return owner
  }
}
