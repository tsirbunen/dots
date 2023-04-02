import { Injectable } from 'graphql-modules'
import { PubSub } from 'graphql-subscriptions'
import { v4 as uuidv4 } from 'uuid'
import hash from 'hash-it'

export enum MessageType {
  VOTE_ADDED = 'VOTE_ADDED'
}

export interface Message {
  id: string
  pollId: string
  optionId: string
  voteId: string
  voterId: string
  voterName: string | undefined
}

export interface PublishMessageInput {
  type: string
  pollId: string
  optionId: string
  voteId: string
  voterId: string
  voterName: string | undefined
}

@Injectable({ global: true })
export class MessageProvider {
  private readonly pubSub = new PubSub()

  asyncIterator(messageTypes: MessageType[]): AsyncIterator<Message> {
    return this.pubSub.asyncIterator(messageTypes)
  }

  async publishMessage(input: PublishMessageInput): Promise<Message> {
    const voteMessage: Message = {
      id: uuidv4(),
      pollId: input.pollId,
      optionId: input.optionId,
      voteId: input.voteId,
      voterId: hash(input.voterId).toString(),
      voterName: input.voterName ?? undefined
    }

    await this.pubSub.publish(MessageType.VOTE_ADDED, { messageAdded: voteMessage })
    return voteMessage
  }
}
