import { assert } from 'chai'
import { v4 as uuidv4 } from 'uuid'
import { OPTION_COUNT_MIN, OPTION_COUNT_MAX } from '../../utils/constant-values'
import { POLL_VALID } from '../data/polls-data'
import { createPoll, openPollForVoting, giveAVoteToOption, findPoll } from './operations'
import { Knex } from 'knex'
import { getAllPolls, getAllPersons, getAllOptions, getAllVotes } from './handle-database-connections'
import { PollFull } from '../../models/poll/types'
import { assertObjectIsAPoll } from './assertions'

export function extractErrorMessage(error: unknown): string {
  const errorResponse = error as {
    response: { errors: Array<{ message: string }> }
  }
  return errorResponse.response.errors[0].message
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

export async function createPollsByOwnersWithVotes() {
  const ownersCount = 2
  const pollsCreatedByOwner = 2
  const createdPolls: PollFull[] = []
  let pollToDeleteIndex = 0
  let totalOptions = 0
  let totalVotes = 0
  let optionsToDeleteCount = 0
  let votesToDeleteCount = 0
  let votersCount = 0
  const ownerPollsData: { ownerId: string; polls: PollFull[] }[] = []

  for (let ownerIndex = 0; ownerIndex < ownersCount; ownerIndex++) {
    const ownerId = uuidv4()
    const polls: PollFull[] = []
    for (let pollIndex = 0; pollIndex < pollsCreatedByOwner; pollIndex++) {
      const pollInputData = { ...POLL_VALID[pollIndex], ownerId }
      const createdPoll = await createPoll(pollInputData)
      createdPolls.push(createdPoll)
      polls.push(createdPoll)
      await openPollForVoting(createdPoll.id, createdPoll.token!)
    }
    ownerPollsData.push({ ownerId, polls })
  }

  for (let pollIndex = 0; pollIndex < createdPolls.length; pollIndex++) {
    const poll = createdPolls[pollIndex]
    for (let optionIndex = 0; optionIndex < poll.options.length; optionIndex++) {
      votersCount += 1
      let giveAVoteInput = {
        optionId: poll.options[optionIndex].id,
        voterId: uuidv4(),
        name: 'Voter 1',
        pollId: poll.id
      }
      await giveAVoteToOption(giveAVoteInput)
      giveAVoteInput = { ...giveAVoteInput, voterId: uuidv4(), name: 'Voter 2' }
      votersCount += 1
      await giveAVoteToOption(giveAVoteInput)
      totalOptions += 1
      totalVotes += 2
      if (pollIndex === 0) {
        optionsToDeleteCount += 1
        votesToDeleteCount += 2
      }
    }
  }
  return {
    ownerPollsData,
    pollToDelete: createdPolls[pollToDeleteIndex!],
    personsCount: ownersCount + votersCount,
    pollsByOwnerCount: pollsCreatedByOwner,
    pollsCount: ownersCount * pollsCreatedByOwner,
    totalOptions,
    totalVotes,
    optionsToDeleteCount,
    votesToDeleteCount,
    lastPoll: createdPolls[createdPolls.length - 1]
  }
}

export async function assertOwnerOptionAndVoteCountsMatchExpected(
  DATABASE: Knex<any, any[]>,
  ownersPolls: PollFull[],
  deletedPoll: PollFull | undefined,
  expectedPollsByOwner: number,
  expectedPollsCount: number,
  expectedPersonsCount: number,
  expectedTotalNumberOfOptionsCount: number,
  expectedTotalNumberOfVotesCount: number
): Promise<void> {
  for (let i = 0; i < ownersPolls.length; i++) {
    if (!deletedPoll && ownersPolls[i] !== deletedPoll) {
      const retrievedPoll = await findPoll(ownersPolls[i].code)
      assertObjectIsAPoll(retrievedPoll)
    }
  }

  const pollsInDatabase = await getAllPolls(DATABASE)
  assert.equal(pollsInDatabase.length, expectedPollsCount)

  const personsInDatabase = await getAllPersons(DATABASE)
  assert.equal(personsInDatabase.length, expectedPersonsCount)

  const optionsInDatabase = await getAllOptions(DATABASE)
  assert.equal(optionsInDatabase.length, expectedTotalNumberOfOptionsCount)

  const votesInDatabase = await getAllVotes(DATABASE)
  assert.equal(votesInDatabase.length, expectedTotalNumberOfVotesCount)
}

export type PollOwnerData = {
  ownerId: string
  polls: PollFull[]
}

export async function createPollsForMultipleOwners(): Promise<{
  pollOwnerData: PollOwnerData[]
}> {
  const data = []
  for (let ownerIndex = 0; ownerIndex < 3; ownerIndex++) {
    const ownerId = uuidv4()
    const polls = []
    for (let inputIndex = 0; inputIndex < POLL_VALID.length; inputIndex++) {
      const pollInputData = { ...POLL_VALID[inputIndex], ownerId }
      const createdPoll = await createPoll(pollInputData)
      polls.push(createdPoll)
    }
    data.push({ ownerId, polls })
  }
  return { pollOwnerData: data }
}
