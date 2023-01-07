exports.up = async function (knex) {
  await knex.raw(
    `
        DELETE FROM "Votes";
        DELETE FROM "Answers";
        DELETE FROM "Polls";

        ALTER TABLE "Polls"
        ADD COLUMN "ownerId" UUID NOT NULL;
        
        ALTER TABLE "Polls"
        ADD CONSTRAINT "fk_owners" FOREIGN KEY("ownerId") REFERENCES "Owners"("id") ON DELETE CASCADE
      `
  )
}

exports.down = async function (knex) {
  await knex.schema.alterTable('Polls', (table) => {
    table.dropColumn('ownerId')
  })
}
