import { assert, expect } from 'chai'
import {
  PollInputFieldValidationDataType,
  POLL_INPUT_FIELDS_VALIDATION_DATA,
  PollValidationFieldEnum,
  PollFullDataType
} from '../../types/types'
import { v4 as uuidv4 } from 'uuid'
import { OPTION_COUNT_MIN, OPTION_COUNT_MAX } from '../../utils/constant-values'
import { getPollInputFieldValueNotInRangeErrorMessage } from '../../utils/error-messages'
import { POLL_INPUT_DATA } from '../data/polls-data'
import {
  createPollInDatabase,
  openPollForVoting,
  giveAVoteToAnswerOptionInDatabase,
  findAllOwnerPollsInDatabase
} from './operations'
import { Knex } from 'knex'
import {
  getAllPollsInDatabase,
  getAllOwnersInDatabase,
  getAllAnswersInDatabase,
  getAllVotesInDatabase
} from './handle-database'

export function getErrorMessageFromResponse(error: unknown): string {
  const errorResponse = error as { response: { errors: { message: string }[] } }
  return errorResponse.response.errors[0].message
}

export function getExpectedErrorMessageForPollFieldValueNotInRange(validationField: PollValidationFieldEnum): string {
  const validationData: PollInputFieldValidationDataType = POLL_INPUT_FIELDS_VALIDATION_DATA[validationField]
  return getPollInputFieldValueNotInRangeErrorMessage(validationData.title, validationData.min, validationData.max)
}

export function handleCheckingPollFieldValueNotInRangeExpectedErrorMessage(
  error: unknown,
  validationField: PollValidationFieldEnum
) {
  const errorMessage = getErrorMessageFromResponse(error)
  const expectedErrorMessage = getExpectedErrorMessageForPollFieldValueNotInRange(validationField)
  expect(errorMessage).to.equal(expectedErrorMessage)
}

export function getAnswerOptionsWithInvalidCountsForCreatePoll(): string[][] {
  const oneTooFewAnswerOptions = []
  for (let i = 0; i < OPTION_COUNT_MIN - 1; i++) {
    oneTooFewAnswerOptions.push(`Answer option ${i}`)
  }
  const oneTooManyAnswerOptions = []
  for (let i = 0; i < OPTION_COUNT_MAX + 1; i++) {
    oneTooManyAnswerOptions.push(`Answer option ${i}`)
  }
  const invalidAnswerOptionsInputs = [oneTooFewAnswerOptions, oneTooManyAnswerOptions]
  invalidAnswerOptionsInputs.forEach((answerOptionsList) =>
    assert(answerOptionsList.length < OPTION_COUNT_MIN || answerOptionsList.length > OPTION_COUNT_MAX)
  )
  return invalidAnswerOptionsInputs
}

export async function createPollsByDifferentOwnersEachWithVotesForAnswersInDatabase() {
  const ownersCount = 2
  const pollsCreatedByOwner = 2
  const createdPolls: PollFullDataType[] = []
  let pollToDeleteIndex = 0
  let totalNumberOfAnswers = 0
  let totalNumberOfVotes = 0
  let answersInPollToDeleteCount = 0
  let votesInPollToDeleteCount = 0

  for (let ownerIndex = 0; ownerIndex < ownersCount; ownerIndex++) {
    const ownerId = uuidv4()
    for (let pollIndex = 0; pollIndex < pollsCreatedByOwner; pollIndex++) {
      const pollInputData = { ...POLL_INPUT_DATA[pollIndex], ownerId }
      const createdPoll = await createPollInDatabase(pollInputData)
      createdPolls.push(createdPoll)
      await openPollForVoting(createdPoll.id, createdPoll.token!)
    }
  }
  for (let pollIndex = 0; pollIndex < createdPolls.length; pollIndex++) {
    const poll = createdPolls[pollIndex]
    for (let answerIndex = 0; answerIndex < poll.answers.length; answerIndex++) {
      let giveAVoteInput = {
        answerId: poll.answers[answerIndex].id,
        voterId: uuidv4(),
        name: 'Voter 1'
      }
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
      giveAVoteInput = { ...giveAVoteInput, voterId: uuidv4(), name: 'Voter 2' }
      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
      totalNumberOfAnswers += 1
      totalNumberOfVotes += 2
      if (pollIndex === 0) {
        answersInPollToDeleteCount += 1
        votesInPollToDeleteCount += 2
      }
    }
  }
  return {
    pollToDelete: createdPolls[pollToDeleteIndex!],
    ownersCount,
    pollsByOwnerCount: pollsCreatedByOwner,
    pollsCount: ownersCount * pollsCreatedByOwner,
    totalNumberOfAnswers,
    totalNumberOfVotes,
    answersInPollToDeleteCount,
    votesInPollToDeleteCount,
    lastPoll: createdPolls[createdPolls.length - 1]
  }
}

export async function assertPollOwnerAnswerAndVoteCountsInDatabaseMatchExpectedCounts(
  DATABASE: Knex<any, any[]>,
  pollToDelete: PollFullDataType,
  expectedPollsByOwner: number,
  expectedPollsCount: number,
  expectedOwnersCount: number,
  expectedTotalNumberOfAnswersCount: number,
  expectedTotalNumberOfVotesCount: number
): Promise<void> {
  let pollsByOwner = await findAllOwnerPollsInDatabase(pollToDelete.token!)
  assert.equal(pollsByOwner.length, expectedPollsByOwner)
  let pollsInDatabase = await getAllPollsInDatabase(DATABASE)
  assert.equal(pollsInDatabase.length, expectedPollsCount)
  let ownersInDatabase = await getAllOwnersInDatabase(DATABASE)
  assert.equal(ownersInDatabase.length, expectedOwnersCount)
  let answersInDatabase = await getAllAnswersInDatabase(DATABASE)
  assert.equal(answersInDatabase.length, expectedTotalNumberOfAnswersCount)
  let votesInDatabase = await getAllVotesInDatabase(DATABASE)
  assert.equal(votesInDatabase.length, expectedTotalNumberOfVotesCount)
}
