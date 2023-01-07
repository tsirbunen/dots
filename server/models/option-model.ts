import { Model, Transaction } from 'objection'
import { DataClassType, VoteType, PollFullDataType, OptionType, PollState } from '../types/types'
import { ID, DATE, nullable } from '../utils/common-json-schemas'
import {
  getCannotVoteInPollIfPollNotInVoteStateErrorMessage,
  getMaxVotesPerOptionAlreadyGivenErrorMessage,
  getMaxVotesPerPollAlreadyGivenErrorMessage,
  getOptionWithThisIdDoesNotExistErrorMessage,
  getPollWithThisIdDoesNotExistErrorMessage
} from '../utils/error-messages'
import { BaseModel } from './base_model'
import { Person } from './person-model'
import { Poll } from './poll-model'
import { Vote } from './vote-model'

export class Option extends BaseModel {
  static get tableName(): string {
    return 'Options'
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
        from: 'Options.pollId',
        to: 'Polls.id'
      }
    },
    votes: {
      relation: Model.HasManyRelation,
      modelClass: Vote,
      join: {
        from: 'Options.id',
        to: 'Votes.optionId'
      }
    }
  }

  // TODO: Perhaps the maximum number of voters should be limited to like 20?
  // Implement voter count check before inserting a new vote.

  public static async giveAVoteToOption(input: VoteType): Promise<VoteType> {
    const existingOption = await this.findOptionById(input.optionId)
    const pollWithThisVoterVotes = await this.findPollWithThisVoterVotes(existingOption.pollId, input.voterId)
    if (pollWithThisVoterVotes?.state !== PollState.VOTE) {
      throw new Error(getCannotVoteInPollIfPollNotInVoteStateErrorMessage())
    }
    this.verifyVoterCanVoteThisOption(pollWithThisVoterVotes, input.optionId)

    return await this.withinTransaction(async (trx: Transaction): Promise<Vote> => {
      const existingPerson = await Person.query(trx).where('id', input.voterId).first()
      if (!existingPerson) {
        const personInput = input.name ? { id: input.voterId, name: input.name } : { id: input.voterId }
        await Person.query(trx).insert(personInput).returning('*')
      }
      const inputToDatabase = { id: input.id, optionId: input.optionId, voterId: input.voterId, name: input.name }
      const insertedVote = await Vote.query(trx).insert(inputToDatabase).returning(['id', 'optionId', 'name'])
      return insertedVote as unknown as Vote
    })
  }

  public static async findOptionsByPollId(pollId: string): Promise<OptionType[]> {
    return await Option.query().where('pollId', pollId).where('deletedAt', null).returning('*')
  }

  private static async findOptionById(optionId: string): Promise<OptionType> {
    const existingValidOption = await Option.query().where('id', optionId).where('deletedAt', null).first()
    if (!existingValidOption) {
      throw new Error(getOptionWithThisIdDoesNotExistErrorMessage(optionId))
    }
    return existingValidOption
  }

  private static async findPollWithThisVoterVotes(pollId: string, voterId: string): Promise<PollFullDataType> {
    const poll = await Poll.query()
      .where('id', pollId)
      .where('deletedAt', null)
      .withGraphFetched('[options.[votes(onlyThisVoter)]]')
      .modifiers({
        onlyThisVoter: (builder) => {
          builder.where('voterId', voterId).catch(() => {})
        }
      })
      .first()
    if (!poll) {
      throw new Error(getPollWithThisIdDoesNotExistErrorMessage(pollId))
    }
    return poll as unknown as PollFullDataType
  }

  private static verifyVoterCanVoteThisOption(poll: PollFullDataType, optionId: string): void {
    let voterVotesTotal = 0
    let voterVotesThisOption = 0
    poll.options.forEach((option) => {
      const optionVotes = option.votes?.length ?? 0
      voterVotesTotal += optionVotes
      if (option.id === optionId) voterVotesThisOption = optionVotes
    })
    if (voterVotesThisOption >= poll.optionVotesCountMax) {
      throw new Error(getMaxVotesPerOptionAlreadyGivenErrorMessage(poll.optionVotesCountMax))
    }
    if (voterVotesTotal >= poll.totalVotesCountMax) {
      throw new Error(getMaxVotesPerPollAlreadyGivenErrorMessage(poll.totalVotesCountMax))
    }
  }
}
