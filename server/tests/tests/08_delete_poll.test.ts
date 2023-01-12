import 'reflect-metadata'
import 'mocha'
import dns from 'dns'

import { deletePoll } from '../utils/operations'
import { assertOwnerOptionAndVoteCountsMatchExpected, createPollsByOwnersWithVotes } from '../utils/helpers'

import { getConnection, clearDatabase, closeConnection } from '../utils/handle-database-connections'
import { handleAssertNotAuthenticatedError } from '../../utils/handle-not-authenticated-error'
import { PollFull } from '../../models/poll/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getConnection()
let poll: {
  pollToDelete: PollFull
  personsCount: number
  pollsByOwnerCount: number
  pollsCount: number
  codes: Record<string, string[]>
  totalOptions: number
  totalVotes: number
  optionsToDeleteCount: number
  votesToDeleteCount: number
  lastPoll: PollFull
}

describe('DELETE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    poll = await createPollsByOwnersWithVotes()
  })

  it('A poll (and data related to that poll and only to that poll) can be deleted from database by the poll owner', async () => {
    const pollCodes = poll.codes[poll.pollToDelete.owner.id]
    await assertOwnerOptionAndVoteCountsMatchExpected(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount,
      poll.pollsCount,
      poll.personsCount,
      poll.totalOptions,
      poll.totalVotes,
      pollCodes
    )

    await deletePoll(poll.pollToDelete.id, poll.pollToDelete.token!)

    await assertOwnerOptionAndVoteCountsMatchExpected(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount - 1,
      poll.pollsCount - 1,
      poll.personsCount,
      poll.totalOptions - poll.optionsToDeleteCount,
      poll.totalVotes - poll.votesToDeleteCount,
      pollCodes
    )
  })

  it('Deleting a poll (and data related to that poll) fails if deletion is attempted with a token not containing true poll owner data', async () => {
    try {
      const pollWithAnotherOwner = poll.lastPoll
      await deletePoll(poll.pollToDelete.id, pollWithAnotherOwner.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }
    const pollCodes = poll.codes[poll.pollToDelete.owner.id]
    await assertOwnerOptionAndVoteCountsMatchExpected(
      DATABASE,
      poll.pollToDelete,
      poll.pollsByOwnerCount,
      poll.pollsCount,
      poll.personsCount,
      poll.totalOptions,
      poll.totalVotes,
      pollCodes
    )
  })
  after(async () => {
    await closeConnection(DATABASE)
  })
})
