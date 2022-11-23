import chai, { assert, expect } from 'chai'
import chaiUuid from 'chai-uuid'
import { AnswerType, DataClassType, VoteType, PollFullDataType } from '../../types/types'
import chaiJWT from 'chai-jwt'

chai.use(chaiUuid)
chai.use(chaiJWT)

export function assertObjectIsAPoll(pollCandidate: unknown) {
  const poll = pollCandidate as PollFullDataType
  expect(poll.id).to.be.a.uuid('v4')
  assert.isString(poll.code)
  assert.isArray(poll.answers)
  assert.isString(poll.question)
  poll.answers.forEach((answer) => assertObjectIsAnAnswerToPoll(answer, poll.id))
  assertAnswersHaveDifferentIdValues(poll.answers)
  assert.isBoolean(poll.isAnonymous)
  assert.isNumber(poll.totalVotesCountMax)
  assert.isNumber(poll.optionVotesCountMax)
  assert.isBoolean(poll.showStatusWhenVoting)
  assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(poll)
}

export function assertPollFieldsArePracticallyEqualWhenPresent(pollOrCreatePollInput: unknown, poll: unknown): void {
  const pollA = pollOrCreatePollInput as PollFullDataType
  const pollB = poll as PollFullDataType
  let pollKey: keyof PollFullDataType
  for (pollKey in pollA) {
    if (pollKey in pollB) {
      assertFieldValuesAreEqual(pollA[pollKey], pollB[pollKey])
    }
  }
}

export function assertReturnedCreatedPollContainsAToken(poll: PollFullDataType) {
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
  expect(voteCandidate.answerId).to.be.a.uuid('v4')
  if (voteCandidate.name) assert.isString(voteCandidate.name)
  assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(voteCandidate)
}

export function assertVoteIsForCorrectAnswerOption(vote: VoteType, answerId: string) {
  assert.equal(vote.answerId, answerId)
}

export function assertEachAnswerHasValidVotes(poll: unknown) {
  const pollWithFullData = poll as PollFullDataType
  assert.isArray(pollWithFullData.answers)
  pollWithFullData.answers.forEach((answer) => {
    assert.isArray(answer.votes)
    answer.votes?.forEach((vote) => assertObjectIsAVote(vote))
  })
}

function assertObjectIsAnAnswerToPoll(answer: unknown, pollId?: string) {
  const answerCandidate = answer as AnswerType
  expect(answerCandidate.id).to.be.a.uuid('v4')
  expect(answerCandidate.pollId).to.be.a.uuid('v4')
  expect(answerCandidate.content).to.be.a.string
  assert.oneOf(answerCandidate.dataClass, Object.keys(DataClassType))
  ;(answerCandidate.votes ?? []).forEach((vote) => assertObjectIsAVote(vote))
  if (pollId) assert(answerCandidate.pollId === pollId)
  assertCreatedAtUpdatedAtAndDeletedAtValuesAreValid(answerCandidate)
  if (answerCandidate.votes) {
    assert.isArray(answerCandidate.votes)
    answerCandidate.votes.forEach((vote) => assertObjectIsAVote(vote))
  }
}

function assertAnswersHaveDifferentIdValues(answers: AnswerType[]) {
  const answerIds = new Set()
  answers.forEach((answer) => answerIds.add(answer.id))
  assert(answerIds.size === answers.length)
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
  } else if ((valueA as AnswerType).content && !(valueB as AnswerType).content) {
    assertFieldValuesAreEqual((valueA as AnswerType).content, valueB)
  } else if (!(valueA as AnswerType).content && (valueB as AnswerType).content) {
    assertFieldValuesAreEqual(valueA, (valueB as AnswerType).content)
  } else {
    throw new Error(
      `"Assert field values are equal"-method not implemented for value pairs like ${valueA} and ${valueB}`
    )
  }
}
