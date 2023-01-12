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

export function getConnection(): Knex {
  return knex(TEST_CONFIG)
}

export async function clearDatabase(connection: Knex) {
  await connection.raw(`
        DELETE FROM "Persons";
        DELETE FROM "Votes";
        DELETE FROM "Options";
        DELETE FROM "Polls";
    `)
}

export async function closeConnection(connection: Knex): Promise<void> {
  return connection.destroy()
}

export async function getAllVotes(connection: Knex) {
  const votesInDatabase = await connection.raw(`
    SELECT * FROM "Votes";
  `)
  return votesInDatabase.rows
}

export async function getAllOptions(connection: Knex) {
  const optionsInDatabase = await connection.raw(`
    SELECT * FROM "Options";
  `)
  return optionsInDatabase.rows
}

export async function getAllPolls(connection: Knex) {
  const pollsInDatabase = await connection.raw(`
    SELECT * FROM "Polls";
  `)
  return pollsInDatabase.rows
}

export async function getAllPersons(connection: Knex) {
  const personsInDatabase = await connection.raw(`
    SELECT * FROM "Persons";
  `)
  return personsInDatabase.rows
}
