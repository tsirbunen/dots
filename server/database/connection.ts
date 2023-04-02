import * as dotenv from 'dotenv'
dotenv.config()

export const connection = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : {
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: process.env.POSTGRES_PORT ?? '5432',
      user: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? 'possupossu',
      database: process.env.POSTGRES_DB ?? 'dots'
    }
