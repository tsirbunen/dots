/* eslint-disable @typescript-eslint/no-explicit-any */
import { knex, Knex } from 'knex'
import { Model } from 'objection'
import { connection } from './connection'

export class Database {
  private static dbInstance: Database
  private knexInstance: Knex | undefined
  private config: Knex.Config | undefined

  public static get DB_CONFIG(): Knex.Config {
    return {
      acquireConnectionTimeout: 30000,
      client: 'postgresql',
      connection,
      debug: false,
      pool: { min: 2, max: 5 }
    }
  }

  get knex(): Knex<any, any[]> | undefined {
    return this.knexInstance
  }

  static get instance(): Database {
    if (Database.dbInstance === undefined) {
      Database.dbInstance = new Database()
    }
    return Database.dbInstance
  }

  connect(config = Database.DB_CONFIG): void {
    this.config = config
    this.knexInstance = knex(this.config)
    Model.knex(this.knexInstance)
  }

  async disconnect(): Promise<void> {
    await this.knexInstance?.destroy()
    this.knexInstance = undefined
    Model.knex(undefined)
  }
}
