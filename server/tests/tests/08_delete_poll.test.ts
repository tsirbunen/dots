import 'reflect-metadata'
import 'mocha'
import dns from 'dns'

import { deletePollFromDatabase } from '../utils/operations'
import {
  assertPollOwnerOptionAndVoteCountsInDatabaseMatchExpectedCounts,
  createPollsByDifferentOwnersEachWithVotesForOptionsInDatabase
} from '../utils/helpers'

import {
  getDatabaseConnection,
  clearDatabase,
  closeDatabaseConnection,
  getAllPollsInDatabase
} from '../utils/handle-database-connections'

import { PollFullDataType } from '../../types/types'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let poll: {
  pollToDelete: PollFullDataType
  personsCount: number
  pollsByOwnerCount: number
  pollsCount: number
  codes: Record<string, string[]>
  totalNumberOfOptions: number
  totalNumberOfVotes: number
  optionsInPollToDeleteCount: number
  votesInPollToDeleteCount: number
  lastPoll: PollFullDataType
}

describe('DELETE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    poll = await createPollsByDifferentOwnersEachWithVotesForOptionsInDatabase()
  })

  it('A poll (and data related to that poll and only to that poll) can be deleted from database by the poll owner', async () => {
    const pollCodes = poll.codes[poll.pollToDelete.owner.id]
    await assertPollOwnerOptionAndVoteCountsInDatabaseMatchExpectedCounts(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount,
      poll.pollsCount,
      poll.personsCount,
      poll.totalNumberOfOptions,
      poll.totalNumberOfVotes,
      pollCodes
    )

    await deletePollFromDatabase(poll.pollToDelete.id, poll.pollToDelete.token!)

    await assertPollOwnerOptionAndVoteCountsInDatabaseMatchExpectedCounts(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount - 1,
      poll.pollsCount - 1,
      poll.personsCount,
      poll.totalNumberOfOptions - poll.optionsInPollToDeleteCount,
      poll.totalNumberOfVotes - poll.votesInPollToDeleteCount,
      pollCodes
    )
  })

  it('Deleting a poll (and data related to that poll) fails if deletion is attempted with a token not containing true poll owner data', async () => {
    try {
      const pollWithAnotherOwner = poll.lastPoll
      await deletePollFromDatabase(poll.pollToDelete.id, pollWithAnotherOwner.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
    const pollCodes = poll.codes[poll.pollToDelete.owner.id]
    await assertPollOwnerOptionAndVoteCountsInDatabaseMatchExpectedCounts(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount,
      poll.pollsCount,
      poll.personsCount,
      poll.totalNumberOfOptions,
      poll.totalNumberOfVotes,
      pollCodes
    )
  })
  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
