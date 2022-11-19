import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_INPUT_INVALID_DATA, EDIT_POLL_INPUT_VALID_DATA, POLL_INPUT_DATA } from '../data/polls-data'
import { createPollInDatabase, editPollInDatabase } from '../utils/operations'
import {
  assertObjectIsAPoll,
  assertPollFieldsArePracticallySameWhenPresent,
  assertTokenIsPresent
} from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'

import { expect } from 'chai'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()

describe('EDIT POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('A poll can be edited if proper input data is provided and poll has not been opened for voting yet', async () => {
    for (let i = 0; i < EDIT_POLL_INPUT_VALID_DATA.length; i++) {
      const editPollInput = EDIT_POLL_INPUT_VALID_DATA[i]
      const ownerId = uuidv4()
      const pollInputData = { ...POLL_INPUT_DATA[0], ownerId }
      const createdPoll = await createPollInDatabase(pollInputData)
      editPollInput.pollId = createdPoll.id
      assertTokenIsPresent(createdPoll)
      const editedPoll = await editPollInDatabase(editPollInput, createdPoll.token!)
      assertObjectIsAPoll(editedPoll)
      assertPollFieldsArePracticallySameWhenPresent(editPollInput, editedPoll)
    }
  })

  it('A poll cannot be edited if proper input data is provided and poll has not been opened for voting yet', async () => {
    EDIT_POLL_INPUT_INVALID_DATA.forEach(async (editPollInvalidInputData) => {
      const ownerId = uuidv4()
      const pollInputData = { ...POLL_INPUT_DATA[0], ownerId }
      const createdPoll = await createPollInDatabase(pollInputData)
      const editPollInvalidInput = editPollInvalidInputData.data
      editPollInvalidInput.pollId = createdPoll.id
      assertTokenIsPresent(createdPoll)
      try {
        await editPollInDatabase(editPollInvalidInput, createdPoll.token!)
      } catch (error) {
        const errorResponse = error as { response: { errors: { message: string }[] } }
        const errorMessage = errorResponse.response.errors[0].message
        expect(errorMessage).to.equal(editPollInvalidInputData.errorMessage)
      }
    })
  })

  it('A poll cannot be edited if owner id (that should reside in token) is missing (i.e. token is missing)', async () => {
    const pollInputDataA = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    const createdPollA = await createPollInDatabase(pollInputDataA)
    const editPollValidInput = EDIT_POLL_INPUT_VALID_DATA[0]
    editPollValidInput.pollId = createdPollA.id
    try {
      await editPollInDatabase(editPollValidInput)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if requester is not the owner of the poll (i.e. owner id is wrong)', async () => {
    const pollInputDataA = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    const createdPollA = await createPollInDatabase(pollInputDataA)
    const editPollAValidInput = EDIT_POLL_INPUT_VALID_DATA[0]
    editPollAValidInput.pollId = createdPollA.id
    const pollInputDataB = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    const createdPollB = await createPollInDatabase(pollInputDataB)
    assertTokenIsPresent(createdPollB)
    try {
      await editPollInDatabase(editPollAValidInput, createdPollB.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
