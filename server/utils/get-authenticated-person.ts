import { Context } from '../Context'
import { TokenDetails } from './token-handling'

export const getAuthenticatedPerson = (context: Context): string | undefined => {
  return (context as unknown as { authenticationData?: TokenDetails }).authenticationData?.ownerId
}
