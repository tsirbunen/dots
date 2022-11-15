import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fastifyCors from '@fastify/cors'
import { envelop } from '@envelop/core'
import { useGraphQLModules } from '@envelop/graphql-modules'
import { createGraphQLApp } from './graphql-app/graphql-app'
import {
  Request,
  shouldRenderGraphiQL,
  renderGraphiQL,
  getGraphQLParameters,
  processRequest,
  sendResult
} from 'graphql-helix'
import { authenticationPlugin } from './graphql-app/authentication-plugin'

const GRAPHQL_ROUTE = '/graphql'

export const startServer = async (): Promise<void> => {
  console.log('Starting DOTS server...')
  const server = Fastify({ logger: false })
  await server.register(fastifyCors)

  server.get('/ping', async (_request, reply) => {
    await reply.send('pong')
  })

  server.get('/health', async (_request, reply) => {
    // TODO: Add some checks here (for example verify connection to database)!
    await reply.send('ok')
  })

  const getEnveloped = envelop({
    plugins: [useGraphQLModules(createGraphQLApp()), authenticationPlugin()]
  })

  server.route({
    url: GRAPHQL_ROUTE,
    method: ['GET', 'POST'],
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { parse, validate, contextFactory, execute, schema } = getEnveloped({ request })
      const graphQLRequest: Request = {
        body: request.body,
        headers: request.headers,
        method: request.method,
        query: request.query
      }

      if (shouldRenderGraphiQL(graphQLRequest)) {
        return await reply.type('text/html').send(
          renderGraphiQL({
            endpoint: GRAPHQL_ROUTE
          })
        )
      }

      const { operationName, query, variables } = getGraphQLParameters(graphQLRequest)
      const result = await processRequest({
        operationName,
        query,
        variables,
        request: graphQLRequest,
        // @ts-expect-error
        schema,
        parse,
        validate,
        contextFactory,
        execute
      })

      reply.raw.setHeader('Access-Control-Allow-Origin', '*')
      reply.raw.setHeader('Access-Control-Allow-Methods', 'POST')

      await sendResult(result, reply.raw)
      reply.sent = true
      return await reply
    }
  })

  // TODO: Change to use "options" as an argument for the listen-method below once it starts working
  try {
    const PORT = 3001
    const HOST = '0.0.0.0'
    server.listen(PORT, HOST, () => {
      console.log(`DOTS server is running on PORT: ${PORT}`)
    })
  } catch (error) {
    console.log('Error starting DOTS server!!!', error)
    process.exit(1)
  }
}
