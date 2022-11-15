exports.up = async function (knex) {
  await knex.raw(`
            CREATE TABLE "Owners" (
            "id"            uuid PRIMARY KEY,
            "name"          VARCHAR(255) NOT NULL,
            "createdAt"     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
            "updatedAt"     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
            "deletedAt"     TIMESTAMP WITH TIME ZONE DEFAULT NULL
            );
            `)

  await knex.raw(`
            CREATE TRIGGER update_timestamp_owners
            BEFORE UPDATE
            ON "Owners"
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamp();
            `)
}

exports.down = async function (knex) {
  await knex.schema.dropTable('Owners')
  await knex.raw(`
            DROP TRIGGER IF EXISTS update_timestamp_owners ON "Owners";
            `)
}
