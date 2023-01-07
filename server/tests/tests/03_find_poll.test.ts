import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { POLL_INPUT_VALID } from '../data/polls-data'
import { createPollInDatabase, findAllOwnerPollsInDatabase, findPollInDatabase } from '../utils/operations'
import { assertObjectIsAPoll, assertPollsArePracticallyEqual, assertTokenIsPresent } from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database-connections'
import { PollFullDataType } from '../../types/types'
import { createPollsInDatabaseForMultipleOwners, getErrorMessageFromResponse } from '../utils/helpers'
import { assert, expect } from 'chai'
import { getPollWithThisIdDoesNotExistErrorMessage } from '../../utils/error-messages'
import { createRandomCode } from '../../utils/create-random-code'
import { RANDOM_CODE_LENGTH } from '../../utils/constant-values'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let createdPoll: PollFullDataType
describe('FIND POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    const pollInputData = { ...POLL_INPUT_VALID[0], ownerId: uuidv4() }
    createdPoll = await createPollInDatabase(pollInputData)
  })

  it('A newly created poll can be retrieved from database by its id', async () => {
    const pollRetrievedById = await findPollInDatabase({ id: createdPoll.id })
    assertObjectIsAPoll(pollRetrievedById)
    assertPollsArePracticallyEqual(pollRetrievedById, createdPoll)
  })

  it('A newly created poll can be retrieved from database by its code', async () => {
    const pollRetrievedByCode = await findPollInDatabase({ code: createdPoll.code })
    assertObjectIsAPoll(pollRetrievedByCode)
    assertPollsArePracticallyEqual(pollRetrievedByCode, createdPoll)
  })

  it('Finding a poll fails if wrong poll ID is given', async () => {
    const invalidPollId = uuidv4()
    try {
      await findPollInDatabase({ id: invalidPollId })
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getPollWithThisIdDoesNotExistErrorMessage(invalidPollId))
    }
  })

  it('Finding a poll fails if wrong poll CODE is given', async () => {
    const invalidPollCode = createRandomCode(RANDOM_CODE_LENGTH)
    try {
      await findPollInDatabase({ code: invalidPollCode })
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getPollWithThisIdDoesNotExistErrorMessage(invalidPollCode))
    }
  })
  it('All polls of an owner can be queried (and only polls by that owner have a token)', async () => {
    const { ownerIds, tokens, codes } = await createPollsInDatabaseForMultipleOwners()

    for (let ownerIndex = 0; ownerIndex < ownerIds.length; ownerIndex++) {
      const ownerId = ownerIds[ownerIndex]
      const ownerPollCodes = codes[ownerId]
      const polls = await findAllOwnerPollsInDatabase(tokens[ownerIndex], ownerPollCodes)
      const pollsByOwner = polls.filter((poll) => poll.token)
      assert(pollsByOwner.length === POLL_INPUT_VALID.length)
      for (let pollIndex = 0; pollIndex < pollsByOwner.length; pollIndex++) {
        assertObjectIsAPoll(pollsByOwner[pollIndex])
        assert(pollsByOwner[pollIndex].owner.id === ownerIds[ownerIndex])
      }
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
