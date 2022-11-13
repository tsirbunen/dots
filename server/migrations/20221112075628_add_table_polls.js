exports.up = async function (knex) {
  await knex.raw(`
          CREATE TABLE "Polls" (
          "id"                      uuid PRIMARY KEY,
          "code"                    VARCHAR(255) UNIQUE NOT NULL,
          "question"                VARCHAR(255) NOT NULL,
          "isAnonymous"             BOOLEAN NOT NULL,
          "totalVotesCountMax"      INTEGER NOT NULL,
          "optionVotesCountMax"     INTEGER NOT NULL,
          "showStatusWhenVoting"    BOOLEAN NOT NULL,
          "createdAt"               TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
          "updatedAt"               TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
          "deletedAt"               TIMESTAMP WITH TIME ZONE DEFAULT NULL
          );
          `)

  await knex.raw(`
          CREATE TRIGGER update_timestamp_polls
          BEFORE UPDATE
          ON "Polls"
          FOR EACH ROW
          EXECUTE FUNCTION update_timestamp();
          `)
}

exports.down = async function (knex) {
  await knex.schema.dropTable('Polls')
  await knex.raw(`
      DROP TRIGGER IF EXISTS update_timestamp_polls ON "Polls";
      `)
}
