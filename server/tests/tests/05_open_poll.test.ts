import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_VALID, POLL_VALID } from '../data/polls-data'
import { createPoll, editPoll, openPollForVoting } from '../utils/operations'
import { getConnection, clearDatabase, closeConnection } from '../utils/handle-database-connections'
import { assert } from 'chai'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { Errors } from '../../utils/errors'
import { extractErrorMessage } from '../utils/helpers'
import { PollState } from '../../types/graphql-schema-types.generated'
import { PollFull } from '../../models/poll/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getConnection()
let firstPoll: PollFull

describe('OPEN POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    firstPoll = await createPoll({ ...POLL_VALID[0], ownerId: uuidv4() })
  })

  it('A poll can be opened for voting by the poll owner', async () => {
    const success = await openPollForVoting(firstPoll.id, firstPoll.token!)
    assert(success.state === PollState.Vote)
  })

  it('A poll cannot be opened for voting by others than the poll owner', async () => {
    const secondOwnerId = uuidv4()
    const inputSecondOwner = { ...POLL_VALID[0], ownerId: secondOwnerId }
    const pollBySecondOwner = await createPoll(inputSecondOwner)
    try {
      await openPollForVoting(pollBySecondOwner.id, firstPoll.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if it has been opened for voting', async () => {
    const success = await openPollForVoting(firstPoll.id, firstPoll.token!)
    assert(success.state === PollState.Vote)
    try {
      const input = EDIT_POLL_VALID[0]
      input.pollId = firstPoll.id
      await editPoll(input, firstPoll.token!)
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      assert.include(errorMessage, Errors.pollNotInEditState)
    }
  })

  after(async () => {
    await closeConnection(DATABASE)
  })
})
