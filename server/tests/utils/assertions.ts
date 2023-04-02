import chai, { assert, expect } from 'chai'
import chaiUuid from 'chai-uuid'

import chaiJWT from 'chai-jwt'
import { DataClass } from '../../types/graphql-schema-types.generated'
import { VoteDB } from '../../models/vote/types'
import { OptionDB, OptionDBWithVotesDB } from '../../models/option/types'
import { PollFull } from '../../models/poll/types'

chai.use(chaiUuid)
chai.use(chaiJWT)

export function assertObjectIsAPoll(pollCandidate: unknown) {
  const poll = pollCandidate as PollFull
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

export function assertPollsAreEqual(pollOrCreatePollInput: unknown, poll: unknown): void {
  const pollA = pollOrCreatePollInput as PollFull
  const pollB = poll as PollFull
  let pollKey: keyof PollFull
  for (pollKey in pollA) {
    if (pollKey in pollB) {
      assertFieldValuesAreEqual(pollA[pollKey], pollB[pollKey])
    }
  }
}

export function assertPollContainsAToken(poll: PollFull) {
  assert.isString(poll.token)
  expect(poll.token).to.be.a.jwt
}

export function assertTokenIsPresent(input: unknown) {
  const inputWithToken = input as { token: string }
  assert.isString(inputWithToken.token)
}

export function assertTokenIsMissing(input: unknown) {
  const inputWithToken = input as { token: null }
  assert.isNull(inputWithToken.token)
}

export function assertObjectIsAVote(vote: unknown) {
  const voteCandidate = vote as VoteDB
  expect(voteCandidate.id).to.be.a.uuid('v4')
  expect(voteCandidate.optionId).to.be.a.uuid('v4')
  if (voteCandidate.name) assert.isString(voteCandidate.name)
  assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(voteCandidate)
}

export function assertVoteIsForCorrectOption(vote: VoteDB, optionId: string) {
  assert.equal(vote.optionId, optionId)
}

export function assertEachOptionHasValidVotes(poll: unknown) {
  const pollWithFullData = poll as PollFull
  assert.isArray(pollWithFullData.options)
  pollWithFullData.options.forEach((option) => {
    assert.isArray(option.votes)
    option.votes?.forEach((vote) => assertObjectIsAVote(vote))
  })
}

function assertObjectIsAnOptionToPoll(option: unknown, pollId?: string) {
  const optionCandidate = option as OptionDBWithVotesDB
  expect(optionCandidate.id).to.be.a.uuid('v4')
  expect(optionCandidate.pollId).to.be.a.uuid('v4')
  expect(optionCandidate.content).to.be.a.string
  assert.oneOf(
    optionCandidate.dataClass,
    Object.keys(DataClass).map((key) => key.toUpperCase())
  )
  ;(optionCandidate.votes ?? []).forEach((vote) => assertObjectIsAVote(vote))
  if (pollId) assert(optionCandidate.pollId === pollId)
  assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(optionCandidate)
  if (optionCandidate.votes) {
    assert.isArray(optionCandidate.votes)
    optionCandidate.votes.forEach((vote) => assertObjectIsAVote(vote))
  }
}

function assertOptionsAreUnique(options: OptionDB[]) {
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
  if (candidate.createdAt !== undefined) assertIsNumberAndRepresentsDate(candidate.createdAt)
  if (candidate.updatedAt !== undefined) assertIsNumberAndRepresentsDate(candidate.updatedAt)
  if (candidate.deletedAt) assertIsNumberAndRepresentsDate(candidate.deletedAt)
}

function assertIsNumberAndRepresentsDate(dateAsNumber: unknown) {
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
  } else if ((valueA as OptionDB).content && !(valueB as OptionDB).content) {
    assertFieldValuesAreEqual((valueA as OptionDB).content, valueB)
  } else if (!(valueA as OptionDB).content && (valueB as OptionDB).content) {
    assertFieldValuesAreEqual(valueA, (valueB as OptionDB).content)
  } else {
    throw new Error(`"Assert values are equal" not implemented for pairs like ${valueA} and ${valueB}`)
  }
}
