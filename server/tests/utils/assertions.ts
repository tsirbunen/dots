import chai, { assert, expect } from 'chai'
import chaiUuid from 'chai-uuid'
import { AnswerPollResolvers } from '../../modules/answer/answer-poll-resolvers'
import { PollType, AnswerType, DataClassType, VoteType, CreatePollInputType, PollFullDataType } from '../../types/types'

chai.use(chaiUuid)

export function assertObjectIsAPoll(pollCandidate: unknown, isDeleted: boolean) {
  const poll = pollCandidate as PollType
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

export function assertPollFieldsArePracticallySameWhenPresent(
  pollA: PollType | CreatePollInputType,
  pollB: PollType
): void {
  const pollAPollType = pollA as PollType
  let pollKey: keyof PollType

  for (pollKey in pollAPollType) {
    if (pollKey in pollB && pollKey !== 'answers') {
      assertFieldValuesAreEqual(pollAPollType[pollKey], pollB[pollKey])
    }
    if (pollKey in pollB && pollKey === 'answers') {
      const pollAAnswers =
        pollA.answers.length > 0 && typeof pollA.answers[0] === 'object'
          ? pollA.answers.map((answer) => (answer as AnswerType).content)
          : pollA.answers
      pollAAnswers.forEach((answerA, index) => {
        const answerB = pollB.answers[index].content
        assertFieldValuesAreEqual(answerA, answerB)
      })
    }
  }
}

function assertFieldValuesAreEqual(valueA: any, valueB: any) {
  if (typeof valueA === 'string' || typeof valueA === 'number' || typeof valueA === 'boolean' || valueA === null) {
    assert.equal(valueA, valueB)
  } else {
    throw new Error(`Assert field values are equal not implemented for values like ${valueA}`)
  }
}
