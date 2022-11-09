import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'

export const startServer = async () => {
  console.log('Starting DOTS server...')
  const server = Fastify({ logger: false })
  await server.register(fastifyCors)

  server.get('/ping', async (_request, reply) => {
    reply.send('pong')
  })

  server.get('/health', async (_request, reply) => {
    // TODO: Add some checks here!
    reply.send('ok')
  })

  try {
    const PORT = process.env.PORT || 3001
    const HOST = process.env.HOST || '0.0.0.0'
    // NOTE: The new recommended way to give options to the listen-method does not accept
    // the given PORT number, so must use the deprecated way of passing arguments
    server.listen(PORT, HOST, () => {
      console.log(`DOTS server is running on PORT: ${PORT}`)
    })
  } catch (error) {
    console.log('Error starting DOTS server!!!', error)
    process.exit(1)
  }
}
