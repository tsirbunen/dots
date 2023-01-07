import { Model } from 'objection'
import { ID, DATE, nullable } from '../utils/common-json-schemas'
import { getPersonWithThisIdOrCodeDoesNotExistErrorMessage } from '../utils/error-messages'
import { BaseModel } from './base_model'
import { Poll } from './poll-model'

export class Person extends BaseModel {
  static get tableName(): string {
    return 'Persons'
  }

  id!: string
  name?: string | null

  static get jsonSchema(): Record<string, string | object> {
    return {
      type: 'object',
      required: ['id'],
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
        from: 'Persons.id',
        to: 'Polls.ownerId'
      }
    }
  }

  public static async findPersonById(personId: string): Promise<Person> {
    const person = await Person.query().where('id', personId).where('deletedAt', null).returning('*').first()
    if (!person) throw new Error(getPersonWithThisIdOrCodeDoesNotExistErrorMessage(personId))
    return person
  }
}
