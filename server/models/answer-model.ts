/* eslint-disable @typescript-eslint/no-floating-promises */
import { Model } from 'objection'
import { DataClassType, VoteType, PollFullDataType, AnswerType, PollState } from '../types/types'

import { ID, DATE, nullable } from '../utils/common-json-schemas'
import {
  getCannotVoteInPollIfPollNotInVoteStateErrorMessage,
  getMaxVotesPerAnswerAlreadyGivenErrorMessage,
  getMaxVotesPerPollAlreadyGivenErrorMessage,
  getValidAnswerWithThisIdDoesNotExistErrorMessage,
  getValidPollWithThisIdDoesNotExistErrorMessage
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
    const existingAnswer = await this.findAnswerById(input.answerId)
    const pollWithThisVoterVotes = await this.findPollWithThisVoterVotes(existingAnswer.pollId, input.voterId)
    if (pollWithThisVoterVotes.state !== PollState.VOTE) {
      throw new Error(getCannotVoteInPollIfPollNotInVoteStateErrorMessage())
    }
    this.verifyVoterCanVoteThisAnswer(pollWithThisVoterVotes, input.answerId)
    return await Vote.query().insert(input).returning(['id', 'answerId', 'name'])
  }

  public static async findAnswersByPollId(pollId: string): Promise<AnswerType[]> {
    return await Answer.query().where('pollId', pollId).where('deletedAt', null).returning('*')
  }

  private static async findAnswerById(answerId: string): Promise<AnswerType> {
    const existingValidAnswer = await Answer.query().where('id', answerId).where('deletedAt', null).first()
    if (!existingValidAnswer) {
      throw new Error(getValidAnswerWithThisIdDoesNotExistErrorMessage(answerId))
    }
    return existingValidAnswer
  }

  private static async findPollWithThisVoterVotes(pollId: string, voterId: string): Promise<PollFullDataType> {
    const pollsWithThisVoterVotes = await Poll.query()
      .where('id', pollId)
      .where('deletedAt', null)
      .withGraphFetched('[answers.[votes(onlyThisVoter)]]')
      .modifiers({
        onlyThisVoter: (builder) => {
          builder.where('voterId', voterId)
        }
      })
      .first()
    if (!pollsWithThisVoterVotes) {
      throw new Error(getValidPollWithThisIdDoesNotExistErrorMessage(pollId))
    }
    return pollsWithThisVoterVotes as unknown as PollFullDataType
  }

  private static verifyVoterCanVoteThisAnswer(pollWithThisVoterVotes: PollFullDataType, answerId: string): void {
    let voterVotesInPollTotal = 0
    let voterVotesForThisAnswer = 0
    pollWithThisVoterVotes.answers.forEach((answer) => {
      const answerVotes = answer.votes?.length ?? 0
      voterVotesInPollTotal += answerVotes
      if (answer.id === answerId) voterVotesForThisAnswer = answerVotes
    })

    if (voterVotesForThisAnswer >= pollWithThisVoterVotes.optionVotesCountMax) {
      throw new Error(getMaxVotesPerAnswerAlreadyGivenErrorMessage(pollWithThisVoterVotes.optionVotesCountMax))
    }
    if (voterVotesInPollTotal >= pollWithThisVoterVotes.totalVotesCountMax) {
      throw new Error(getMaxVotesPerPollAlreadyGivenErrorMessage(pollWithThisVoterVotes.totalVotesCountMax))
    }
  }
}
