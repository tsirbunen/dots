import { TokenDetails } from '../types/types'
import { JWT_SECRET } from './config'
import jwt from 'jsonwebtoken'

export const createJWT = (tokenDetails: TokenDetails): string => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { ...tokenDetails }
    },
    JWT_SECRET
  )
}

export const decodeJWT = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, JWT_SECRET)
}
