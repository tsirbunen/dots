import { Model } from 'objection'
import { VoteType } from '../types/types'
import { ID, DATE, nullable } from '../utils/common-json-schemas'
import { Option } from './option-model'
import { BaseModel } from './base_model'
import { Person } from './person-model'

export class Vote extends BaseModel {
  static get tableName(): string {
    return 'Votes'
  }

  id!: string
  optionId!: string
  voterId!: string
  name: string | undefined | null

  static get jsonSchema(): Record<string, string | object> {
    return {
      type: 'object',
      required: ['id', 'optionId', 'voterId'],
      properties: {
        id: ID,
        optionId: ID,
        voterId: ID,
        name: nullable({ type: 'string' }),
        createdAt: DATE,
        updatedAt: DATE,
        deletedAt: nullable(DATE)
      }
    }
  }

  static relationMappings = {
    option: {
      relation: Model.BelongsToOneRelation,
      modelClass: Option,
      join: {
        from: 'Votes.optionId',
        to: 'Options.id'
      }
    },
    person: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: 'Votes.voterId',
        to: 'Person.id'
      }
    }
  }

  public static async findVotesByOptionId(optionId: string): Promise<VoteType[]> {
    return await Vote.query().where('optionId', optionId).where('deletedAt', null).returning('*')
  }
}
