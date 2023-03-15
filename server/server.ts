/* eslint-disable @typescript-eslint/no-explicit-any */
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyWebsocket from '@fastify/websocket'
import { makeHandler } from 'graphql-ws/lib/use/@fastify/websocket'
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
import { Context } from 'graphql-ws/lib/server'
import { SubscribeMessage } from 'graphql-ws/lib/common'

const GRAPHQL_ROUTE = '/graphql'
const WS_ROUTE = '/ws'

export const startServer = async (): Promise<void> => {
  console.log('Starting DOTS server...')
  const server = Fastify({ logger: false })
  await server.register(fastifyCors)
  await server.register(fastifyWebsocket)

  server.get('/ping', async (_request, reply) => {
    await reply.send('pong')
  })

  server.get('/health', async (_request, reply) => {
    await reply.send('ok')
  })

  const app = createGraphQLApp()
  const getEnveloped = envelop({
    plugins: [useGraphQLModules(app), authenticationPlugin()]
  })

  // This is the basic GraphQL server for queries and mutations (HTTP queries).
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

  // const { parse, validate, contextFactory, execute, schema, subscribe } = getEnveloped({})
  // This is the GraphQL server for subscriptions (web socket connection).
  await server.register(async (server) => {
    server.get(
      WS_ROUTE,
      { websocket: true },
      // See info for makeHandler function in node_modules/graphql-ws/lib/server.d.ts
      makeHandler({
        // execute,
        // subscribe,
        // The execute and subscribe functions are returned as arguments from the
        // onSubscribe callback.
        execute: (args: any) => {
          // console.log('execute args', args)
          console.log('execute WS')
          return args.rootValue.execute(args)
        },
        subscribe: (args: any) => {
          console.log('subscribe WS')
          // console.log('subscribe args', args)
          return args.rootValue.subscribe(args)
        },
        // The below onConnect will be called when client wants to make a WS connection to
        // the server. We will allow all connections for now (and not add extra info).
        onConnect: async (_ctx: Context) => {
          console.log('Web socket connection initialized.')
          return true
        },
        // The subscribe callback executed right after acknowledging the request before any
        // payload processing has been performed. For implementation, see
        // https://github.com/n1ru4l/envelop/blob/main/examples/graphql-ws/index.ts
        onSubscribe: async (ctx: Context, message: SubscribeMessage) => {
          const socket = (ctx.extra as { socket: any }).socket
          const request = (ctx.extra as { request: any }).request
          const { schema, execute, subscribe, contextFactory, parse } = getEnveloped({
            connectionParams: ctx.connectionParams,
            socket,
            request
          })

          const args = {
            schema,
            operationName: message.payload.operationName,
            document: parse(message.payload.query),
            variableValues: message.payload.variables,
            contextValue: await contextFactory(),
            rootValue: {
              execute,
              subscribe
            }
          }

          return args
        }
      })
    )
  })

  // The deprecated listen-method is used for now because the new one does not work.
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
