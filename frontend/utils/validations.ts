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
    owner: validateOwner(data.owner),
    showStatusWhenVoting: validateBoolean(data.showStatusWhenVoting),
    isAnonymous: validateBoolean(data.isAnonymous),
    state: validatePollState(data.state),
    token: validateToken(data.token),
    options: validateOptions(data.options)
  } as Poll
}

const validateOwner = (data: unknown): Owner => {
  const owner = data as Owner
  return {
    id: validateString(owner.id),
    name: validateString(owner.name)
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
const validateVotes = (data: unknown) => {
  if (!Array.isArray(data)) {
    throw new Error('Votes must be an array!')
  }
  return data?.map((v) => {
    const vote = v as Vote
    return {
      id: validateString(vote.id),
      optionId: validateString(vote.optionId),
      voterId: validateString(vote.voterId),
      name: validateString(vote.name)
    }
  })
}

export const validateToken = (target: unknown): string => {
  if (typeof target !== 'string') {
    throw new Error('Token is required!')
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
