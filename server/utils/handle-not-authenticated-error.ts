import { expect } from 'chai'
import { extractErrorMessage } from '../tests/utils/helpers'
import { Errors } from './errors'

export function handleAssertNotAuthenticatedError(error: unknown): void {
  const errorMessage = extractErrorMessage(error)
  expect(errorMessage).to.equal(Errors.notAuthorized)
}
