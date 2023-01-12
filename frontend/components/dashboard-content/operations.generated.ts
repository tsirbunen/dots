import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type PollDataFragment = { __typename?: 'Poll', id?: string | null, code?: string | null, question?: string | null, isAnonymous?: boolean | null, totalVotesCountMax?: number | null, optionVotesCountMax?: number | null, showStatusWhenVoting?: boolean | null, state?: Types.PollState | null, token?: string | null, owner?: { __typename?: 'Person', id?: string | null, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id?: string | null, content?: string | null, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id?: string | null, optionId?: string | null, voterId?: string | null, name?: string | null } | null> | null } | null> | null };

export type FindPollsByCodeQueryVariables = Types.Exact<{
  codes: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type FindPollsByCodeQuery = { __typename?: 'Query', findPollsByCode?: Array<{ __typename?: 'Poll', id?: string | null, code?: string | null, question?: string | null, isAnonymous?: boolean | null, totalVotesCountMax?: number | null, optionVotesCountMax?: number | null, showStatusWhenVoting?: boolean | null, state?: Types.PollState | null, token?: string | null, owner?: { __typename?: 'Person', id?: string | null, name?: string | null } | null, options?: Array<{ __typename?: 'Option', id?: string | null, content?: string | null, dataClass?: Types.DataClass | null, votes?: Array<{ __typename?: 'Vote', id?: string | null, optionId?: string | null, voterId?: string | null, name?: string | null } | null> | null } | null> | null } | null> | null };

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
export const FindPollsByCodeDocument = gql`
    query FindPollsByCode($codes: [String!]!) {
  findPollsByCode(codes: $codes) {
    ...PollData
  }
}
    ${PollDataFragmentDoc}`;
export type FindPollsByCodeQueryResult = Apollo.QueryResult<FindPollsByCodeQuery, FindPollsByCodeQueryVariables>;