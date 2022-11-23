import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_INPUT_INVALID_DATA, EDIT_POLL_INPUT_VALID_DATA, POLL_INPUT_DATA } from '../data/polls-data'
import { createPollInDatabase, editPollInDatabase } from '../utils/operations'
import { assertObjectIsAPoll, assertPollFieldsArePracticallyEqualWhenPresent } from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'

import { expect } from 'chai'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { getErrorMessageFromResponse } from '../utils/helpers'
import { PollFullDataType } from '../../types/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let createdPoll: PollFullDataType

describe('EDIT POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    createdPoll = await createPollInDatabase({ ...POLL_INPUT_DATA[0], ownerId: uuidv4() })
  })

  it('A poll can be edited if proper input data is provided and poll has not been opened for voting yet', async () => {
    for (let i = 0; i < EDIT_POLL_INPUT_VALID_DATA.length; i++) {
      const editPollInput = EDIT_POLL_INPUT_VALID_DATA[i]
      editPollInput.pollId = createdPoll.id
      const editedPoll = await editPollInDatabase(editPollInput, createdPoll.token!)
      assertObjectIsAPoll(editedPoll)
      assertPollFieldsArePracticallyEqualWhenPresent(editPollInput, editedPoll)
    }
  })

  it('A poll cannot be edited if invalid input data is provided', async () => {
    for (let i = 0; i < EDIT_POLL_INPUT_INVALID_DATA.length; i++) {
      const editPollInvalidInputData = EDIT_POLL_INPUT_INVALID_DATA[i]
      const editPollInvalidInput = editPollInvalidInputData.data
      editPollInvalidInput.pollId = createdPoll.id
      try {
        await editPollInDatabase(editPollInvalidInput, createdPoll.token!)
      } catch (error) {
        const errorMessage = getErrorMessageFromResponse(error)
        expect(errorMessage).to.equal(editPollInvalidInputData.errorMessage)
      }
    }
  })

  it('A poll cannot be edited if owner id (that should reside in token) is missing (i.e. token is missing)', async () => {
    const editPollValidInput = EDIT_POLL_INPUT_VALID_DATA[0]
    editPollValidInput.pollId = createdPoll.id
    try {
      await editPollInDatabase(editPollValidInput)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if requester is not the owner of the poll (i.e. owner id is wrong)', async () => {
    const editPollValidInput = EDIT_POLL_INPUT_VALID_DATA[0]
    editPollValidInput.pollId = createdPoll.id
    const pollInputDataAnotherPoll = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    const createdPollAnotherPoll = await createPollInDatabase(pollInputDataAnotherPoll)
    try {
      await editPollInDatabase(editPollValidInput, createdPollAnotherPoll.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
