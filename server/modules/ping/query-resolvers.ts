import { Context } from '../../Context'

interface PingQueryResolversType {
  ping: (parent: unknown, args: unknown, context: Context) => string
}

export const PingQueryResolvers: PingQueryResolversType = {
  ping: (_parent, _args, _context) => {
    return 'pong'
  }
}
