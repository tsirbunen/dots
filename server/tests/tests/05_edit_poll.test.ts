import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { POLL_INPUT_DATA } from '../data/polls-data'
import { createPollInDatabase, findPollInDatabase, giveAVoteToAnswerOptionInDatabase } from '../utils/operations'
import {
  assertEachAnswerHasValidVotes,
  assertObjectIsAPoll,
  assertPollFieldsArePracticallySameWhenPresent
} from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()

describe('EDIT THE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('A newly created poll can be retrieved from database by its id or code', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    const createdPoll = await createPollInDatabase(pollInputData)
    const pollRetrievedById = await findPollInDatabase({ id: createdPoll.id })
    assertObjectIsAPoll(pollRetrievedById, false)
    const pollRetrievedByCode = await findPollInDatabase({ code: createdPoll.code })
    assertObjectIsAPoll(pollRetrievedByCode, false)
    assertPollFieldsArePracticallySameWhenPresent(pollRetrievedById, pollRetrievedByCode)
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
