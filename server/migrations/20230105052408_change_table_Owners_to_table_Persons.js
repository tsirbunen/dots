exports.up = async function (knex) {
  await knex.raw(
    `
        ALTER TABLE "Owners"
        RENAME TO "Persons";
    `
  )
}

exports.down = async function (knex) {
  await knex.raw(
    `
        ALTER TABLE "Persons"
        RENAME TO "Owners";
    `
  )
}
