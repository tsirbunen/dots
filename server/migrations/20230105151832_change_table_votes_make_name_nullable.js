exports.up = async function (knex) {
  await knex.raw(
    `
          ALTER TABLE "Votes"
          ALTER COLUMN "name" DROP NOT NULL;
        `
  )
}

exports.down = async function (knex) {
  await knex.raw(
    `
          ALTER TABLE "Votes"
          ALTER COLUMN "name" SET NOT NULL;
        `
  )
}
