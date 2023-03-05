import { BaseModel } from '../base/base_model'
import { Knex } from 'knex'
import { Errors } from '../../utils/errors'
import { insertPersonSchema } from './validation-schemas'
import { PersonDB } from './types'

export class Person extends BaseModel {
  static get tableName(): string {
    return 'Persons'
  }

  public static async findPersonById(personId: string): Promise<PersonDB> {
    const persons = await this.database<PersonDB>('Persons')
      .where('id', personId)
      .where('deletedAt', null)
      .returning('*')

    if (!persons || persons.length === 0) throw new Error(Errors.personDoesNotExist(personId))
    return persons[0]
  }

  public static async insertOrUpdatePerson(id: string, name: string | null, trx: Knex.Transaction): Promise<void> {
    this.validate(insertPersonSchema, { id, name })
    let persons = await this.database<PersonDB>('Persons').transacting(trx).where('id', id)
    if (!persons || persons.length === 0) {
      persons = await this.database<PersonDB>('Persons').transacting(trx).insert({ id, name }).returning('id')
    } else {
      await this.database<PersonDB>('Persons').transacting(trx).update({ name })
    }
    if (!persons || persons.length === 0) {
      throw new Error(Errors.failedToRetrieveOrInsertPerson(id))
    }
  }

  public static async updatePersonName(personId: string, name: string, trx: Knex.Transaction): Promise<void> {
    await this.database<PersonDB>('Persons').transacting(trx).where('id', personId).update({ name })
  }
}
