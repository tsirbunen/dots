import 'reflect-metadata'
import { v4 as uuidv4 } from 'uuid'
import 'mocha'
import dns from 'dns'
import { POLL_INPUT_DATA } from '../data/polls-data'
import {
  closePollFromVoting,
  createPollInDatabase,
  giveAVoteToAnswerOptionInDatabase,
  giveMaxNumberOfVotesByPersonInPoll,
  openPollForVoting
} from '../utils/operations'
import { assertObjectIsAVote, assertVoteIsForCorrectAnswerOption } from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'
import { assert, expect } from 'chai'
import {
  getCannotVoteInPollIfPollNotInVoteStateErrorMessage,
  getMaxVotesPerAnswerAlreadyGivenErrorMessage,
  getMaxVotesPerPollAlreadyGivenErrorMessage,
  getValidAnswerWithThisIdDoesNotExistErrorMessage
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
    pollInputData = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    createdPoll = await createPollInDatabase({ ...POLL_INPUT_DATA[0], ownerId: uuidv4() })
  })

  it('Votes can be given to answer options of an existing poll when max vote counts (per person) have not been reached', async () => {
    await openPollForVoting(createdPoll.id, createdPoll.token!)
    for (let personCount = 0; personCount < 2; personCount++) {
      for (let answerIndex = 0; answerIndex < pollInputData.answers.length; answerIndex++) {
        const selectedAnswerToVoteId = createdPoll.answers[answerIndex].id
        const giveAVoteInput = {
          answerId: selectedAnswerToVoteId,
          voterId: uuidv4(),
          name: `Voter number ${answerIndex}`
        }
        const vote = await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
        assertObjectIsAVote(vote)
        assertVoteIsForCorrectAnswerOption(vote, selectedAnswerToVoteId)
      }
    }
  })

  it('Voting an answer option fails if the max vote count PER ANSWER per person (by voter) has been reached', async () => {
    await openPollForVoting(createdPoll.id, createdPoll.token!)
    const selectedAnswerToVoteId = createdPoll.answers[0].id
    const maxVotesPerAnswerOption = createdPoll.optionVotesCountMax
    const personsVoting = 2
    let giveAVoteInput: { answerId: string; voterId: string }
    for (let i = 0; i < personsVoting; i++) {
      let voterId = uuidv4()
      giveAVoteInput = {
        answerId: selectedAnswerToVoteId,
        voterId: voterId
      }
      for (let i = 0; i < maxVotesPerAnswerOption; i++) {
        await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
      }
    }

    try {
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput!)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getMaxVotesPerAnswerAlreadyGivenErrorMessage(maxVotesPerAnswerOption))
    }
  })

  it('Voting an answer option fails if the max vote count PER POLL per person has been reached', async () => {
    await openPollForVoting(createdPoll.id, createdPoll.token!)
    const voterAId = uuidv4()
    let answerTracker = { index: 0 }
    await giveMaxNumberOfVotesByPersonInPoll(createdPoll, voterAId, answerTracker)
    const voterBId = uuidv4()
    answerTracker.index = 0
    await giveMaxNumberOfVotesByPersonInPoll(createdPoll, voterBId, answerTracker)

    try {
      const giveAVoteInput = {
        answerId: createdPoll.answers[answerTracker.index].id,
        voterId: voterAId
      }
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getMaxVotesPerPollAlreadyGivenErrorMessage(createdPoll.totalVotesCountMax))
    }
  })

  it('A vote cannot be given in a poll if that poll is not in the "voting" state', async () => {
    const voterId = uuidv4()
    const giveAVoteInput = {
      answerId: createdPoll.answers[0].id,
      voterId: voterId
    }

    try {
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      assert.include(errorMessage, getCannotVoteInPollIfPollNotInVoteStateErrorMessage())
    }

    await openPollForVoting(createdPoll.id, createdPoll.token!)
    await closePollFromVoting(createdPoll.id, createdPoll.token!)

    try {
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      assert.include(errorMessage, getCannotVoteInPollIfPollNotInVoteStateErrorMessage())
    }
  })

  it('A vote cannot be given if an answer with the answerId provided does not exist', async () => {
    const nonExistingAnswerId = uuidv4()
    const giveAVoteInput = {
      answerId: nonExistingAnswerId,
      voterId: uuidv4()
    }

    try {
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      assert.include(errorMessage, getValidAnswerWithThisIdDoesNotExistErrorMessage(nonExistingAnswerId))
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
