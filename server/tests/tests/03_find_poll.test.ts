import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { POLL_INPUT_DATA } from '../data/polls-data'
import { createPollInDatabase, findAllOwnerPollsInDatabase, findPollInDatabase } from '../utils/operations'
import {
  assertObjectIsAPoll,
  assertPollFieldsArePracticallyEqualWhenPresent,
  assertTokenIsPresent
} from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'
import { assert } from 'console'
import { PollFullDataType } from '../../types/types'
import { getErrorMessageFromResponse } from '../utils/helpers'
import { expect } from 'chai'
import { getValidOwnerWithThisIdOrCodeDoesNotExistErrorMessage } from '../../utils/error-messages'
import { createRandomCode } from '../../utils/create-random-code'
import { RANDOM_CODE_LENGTH } from '../../utils/constant-values'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let createdPoll: PollFullDataType
describe('FIND POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    createdPoll = await createPollInDatabase(pollInputData)
  })

  it('A newly created poll can be retrieved from database by its id or code', async () => {
    const pollRetrievedById = await findPollInDatabase({ id: createdPoll.id })
    assertObjectIsAPoll(pollRetrievedById)
    const pollRetrievedByCode = await findPollInDatabase({ code: createdPoll.code })
    assertObjectIsAPoll(pollRetrievedByCode)
    assertPollFieldsArePracticallyEqualWhenPresent(pollRetrievedById, pollRetrievedByCode)
  })

  it('Finding a poll fails if wrong poll ID is given', async () => {
    const invalidPollId = uuidv4()
    try {
      await findPollInDatabase({ id: invalidPollId })
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getValidOwnerWithThisIdOrCodeDoesNotExistErrorMessage(invalidPollId))
    }
  })

  it('Finding a poll fails if wrong poll CODE is given', async () => {
    const invalidPollCode = createRandomCode(RANDOM_CODE_LENGTH)
    try {
      await findPollInDatabase({ code: invalidPollCode })
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getValidOwnerWithThisIdOrCodeDoesNotExistErrorMessage(invalidPollCode))
    }
  })
  it('All polls of one owner can be queried (and only polls by that owner are retrieved)', async () => {
    const ownerIds: string[] = []
    const tokens: string[] = []
    for (let ownerIndex = 0; ownerIndex < 3; ownerIndex++) {
      const ownerId = uuidv4()
      ownerIds.push(ownerId)
      for (let inputIndex = 0; inputIndex < POLL_INPUT_DATA.length; inputIndex++) {
        const pollInputData = { ...POLL_INPUT_DATA[inputIndex], ownerId }
        const createdPoll = await createPollInDatabase(pollInputData)
        if (inputIndex === POLL_INPUT_DATA.length - 1) {
          tokens.push(createdPoll.token!)
        }
      }
    }
    for (let ownerIndex = 0; ownerIndex < ownerIds.length; ownerIndex++) {
      const pollsByOwner = await findAllOwnerPollsInDatabase(tokens[ownerIndex])
      assert(pollsByOwner.length === POLL_INPUT_DATA.length)
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
