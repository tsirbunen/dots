import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_INPUT_VALID_DATA, POLL_INPUT_DATA } from '../data/polls-data'
import { closePollFromVoting, createPollInDatabase, editPollInDatabase, openPollForVoting } from '../utils/operations'

import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'

import { assert } from 'chai'

import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { getCannotEditPollThatIsNotInEditStateErrorMessage } from '../../utils/error-messages'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()

describe('OPEN POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('A poll can be closed from voting by the poll owner', async () => {
    const ownerId = uuidv4()
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId }
    const createdPoll = await createPollInDatabase(pollInputData)
    const successOpen = await openPollForVoting(createdPoll.id, createdPoll.token!)
    assert(successOpen)
    const successClose = await closePollFromVoting(createdPoll.id, createdPoll.token!)
    assert(successClose)
  })

  it('A poll cannot be closed from voting by others than the poll owner', async () => {
    const falseOwnerId = uuidv4()
    let pollInputData = { ...POLL_INPUT_DATA[0], ownerId: falseOwnerId }
    const createdPollFalseOwner = await createPollInDatabase(pollInputData)

    const trueOwnerId = uuidv4()
    pollInputData = { ...POLL_INPUT_DATA[0], ownerId: trueOwnerId }
    const createdPollTrueOwner = await createPollInDatabase(pollInputData)
    await openPollForVoting(createdPollTrueOwner.id, createdPollTrueOwner.token!)
    try {
      await closePollFromVoting(createdPollFalseOwner.id, createdPollFalseOwner.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if it has been closed from voting', async () => {
    const ownerId = uuidv4()
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId }
    const createdPoll = await createPollInDatabase(pollInputData)
    const successOpen = await openPollForVoting(createdPoll.id, createdPoll.token!)
    assert(successOpen)
    const successClose = await closePollFromVoting(createdPoll.id, createdPoll.token!)
    assert(successClose)
    try {
      const editPollInput = EDIT_POLL_INPUT_VALID_DATA[0]
      editPollInput.pollId = createdPoll.id
      await editPollInDatabase(editPollInput, createdPoll.token!)
    } catch (error) {
      const errorResponse = error as { response: { errors: { message: string }[] } }
      const errorMessage = errorResponse.response.errors[0].message
      assert.include(errorMessage, getCannotEditPollThatIsNotInEditStateErrorMessage())
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
