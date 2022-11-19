import { Context } from '../Context'
import { TokenDetails } from '../types/types'
import { getOwnerIdIsMissingFromContextErrorMessage } from './error-messages'

export const getIdOfOwnerPerformingQuery = (context: Context): string => {
  const ownerId = (context as unknown as { authenticationData: TokenDetails }).authenticationData.ownerId
  if (!ownerId) {
    throw new Error(getOwnerIdIsMissingFromContextErrorMessage())
  }
  return ownerId
}
