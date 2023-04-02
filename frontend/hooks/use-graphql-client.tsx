/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchResult, Observable } from '@apollo/client'
import { graphqlClient } from '../graphql-client/graphql-client'
import {
  ClosePollDocument,
  ClosePollMutation,
  ClosePollMutationVariables,
  CreatePollDocument,
  CreatePollMutation,
  CreatePollMutationVariables,
  EditPollDocument,
  EditPollMutation,
  EditPollMutationVariables,
  FindPollDocument,
  FindPollQuery,
  FindPollQueryVariables,
  FindPollsByCodeDocument,
  FindPollsByCodeQuery,
  FindPollsByCodeQueryVariables,
  GiveVoteToOptionDocument,
  GiveVoteToOptionMutation,
  GiveVoteToOptionMutationVariables,
  MessageAddedDocument,
  MessageAddedSubscription,
  MessageAddedSubscriptionVariables,
  OpenPollDocument,
  OpenPollMutation,
  OpenPollMutationVariables
} from '../graphql-client/operations.generated'
import { CreatePollInput, EditPollInput } from '../types/graphql-schema-types.generated'
import { Poll, Vote } from '../types/types'
import { validatePollData, validatePollsData, validateVote } from '../utils/validations'
import { CodeTokenPair } from './use-browser-storage'
import { useToast } from './use-toast'

type UseGraphQLClientService = {
  createPoll: (input: CreatePollInput) => Promise<Poll | undefined>
  editPoll: (input: EditPollInput, pollToken: string) => Promise<Poll | undefined>
  findPollsByCode: (pollCodeTokenPairs: CodeTokenPair[], personId: string) => Promise<Poll[]>
  openPoll: (pollId: string, pollToken: string) => Promise<boolean | undefined>
  closePoll: (pollId: string, pollToken: string) => Promise<boolean | undefined>
  fetchPollData: (code: string, pollToken?: string, userId?: string) => Promise<Poll | undefined>
  giveAVoteToOption: (
    optionId: string,
    voterId: string,
    name: string | null,
    pollId: string
  ) => Promise<Vote | undefined>
  subscribeToMessages: (
    pollId: string
  ) => Observable<FetchResult<MessageAddedSubscription, Record<string, any>, Record<string, any>>>
}

export const useGraphQLClient = (): UseGraphQLClientService => {
  const { toast } = useToast()

  const createPoll = async (input: CreatePollInput): Promise<Poll | undefined> => {
    try {
      const response = await graphqlClient.mutate<CreatePollMutation, CreatePollMutationVariables>({
        mutation: CreatePollDocument,
        variables: { input }
      })

      if (!response.data?.createPoll) {
        throw new Error(response.errors?.toString())
      }

      const createPollResponse = response.data.createPoll
      const poll = validatePollData(createPollResponse)
      toast('toast_create_poll_success', 'SUCCESS')
      return poll
    } catch (error) {
      console.log(error)
      toast('toast_create_poll_error', 'ERROR')
    }
  }

  const editPoll = async (input: EditPollInput, pollToken: string): Promise<Poll | undefined> => {
    try {
      const response = await graphqlClient.mutate<EditPollMutation, EditPollMutationVariables>({
        mutation: EditPollDocument,
        variables: { input },
        context: {
          headers: {
            authorization: pollToken
          }
        }
      })

      if (!response.data?.editPoll) {
        throw new Error(response.errors?.toString())
      }

      const editPollData = response.data.editPoll
      const poll = validatePollData(editPollData)
      toast('toast_edit_poll_success', 'SUCCESS')
      return poll
    } catch (error) {
      console.log(error)
      toast('toast_edit_poll_error', 'ERROR')
    }
  }

  const findPollsByCode = async (pollCodeTokenPairs: CodeTokenPair[], personId: string): Promise<Poll[]> => {
    const codes = pollCodeTokenPairs.map((pair) => pair.code)
    const token = pollCodeTokenPairs.find((pair) => pair.token)?.token

    try {
      const response = await graphqlClient.query<FindPollsByCodeQuery, FindPollsByCodeQueryVariables>({
        query: FindPollsByCodeDocument,
        variables: { codes },
        context: {
          headers: {
            authorization: token ?? null,
            personid: personId
          }
        }
      })

      if (!response.data?.findPollsByCode) {
        throw new Error(response.errors?.toString())
      }

      const pollsData = response.data.findPollsByCode
      const polls = validatePollsData(pollsData)
      return polls
    } catch (error) {
      console.log(error)
      toast('toast_fetch_polls_by_id_or_code_error', 'ERROR')
      return []
    }
  }

  const openPoll = async (pollId: string, pollToken: string): Promise<boolean | undefined> => {
    try {
      const response = await graphqlClient.mutate<OpenPollMutation, OpenPollMutationVariables>({
        mutation: OpenPollDocument,
        variables: { pollId },
        context: {
          headers: {
            authorization: pollToken
          }
        }
      })

      if (!response.data?.openPoll) {
        throw new Error(response.errors?.toString())
      }
      toast('toast_open_poll_success', 'SUCCESS')
      return true
    } catch (error) {
      console.log(error)
      toast('toast_open_poll_error', 'ERROR')
    }
  }

  const closePoll = async (pollId: string, pollToken: string): Promise<boolean | undefined> => {
    try {
      const response = await graphqlClient.mutate<ClosePollMutation, ClosePollMutationVariables>({
        mutation: ClosePollDocument,
        variables: { pollId },
        context: {
          headers: {
            authorization: pollToken
          }
        }
      })

      if (!response.data?.closePoll) {
        throw new Error(response.errors?.toString())
      }
      toast('toast_close_poll_success', 'SUCCESS')
      return true
    } catch (error) {
      console.log(error)
      toast('toast_close_poll_error', 'ERROR')
    }
  }

  const giveAVoteToOption = async (
    optionId: string,
    voterId: string,
    name: string | null,
    pollId: string
  ): Promise<Vote | undefined> => {
    const input = { optionId, voterId, name: name ?? null, pollId }

    try {
      const response = await graphqlClient.mutate<GiveVoteToOptionMutation, GiveVoteToOptionMutationVariables>({
        mutation: GiveVoteToOptionDocument,
        variables: { input },
        context: {
          headers: {
            personid: voterId
          }
        }
      })

      if (!response.data?.giveAVoteToOption) {
        throw new Error(response.errors?.toString())
      }

      const voteData = response.data.giveAVoteToOption
      if (!voteData.name) {
        voteData.name = 'you'
      }
      const vote = validateVote(voteData)
      return vote
    } catch (error) {
      console.log(error)
      toast('toast_give_vote_error', 'ERROR')
      return undefined
    }
  }

  const fetchPollData = async (code: string, pollToken?: string, userId?: string): Promise<Poll | undefined> => {
    const headers = pollToken ? {
      authorization: pollToken
    } : {
      personid: userId
    }
    try {
      const response = await graphqlClient.query<FindPollQuery, FindPollQueryVariables>({
        query: FindPollDocument,
        variables: { code },
        context: {
          headers: headers
        }
      })

      if (!response.data?.findPoll) {
        throw new Error(response.errors?.toString())
      }

      const pollData = response.data.findPoll
      const poll = validatePollsData([pollData])[0]
      return poll
    } catch (error) {
      console.log(error)
      toast('toast_fetch_poll_by_code_error', 'ERROR')
      return undefined
    }
  }

  const subscribeToMessages = (
    pollId: string
  ): Observable<FetchResult<MessageAddedSubscription, Record<string, any>, Record<string, any>>> => {
    const subscription = graphqlClient.subscribe<MessageAddedSubscription, MessageAddedSubscriptionVariables>({
      query: MessageAddedDocument,
      variables: { pollId }
    })
    return subscription
  }

  return {
    createPoll,
    editPoll,
    findPollsByCode,
    openPoll,
    closePoll,
    fetchPollData,
    giveAVoteToOption,
    subscribeToMessages
  }
}
