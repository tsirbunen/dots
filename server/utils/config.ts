import * as dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT ? parseInt(process.env.PORT.toString()) : 3001
export const JWT_SECRET = process.env.JWT_SECRET ?? 'temporarySecret'
