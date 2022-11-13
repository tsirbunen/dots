import { Model } from 'objection'
import { DataClassType, VoteType, PollFullDataType, AnswerType } from '../types/types'

import { ID, DATE, nullable } from '../utils/common-json-schemas'
import {
  getMaxVotesPerAnswerAlreadyGivenErrorMessage,
  getMaxVotesPerPollAlreadyGivenErrorMessage
} from '../utils/error-messages'

import { BaseModel } from './base_model'
import { Poll } from './poll-model'
import { Vote } from './vote-model'

export class Answer extends BaseModel {
  static get tableName(): string {
    return 'Answers'
  }

  id!: string
  pollId!: string
  content!: string
  dataClass!: DataClassType

  static get jsonSchema(): Record<string, string | object> {
    return {
      type: 'object',
      required: ['id', 'pollId', 'content', 'dataClass'],
      properties: {
        id: ID,
        pollId: ID,
        content: { type: 'string' },
        dataClass: {
          type: 'string',
          enum: Object.keys(DataClassType)
        },
        createdAt: DATE,
        updatedAt: DATE,
        deletedAt: nullable(DATE)
      }
    }
  }

  static relationMappings = {
    poll: {
      relation: Model.BelongsToOneRelation,
      modelClass: Poll,
      join: {
        from: 'Answers.pollId',
        to: 'Polls.id'
      }
    },
    votes: {
      relation: Model.HasManyRelation,
      modelClass: Vote,
      join: {
        from: 'Answers.id',
        to: 'Votes.answerId'
      }
    }
  }

  public static async giveAVoteToAnswer(input: VoteType): Promise<VoteType> {
    const existingValidAnswer = await this.findExistingAnswer(input)
    const pollWithThisVoterVotes = await this.findPollFullDataWithThisVoterVotes(
      existingValidAnswer.pollId,
      input.voterId
    )
    this.verifyVoterCanVoteThisAnswer(pollWithThisVoterVotes, input.answerId)
    return await Vote.query().insert(input).returning(['id', 'answerId', 'name'])
  }

  public static async findAnswersByPollId(pollId: string): Promise<AnswerType[]> {
    return await Answer.query().where('pollId', pollId).where('deletedAt', null).returning('*')
  }

  public static async findExistingAnswer(input: VoteType): Promise<AnswerType> {
    const existingValidAnswer = await Answer.query()
      .where('id', input.answerId)
      .where('deletedAt', null)
      .returning('id')
    if (existingValidAnswer.length === 0) {
      throw new Error(`Valid answer for id ${input.answerId} does not exist!`)
    }
    return existingValidAnswer[0]
  }

  public static async findPollFullDataWithThisVoterVotes(pollId: string, voterId: string): Promise<PollFullDataType> {
    const pollsWithThisVoterVotes = await Poll.query()
      .where('id', pollId)
      .where('deletedAt', null)
      .withGraphFetched('[answers.[votes(onlyThisVoter)]]')
      .modifiers({
        onlyThisVoter: (builder) => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          builder.where('voterId', voterId)
        }
      })
    return pollsWithThisVoterVotes[0] as unknown as PollFullDataType
  }

  public static verifyVoterCanVoteThisAnswer(pollWithThisVoterVotes: PollFullDataType, answerId: string): void {
    let voterVotesInPollTotal = 0
    let canGiveVoteToThisAnswer = true
    pollWithThisVoterVotes.answers.forEach((answer) => {
      const answerVotesByThisVoter = answer.votes?.length ?? 0
      voterVotesInPollTotal += answerVotesByThisVoter
      if (answer.id === answerId && pollWithThisVoterVotes.optionVotesCountMax === answerVotesByThisVoter) {
        console.log('answer option limit', answer.votes?.length)
        canGiveVoteToThisAnswer = false
      }
    })

    if (!canGiveVoteToThisAnswer) {
      throw new Error(getMaxVotesPerAnswerAlreadyGivenErrorMessage(pollWithThisVoterVotes.optionVotesCountMax))
    }
    if (voterVotesInPollTotal >= pollWithThisVoterVotes.totalVotesCountMax) {
      throw new Error(getMaxVotesPerPollAlreadyGivenErrorMessage(pollWithThisVoterVotes.totalVotesCountMax))
    }
  }
}
