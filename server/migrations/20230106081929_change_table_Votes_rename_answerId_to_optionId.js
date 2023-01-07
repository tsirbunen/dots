exports.up = async function (knex) {
  await knex.raw(
    `
    ALTER TABLE "Votes" 
    RENAME COLUMN "answerId" TO "optionId";
 
    `
  )
}

exports.down = async function (knex) {
  await knex.raw(
    `
        ALTER TABLE "Votes" 
        RENAME COLUMN "optionId" TO "answerId";
     
        `
  )
}
