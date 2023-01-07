import 'reflect-metadata'
import { v4 as uuidv4 } from 'uuid'
import 'mocha'
import dns from 'dns'
import { POLL_INPUT_VALID } from '../data/polls-data'
import {
  closePollFromVoting,
  createPollInDatabase,
  giveAVoteToOption,
  giveMaxNumberOfVotesByPersonInPoll,
  openPollForVoting
} from '../utils/operations'
import { assertObjectIsAVote, assertVoteIsForCorrectOption } from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database-connections'
import { assert, expect } from 'chai'
import {
  getCannotVoteInPollIfPollNotInVoteStateErrorMessage,
  getMaxVotesPerOptionAlreadyGivenErrorMessage,
  getMaxVotesPerPollAlreadyGivenErrorMessage,
  getOptionWithThisIdDoesNotExistErrorMessage
} from '../../utils/error-messages'
import { getErrorMessageFromResponse } from '../utils/helpers'
import { CreatePollInputType, PollFullDataType } from '../../types/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()
let pollInputData: CreatePollInputType
let createdPoll: PollFullDataType

describe('VOTE IN POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    pollInputData = { ...POLL_INPUT_VALID[0], ownerId: uuidv4() }
    createdPoll = await createPollInDatabase({ ...POLL_INPUT_VALID[0], ownerId: uuidv4() })
  })

  it('Votes can be given to options of a poll when max vote counts (per person) have not been reached', async () => {
    await openPollForVoting(createdPoll.id, createdPoll.token!)
    for (let personCount = 0; personCount < 2; personCount++) {
      for (let index = 0; index < pollInputData.options.length; index++) {
        const selectedOptionToVoteId = createdPoll.options[index].id
        const giveAVoteInput = {
          optionId: selectedOptionToVoteId,
          voterId: uuidv4(),
          name: `Voter number ${index}`
        }
        const vote = await giveAVoteToOption(giveAVoteInput)
        assertObjectIsAVote(vote)
        assertVoteIsForCorrectOption(vote, selectedOptionToVoteId)
      }
    }
  })

  it('Voting an option fails if the max vote count PER OPTION per person (by voter) has been reached', async () => {
    await openPollForVoting(createdPoll.id, createdPoll.token!)
    const selectedOptionToVoteId = createdPoll.options[0].id
    const maxVotesPerOption = createdPoll.optionVotesCountMax
    const personsVoting = 2
    let giveAVoteInput: { optionId: string; voterId: string }
    for (let i = 0; i < personsVoting; i++) {
      let voterId = uuidv4()
      giveAVoteInput = {
        optionId: selectedOptionToVoteId,
        voterId: voterId
      }
      for (let i = 0; i < maxVotesPerOption; i++) {
        await giveAVoteToOption(giveAVoteInput)
      }
    }

    try {
      await giveAVoteToOption(giveAVoteInput!)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getMaxVotesPerOptionAlreadyGivenErrorMessage(maxVotesPerOption))
    }
  })

  it('Voting an option fails if the max vote count PER POLL per person has been reached', async () => {
    await openPollForVoting(createdPoll.id, createdPoll.token!)
    const voterAId = uuidv4()
    let optionTracker = { index: 0 }
    await giveMaxNumberOfVotesByPersonInPoll(createdPoll, voterAId, optionTracker)
    const voterBId = uuidv4()
    optionTracker.index = 0
    await giveMaxNumberOfVotesByPersonInPoll(createdPoll, voterBId, optionTracker)

    try {
      const giveAVoteInput = {
        optionId: createdPoll.options[optionTracker.index].id,
        voterId: voterAId
      }
      await giveAVoteToOption(giveAVoteInput)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getMaxVotesPerPollAlreadyGivenErrorMessage(createdPoll.totalVotesCountMax))
    }
  })

  it('A vote cannot be given in a poll if that poll is not in the "voting" state', async () => {
    const voterId = uuidv4()
    const giveAVoteInput = {
      optionId: createdPoll.options[0].id,
      voterId: voterId
    }

    try {
      await giveAVoteToOption(giveAVoteInput)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      assert.include(errorMessage, getCannotVoteInPollIfPollNotInVoteStateErrorMessage())
    }

    await openPollForVoting(createdPoll.id, createdPoll.token!)
    await closePollFromVoting(createdPoll.id, createdPoll.token!)

    try {
      await giveAVoteToOption(giveAVoteInput)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      assert.include(errorMessage, getCannotVoteInPollIfPollNotInVoteStateErrorMessage())
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
      const errorMessage = getErrorMessageFromResponse(error)
      assert.include(errorMessage, getOptionWithThisIdDoesNotExistErrorMessage(nonExistingOptionId))
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
