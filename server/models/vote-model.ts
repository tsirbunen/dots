import { Model } from 'objection'
import { VoteType } from '../types/types'

import { ID, DATE, nullable } from '../utils/common-json-schemas'
import { Answer } from './answer-model'

import { BaseModel } from './base_model'

export class Vote extends BaseModel {
  static get tableName(): string {
    return 'Votes'
  }

  id!: string
  answerId!: string
  voterId!: string
  name: string | undefined

  static get jsonSchema(): Record<string, string | object> {
    return {
      type: 'object',
      required: ['id', 'answerId', 'voterId'],
      properties: {
        id: ID,
        answerId: ID,
        voterId: ID,
        name: { type: 'string' },
        createdAt: DATE,
        updatedAt: DATE,
        deletedAt: nullable(DATE)
      }
    }
  }

  static relationMappings = {
    answer: {
      relation: Model.BelongsToOneRelation,
      modelClass: Answer,
      join: {
        from: 'Votes.answerId',
        to: 'Answers.id'
      }
    }
  }

  public static async findVotesByAnswerId(answerId: string): Promise<VoteType[]> {
    return await Vote.query().where('answerId', answerId).where('deletedAt', null).returning('*')
  }
}
