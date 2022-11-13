import 'reflect-metadata'
import { Database } from './database/database'
import { startServer } from './server'

const startDotsServer = async (): Promise<void> => {
  Database.instance.connect()
  await startServer()
}

try {
  void startDotsServer()
} catch (error) {
  console.log(error)
}
