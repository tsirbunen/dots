import { BaseModel } from '../base/base_model'
import { Knex } from 'knex'
import { Errors } from '../../utils/errors'
import { insertVoteSchema } from './validation-schemas'
import { VoteDB, VoteDBPartial } from './types'

export class Vote extends BaseModel {
  static get tableName(): string {
    return 'Votes'
  }

  public static async findVotesByOptionId(optionId: string): Promise<VoteDB[]> {
    return await this.database<VoteDB>('Votes').where('optionId', optionId).where('deletedAt', null).returning('*')
  }

  public static async insertVote(input: VoteDBPartial, trx: Knex.Transaction): Promise<VoteDB> {
    this.validate(insertVoteSchema, input)

    const insertedVote = await this.database<VoteDB>('Votes').transacting(trx).insert(input).returning('*')
    if (!insertedVote || insertedVote.length !== 1) throw new Error(Errors.failedToInsertVote(input.id))
    return insertedVote[0]
  }
}
