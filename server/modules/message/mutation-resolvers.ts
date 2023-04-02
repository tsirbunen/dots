import { Context } from '../../Context'
import { Message, MessageProvider, PublishMessageInput } from './provider'

interface IMessageMutationResolvers {
  publishMessage: (_parent: unknown, args: { input: PublishMessageInput }, _context: Context) => Promise<Message>
}

export const MessageMutationResolvers: IMessageMutationResolvers = {
  publishMessage: async (_parent, { input }, context) => {
    const provider = context.injector.get(MessageProvider)
    return await provider.publishMessage(input)
  }
}
