import * as Types from '../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type PollDataFragment = { __typename?: 'Poll', id?: string | null, code?: string | null, question?: string | null, isAnonymous?: boolean | null, totalVotesCountMax?: number | null, optionVotesCountMax?: number | null, showStatusWhenVoting?: boolean | null, state?: Types.PollState | null, token?: string | null, createdAt?: number | null, owner?: { __typename?: 'Person', id?: string | null, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id?: string | null, content?: string | null, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id?: string | null, optionId?: string | null, voterId?: string | null, name?: string | null } | null> | null } | null> | null };

export type CreatePollMutationVariables = Types.Exact<{
  input: Types.CreatePollInput;
}>;


export type CreatePollMutation = { __typename?: 'Mutation', createPoll: { __typename?: 'Poll', id?: string | null, code?: string | null, question?: string | null, isAnonymous?: boolean | null, totalVotesCountMax?: number | null, optionVotesCountMax?: number | null, showStatusWhenVoting?: boolean | null, state?: Types.PollState | null, token?: string | null, createdAt?: number | null, owner?: { __typename?: 'Person', id?: string | null, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id?: string | null, content?: string | null, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id?: string | null, optionId?: string | null, voterId?: string | null, name?: string | null } | null> | null } | null> | null } };

export type EditPollMutationVariables = Types.Exact<{
  input: Types.EditPollInput;
}>;


export type EditPollMutation = { __typename?: 'Mutation', editPoll: { __typename?: 'Poll', id?: string | null, code?: string | null, question?: string | null, isAnonymous?: boolean | null, totalVotesCountMax?: number | null, optionVotesCountMax?: number | null, showStatusWhenVoting?: boolean | null, state?: Types.PollState | null, token?: string | null, createdAt?: number | null, owner?: { __typename?: 'Person', id?: string | null, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id?: string | null, content?: string | null, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id?: string | null, optionId?: string | null, voterId?: string | null, name?: string | null } | null> | null } | null> | null } };

export type FindPollsByCodeQueryVariables = Types.Exact<{
  codes: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type FindPollsByCodeQuery = { __typename?: 'Query', findPollsByCode?: Array<{ __typename?: 'Poll', id?: string | null, code?: string | null, question?: string | null, isAnonymous?: boolean | null, totalVotesCountMax?: number | null, optionVotesCountMax?: number | null, showStatusWhenVoting?: boolean | null, state?: Types.PollState | null, token?: string | null, createdAt?: number | null, owner?: { __typename?: 'Person', id?: string | null, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id?: string | null, content?: string | null, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id?: string | null, optionId?: string | null, voterId?: string | null, name?: string | null } | null> | null } | null> | null } | null> | null };

export type OpenPollMutationVariables = Types.Exact<{
  pollId: Types.Scalars['ID'];
}>;


export type OpenPollMutation = { __typename?: 'Mutation', openPoll: { __typename?: 'Poll', id?: string | null, state?: Types.PollState | null } };

export type ClosePollMutationVariables = Types.Exact<{
  pollId: Types.Scalars['ID'];
}>;


export type ClosePollMutation = { __typename?: 'Mutation', closePoll: { __typename?: 'Poll', id?: string | null, state?: Types.PollState | null } };

export type FindPollQueryVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type FindPollQuery = { __typename?: 'Query', findPoll?: { __typename?: 'Poll', id?: string | null, code?: string | null, question?: string | null, isAnonymous?: boolean | null, totalVotesCountMax?: number | null, optionVotesCountMax?: number | null, showStatusWhenVoting?: boolean | null, state?: Types.PollState | null, token?: string | null, createdAt?: number | null, owner?: { __typename?: 'Person', id?: string | null, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id?: string | null, content?: string | null, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id?: string | null, optionId?: string | null, voterId?: string | null, name?: string | null } | null> | null } | null> | null } | null };

export type GiveVoteToOptionMutationVariables = Types.Exact<{
  input: Types.GiveAVoteToOptionInput;
}>;


export type GiveVoteToOptionMutation = { __typename?: 'Mutation', giveAVoteToOption?: { __typename?: 'Vote', id?: string | null, optionId?: string | null, voterId?: string | null, name?: string | null } | null };

export type MessageAddedSubscriptionVariables = Types.Exact<{
  pollId: Types.Scalars['ID'];
}>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: { __typename?: 'Message', id: string, optionId: string, voteId: string, pollId: string, voterId: string, voterName?: string | null } };

export type GreetingsSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GreetingsSubscription = { __typename?: 'Subscription', greetings: string };

export const PollDataFragmentDoc = gql`
    fragment PollData on Poll {
  id
  owner {
    id
    name
  }
  code
  question
  options {
    id
    content
    dataClass
    votes {
      id
      optionId
      voterId
      name
    }
  }
  isAnonymous
  totalVotesCountMax
  optionVotesCountMax
  showStatusWhenVoting
  state
  token
  createdAt
}
    `;
export const CreatePollDocument = gql`
    mutation CreatePoll($input: CreatePollInput!) {
  createPoll(input: $input) {
    ...PollData
  }
}
    ${PollDataFragmentDoc}`;
export type CreatePollMutationFn = Apollo.MutationFunction<CreatePollMutation, CreatePollMutationVariables>;
export type CreatePollMutationResult = Apollo.MutationResult<CreatePollMutation>;
export type CreatePollMutationOptions = Apollo.BaseMutationOptions<CreatePollMutation, CreatePollMutationVariables>;
export const EditPollDocument = gql`
    mutation EditPoll($input: EditPollInput!) {
  editPoll(input: $input) {
    ...PollData
  }
}
    ${PollDataFragmentDoc}`;
export type EditPollMutationFn = Apollo.MutationFunction<EditPollMutation, EditPollMutationVariables>;
export type EditPollMutationResult = Apollo.MutationResult<EditPollMutation>;
export type EditPollMutationOptions = Apollo.BaseMutationOptions<EditPollMutation, EditPollMutationVariables>;
export const FindPollsByCodeDocument = gql`
    query FindPollsByCode($codes: [String!]!) {
  findPollsByCode(codes: $codes) {
    ...PollData
  }
}
    ${PollDataFragmentDoc}`;
export type FindPollsByCodeQueryResult = Apollo.QueryResult<FindPollsByCodeQuery, FindPollsByCodeQueryVariables>;
export const OpenPollDocument = gql`
    mutation OpenPoll($pollId: ID!) {
  openPoll(pollId: $pollId) {
    id
    state
  }
}
    `;
export type OpenPollMutationFn = Apollo.MutationFunction<OpenPollMutation, OpenPollMutationVariables>;
export type OpenPollMutationResult = Apollo.MutationResult<OpenPollMutation>;
export type OpenPollMutationOptions = Apollo.BaseMutationOptions<OpenPollMutation, OpenPollMutationVariables>;
export const ClosePollDocument = gql`
    mutation ClosePoll($pollId: ID!) {
  closePoll(pollId: $pollId) {
    id
    state
  }
}
    `;
export type ClosePollMutationFn = Apollo.MutationFunction<ClosePollMutation, ClosePollMutationVariables>;
export type ClosePollMutationResult = Apollo.MutationResult<ClosePollMutation>;
export type ClosePollMutationOptions = Apollo.BaseMutationOptions<ClosePollMutation, ClosePollMutationVariables>;
export const FindPollDocument = gql`
    query FindPoll($code: String!) {
  findPoll(code: $code) {
    ...PollData
  }
}
    ${PollDataFragmentDoc}`;
export type FindPollQueryResult = Apollo.QueryResult<FindPollQuery, FindPollQueryVariables>;
export const GiveVoteToOptionDocument = gql`
    mutation GiveVoteToOption($input: GiveAVoteToOptionInput!) {
  giveAVoteToOption(input: $input) {
    id
    optionId
    voterId
    name
  }
}
    `;
export type GiveVoteToOptionMutationFn = Apollo.MutationFunction<GiveVoteToOptionMutation, GiveVoteToOptionMutationVariables>;
export type GiveVoteToOptionMutationResult = Apollo.MutationResult<GiveVoteToOptionMutation>;
export type GiveVoteToOptionMutationOptions = Apollo.BaseMutationOptions<GiveVoteToOptionMutation, GiveVoteToOptionMutationVariables>;
export const MessageAddedDocument = gql`
    subscription MessageAdded($pollId: ID!) {
  messageAdded(pollId: $pollId) {
    id
    optionId
    voteId
    pollId
    voterId
    voterName
  }
}
    `;
export type MessageAddedSubscriptionResult = Apollo.SubscriptionResult<MessageAddedSubscription>;
export const GreetingsDocument = gql`
    subscription Greetings {
  greetings
}
    `;
export type GreetingsSubscriptionResult = Apollo.SubscriptionResult<GreetingsSubscription>;