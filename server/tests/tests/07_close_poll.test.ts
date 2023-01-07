import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_INPUT_VALID, POLL_INPUT_VALID } from '../data/polls-data'
import { closePollFromVoting, createPollInDatabase, editPollInDatabase, openPollForVoting } from '../utils/operations'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database-connections'
import { assert } from 'chai'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { getCannotEditPollThatIsNotInEditStateErrorMessage } from '../../utils/error-messages'
import { getErrorMessageFromResponse } from '../utils/helpers'
import { PollFullDataType } from '../../types/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let createdFirstPoll: PollFullDataType
describe('CLOSE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    createdFirstPoll = await createPollInDatabase({ ...POLL_INPUT_VALID[0], ownerId: uuidv4() })
  })

  it('A poll can be closed from voting by the poll owner', async () => {
    const successOpen = await openPollForVoting(createdFirstPoll.id, createdFirstPoll.token!)
    assert(successOpen)
    const successClose = await closePollFromVoting(createdFirstPoll.id, createdFirstPoll.token!)
    assert(successClose)
  })

  it('A poll cannot be closed from voting by others than the poll owner', async () => {
    const secondOwnerId = uuidv4()
    const pollInputSecondOwnerData = { ...POLL_INPUT_VALID[0], ownerId: secondOwnerId }
    const createdPollSecondOwner = await createPollInDatabase(pollInputSecondOwnerData)
    await openPollForVoting(createdPollSecondOwner.id, createdPollSecondOwner.token!)
    try {
      await closePollFromVoting(createdPollSecondOwner.id, createdFirstPoll.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if it has been closed from voting', async () => {
    const successOpen = await openPollForVoting(createdFirstPoll.id, createdFirstPoll.token!)
    assert(successOpen)
    const successClose = await closePollFromVoting(createdFirstPoll.id, createdFirstPoll.token!)
    assert(successClose)
    try {
      const editPollInput = EDIT_POLL_INPUT_VALID[0]
      editPollInput.pollId = createdFirstPoll.id
      await editPollInDatabase(editPollInput, createdFirstPoll.token!)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      assert.include(errorMessage, getCannotEditPollThatIsNotInEditStateErrorMessage())
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
