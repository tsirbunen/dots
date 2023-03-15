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
  GreetingsDocument,
  GreetingsSubscription,
  GreetingsSubscriptionVariables,
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
import { useToast } from './use-toast'

type UseGraphQLClientService = {
  createPoll: (input: CreatePollInput) => Promise<Poll | undefined>
  editPoll: (input: EditPollInput, pollToken: string) => Promise<Poll | undefined>
  findPollsByCode: (codes: string[], token: string | undefined, personId: string) => Promise<Poll[]>
  openPoll: (pollId: string, pollToken: string) => Promise<boolean | undefined>
  closePoll: (pollId: string, pollToken: string) => Promise<boolean | undefined>
  fetchPollData: (code: string, token: string | undefined) => Promise<Poll | undefined>
  giveAVoteToOption: (
    optionId: string,
    voterId: string,
    name: string | null,
    token: string | undefined
  ) => Promise<Vote | undefined>
  subscribeToMessages: (pollId: string) => void
  subscribeToGreetings: () => void
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

  const findPollsByCode = async (codes: string[], token: string | undefined, personId: string): Promise<Poll[]> => {
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
    token: string | undefined
  ): Promise<Vote | undefined> => {
    const input = { optionId, voterId, name: name ?? null }
    console.log(input)
    try {
      const response = await graphqlClient.mutate<GiveVoteToOptionMutation, GiveVoteToOptionMutationVariables>({
        mutation: GiveVoteToOptionDocument,
        variables: { input },
        context: {
          headers: {
            authorization: token ?? null
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

  const fetchPollData = async (code: string, token: string | undefined): Promise<Poll | undefined> => {
    try {
      const response = await graphqlClient.query<FindPollQuery, FindPollQueryVariables>({
        query: FindPollDocument,
        variables: { code },
        context: {
          headers: {
            authorization: token ?? null
          }
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

  const subscribeToMessages = (pollId: string) => {
    const subscription = graphqlClient
      .subscribe<MessageAddedSubscription, MessageAddedSubscriptionVariables>({
        query: MessageAddedDocument,
        variables: { pollId }
      })
      .subscribe({
        next: ({ data }) => {
          if (data) console.log(data)
          if (data?.messageAdded) {
            console.log('new message', data.messageAdded)
            // const message = validateMessage(data.newMessage)
            // toast(message.text, message.type)
          }
        },
        error: (error) => {
          console.log('error', error)
        }
      })
    return subscription
  }

  const subscribeToGreetings = () => {
    const subscription = graphqlClient
      .subscribe<GreetingsSubscription, GreetingsSubscriptionVariables>({
        query: GreetingsDocument
      })
      .subscribe({
        next: ({ data }) => {
          if (data) console.log(data)
          if (data?.greetings) {
            console.log('new message', data.greetings)
            // const message = validateMessage(data.newMessage)
            // toast(message.text, message.type)
          }
        },
        error: (error) => {
          console.log('error', error)
        }
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
    subscribeToMessages,
    subscribeToGreetings
  }
}
