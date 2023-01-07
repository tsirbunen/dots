exports.up = async function (knex) {
  await knex.raw(
    `
          ALTER TABLE "Answers"
          RENAME TO "Options";
      `
  )
}

exports.down = async function (knex) {
  await knex.raw(
    `
          ALTER TABLE "Options"
          RENAME TO "Answers";
      `
  )
}
