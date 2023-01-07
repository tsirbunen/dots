exports.up = async function (knex) {
  await knex.raw(`
  CREATE TYPE POLL_STATE AS ENUM ('EDIT', 'VOTE', 'CLOSED');
  `)

  await knex.raw(
    `
    ALTER TABLE "Polls"
    ADD COLUMN "state" POLL_STATE NOT NULL DEFAULT 'EDIT';
    `
  )
}

exports.down = async function (knex) {
  await knex.schema.alterTable('Polls', (table) => {
    table.dropColumn('state')
  })
  await knex.raw(`
  DROP TYPE POLL_STATE;
  `)
}
