import { expect } from 'chai'
import { getNotAuthenticatedToPerformThisActionErrorMessage } from './error-messages'

export function handleAssertNotAuthenticatedError(error: unknown): void {
  const errorResponse = error as { response: { errors: Array<{ message: string }> } }
  const errorMessage = errorResponse.response.errors[0].message
  expect(errorMessage).to.equal(getNotAuthenticatedToPerformThisActionErrorMessage())
}
