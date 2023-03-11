/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Plugin } from '@envelop/core'

import { decodeJWT, Token } from '../utils/token-handling'

export const authenticationPlugin = (): Plugin => ({
  onContextBuilding({ context, extendContext }: any) {
    let decodedToken: Token | null = null
    if (context.request !== null && context.request !== undefined) {
      const token = context.request.headers?.authorization as unknown
      if (typeof token === 'string' && token.length > 4) {
        try {
          decodedToken = decodeJWT(token) as Token
        } catch (error) {
          throw new Error(`ERROR: Could not authenticate with error: ${JSON.stringify(error)}`)
        }
      }
    }
    return extendContext({
      request: context.request,
      authenticationData: decodedToken != null ? decodedToken.data : null,
      personId: context.request.headers?.personid ?? undefined
    })
  }
})
