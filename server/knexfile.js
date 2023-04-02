const connection = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : {
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: process.env.POSTGRES_PORT ?? '5432',
      user: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? 'possupossu',
      database: process.env.POSTGRES_DB ?? 'dots'
    }
console.log(connection)
const data = {
  client: 'postgresql',
  connection,
  debug: false,
  pool: { min: 2, max: 5 }
}

module.exports = {
  deployment_test: data,
  development: data,
  test: data,
  production: data,
  manual_migrations: data
}

/*
Herokuun luottokortti -> verify account
Luo herokuun server app
Luo herokuun postgresql tietokanta
Yhdistä tietokanta appiin
Tarvitaanko Redis Herokussa?
Koko settt toimimaan
Uusi GitHub actions kurssi 
  ja sen avulla actionilla automaattinen deploy Herokuun

Kun ajetaan paikallisesti db ja server dockerilla, .env-tiedostoon tulee alla olevat
ja ne on eri kuin lokaalisti ajettaessa ja eri kuin otettaessa ulkopuolelta yhteys postgresiin
(knex.migraatiot):
PORT=3001
HOST=0.0.0.0
JWT_SECRET=...
POSTGRES_USER=postgres
POSTGRES_PASSWORD=possupossu
POSTGRES_HOST=postgres_for_dots
POSTGRES_PORT=5432
POSTGRES_DB=dots

Mutta kun ajetaan paikallisesti knexin avulla migraatiot, eivät ENV-muuttujat ole tarjolla
ja alla tulee ?? jälkeen olevat oletusarvot:
Knex.js:
{
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: process.env.POSTGRES_PORT ?? '5432',
      user: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? 'possupossu',
      database: process.env.POSTGRES_DB ?? 'dots'
    }

Ja ajokäsky:
docker run --name postgres_for_dots -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=possupossu -e POSTGRES_DB=dots -d --rm postgres


Kun ajetaan ihan tavallisesti dev (eli ei dockerin kautta serveriä vaannpm run dev),
tulee nämä database connectioniin, jotka on ne samat kuin knex-filessä
{
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: 'possupossu',
  database: 'dots'
}


*/
