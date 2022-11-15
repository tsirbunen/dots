import chai, { assert, expect } from 'chai'
import chaiUuid from 'chai-uuid'
import { AnswerPollResolvers } from '../../modules/answer/answer-poll-resolvers'
import { PollType, AnswerType, DataClassType, VoteType, CreatePollInputType, PollFullDataType } from '../../types/types'
import chaiJWT from 'chai-jwt'

chai.use(chaiUuid)
chai.use(chaiJWT)

export function assertObjectIsAPoll(pollCandidate: unknown, isDeleted: boolean) {
  const poll = pollCandidate as PollFullDataType
  expect(poll.id).to.be.a.uuid('v4')
  assert.isString(poll.code)
  assert.isString(poll.question)
  assert.isArray(poll.answers)
  poll.answers.forEach((answer) => assertObjectIsAnAnswer(answer))
  assert.isBoolean(poll.isAnonymous)
  assert.isNumber(poll.totalVotesCountMax)
  assert.isNumber(poll.optionVotesCountMax)
  assert.isBoolean(poll.showStatusWhenVoting)
  assertIsNumberAndRepresentsAValidDateIfPresent(poll.createdAt)
  assertIsNumberAndRepresentsAValidDateIfPresent(poll.updatedAt)
  if (isDeleted) {
    assertIsNumberAndRepresentsAValidDateIfPresent(poll.deletedAt)
  } else if (poll.deletedAt !== undefined) {
    expect(poll.deletedAt).to.equal(null)
  }
}

export function assertReturnedCreatedPollContainsAToken(poll: PollFullDataType) {
  assert.isString(poll.token)
  expect(poll.token).to.be.a.jwt
}

function assertObjectIsAnAnswer(answer: unknown) {
  const answerCandidate = answer as AnswerType
  expect(answerCandidate.id).to.be.a.uuid('v4')
  expect(answerCandidate.pollId).to.be.a.uuid('v4')
  assert.isString(answerCandidate.content)
  assert.oneOf(answerCandidate.dataClass, Object.keys(DataClassType))
  if (answerCandidate.votes) {
    answerCandidate.votes.forEach((vote) => assertObjectIsAVote(vote))
  }
}

export function assertObjectIsAVote(vote: unknown) {
  const voteCandidate = vote as VoteType
  expect(voteCandidate.id).to.be.a.uuid('v4')
  expect(voteCandidate.answerId).to.be.a.uuid('v4')
  if (voteCandidate.name) {
    assert.isString(voteCandidate.name)
  }
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

function assertIsNumberAndRepresentsAValidDateIfPresent(dateAsNumber: unknown) {
  if (!dateAsNumber) return
  assert.isNumber(dateAsNumber)
  const dateCandidate = new Date(dateAsNumber as number)
  assert(dateCandidate instanceof Date)
}

export function assertPollFieldsArePracticallySameWhenPresent(pollA: unknown, pollB: unknown): void {
  const pollAPollType = pollA as PollFullDataType
  const pollBPollType = pollB as PollFullDataType
  let pollKey: keyof PollFullDataType

  for (pollKey in pollAPollType) {
    if (pollKey in pollBPollType) {
      if (pollKey !== 'answers') {
        assertFieldValuesAreEqual(pollAPollType[pollKey], pollBPollType[pollKey])
      }
      if (pollKey === 'answers') {
        const pollAAnswers =
          pollAPollType.answers.length > 0 && typeof pollAPollType.answers[0] === 'object'
            ? pollAPollType.answers.map((answer) => (answer as AnswerType).content)
            : pollAPollType.answers
        pollAAnswers.forEach((answerA, index) => {
          const answerB = pollBPollType.answers[index].content
          assertFieldValuesAreEqual(answerA, answerB)
        })
      }
    }
  }
}

function assertFieldValuesAreEqual(valueA: any, valueB: any) {
  if (typeof valueA === 'string' || typeof valueA === 'number' || typeof valueA === 'boolean' || valueA === null) {
    assert.equal(valueA, valueB)
  } else if (typeof valueA === 'object') {
    Object.keys(valueA).forEach((key) => {
      assertFieldValuesAreEqual(valueA[key], valueB[key])
    })
  } else {
    throw new Error(`Assert field values are equal not implemented for values like ${valueA}`)
  }
}
