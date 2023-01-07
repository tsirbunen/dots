import { Context } from '../Context'
import { TokenDetails } from '../types/types'

export const getPersonIdIfAuthenticated = (context: Context): string | undefined => {
  return (context as unknown as { authenticationData?: TokenDetails }).authenticationData?.ownerId
}
