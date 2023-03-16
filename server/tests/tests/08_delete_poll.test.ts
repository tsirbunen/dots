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
let data: {
  ownerPollsData: { ownerId: string; polls: PollFull[] }[]
  pollToDelete: PollFull
  personsCount: number
  pollsByOwnerCount: number
  pollsCount: number
  totalOptions: number
  totalVotes: number
  optionsToDeleteCount: number
  votesToDeleteCount: number
  lastPoll: PollFull
}

describe('DELETE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    data = await createPollsByOwnersWithVotes()
  })

  it('A poll (and data related to that poll and only to that poll) can be deleted from database by the poll owner', async () => {
    const ownerData = data.ownerPollsData.find((item) => item.ownerId === data.pollToDelete.owner.id)
    await assertOwnerOptionAndVoteCountsMatchExpected(
      DATABASE,
      ownerData!.polls as PollFull[],
      undefined,
      data.pollsByOwnerCount,
      data.pollsCount,
      data.personsCount,
      data.totalOptions,
      data.totalVotes
    )

    await deletePoll(data.pollToDelete.id, data.pollToDelete.token!)

    await assertOwnerOptionAndVoteCountsMatchExpected(
      DATABASE,
      ownerData!.polls as PollFull[],
      data.pollToDelete,
      data.pollsByOwnerCount - 1,
      data.pollsCount - 1,
      data.personsCount,
      data.totalOptions - data.optionsToDeleteCount,
      data.totalVotes - data.votesToDeleteCount
    )
  })

  it('Deleting a poll (and data related to that poll) fails if deletion is attempted with a token not containing true poll owner data', async () => {
    try {
      const pollWithAnotherOwner = data.lastPoll
      await deletePoll(data.pollToDelete.id, pollWithAnotherOwner.token!)
    } catch (error) {
      handleAssertNotAuthenticatedError(error)
    }

    const ownerData = data.ownerPollsData.find((item) => item.ownerId === data.pollToDelete.owner.id)

    await assertOwnerOptionAndVoteCountsMatchExpected(
      DATABASE,
      ownerData!.polls as PollFull[],
      undefined,
      data.pollsByOwnerCount,
      data.pollsCount,
      data.personsCount,
      data.totalOptions,
      data.totalVotes
    )
  })
  after(async () => {
    await closeConnection(DATABASE)
  })
})
