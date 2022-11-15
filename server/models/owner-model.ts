import { Model } from 'objection'
import { OwnerType } from '../types/types'

import { ID, DATE, nullable } from '../utils/common-json-schemas'

import { BaseModel } from './base_model'
import { Poll } from './poll-model'

export class Owner extends BaseModel {
  static get tableName(): string {
    return 'Owners'
  }

  id!: string
  name!: string

  static get jsonSchema(): Record<string, string | object> {
    return {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: ID,
        name: { type: 'string' },
        createdAt: DATE,
        updatedAt: DATE,
        deletedAt: nullable(DATE)
      }
    }
  }

  static relationMappings = {
    polls: {
      relation: Model.HasManyRelation,
      modelClass: Poll,
      join: {
        from: 'Owners.id',
        to: 'Polls.ownerId'
      }
    }
  }

  public static async findOwnerById(ownerId: string): Promise<OwnerType> {
    const owners = await Owner.query().where('id', ownerId).where('deletedAt', null).returning('*')
    return owners[0]
  }
}
