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
import { POLL_INPUT_VALID } from '../data/polls-data'
import { createPollInDatabase, openPollForVoting, giveAVoteToOption, findAllOwnerPollsInDatabase } from './operations'
import { Knex } from 'knex'
import {
  getAllPollsInDatabase,
  getAllPersonsInDatabase,
  getAllOptionsInDatabase,
  getAllVotesInDatabase
} from './handle-database-connections'

export function getErrorMessageFromResponse(error: unknown): string {
  const errorResponse = error as { response: { errors: { message: string }[] } }
  return errorResponse.response.errors[0].message
}

export function getExpectedErrorMessageForPollFieldValueNotInRange(validationField: PollValidationFieldEnum): string {
  const validationData: PollInputFieldValidationDataType = POLL_INPUT_FIELDS_VALIDATION_DATA[validationField]
  return getPollInputFieldValueNotInRangeErrorMessage(validationData.title, validationData.min, validationData.max)
}

export function verifyValueNotInExpectedRangeErrorMessage(error: unknown, validationField: PollValidationFieldEnum) {
  const errorMessage = getErrorMessageFromResponse(error)
  const expectedErrorMessage = getExpectedErrorMessageForPollFieldValueNotInRange(validationField)
  expect(errorMessage).to.equal(expectedErrorMessage)
}

export function getOptionsWithInvalidCounts(): string[][] {
  const oneTooFewOptions = []
  for (let i = 0; i < OPTION_COUNT_MIN - 1; i++) {
    oneTooFewOptions.push(`Option ${i}`)
  }
  const oneTooManyOptions = []
  for (let i = 0; i < OPTION_COUNT_MAX + 1; i++) {
    oneTooManyOptions.push(`Option ${i}`)
  }
  const invalidOptionsInputs = [oneTooFewOptions, oneTooManyOptions]
  invalidOptionsInputs.forEach((optionsList) =>
    assert(optionsList.length < OPTION_COUNT_MIN || optionsList.length > OPTION_COUNT_MAX)
  )
  return invalidOptionsInputs
}

export async function createPollsByDifferentOwnersEachWithVotesForOptionsInDatabase() {
  const ownersCount = 2
  const pollsCreatedByOwner = 2
  const createdPolls: PollFullDataType[] = []
  let pollToDeleteIndex = 0
  let totalNumberOfOptions = 0
  let totalNumberOfVotes = 0
  let optionsInPollToDeleteCount = 0
  let votesInPollToDeleteCount = 0
  let votersCount = 0
  let codes: Record<string, string[]> = {}

  for (let ownerIndex = 0; ownerIndex < ownersCount; ownerIndex++) {
    const ownerId = uuidv4()
    codes[ownerId] = []
    for (let pollIndex = 0; pollIndex < pollsCreatedByOwner; pollIndex++) {
      const pollInputData = { ...POLL_INPUT_VALID[pollIndex], ownerId }
      const createdPoll = await createPollInDatabase(pollInputData)
      createdPolls.push(createdPoll)
      codes[ownerId].push(createdPoll.code)
      await openPollForVoting(createdPoll.id, createdPoll.token!)
    }
  }
  for (let pollIndex = 0; pollIndex < createdPolls.length; pollIndex++) {
    const poll = createdPolls[pollIndex]
    for (let optionIndex = 0; optionIndex < poll.options.length; optionIndex++) {
      votersCount += 1
      let giveAVoteInput = {
        optionId: poll.options[optionIndex].id,
        voterId: uuidv4(),
        name: 'Voter 1'
      }
      await giveAVoteToOption(giveAVoteInput)
      giveAVoteInput = { ...giveAVoteInput, voterId: uuidv4(), name: 'Voter 2' }
      votersCount += 1
      await giveAVoteToOption(giveAVoteInput)
      totalNumberOfOptions += 1
      totalNumberOfVotes += 2
      if (pollIndex === 0) {
        optionsInPollToDeleteCount += 1
        votesInPollToDeleteCount += 2
      }
    }
  }
  return {
    pollToDelete: createdPolls[pollToDeleteIndex!],
    personsCount: ownersCount + votersCount,
    codes,
    pollsByOwnerCount: pollsCreatedByOwner,
    pollsCount: ownersCount * pollsCreatedByOwner,
    totalNumberOfOptions,
    totalNumberOfVotes,
    optionsInPollToDeleteCount,
    votesInPollToDeleteCount,
    lastPoll: createdPolls[createdPolls.length - 1]
  }
}

export async function assertPollOwnerOptionAndVoteCountsInDatabaseMatchExpectedCounts(
  DATABASE: Knex<any, any[]>,
  pollToDelete: PollFullDataType,
  expectedPollsByOwner: number,
  expectedPollsCount: number,
  expectedPersonsCount: number,
  expectedTotalNumberOfOptionsCount: number,
  expectedTotalNumberOfVotesCount: number,
  pollCodes: string[]
): Promise<void> {
  const pollsByOwner = await findAllOwnerPollsInDatabase(pollToDelete.token!, pollCodes)
  const ownedPolls = pollsByOwner.filter((poll) => poll.token)
  assert.equal(ownedPolls.length, expectedPollsByOwner)

  const pollsInDatabase = await getAllPollsInDatabase(DATABASE)
  assert.equal(pollsInDatabase.length, expectedPollsCount)

  const personsInDatabase = await getAllPersonsInDatabase(DATABASE)
  assert.equal(personsInDatabase.length, expectedPersonsCount)

  const optionsInDatabase = await getAllOptionsInDatabase(DATABASE)
  assert.equal(optionsInDatabase.length, expectedTotalNumberOfOptionsCount)

  const votesInDatabase = await getAllVotesInDatabase(DATABASE)
  assert.equal(votesInDatabase.length, expectedTotalNumberOfVotesCount)
}

export async function createPollsInDatabaseForMultipleOwners(): Promise<{
  ownerIds: string[]
  tokens: string[]
  codes: Record<string, string[]>
}> {
  const ownerIds: string[] = []
  const tokens: string[] = []
  const codes: Record<string, string[]> = {}
  for (let ownerIndex = 0; ownerIndex < 3; ownerIndex++) {
    const ownerId = uuidv4()
    ownerIds.push(ownerId)
    for (let inputIndex = 0; inputIndex < POLL_INPUT_VALID.length; inputIndex++) {
      const pollInputData = { ...POLL_INPUT_VALID[inputIndex], ownerId }
      const createdPoll = await createPollInDatabase(pollInputData)
      if (!codes[ownerId]) {
        codes[ownerId] = []
      }
      codes[ownerId].push(createdPoll.code)
      if (inputIndex === POLL_INPUT_VALID.length - 1) {
        tokens.push(createdPoll.token!)
      }
    }
  }
  return { ownerIds, tokens, codes }
}
