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
        DELETE FROM "Persons";
        DELETE FROM "Votes";
        DELETE FROM "Options";
        DELETE FROM "Polls";
    `)
}

export async function closeDatabaseConnection(databaseConnection: Knex): Promise<void> {
  return databaseConnection.destroy()
}

export async function getAllVotesInDatabase(databaseConnection: Knex) {
  const votesInDatabase = await databaseConnection.raw(`
    SELECT * FROM "Votes";
  `)
  return votesInDatabase.rows
}

export async function getAllOptionsInDatabase(databaseConnection: Knex) {
  const optionsInDatabase = await databaseConnection.raw(`
    SELECT * FROM "Options";
  `)
  return optionsInDatabase.rows
}

export async function getAllPollsInDatabase(databaseConnection: Knex) {
  const pollsInDatabase = await databaseConnection.raw(`
    SELECT * FROM "Polls";
  `)
  return pollsInDatabase.rows
}

export async function getAllPersonsInDatabase(databaseConnection: Knex) {
  const personsInDatabase = await databaseConnection.raw(`
    SELECT * FROM "Persons";
  `)
  return personsInDatabase.rows
}
