exports.up = async function (knex) {
  await knex.raw(`
        CREATE TYPE DATA_CLASS AS ENUM ('TEXT', 'NUMBER', 'DATE');
        `)

  await knex.raw(`
        CREATE TABLE "Answers" (
        "id"            uuid PRIMARY KEY,
        "pollId"        uuid NOT NULL,
        "content"       VARCHAR(255) NOT NULL,
        "dataClass"     DATA_CLASS NOT NULL,
        "createdAt"     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "updatedAt"     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "deletedAt"     TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    
        CONSTRAINT "fk_polls" FOREIGN KEY("pollId") REFERENCES "Polls"("id") ON DELETE CASCADE
        );
        `)

  await knex.raw(`
        CREATE TRIGGER update_timestamp_answers
        BEFORE UPDATE
        ON "Answers"
        FOR EACH ROW
        EXECUTE FUNCTION update_timestamp();
        `)
}

exports.down = async function (knex) {
  await knex.schema.dropTable('Answers')
  await knex.raw(`
        DROP TYPE DATA_CLASS;
        `)
  await knex.raw(`
        DROP TRIGGER IF EXISTS update_timestamp_answers ON "Answers";
        `)
}
