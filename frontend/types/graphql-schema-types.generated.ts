export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type CreatePollInput = {
  dataClass: DataClass;
  isAnonymous: Scalars['Boolean'];
  optionVotesCountMax: Scalars['Int'];
  options: Array<Scalars['String']>;
  ownerId: Scalars['ID'];
  ownerName?: InputMaybe<Scalars['String']>;
  question: Scalars['String'];
  showStatusWhenVoting: Scalars['Boolean'];
  totalVotesCountMax: Scalars['Int'];
};

export enum DataClass {
  Date = 'DATE',
  Number = 'NUMBER',
  Text = 'TEXT'
}

export type EditPollInput = {
  dataClass?: InputMaybe<DataClass>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  optionVotesCountMax?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<Array<InputMaybe<OptionEditData>>>;
  pollId: Scalars['ID'];
  question?: InputMaybe<Scalars['String']>;
  showStatusWhenVoting?: InputMaybe<Scalars['Boolean']>;
  totalVotesCountMax?: InputMaybe<Scalars['Int']>;
};

export type GiveAVoteToOptionInput = {
  name?: InputMaybe<Scalars['String']>;
  optionId: Scalars['ID'];
  voterId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  closePoll: Poll;
  createPoll: Poll;
  deletePoll: Poll;
  editPoll: Poll;
  giveAVoteToOption?: Maybe<Vote>;
  openPoll: Poll;
};


export type MutationClosePollArgs = {
  pollId: Scalars['ID'];
};


export type MutationCreatePollArgs = {
  input: CreatePollInput;
};


export type MutationDeletePollArgs = {
  pollId: Scalars['ID'];
};


export type MutationEditPollArgs = {
  input: EditPollInput;
};


export type MutationGiveAVoteToOptionArgs = {
  input: GiveAVoteToOptionInput;
};


export type MutationOpenPollArgs = {
  pollId: Scalars['ID'];
};

export type Option = {
  __typename?: 'Option';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Timestamp']>;
  dataClass?: Maybe<DataClass>;
  deletedAt?: Maybe<Scalars['Timestamp']>;
  id?: Maybe<Scalars['ID']>;
  pollId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
  votes?: Maybe<Array<Maybe<Vote>>>;
};


export type OptionVotesArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type OptionEditData = {
  content: Scalars['String'];
  optionId?: InputMaybe<Scalars['ID']>;
};

export type Person = {
  __typename?: 'Person';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Poll = {
  __typename?: 'Poll';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Timestamp']>;
  deletedAt?: Maybe<Scalars['Timestamp']>;
  id?: Maybe<Scalars['ID']>;
  isAnonymous?: Maybe<Scalars['Boolean']>;
  optionVotesCountMax?: Maybe<Scalars['Int']>;
  options?: Maybe<Array<Maybe<Option>>>;
  owner?: Maybe<Person>;
  ownerId?: Maybe<Scalars['ID']>;
  question?: Maybe<Scalars['String']>;
  showStatusWhenVoting?: Maybe<Scalars['Boolean']>;
  state?: Maybe<PollState>;
  token?: Maybe<Scalars['String']>;
  totalVotesCountMax?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
};


export type PollOptionsArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type PollOwnerArgs = {
  ownerId?: InputMaybe<Scalars['ID']>;
};

export enum PollState {
  Closed = 'CLOSED',
  Edit = 'EDIT',
  Vote = 'VOTE'
}

export type Query = {
  __typename?: 'Query';
  findPoll?: Maybe<Poll>;
  findPollsByCode?: Maybe<Array<Maybe<Poll>>>;
  getPollCountInDatabase?: Maybe<Scalars['Int']>;
  ping: Scalars['String'];
};


export type QueryFindPollArgs = {
  code: Scalars['String'];
};


export type QueryFindPollsByCodeArgs = {
  codes: Array<Scalars['String']>;
};

export type Vote = {
  __typename?: 'Vote';
  createdAt?: Maybe<Scalars['Timestamp']>;
  deletedAt?: Maybe<Scalars['Timestamp']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  optionId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
  voterId?: Maybe<Scalars['ID']>;
};
