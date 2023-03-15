import { Context } from '../../Context'
import { Message, MessageProvider, SendMessageInput } from './provider'

interface IMessageMutationResolvers {
  sendMessage: (_parent: unknown, args: { input: SendMessageInput }, _context: Context) => Promise<Message>
}

export const MessageMutationResolvers: IMessageMutationResolvers = {
  sendMessage: async (_parent, { input }, context) => {
    const provider = context.injector.get(MessageProvider)
    return await provider.sendMessage(input)
  }
}
