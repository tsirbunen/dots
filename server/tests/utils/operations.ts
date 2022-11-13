import {
  CreatePollInputType,
  PollType,
  VoteInputType,
  VoteType,
  FindPollInputType,
  PollFullDataType
} from '../../types/types'
import { getGraphQLClient } from './get-graphql-client'
import { createPollMutation, findPollQuery, giveAVoteToAnswerMutation } from './test-queries'

export async function createPollInDatabase(variables: CreatePollInputType): Promise<PollType> {
  const graphQLClient = getGraphQLClient()
  const query = createPollMutation
  const response: { createPoll: PollType } = await graphQLClient.request(query, { input: variables })
  return response.createPoll
}

export async function giveAVoteToAnswerOptionInDatabase(variables: VoteInputType): Promise<VoteType> {
  const graphQLClient = getGraphQLClient()
  const query = giveAVoteToAnswerMutation
  const response: { giveAVoteToAnswer: VoteType } = await graphQLClient.request(query, {
    input: variables
  })
  return response.giveAVoteToAnswer
}

export async function giveMaxNumberOfVotesByPersonInPoll(
  createdPoll: PollType,
  voterId: string,
  answerTracker: { index: number }
) {
  // let answerIndex = 0
  let votesGivenTotal = 0
  // const voterId = uuidv4()
  const maxTotalVotesInPoll = createdPoll.totalVotesCountMax
  const maxVotesPerAnswerOption = createdPoll.optionVotesCountMax
  while (votesGivenTotal < maxTotalVotesInPoll) {
    const answerOption = createdPoll.answers[answerTracker.index]
    let votesGivenPerAnswerOption = 0
    while (votesGivenTotal < maxTotalVotesInPoll && votesGivenPerAnswerOption < maxVotesPerAnswerOption) {
      const giveAVoteInput = {
        answerId: answerOption.id,
        voterId: voterId
      }

      await giveAVoteToAnswerOptionInDatabase(giveAVoteInput)
      votesGivenPerAnswerOption += 1
      votesGivenTotal += 1
    }
    answerTracker.index += 1
  }
}

export async function findPollInDatabase(variables: FindPollInputType): Promise<PollType | PollFullDataType> {
  const graphQLClient = getGraphQLClient()
  const query = findPollQuery
  const response: { findPoll: PollType } = await graphQLClient.request(query, { input: variables })
  return response.findPoll
}

function uuidv4() {
  throw new Error('Function not implemented.')
}
