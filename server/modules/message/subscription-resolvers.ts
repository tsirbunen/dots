import { Context } from '../../Context'
import { withFilter } from 'graphql-subscriptions'
import { MessageProvider, MessageType } from './provider'

interface ISubscriptionResolvers {
  messageAdded: {
    subscribe: (_parent: unknown, args: { pollId: string }, _context: Context) => AsyncIterator<unknown, any, undefined>
  }
  greetings: {
    subscribe: (_parent: unknown, _args: unknown, _context: Context) => AsyncIterator<unknown, any, undefined>
  }
}

export const SubscriptionResolvers: ISubscriptionResolvers = {
  messageAdded: {
    subscribe: withFilter(
      (_parent, _args, context) => context.injector.get(MessageProvider).asyncIterator([MessageType.VOTE_ADDED]),
      (payload, variables) => {
        return payload.messageAdded.pollId === variables.pollId
      }
    )
  },
  greetings: {
    subscribe: async function* sayHiIn5Languages() {
      for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
        yield { greetings: hi }
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  }
}
