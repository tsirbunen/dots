import { Injectable } from 'graphql-modules'
import { v4 as uuidv4 } from 'uuid'

import { Answer } from '../../models/answer-model'
import { VoteInputType, VoteType, AnswerType } from '../../types/types'

@Injectable()
export class AnswerProvider {
  async giveAVoteToAnswer(input: VoteInputType): Promise<VoteType> {
    const inputToDatabase = {
      ...input,
      id: uuidv4()
    }
    if (!input.name) {
      inputToDatabase.name = 'Anonymous'
    }
    return await Answer.giveAVoteToAnswer(inputToDatabase)
  }

  async findAnswersByPollId(pollId: string): Promise<AnswerType[]> {
    return await Answer.findAnswersByPollId(pollId)
  }
}
