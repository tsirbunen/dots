import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { EDIT_POLL_VALID, POLL_VALID } from '../data/polls-data'
import { closePoll, createPoll, editPoll, openPollForVoting } from '../utils/operations'
import { getConnection, clearDatabase, closeConnection } from '../utils/handle-database-connections'
import { assert } from 'chai'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { Errors } from '../../utils/errors'
import { extractErrorMessage } from '../utils/helpers'
import { PollFull } from '../../models/poll/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getConnection()
let firstPoll: PollFull
describe('CLOSE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    firstPoll = await createPoll({ ...POLL_VALID[0], ownerId: uuidv4() })
  })

  it('A poll can be closed from voting by the poll owner', async () => {
    const successOpen = await openPollForVoting(firstPoll.id, firstPoll.token!)
    assert(successOpen)
    const successClose = await closePoll(firstPoll.id, firstPoll.token!)
    assert(successClose)
  })

  it('A poll cannot be closed from voting by others than the poll owner', async () => {
    const secondOwnerId = uuidv4()
    const secondOwnerData = { ...POLL_VALID[0], ownerId: secondOwnerId }
    const pollSecondOwner = await createPoll(secondOwnerData)
    await openPollForVoting(pollSecondOwner.id, pollSecondOwner.token!)
    try {
      await closePoll(pollSecondOwner.id, firstPoll.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
  })

  it('A poll cannot be edited if it has been closed from voting', async () => {
    const successOpen = await openPollForVoting(firstPoll.id, firstPoll.token!)
    assert(successOpen)
    const successClose = await closePoll(firstPoll.id, firstPoll.token!)
    assert(successClose)
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
