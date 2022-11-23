import {
  CreatePollInputType,
  PollType,
  VoteInputType,
  VoteType,
  FindPollInputType,
  PollFullDataType,
  EditPollInputType
} from '../../types/types'
import { getGraphQLClient } from './get-graphql-client'
import {
  closePollFromVotingMutation,
  createPollMutation,
  deletePollMutation,
  editPollMutation,
  findAllPollsForOneOwnerQuery,
  findPollQuery,
  giveAVoteToAnswerMutation,
  openPollForVotingMutation
} from './test-queries'

export async function createPollInDatabase(variables: Partial<CreatePollInputType>): Promise<PollFullDataType> {
  const graphQLClient = getGraphQLClient()
  const query = createPollMutation
  const response: { createPoll: PollFullDataType } = await graphQLClient.request(query, { input: variables })
  return response.createPoll
}

export async function editPollInDatabase(variables: EditPollInputType, token?: string): Promise<PollFullDataType> {
  const graphQLClient = token ? getGraphQLClient(token) : getGraphQLClient()
  const query = editPollMutation
  const response: { editPoll: PollFullDataType } = await graphQLClient.request(query, { input: variables })
  return response.editPoll
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
  createdPoll: PollFullDataType,
  voterId: string,
  answerTracker: { index: number }
) {
  let votesGivenTotal = 0
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

export async function findPollInDatabase(variables: FindPollInputType): Promise<PollFullDataType> {
  const graphQLClient = getGraphQLClient()
  const query = findPollQuery
  const response: { findPoll: PollFullDataType } = await graphQLClient.request(query, { input: variables })
  return response.findPoll
}

export async function findAllOwnerPollsInDatabase(token: string): Promise<PollFullDataType[]> {
  const graphQLClient = getGraphQLClient(token)
  const query = findAllPollsForOneOwnerQuery
  const response: { findAllPollsForOneOwner: PollFullDataType[] } = await graphQLClient.request(query)
  return response.findAllPollsForOneOwner
}

export async function openPollForVoting(pollId: string, token: string): Promise<boolean> {
  const graphQLClient = getGraphQLClient(token)
  const query = openPollForVotingMutation
  const response: { openPoll: boolean } = await graphQLClient.request(query, { pollId })
  return response.openPoll
}

export async function closePollFromVoting(pollId: string, token: string): Promise<boolean> {
  const graphQLClient = getGraphQLClient(token)
  const query = closePollFromVotingMutation
  const response: { closePoll: boolean } = await graphQLClient.request(query, { pollId })
  return response.closePoll
}

export async function deletePollFromDatabase(pollId: string, token: string): Promise<boolean> {
  const graphQLClient = getGraphQLClient(token)
  const query = deletePollMutation
  const response: { deletePoll: boolean } = await graphQLClient.request(query, { pollId })
  return response.deletePoll
}
