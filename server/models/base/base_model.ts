import { Knex } from 'knex'
import { Database } from '../../database/database'
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import { Errors } from '../../utils/errors'
import { Model } from 'objection'
import { getRequiredErrorMessage } from '../../utils/common-json-schemas'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BaseModel extends Model {
  static get database(): Knex {
    const db = Database.instance.knex
    if (!db) {
      throw new Error('No connection to database!')
    }
    return db
  }

  static validate(schema: Record<string, string | object>, data: object): void {
    const ajv = new Ajv({ allErrors: true })
    AjvErrors(ajv, { keepErrors: false })
    ajv.addKeyword({
      keyword: 'isDateTime',
      validate: (_schema: Record<string, string | object>, data: object) =>
        data instanceof Date && !isNaN(data.getTime())
    })

    const dataValidator = ajv.compile(schema)

    if (!dataValidator(data)) {
      if (dataValidator.errors) {
        if (dataValidator.errors[0].params.missingProperty) {
          throw new Error(getRequiredErrorMessage(dataValidator.errors[0].params.missingProperty))
        }

        const firstErrorMessage = dataValidator.errors[0].message ?? ''
        throw new Error(Errors.validationDetails(firstErrorMessage))
      }
    }
  }

  static async withinTransaction<T>(performActions: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
    const trx = await this.database.transaction()
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
