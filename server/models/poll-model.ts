import { Model, Transaction } from 'objection'
import { v4 as uuidv4 } from 'uuid'
import { CreatePollDatabaseInputType, PollType, FindPollInputType } from '../types/types'
import { ID, nullable, DATE } from '../utils/common-json-schemas'
import { Answer } from './answer-model'
import { BaseModel } from './base_model'

export class Poll extends BaseModel {
  static get tableName(): string {
    return 'Polls'
  }

  id!: string
  code!: string
  question!: string
  isAnonymous!: boolean
  totalVotesCountMax!: number
  optionVotesCountMax!: number
  showStatusWhenVoting!: boolean
  deletedAt!: Date | null
  createdAt!: Date
  updatedAt!: Date

  static get jsonSchema(): Record<string, string | object> {
    return {
      type: 'object',
      required: [
        'id',
        'code',
        'question',
        'isAnonymous',
        'totalVotesCountMax',
        'optionVotesCountMax',
        'showStatusWhenVoting'
      ],
      properties: {
        id: ID,
        code: { type: 'string' },
        question: { type: 'string' },
        isAnonymous: { type: 'boolean' },
        totalVotesCountMax: { type: 'number' },
        optionVotesCountMax: { type: 'number' },
        showStatusWhenVoting: { type: 'boolean' },
        createdAt: DATE,
        updatedAt: DATE,
        deletedAt: nullable(DATE)
      }
    }
  }

  static relationMappings = {
    answers: {
      relation: Model.HasManyRelation,
      modelClass: Answer,
      join: {
        from: 'Polls.id',
        to: 'Answers.pollId'
      }
    }
  }

  public static async createPoll(input: CreatePollDatabaseInputType): Promise<PollType> {
    // TODO: Where to validate that totalVotesCountMax >= optionVotesCountMax ???
    return await this.performWithinTransaction(async (trx: Transaction): Promise<PollType> => {
      const answers = input.answers
      const dataClass = input.dataClass
      const cleanedInput: Partial<CreatePollDatabaseInputType> = input
      delete cleanedInput.answers
      delete cleanedInput.dataClass
      const createdPoll = await Poll.query(trx).insert(cleanedInput).returning('*')
      const createdAnswers = await Promise.all(
        answers.map(async (answer) => {
          const a = await Answer.query(trx)
            .insert({
              id: uuidv4(),
              pollId: createdPoll.id,
              content: answer,
              dataClass
            })
            .returning('*')
          return a
        })
      )
      return {
        ...createdPoll,
        answers: createdAnswers
      }
    })
  }

  public static async findPollByIdOrCode(input: FindPollInputType): Promise<Omit<PollType, 'answers'>> {
    if (input.id !== undefined) {
      const polls = await Poll.query().where('id', input.id).where('deletedAt', null).returning('*')
      return polls[0]
    }
    if (input.code !== undefined) {
      const polls = await Poll.query().where('code', input.code).where('deletedAt', null).returning('*')
      return polls[0]
    }
    throw new Error('Find poll by ID or CODE needs either ID or CODE!')
  }
}
