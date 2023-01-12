import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { POLL_VALID } from '../data/polls-data'
import { createPoll, findPollsByCode, findPoll } from '../utils/operations'
import { assertObjectIsAPoll, assertPollsAreEqual, assertTokenIsPresent } from '../utils/assertions'
import { getConnection, clearDatabase, closeConnection } from '../utils/handle-database-connections'
import { createPollsForMultipleOwners, extractErrorMessage } from '../utils/helpers'
import { assert, expect } from 'chai'
import { Errors } from '../../utils/errors'
import { createRandomCode } from '../../utils/create-random-code'
import { RANDOM_CODE_LENGTH } from '../../utils/constant-values'
import { PollFull } from '../../models/poll/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getConnection()
let poll: PollFull
describe('FIND POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    const pollInputData = { ...POLL_VALID[0], ownerId: uuidv4() }
    poll = await createPoll(pollInputData)
  })

  it('A newly created poll can be retrieved from database by its code', async () => {
    const retrievedPoll = await findPoll(poll.code)
    assertObjectIsAPoll(retrievedPoll)
    assertPollsAreEqual(retrievedPoll, poll)
  })

  it('Finding a poll fails if wrong poll CODE is given', async () => {
    const invalidPollCode = createRandomCode(RANDOM_CODE_LENGTH)
    try {
      await findPoll(invalidPollCode)
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      expect(errorMessage).to.equal(Errors.pollDoesNotExist(invalidPollCode))
    }
  })
  it('All polls of an owner can be queried (and only polls by that owner have a token)', async () => {
    const { ownerIds, tokens, codes } = await createPollsForMultipleOwners()

    for (let ownerIndex = 0; ownerIndex < ownerIds.length; ownerIndex++) {
      const ownerId = ownerIds[ownerIndex]
      const ownerPollCodes = codes[ownerId]
      const polls = await findPollsByCode(tokens[ownerIndex], ownerPollCodes)
      const pollsByOwner = polls.filter((poll) => poll.token)
      assert(pollsByOwner.length === POLL_VALID.length)
      for (let pollIndex = 0; pollIndex < pollsByOwner.length; pollIndex++) {
        assertObjectIsAPoll(pollsByOwner[pollIndex])
        assert(pollsByOwner[pollIndex].owner.id === ownerIds[ownerIndex])
      }
    }
  })

  after(async () => {
    await closeConnection(DATABASE)
  })
})
