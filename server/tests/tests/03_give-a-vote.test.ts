import 'reflect-metadata'
import { v4 as uuidv4 } from 'uuid'
import 'mocha'
import dns from 'dns'
import { POLL_INPUT_DATA } from '../data/polls-data'
import {
  createPollInDatabase,
  giveAVoteToAnswerOptionInDatabase,
  giveMaxNumberOfVotesByPersonInPoll
} from '../utils/operations'
import { assertObjectIsAVote, assertVoteIsForCorrectAnswerOption } from '../utils/assertions'
import { getDatabaseConnection, clearDatabase, closeDatabaseConnection } from '../utils/handle-database'
import { expect } from 'chai'
import {
  getMaxVotesPerAnswerAlreadyGivenErrorMessage,
  getMaxVotesPerPollAlreadyGivenErrorMessage
} from '../../utils/error-messages'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()

describe('GIVE A VOTE', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('Votes can be given to answer options of an existing poll when max vote counts (per person) have not been reached', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    const createdPoll = await createPollInDatabase(pollInputData)
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

  it('Voting an answer option fails if the max vote count PER ANSWER per person has been reached', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[2], ownerId: uuidv4() }
    const createdPoll = await createPollInDatabase(pollInputData)
    const selectedAnswerToVoteId = createdPoll.answers[0].id
    let voterAId = uuidv4()
    const giveAVoteInput = {
      answerId: selectedAnswerToVoteId,
      voterId: voterAId
    }
    const maxVotesPerAnswerOption = createdPoll.optionVotesCountMax
    for (let i = 0; i < maxVotesPerAnswerOption; i++) {
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
    }

    const voterBId = uuidv4()
    giveAVoteInput.voterId = voterBId
    for (let i = 0; i < maxVotesPerAnswerOption; i++) {
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
    }

    try {
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
    } catch (error) {
      const errorResponse = error as { response: { errors: { message: string }[] } }
      const errorMessage = errorResponse.response.errors[0].message
      expect(errorMessage).to.equal(getMaxVotesPerAnswerAlreadyGivenErrorMessage(maxVotesPerAnswerOption))
    }
  })

  it('Voting an answer option fails if the max vote count PER POLL per person has been reached', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[2], ownerId: uuidv4() }
    const createdPoll = await createPollInDatabase(pollInputData)
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
      const errorResponse = error as { response: { errors: { message: string }[] } }
      const errorMessage = errorResponse.response.errors[0].message
      expect(errorMessage).to.equal(getMaxVotesPerPollAlreadyGivenErrorMessage(createdPoll.totalVotesCountMax))
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
