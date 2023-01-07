exports.up = async function (knex) {
  await knex.raw(
    `
          ALTER TABLE "Votes"
          ADD CONSTRAINT "fk_voter" FOREIGN KEY("voterId") REFERENCES "Persons"("id") ON DELETE CASCADE
        `
  )
}

exports.down = async function (knex) {
  await knex.raw(
    `
              ALTER TABLE "Votes"
              DROP CONSTRAINT "fk_voter"; 
            `
  )
}
