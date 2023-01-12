import 'reflect-metadata'
import { v4 as uuidv4 } from 'uuid'
import 'mocha'
import dns from 'dns'
import { POLL_VALID } from '../data/polls-data'
import {
  closePoll,
  createPoll,
  giveAVoteToOption,
  giveMaxNumberOfVotesForPerson,
  openPollForVoting
} from '../utils/operations'
import { assertObjectIsAVote, assertVoteIsForCorrectOption } from '../utils/assertions'
import { getConnection, clearDatabase, closeConnection } from '../utils/handle-database-connections'
import { assert, expect } from 'chai'
import { Errors } from '../../utils/errors'
import { extractErrorMessage } from '../utils/helpers'

import { CreatePollInput } from '../../types/graphql-schema-types.generated'
import { PollFull } from '../../models/poll/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getConnection()
let pollInputData: CreatePollInput
let poll: PollFull

describe('VOTE IN POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    pollInputData = { ...POLL_VALID[0], ownerId: uuidv4() }
    poll = await createPoll({ ...POLL_VALID[0], ownerId: uuidv4() })
  })

  it('Votes can be given to options of a poll when max vote counts (per person) have not been reached', async () => {
    await openPollForVoting(poll.id, poll.token!)
    for (let personCount = 0; personCount < 2; personCount++) {
      for (let index = 0; index < pollInputData.options.length; index++) {
        const selectedOptionId = poll.options[index].id
        const giveAVoteInput = {
          optionId: selectedOptionId,
          voterId: uuidv4(),
          name: `Voter number ${index}`
        }
        const vote = await giveAVoteToOption(giveAVoteInput)
        assertObjectIsAVote(vote)
        assertVoteIsForCorrectOption(vote, selectedOptionId)
      }
    }
  })

  it('Voting an option fails if the max vote count PER OPTION per person (by voter) has been reached', async () => {
    await openPollForVoting(poll.id, poll.token!)
    const selectedOptionId = poll.options[0].id
    const maxPerOption = poll.optionVotesCountMax
    const personsVoting = 2
    let giveAVoteInput: { optionId: string; voterId: string }
    for (let i = 0; i < personsVoting; i++) {
      let voterId = uuidv4()
      giveAVoteInput = {
        optionId: selectedOptionId,
        voterId: voterId
      }
      for (let i = 0; i < maxPerOption; i++) {
        await giveAVoteToOption(giveAVoteInput)
      }
    }

    try {
      await giveAVoteToOption(giveAVoteInput!)
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      expect(errorMessage).to.equal(Errors.maxVotesPerOptionAlready(maxPerOption))
    }
  })

  it('Voting an option fails if the max vote count PER POLL per person has been reached', async () => {
    await openPollForVoting(poll.id, poll.token!)
    const voterAId = uuidv4()
    let optionTracker = { index: 0 }
    await giveMaxNumberOfVotesForPerson(poll, voterAId, optionTracker)
    const voterBId = uuidv4()
    optionTracker.index = 0
    await giveMaxNumberOfVotesForPerson(poll, voterBId, optionTracker)

    try {
      const giveAVoteInput = {
        optionId: poll.options[optionTracker.index].id,
        voterId: voterAId
      }
      await giveAVoteToOption(giveAVoteInput)
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      expect(errorMessage).to.equal(Errors.maxVotesPerPollAlreadyGiven(poll.totalVotesCountMax))
    }
  })

  it('A vote cannot be given in a poll if that poll is not in the "voting" state', async () => {
    const voterId = uuidv4()
    const giveAVoteInput = {
      optionId: poll.options[0].id,
      voterId: voterId
    }

    try {
      await giveAVoteToOption(giveAVoteInput)
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      assert.include(errorMessage, Errors.pollNotInVoteState)
    }

    await openPollForVoting(poll.id, poll.token!)
    await closePoll(poll.id, poll.token!)

    try {
      await giveAVoteToOption(giveAVoteInput)
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      assert.include(errorMessage, Errors.pollNotInVoteState)
    }
  })

  it('A vote cannot be given if an option with the optionId provided does not exist', async () => {
    const nonExistingOptionId = uuidv4()
    const giveAVoteInput = {
      optionId: nonExistingOptionId,
      voterId: uuidv4()
    }

    try {
      await giveAVoteToOption(giveAVoteInput)
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      assert.include(errorMessage, Errors.failedToFindPollByOptionId(nonExistingOptionId))
    }
  })

  after(async () => {
    await closeConnection(DATABASE)
  })
})
