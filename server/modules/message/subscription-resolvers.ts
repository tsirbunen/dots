import { Context } from '../../Context'
import { PubSub } from 'graphql-subscriptions'
import { MessageProvider, MessageType } from './provider'

// import { withFilter } from 'graphql-subscriptions'

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
    subscribe: (_parent, { pollId }, context) => {
      console.log('pollId subscribed', pollId)
      // Implement with filter so that voters see only new votes for the current
      // poll they are viewing / voting
      // return context.injector.get(MessageProvider).pubSub.asyncIterator([MessageType.VOTE_ADDED])
      return context.injector.get(MessageProvider).asyncIterator([MessageType.VOTE_ADDED])
      // return context.injector.get(PubSub).asyncIterator([MessageType.VOTE_ADDED])
    }
    // subscribe: (_parent, { pollId }, context) => {
    //   console.log('pollId subscribed', pollId)
    //   return context.injector.get(MessageProvider).asyncIterator([MessageType.VOTE_ADDED])
    // }
    // subscribe: withFilter(
    //   (_parent, { pollId }, context) => context.injector.get(MessageProvider).asyncIterator([MessageType.VOTE_ADDED]),
    //   (payload, variables) => {
    //     console.log('payload, variables', payload, variables)
    //     console.log('äöäöäöäöäöäöäöäöäöäöäöäöäöäöäö')
    //     return true
    //   }
    // )
  },
  greetings: {
    subscribe: async function* sayHiIn5Languages() {
      for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
        yield { greetings: hi }
        await new Promise((resolve) => setTimeout(resolve, 1000)) // wait 1 second
      }
    }
  }
}

// export const resolvers = {
//   Subscription: {
//     somethingChanged: {
//       subscribe: withFilter(() => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC), (payload, variables) => {
//         return payload.somethingChanged.id === variables.relevantId;
//       }),
//     },
//   },
// }
