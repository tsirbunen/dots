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

export async function getAllVotesInDatabase(databaseConnection: Knex) {
  const votesInDatabase = await databaseConnection.raw(`
  SELECT * FROM "Votes";
`)
  return votesInDatabase.rows
}

export async function getAllAnswersInDatabase(databaseConnection: Knex) {
  const answersInDatabase = await databaseConnection.raw(`
  SELECT * FROM "Answers";
`)
  return answersInDatabase.rows
}

export async function getAllPollsInDatabase(databaseConnection: Knex) {
  const pollsInDatabase = await databaseConnection.raw(`
  SELECT * FROM "Polls";
`)
  return pollsInDatabase.rows
}

export async function getAllOwnersInDatabase(databaseConnection: Knex) {
  const ownersInDatabase = await databaseConnection.raw(`
  SELECT * FROM "Owners";
`)
  return ownersInDatabase.rows
}
