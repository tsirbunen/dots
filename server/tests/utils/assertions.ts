import chai, { assert, expect } from 'chai'
import chaiUuid from 'chai-uuid'
import { OptionType, DataClassType, VoteType, PollFullDataType } from '../../types/types'
import chaiJWT from 'chai-jwt'

chai.use(chaiUuid)
chai.use(chaiJWT)

export function assertObjectIsAPoll(pollCandidate: unknown) {
  const poll = pollCandidate as PollFullDataType
  expect(poll.id).to.be.a.uuid('v4')
  assert.isString(poll.code)
  assert.isArray(poll.options)
  assert.isString(poll.question)
  poll.options.forEach((option) => assertObjectIsAnOptionToPoll(option, poll.id))
  assertOptionsAreUnique(poll.options)
  assert.isBoolean(poll.isAnonymous)
  assert.isNumber(poll.totalVotesCountMax)
  assert.isNumber(poll.optionVotesCountMax)
  assert.isBoolean(poll.showStatusWhenVoting)
  assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(poll)
}

export function assertPollsArePracticallyEqual(pollOrCreatePollInput: unknown, poll: unknown): void {
  const pollA = pollOrCreatePollInput as PollFullDataType
  const pollB = poll as PollFullDataType
  let pollKey: keyof PollFullDataType
  for (pollKey in pollA) {
    if (pollKey in pollB) {
      assertFieldValuesAreEqual(pollA[pollKey], pollB[pollKey])
    }
  }
}

export function assertPollContainsAToken(poll: PollFullDataType) {
  assert.isString(poll.token)
  expect(poll.token).to.be.a.jwt
}

export function assertTokenIsPresent(input: unknown) {
  const inputWithToken = input as { token: string }
  assert.isString(inputWithToken.token)
}

export function assertObjectIsAVote(vote: unknown) {
  const voteCandidate = vote as VoteType
  expect(voteCandidate.id).to.be.a.uuid('v4')
  expect(voteCandidate.optionId).to.be.a.uuid('v4')
  if (voteCandidate.name) assert.isString(voteCandidate.name)
  assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(voteCandidate)
}

export function assertVoteIsForCorrectOption(vote: VoteType, optionId: string) {
  assert.equal(vote.optionId, optionId)
}

export function assertEachOptionHasValidVotes(poll: unknown) {
  const pollWithFullData = poll as PollFullDataType
  assert.isArray(pollWithFullData.options)
  pollWithFullData.options.forEach((option) => {
    assert.isArray(option.votes)
    option.votes?.forEach((vote) => assertObjectIsAVote(vote))
  })
}

function assertObjectIsAnOptionToPoll(option: unknown, pollId?: string) {
  const optionCandidate = option as OptionType
  expect(optionCandidate.id).to.be.a.uuid('v4')
  expect(optionCandidate.pollId).to.be.a.uuid('v4')
  expect(optionCandidate.content).to.be.a.string
  assert.oneOf(optionCandidate.dataClass, Object.keys(DataClassType))
  ;(optionCandidate.votes ?? []).forEach((vote) => assertObjectIsAVote(vote))
  if (pollId) assert(optionCandidate.pollId === pollId)
  assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(optionCandidate)
  if (optionCandidate.votes) {
    assert.isArray(optionCandidate.votes)
    optionCandidate.votes.forEach((vote) => assertObjectIsAVote(vote))
  }
}

function assertOptionsAreUnique(options: OptionType[]) {
  const optionIds = new Set()
  options.forEach((option) => optionIds.add(option.id))
  assert(optionIds.size === options.length)
  const optionContents = new Set()
  options.forEach((option) => optionContents.add(option.content))
  assert(optionContents.size === options.length)
}

function assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(candidate: {
  createdAt?: unknown
  updatedAt?: unknown
  deletedAt?: unknown
}) {
  if (candidate.createdAt !== undefined) assertIsNumberAndRepresentsAValidDate(candidate.createdAt)
  if (candidate.updatedAt !== undefined) assertIsNumberAndRepresentsAValidDate(candidate.updatedAt)
  if (candidate.deletedAt) assertIsNumberAndRepresentsAValidDate(candidate.deletedAt)
}

function assertIsNumberAndRepresentsAValidDate(dateAsNumber: unknown) {
  if (!dateAsNumber) return
  assert.isNumber(dateAsNumber)
  const dateCandidate = new Date(dateAsNumber as number)
  assert(dateCandidate instanceof Date)
}

function assertFieldValuesAreEqual(valueA: any, valueB: any) {
  if (Array.isArray(valueA) && Array.isArray(valueB)) {
    assert(valueA.length === valueB.length)
    valueA.forEach((a, index) => assertFieldValuesAreEqual(a, valueB[index]))
  } else if (
    (typeof valueA === 'string' && typeof valueB === 'string') ||
    (typeof valueA === 'number' && typeof valueB === 'number') ||
    (typeof valueA === 'boolean' && typeof valueB === 'boolean') ||
    valueA === null
  ) {
    assert.equal(valueA, valueB)
  } else if (typeof valueA === 'object' && typeof valueB === 'object') {
    Object.keys(valueA).forEach((key) => {
      assertFieldValuesAreEqual(valueA[key], valueB[key])
    })
  } else if ((valueA as OptionType).content && !(valueB as OptionType).content) {
    assertFieldValuesAreEqual((valueA as OptionType).content, valueB)
  } else if (!(valueA as OptionType).content && (valueB as OptionType).content) {
    assertFieldValuesAreEqual(valueA, (valueB as OptionType).content)
  } else {
    throw new Error(
      `"Assert field values are equal"-method not implemented for value pairs like ${valueA} and ${valueB}`
    )
  }
}
