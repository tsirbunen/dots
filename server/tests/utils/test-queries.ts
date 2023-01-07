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

export const openPollForVotingMutation = gql`
  mutation openPoll($pollId: ID!) {
    openPoll(pollId: $pollId) {
      id
      state
    }
  }
`

export const closePollFromVotingMutation = gql`
  mutation closePoll($pollId: ID!) {
    closePoll(pollId: $pollId) {
      id
      state
    }
  }
`

export const deletePollMutation = gql`
  mutation deletePoll($pollId: ID!) {
    deletePoll(pollId: $pollId) {
      id
      deletedAt
      token
    }
  }
`

export const giveAVoteToOptionMutation = gql`
  mutation giveAVoteToOption($input: GiveAVoteToOptionInput!) {
    giveAVoteToOption(input: $input) {
      id
      optionId
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

// export const findAllPollsForPerson = gql`
//   query findAllPollsForPerson($personId: ID!) {
//     findAllPollsForPerson(personId: $personId) {
//       id
//       owner {
//         id
//         name
//       }
//       code
//       question
//       options {
//         id
//         pollId
//         content
//         dataClass
//         votes {
//           id
//           optionId
//           name
//           deletedAt
//           createdAt
//           updatedAt
//         }
//         deletedAt
//         createdAt
//         updatedAt
//       }
//       isAnonymous
//       totalVotesCountMax
//       optionVotesCountMax
//       showStatusWhenVoting
//       state
//       token
//       deletedAt
//       createdAt
//       updatedAt
//     }
//   }
// `

export const findPollsByCode = gql`
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
