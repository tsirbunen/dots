import { gql } from 'graphql-request'

export const createPollMutation = gql`
  mutation createPoll($input: CreatePollInput!) {
    createPoll(input: $input) {
      id
      code
      owner {
        id
        name
      }
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
      state
      token
      deletedAt
      createdAt
      updatedAt
    }
  }
`

export const editPollMutation = gql`
  mutation editPoll($input: EditPollInput!) {
    editPoll(input: $input) {
      id
      code
      owner {
        id
        name
      }
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
      state
      token
      deletedAt
      createdAt
      updatedAt
    }
  }
`

export const openPollForVotingMutation = gql`
  mutation openPoll($pollId: ID!) {
    openPoll(pollId: $pollId)
  }
`

export const closePollFromVotingMutation = gql`
  mutation closePoll($pollId: ID!) {
    closePoll(pollId: $pollId)
  }
`

export const deletePollMutation = gql`
  mutation deletePoll($pollId: ID!) {
    deletePoll(pollId: $pollId)
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
          deletedAt
          createdAt
          updatedAt
        }
        deletedAt
        createdAt
        updatedAt
      }
      isAnonymous
      totalVotesCountMax
      optionVotesCountMax
      showStatusWhenVoting
      state
      deletedAt
      createdAt
      updatedAt
    }
  }
`

export const findAllPollsForOneOwnerQuery = gql`
  query findAllPollsForOneOwner {
    findAllPollsForOneOwner {
      id
      owner {
        id
        name
      }
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
          deletedAt
          createdAt
          updatedAt
        }
        deletedAt
        createdAt
        updatedAt
      }
      isAnonymous
      totalVotesCountMax
      optionVotesCountMax
      showStatusWhenVoting
      state
      deletedAt
      createdAt
      updatedAt
    }
  }
`
