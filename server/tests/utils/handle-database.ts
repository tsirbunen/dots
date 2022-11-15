import { knex, Knex } from 'knex'

export const TEST_CONFIG = {
  acquireConnectionTimeout: 30000,
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'possupossu',
    database: 'dots'
  },
  debug: false,
  pool: { min: 2, max: 5 }
}

export function getDatabaseConnection(): Knex {
  return knex(TEST_CONFIG)
}

export async function clearDatabase(databaseConnection: Knex) {
  await databaseConnection.raw(`
        DELETE FROM "Owners";
        DELETE FROM "Votes";
        DELETE FROM "Answers";
        DELETE FROM "Polls";
    `)
}

export async function closeDatabaseConnection(databaseConnection: Knex): Promise<void> {
  return databaseConnection.destroy()
}
