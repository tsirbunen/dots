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
  // findAllPollsForPerson,
  findPollQuery,
  findPollsByCode,
  giveAVoteToOptionMutation,
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

export async function giveAVoteToOption(variables: VoteInputType): Promise<VoteType> {
  const graphQLClient = getGraphQLClient()
  const query = giveAVoteToOptionMutation
  const response: { giveAVoteToOption: VoteType } = await graphQLClient.request(query, {
    input: variables
  })
  return response.giveAVoteToOption
}

export async function giveMaxNumberOfVotesByPersonInPoll(
  createdPoll: PollFullDataType,
  voterId: string,
  optionTracker: { index: number }
) {
  let votesGivenTotal = 0
  const maxTotalVotesInPoll = createdPoll.totalVotesCountMax
  const maxVotesPerOption = createdPoll.optionVotesCountMax
  while (votesGivenTotal < maxTotalVotesInPoll) {
    const option = createdPoll.options[optionTracker.index]
    let votesGivenPerOption = 0
    while (votesGivenTotal < maxTotalVotesInPoll && votesGivenPerOption < maxVotesPerOption) {
      const giveAVoteInput = {
        optionId: option.id,
        voterId: voterId
      }

      await giveAVoteToOption(giveAVoteInput)
      votesGivenPerOption += 1
      votesGivenTotal += 1
    }
    optionTracker.index += 1
  }
}

export async function findPollInDatabase(variables: FindPollInputType): Promise<PollFullDataType> {
  const graphQLClient = getGraphQLClient()
  const query = findPollQuery
  const response: { findPoll: PollFullDataType } = await graphQLClient.request(query, { input: variables })
  return response.findPoll
}

// export async function findAllOwnerPollsInDatabase(token: string, personId: string): Promise<PollFullDataType[]> {
//   const graphQLClient = getGraphQLClient(token)
//   const query = findAllPollsForPerson
//   const response: { findAllPollsForPerson: PollFullDataType[] } = await graphQLClient.request(query, { personId })
//   return response.findAllPollsForPerson
// }

export async function findAllOwnerPollsInDatabase(token: string, codes: string[]): Promise<PollFullDataType[]> {
  const graphQLClient = getGraphQLClient(token)
  const query = findPollsByCode
  const response: { findPollsByCode: PollFullDataType[] } = await graphQLClient.request(query, { codes })
  return response.findPollsByCode
}

export async function openPollForVoting(pollId: string, token: string): Promise<PollFullDataType> {
  const graphQLClient = getGraphQLClient(token)
  const query = openPollForVotingMutation
  const response: { openPoll: PollFullDataType } = await graphQLClient.request(query, { pollId })
  return response.openPoll
}

export async function closePollFromVoting(pollId: string, token: string): Promise<PollFullDataType> {
  const graphQLClient = getGraphQLClient(token)
  const query = closePollFromVotingMutation
  const response: { closePoll: PollFullDataType } = await graphQLClient.request(query, { pollId })
  return response.closePoll
}

export async function deletePollFromDatabase(pollId: string, token: string): Promise<PollFullDataType> {
  const graphQLClient = getGraphQLClient(token)
  const query = deletePollMutation
  const response: { deletePoll: PollFullDataType } = await graphQLClient.request(query, { pollId })
  return response.deletePoll
}
