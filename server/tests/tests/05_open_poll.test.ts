import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_INPUT_VALID_DATA, POLL_INPUT_DATA } from '../data/polls-data'
import { createPollInDatabase, editPollInDatabase, openPollForVoting } from '../utils/operations'

import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'

import { assert } from 'chai'

import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { getCannotEditPollThatIsNotInEditStateErrorMessage } from '../../utils/error-messages'
import { getErrorMessageFromResponse } from '../utils/helpers'
import { PollFullDataType } from '../../types/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let createdFirstPoll: PollFullDataType

describe('OPEN POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    createdFirstPoll = await createPollInDatabase({ ...POLL_INPUT_DATA[0], ownerId: uuidv4() })
  })

  it('A poll can be opened for voting by the poll owner', async () => {
    const success = await openPollForVoting(createdFirstPoll.id, createdFirstPoll.token!)
    assert(success)
  })

  it('A poll cannot be opened for voting by others than the poll owner', async () => {
    const secondOwnerId = uuidv4()
    const pollInputDataSecondOwner = { ...POLL_INPUT_DATA[0], ownerId: secondOwnerId }
    const createdPollSecondOwner = await createPollInDatabase(pollInputDataSecondOwner)
    try {
      await openPollForVoting(createdPollSecondOwner.id, createdFirstPoll.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if it has been opened for voting', async () => {
    const success = await openPollForVoting(createdFirstPoll.id, createdFirstPoll.token!)
    assert(success)
    try {
      const editPollInput = EDIT_POLL_INPUT_VALID_DATA[0]
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
