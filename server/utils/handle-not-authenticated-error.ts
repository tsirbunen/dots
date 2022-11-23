import { expect } from 'chai'
import { getErrorMessageFromResponse } from '../tests/utils/helpers'
import { getNotAuthenticatedToPerformThisActionErrorMessage } from './error-messages'

export function handleAssertNotAuthenticatedError(error: unknown): void {
  const errorMessage = getErrorMessageFromResponse(error)
  expect(errorMessage).to.equal(getNotAuthenticatedToPerformThisActionErrorMessage())
}
