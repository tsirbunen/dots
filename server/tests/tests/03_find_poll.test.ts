import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { POLL_INPUT_DATA } from '../data/polls-data'
import { createPollInDatabase, findAllOwnerPollsInDatabase, findPollInDatabase } from '../utils/operations'
import {
  assertObjectIsAPoll,
  assertPollFieldsArePracticallySameWhenPresent,
  assertTokenIsPresent
} from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'
import { assert } from 'console'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()

describe('FIND POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('A newly created poll can be retrieved from database by its id or code', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    const createdPoll = await createPollInDatabase(pollInputData)
    const pollRetrievedById = await findPollInDatabase({ id: createdPoll.id })
    assertObjectIsAPoll(pollRetrievedById)
    const pollRetrievedByCode = await findPollInDatabase({ code: createdPoll.code })
    assertObjectIsAPoll(pollRetrievedByCode)
    assertPollFieldsArePracticallySameWhenPresent(pollRetrievedById, pollRetrievedByCode)
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
          assertTokenIsPresent(createdPoll)
          const token = createdPoll.token!
          tokens.push(token)
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
