import { DataClass, PollState } from '../types/graphql-schema-types.generated'
import { Poll, Option, Vote, Owner } from '../types/types'

export const validatePollsData = (pollsData: unknown): Poll[] => {
  if (!Array.isArray(pollsData)) throw new Error('Polls should be an array but is not!')
  return pollsData.map((pollCandidate) => validatePollData(pollCandidate))
}

export const validatePollData = (pollData: unknown): Poll => {
  const data = pollData as Poll
  return {
    id: validateString(data.id),
    code: validateString(data.code),
    question: validateString(data.question),
    totalVotesCountMax: validateNumber(data.totalVotesCountMax),
    optionVotesCountMax: validateNumber(data.optionVotesCountMax),
    showStatusWhenVoting: validateBoolean(data.showStatusWhenVoting),
    isAnonymous: validateBoolean(data.isAnonymous),
    owner: validateOwner(data.owner, data.isAnonymous),
    state: validatePollState(data.state),
    token: validateToken(data.token),
    options: validateOptions(data.options),
    createdAt: validateDate(data.createdAt)
  } as Poll
}

const validateOwner = (data: unknown, isAnonymous: boolean): Owner => {
  const owner = data as Owner
  return {
    id: validateString(owner.id),
    name: !isAnonymous ? validateString(owner.name) : owner.name
  }
}

const validateOptions = (data: unknown) => {
  if (!Array.isArray(data) || data.length < 2) {
    throw new Error('Not enough options!')
  }
  return data?.map((a) => {
    const option = a as Option
    return {
      id: validateString(option?.id),
      content: validateString(option?.content),
      dataClass: validateDataClass(option?.dataClass),
      votes: validateVotes(option.votes)
    }
  })
}

const validateVotes = (data: unknown): Vote[] => {
  if (!Array.isArray(data)) {
    throw new Error('Votes must be an array!')
  }
  return data?.map((v) => validateVote(v))
}

export const validateVote = (v: unknown): Vote => {
  const vote = v as Vote
  return {
    id: validateString(vote.id),
    optionId: validateString(vote.optionId),
    voterId: vote.voterId === null ? null : validateString(vote.voterId),
    name: validateString(vote.name)
  }
}

export const validateToken = (target: unknown): string | undefined => {
  if (target === null) return undefined
  if (typeof target !== 'string') {
    throw new Error('Token must be string when present!')
  }
  return target as string
}

const validateString = (target: unknown): string => {
  if (typeof target !== 'string') throw new Error(`Target ${target} is not a string!`)
  return target
}

const validateNumber = (target: unknown): number => {
  if (typeof target !== 'number') throw new Error(`Target ${target} is not a number!`)
  return target
}

const validateBoolean = (target: unknown): boolean => {
  if (typeof target !== 'boolean') throw new Error(`Target ${target} is not a boolean!`)
  return target
}

const validatePollState = (target: unknown): PollState => {
  if (target !== PollState.Edit && target !== PollState.Closed && target !== PollState.Vote)
    throw new Error(`Target ${target} is not a PollState!`)
  return target
}

const validateDataClass = (target: unknown): DataClass => {
  if (target !== DataClass.Text && target !== DataClass.Date && target !== DataClass.Number)
    throw new Error(`Target ${target} is not a DataClass!`)
  return target
}

const validateDate = (target: unknown): Date => {
  const testDate = new Date(target as number)
  if (typeof target === 'number' && testDate instanceof Date) return testDate
  throw new Error(`Target ${target} does not represent a date!`)
}
