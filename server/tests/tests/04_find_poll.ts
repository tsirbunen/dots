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

describe('FIND THE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('A newly created poll can be retrieved from database by its id or code', async () => {
    const pollInputData = POLL_INPUT_DATA[0]
    const createdPoll = await createPollInDatabase(pollInputData)
    const pollRetrievedById = await findPollInDatabase({ id: createdPoll.id })
    assertObjectIsAPoll(pollRetrievedById, false)
    const pollRetrievedByCode = await findPollInDatabase({ code: createdPoll.code })
    assertObjectIsAPoll(pollRetrievedByCode, false)
    assertPollFieldsArePracticallySameWhenPresent(pollRetrievedById, pollRetrievedByCode)
  })

  it('A poll with answers and votes can be retrieved from database by its id or code', async () => {
    const pollInputData = POLL_INPUT_DATA[1]
    const createdPoll = await createPollInDatabase(pollInputData)
    for (let i = 0; i < createdPoll.answers.length; i++) {
      const voterName = `Test voter ${i}`
      const selectedAnswerOption = createdPoll.answers[i]
      const giveAVoteInput = {
        answerId: selectedAnswerOption.id,
        voterId: uuidv4(),
        name: voterName
      }
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
    }
    const pollRetrievedById = await findPollInDatabase({ id: createdPoll.id })
    assertObjectIsAPoll(pollRetrievedById, false)
    const pollRetrievedByCode = await findPollInDatabase({ id: createdPoll.id })
    assertObjectIsAPoll(pollRetrievedByCode, false)
    assertPollFieldsArePracticallySameWhenPresent(pollRetrievedById, pollRetrievedByCode)
    assertEachAnswerHasValidVotes(pollRetrievedById)
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
