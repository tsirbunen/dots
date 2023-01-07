import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_INPUT_VALID, POLL_INPUT_VALID } from '../data/polls-data'
import { createPollInDatabase, editPollInDatabase, openPollForVoting } from '../utils/operations'

import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database-connections'

import { assert } from 'chai'

import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { getCannotEditPollThatIsNotInEditStateErrorMessage } from '../../utils/error-messages'
import { getErrorMessageFromResponse } from '../utils/helpers'
import { PollFullDataType, PollState } from '../../types/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let createdFirstPoll: PollFullDataType

describe('OPEN POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    createdFirstPoll = await createPollInDatabase({ ...POLL_INPUT_VALID[0], ownerId: uuidv4() })
  })

  it('A poll can be opened for voting by the poll owner', async () => {
    const success = await openPollForVoting(createdFirstPoll.id, createdFirstPoll.token!)
    assert(success.state === PollState.VOTE)
  })

  it('A poll cannot be opened for voting by others than the poll owner', async () => {
    const secondOwnerId = uuidv4()
    const pollInputDataSecondOwner = { ...POLL_INPUT_VALID[0], ownerId: secondOwnerId }
    const createdPollSecondOwner = await createPollInDatabase(pollInputDataSecondOwner)
    try {
      await openPollForVoting(createdPollSecondOwner.id, createdFirstPoll.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if it has been opened for voting', async () => {
    const success = await openPollForVoting(createdFirstPoll.id, createdFirstPoll.token!)
    assert(success.state === PollState.VOTE)
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
