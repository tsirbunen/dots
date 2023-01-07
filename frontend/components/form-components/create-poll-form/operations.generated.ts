import * as Types from '../../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type PollDataFragment = { __typename?: 'Poll', id: string, code: string, question: string, isAnonymous: boolean, totalVotesCountMax: number, optionVotesCountMax: number, showStatusWhenVoting: boolean, state: Types.PollState, token?: string | null, owner?: { __typename?: 'Person', id: string, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id: string, content: string, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id: string, optionId: string, voterId: string, name?: string | null } | null> | null } | null> | null };

export type CreatePollMutationVariables = Types.Exact<{
  input: Types.CreatePollInput;
}>;


export type CreatePollMutation = { __typename?: 'Mutation', createPoll: { __typename?: 'Poll', id: string, code: string, question: string, isAnonymous: boolean, totalVotesCountMax: number, optionVotesCountMax: number, showStatusWhenVoting: boolean, state: Types.PollState, token?: string | null, owner?: { __typename?: 'Person', id: string, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id: string, content: string, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id: string, optionId: string, voterId: string, name?: string | null } | null> | null } | null> | null } };

export type EditPollMutationVariables = Types.Exact<{
  input: Types.EditPollInput;
}>;


export type EditPollMutation = { __typename?: 'Mutation', editPoll: { __typename?: 'Poll', id: string, code: string, question: string, isAnonymous: boolean, totalVotesCountMax: number, optionVotesCountMax: number, showStatusWhenVoting: boolean, state: Types.PollState, token?: string | null, owner?: { __typename?: 'Person', id: string, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id: string, content: string, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id: string, optionId: string, voterId: string, name?: string | null } | null> | null } | null> | null } };

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