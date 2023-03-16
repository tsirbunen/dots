import { EditPollInputType, PollFull } from '../../models/poll/types'
import { VoteDB, VoteDBMinimal } from '../../models/vote/types'
import { CreatePollInput } from '../../types/graphql-schema-types.generated'
import { getGraphQLClient } from './get-graphql-client'
import { TestQueries } from './test-queries'

export async function createPoll(variables: Partial<CreatePollInput>): Promise<PollFull> {
  const graphQLClient = getGraphQLClient()
  const query = TestQueries.createPollMutation
  const response: { createPoll: PollFull } = await graphQLClient.request(query, {
    input: variables
  })
  return response.createPoll
}

export async function editPoll(variables: EditPollInputType, token?: string): Promise<PollFull> {
  const graphQLClient = token ? getGraphQLClient(token) : getGraphQLClient()
  const query = TestQueries.editPollMutation
  const response: { editPoll: PollFull } = await graphQLClient.request(query, { input: variables })
  return response.editPoll
}

export async function giveAVoteToOption(variables: VoteDBMinimal): Promise<VoteDB> {
  const graphQLClient = getGraphQLClient()
  const query = TestQueries.giveAVoteToOptionMutation
  const response: { giveAVoteToOption: VoteDB } = await graphQLClient.request(query, {
    input: variables
  })
  return response.giveAVoteToOption
}

export async function giveMaxNumberOfVotesForPerson(poll: PollFull, voterId: string, optionTracker: { index: number }) {
  let votesTotal = 0
  const maxTotal = poll.totalVotesCountMax
  const maxPerOption = poll.optionVotesCountMax
  while (votesTotal < maxTotal) {
    let votesPerOption = 0
    while (votesTotal < maxTotal && votesPerOption < maxPerOption) {
      const giveAVoteInput = {
        optionId: poll.options[optionTracker.index].id,
        voterId: voterId,
        pollId: poll.id
      }

      await giveAVoteToOption(giveAVoteInput)
      votesPerOption += 1
      votesTotal += 1
    }
    optionTracker.index += 1
  }
}

export async function findPoll(code: string): Promise<PollFull> {
  const graphQLClient = getGraphQLClient()
  const query = TestQueries.findPollQuery
  const response: { findPoll: PollFull } = await graphQLClient.request(query, { code: code })
  return response.findPoll
}

export async function findPollsByCode(token: string, codes: string[]): Promise<PollFull[]> {
  const graphQLClient = getGraphQLClient(token)
  const query = TestQueries.findPollsByCode
  const response: { findPollsByCode: PollFull[] } = await graphQLClient.request(query, { codes })
  return response.findPollsByCode
}

export async function openPollForVoting(pollId: string, token: string): Promise<PollFull> {
  const graphQLClient = getGraphQLClient(token)
  const query = TestQueries.openPollForVotingMutation
  const response: { openPoll: PollFull } = await graphQLClient.request(query, { pollId })
  return response.openPoll
}

export async function closePoll(pollId: string, token: string): Promise<PollFull> {
  const graphQLClient = getGraphQLClient(token)
  const query = TestQueries.closePollFromVotingMutation
  const response: { closePoll: PollFull } = await graphQLClient.request(query, { pollId })
  return response.closePoll
}

export async function deletePoll(pollId: string, token: string): Promise<PollFull> {
  const graphQLClient = getGraphQLClient(token)
  const query = TestQueries.deletePollMutation
  const response: { deletePoll: PollFull } = await graphQLClient.request(query, { pollId })
  return response.deletePoll
}
