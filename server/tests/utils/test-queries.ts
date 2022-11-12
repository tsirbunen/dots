import { gql } from 'graphql-request'

export const createPollMutation = gql`
  mutation createPoll($input: CreatePollInput!) {
    createPoll(input: $input) {
      id
      code
      question
      answers {
        id
        pollId
        content
      }
      isAnonymous
      totalVotesCountMax
      optionVotesCountMax
      showStatusWhenVoting
      deletedAt
      createdAt
      updatedAt
    }
  }
`
