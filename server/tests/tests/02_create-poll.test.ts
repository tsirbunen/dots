import 'reflect-metadata'
import 'mocha'
import dns from 'dns'
import { POLL_INPUT_DATA } from '../data/polls-data'
import { assertPollFieldsArePracticallySameWhenPresent, assertObjectIsAPoll } from '../utils/assertions'

import { createPollInDatabase } from '../utils/operations'
import { clearDatabase, closeDatabaseConnection, getDatabaseConnection } from '../utils/handle-database'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()

describe('CREATE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('A new poll can be created if proper input data is used in creating the poll', async () => {
    for (let i = 0; i < POLL_INPUT_DATA.length; i++) {
      const pollInputData = POLL_INPUT_DATA[i]
      const createdPoll = await createPollInDatabase(pollInputData)
      assertObjectIsAPoll(createdPoll, false)
      assertPollFieldsArePracticallySameWhenPresent(pollInputData, createdPoll)
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
