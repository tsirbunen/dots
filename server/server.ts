import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'

export const startServer = async (): Promise<void> => {
  console.log('Starting DOTS server...')
  const server = Fastify({ logger: false })
  await server.register(fastifyCors)

  server.get('/ping', async (_request, reply) => {
    await reply.send('pong')
  })

  server.get('/health', async (_request, reply) => {
    // TODO: Add some checks here!
    await reply.send('ok')
  })

  try {
    const PORT = 3001
    const HOST = '0.0.0.0'
    // TODO: Change to use "options" as an argument for the listen-method once it starts working
    server.listen(PORT, HOST, () => {
      console.log(`DOTS server is running on PORT: ${PORT}`)
    })
  } catch (error) {
    console.log('Error starting DOTS server!!!', error)
    process.exit(1)
  }
}
