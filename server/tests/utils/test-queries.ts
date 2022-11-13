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
        dataClass
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

export const giveAVoteToAnswerMutation = gql`
  mutation giveAVoteToAnswer($input: GiveAVoteToAnswerInput!) {
    giveAVoteToAnswer(input: $input) {
      id
      answerId
      voterId
      name
    }
  }
`

export const findPollQuery = gql`
  query findPoll($input: FindPollInput!) {
    findPoll(input: $input) {
      id
      code
      question
      answers {
        id
        pollId
        content
        dataClass
        votes {
          id
          answerId
          name
        }
      }
      isAnonymous
      totalVotesCountMax
      optionVotesCountMax
      showStatusWhenVoting
    }
  }
`
