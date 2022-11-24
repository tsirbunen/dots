import { Model, Transaction } from 'objection'

export class BaseModel extends Model {
  static async performWithinTransaction<T>(performActions: (trx: Transaction) => Promise<T>): Promise<T> {
    const trx = await Model.startTransaction()
    try {
      const outcome = await performActions(trx)
      await trx.commit()
      return outcome
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
