import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_INVALID, EDIT_POLL_VALID, POLL_VALID } from '../data/polls-data'
import { createPoll, editPoll } from '../utils/operations'
import { assertObjectIsAPoll, assertPollsAreEqual } from '../utils/assertions'
import { getConnection, clearDatabase, closeConnection } from '../utils/handle-database-connections'
import { assert } from 'chai'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { extractErrorMessage } from '../utils/helpers'
import { PollFull } from '../../models/poll/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getConnection()
let createdPoll: PollFull

describe('EDIT POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    createdPoll = await createPoll({ ...POLL_VALID[0], ownerId: uuidv4() })
  })

  it('A poll can be edited if valid input is provided and poll has not been opened for voting yet', async () => {
    for (let i = 0; i < EDIT_POLL_VALID.length; i++) {
      const editInput = EDIT_POLL_VALID[i]
      editInput.pollId = createdPoll.id
      const editedPoll = await editPoll(editInput, createdPoll.token!)
      assertObjectIsAPoll(editedPoll)
      assertPollsAreEqual(editInput, editedPoll)
    }
  })

  it('A poll cannot be edited if invalid input is provided', async () => {
    for (let i = 0; i < EDIT_POLL_INVALID.length; i++) {
      const editInvalidData = EDIT_POLL_INVALID[i]
      const invalidInput = editInvalidData.data
      invalidInput.pollId = createdPoll.id
      try {
        await editPoll(invalidInput, createdPoll.token!)
      } catch (error) {
        const errorMessage = extractErrorMessage(error)
        editInvalidData.includedInErrorMessage.forEach((item) => {
          assert(errorMessage.includes(item))
        })
      }
    }
  })

  it('A poll cannot be edited if owner id (that should reside in token) is missing (i.e. token is missing)', async () => {
    const validInput = EDIT_POLL_VALID[0]
    validInput.pollId = createdPoll.id
    try {
      await editPoll(validInput)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if requester is not the owner of the poll (i.e. owner id is wrong)', async () => {
    const validInput = EDIT_POLL_VALID[0]
    validInput.pollId = createdPoll.id
    const pollInputDataAnotherPoll = { ...POLL_VALID[0], ownerId: uuidv4() }
    const createdPollAnotherPoll = await createPoll(pollInputDataAnotherPoll)
    try {
      await editPoll(validInput, createdPollAnotherPoll.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  after(async () => {
    await closeConnection(DATABASE)
  })
})
