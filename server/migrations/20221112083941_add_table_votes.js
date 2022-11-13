exports.up = async function (knex) {
  await knex.raw(`
          CREATE TABLE "Votes" (
          "id"            uuid PRIMARY KEY,
          "answerId"      uuid NOT NULL,
          "voterId"       uuid NOT NULL,
          "name"          VARCHAR(255) NOT NULL,
          "createdAt"     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
          "updatedAt"     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
          "deletedAt"     TIMESTAMP WITH TIME ZONE DEFAULT NULL,
      
          CONSTRAINT "fk_answers" FOREIGN KEY("answerId") REFERENCES "Answers"("id") ON DELETE CASCADE
          );
          `)

  await knex.raw(`
          CREATE TRIGGER update_timestamp_votes
          BEFORE UPDATE
          ON "Votes"
          FOR EACH ROW
          EXECUTE FUNCTION update_timestamp();
          `)
}

exports.down = async function (knex) {
  await knex.schema.dropTable('Votes')
  await knex.raw(`
          DROP TRIGGER IF EXISTS update_timestamp_votes ON "Votes";
          `)
}
