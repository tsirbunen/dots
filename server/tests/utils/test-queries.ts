import { gql } from 'graphql-request'

export class TestQueries {
  static get createPollMutation(): string {
    return gql`
      mutation createPoll($input: CreatePollInput!) {
        createPoll(input: $input) {
          id
          code
          owner {
            id
            name
          }
          question
          options {
            id
            pollId
            content
            dataClass
            votes {
              id
              optionId
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
          token
          deletedAt
          createdAt
          updatedAt
        }
      }
    `
  }

  static get editPollMutation(): string {
    return gql`
      mutation editPoll($input: EditPollInput!) {
        editPoll(input: $input) {
          id
          code
          owner {
            id
            name
          }
          question
          options {
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
  }

  static get openPollForVotingMutation(): string {
    return gql`
      mutation openPoll($pollId: ID!) {
        openPoll(pollId: $pollId) {
          id
          state
        }
      }
    `
  }
  static get closePollFromVotingMutation(): string {
    return gql`
      mutation closePoll($pollId: ID!) {
        closePoll(pollId: $pollId) {
          id
          state
        }
      }
    `
  }
  static get deletePollMutation(): string {
    return gql`
      mutation deletePoll($pollId: ID!) {
        deletePoll(pollId: $pollId) {
          id
          deletedAt
          token
        }
      }
    `
  }
  static get giveAVoteToOptionMutation(): string {
    return gql`
      mutation giveAVoteToOption($input: GiveAVoteToOptionInput!) {
        giveAVoteToOption(input: $input) {
          id
          optionId
          voterId
          name
        }
      }
    `
  }
  static get findPollQuery(): string {
    return gql`
      query findPoll($code: String!) {
        findPoll(code: $code) {
          id
          code
          question
          options {
            id
            pollId
            content
            dataClass
            votes {
              id
              optionId
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
  }
  static get findPollsByCode(): string {
    return gql`
      query findPollsByCode($codes: [String!]!) {
        findPollsByCode(codes: $codes) {
          id
          owner {
            id
            name
          }
          code
          question
          options {
            id
            pollId
            content
            dataClass
            votes {
              id
              optionId
              voterId
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
          token
          deletedAt
          createdAt
          updatedAt
        }
      }
    `
  }
}
