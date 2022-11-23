import 'reflect-metadata'
import 'mocha'
import dns from 'dns'

import { deletePollFromDatabase } from '../utils/operations'
import {
  assertPollOwnerAnswerAndVoteCountsInDatabaseMatchExpectedCounts,
  createPollsByDifferentOwnersEachWithVotesForAnswersInDatabase
} from '../utils/helpers'

import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'

import { PollFullDataType } from '../../types/types'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let poll: {
  pollToDelete: PollFullDataType
  ownersCount: number
  pollsByOwnerCount: number
  pollsCount: number
  totalNumberOfAnswers: number
  totalNumberOfVotes: number
  answersInPollToDeleteCount: number
  votesInPollToDeleteCount: number
  lastPoll: PollFullDataType
}

describe('DELETE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    poll = await createPollsByDifferentOwnersEachWithVotesForAnswersInDatabase()
  })

  it('A poll (and data related to that poll and only to that poll) can be deleted from database by the poll owner', async () => {
    await assertPollOwnerAnswerAndVoteCountsInDatabaseMatchExpectedCounts(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount,
      poll.pollsCount,
      poll.ownersCount,
      poll.totalNumberOfAnswers,
      poll.totalNumberOfVotes
    )

    await deletePollFromDatabase(poll.pollToDelete.id, poll.pollToDelete.token!)

    await assertPollOwnerAnswerAndVoteCountsInDatabaseMatchExpectedCounts(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount - 1,
      poll.pollsCount - 1,
      poll.ownersCount,
      poll.totalNumberOfAnswers - poll.answersInPollToDeleteCount,
      poll.totalNumberOfVotes - poll.votesInPollToDeleteCount
    )
  })

  it('Deleting a poll (and data related to that poll) fails if deletion is attempted with a token not containing true poll owner data', async () => {
    try {
      const pollWithAnotherOwner = poll.lastPoll
      await deletePollFromDatabase(poll.pollToDelete.id, pollWithAnotherOwner.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
    await assertPollOwnerAnswerAndVoteCountsInDatabaseMatchExpectedCounts(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount,
      poll.pollsCount,
      poll.ownersCount,
      poll.totalNumberOfAnswers,
      poll.totalNumberOfVotes
    )
  })
  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
