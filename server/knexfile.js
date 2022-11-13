const connection = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : {
      host: 'localhost',
      port: '5432',
      user: 'postgres',
      password: 'possupossu',
      database: 'dots'
    }

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
