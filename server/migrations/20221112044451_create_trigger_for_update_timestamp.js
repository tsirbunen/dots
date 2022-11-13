exports.up = async function (knex) {
  await knex.raw(`
      CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
      LANGUAGE plpgsql 
      AS
      $$ 
      BEGIN
      NEW."updatedAt" = NOW();
      RETURN NEW;
      END;
      $$;
      `)
}

exports.down = async function (knex) {
  await knex.raw(`
      DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
      `)
}
