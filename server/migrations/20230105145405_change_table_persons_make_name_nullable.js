exports.up = async function (knex) {
  await knex.raw(
    `
        ALTER TABLE "Persons"
        ALTER COLUMN "name" DROP NOT NULL;
      `
  )
}

exports.down = async function (knex) {
  await knex.raw(
    `
        ALTER TABLE "Persons"
        ALTER COLUMN "name" SET NOT NULL;
      `
  )
}
