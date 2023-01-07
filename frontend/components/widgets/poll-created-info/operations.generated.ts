import * as Types from '../../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type OpenPollMutationVariables = Types.Exact<{
  pollId: Types.Scalars['ID'];
}>;


export type OpenPollMutation = { __typename?: 'Mutation', openPoll: { __typename?: 'Poll', id: string, state: Types.PollState } };


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