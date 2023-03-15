import { Injectable } from 'graphql-modules'
import { PubSub } from 'graphql-subscriptions'
import { v4 as uuidv4 } from 'uuid'

export enum MessageType {
  VOTE_ADDED = 'VOTE_ADDED'
}

export interface Message {
  id: string
  optionId: string
  voteId: string
}

export interface SendMessageInput {
  type: string
  pollId: string
  optionId: string
  voteId: string
}

@Injectable({ global: true })
export class MessageProvider {
  private readonly pubSub = new PubSub()
  // pubSub = new PubSub()
  // constructor(private readonly pubSub: PubSub) {}

  asyncIterator(messageTypes: MessageType[]): AsyncIterator<Message> {
    return this.pubSub.asyncIterator(messageTypes)
  }

  async sendMessage(input: SendMessageInput): Promise<Message> {
    console.log('********************** send message input', input)
    // Joku tapa ilmaista, mikä on henkilön id ilman, että sitä paljastetaan? joku hash?
    const voteMessage: Message = {
      id: uuidv4(),
      optionId: input.optionId,
      voteId: input.voteId
    }

    await this.pubSub.publish(MessageType.VOTE_ADDED, { messageAdded: voteMessage })
    return voteMessage
  }
}
