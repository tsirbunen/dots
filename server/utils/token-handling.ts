import { JWT_SECRET } from './config'
import jwt from 'jsonwebtoken'

export interface TokenDetails {
  pollId: string
  ownerId: string
}

export interface Token {
  exp: number
  data: TokenDetails
  iat: number
}

export const createJWT = (tokenDetails: TokenDetails): string => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      data: { ...tokenDetails }
    },
    JWT_SECRET
  )
}

export const decodeJWT = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, JWT_SECRET, { ignoreExpiration: true })
}
