import { Language } from '../hooks/use-translation'
import { Poll } from '../types/types'
import { AppState } from './state-context'
import { cloneDeep } from 'lodash'
import { VoteCreated } from '../components/voting/voting/voting'
import { FetchFocusPollData } from '../pages/vote/[code]'

export enum StateActionType {
  SET_LANGUAGE = 'SET_LANGUAGE',
  ADD_POLL = 'ADD_POLL',
  UPDATE_POLL = 'UPDATE_POLL',
  SET_ALL_POLLS = 'SET_ALL_POLLS',
  SET_FOCUS_POLL = 'SET_FOCUS_POLL',
  SET_TOKEN = 'SET_TOKEN',
  SET_USER_ID = 'SET_USER_ID',
  SET_USER_NAME = 'SET_USER_NAME',
  VOTED_OPTION = 'VOTED_OPTION',
  SET_FOCUS_POLL_DATA = 'SET_FOCUS_POLL_DATA',
  SET_POLL_IN_EDITING = 'SET_POLL_IN_EDITING'
}

export type StateAction =
  | { type: StateActionType.SET_LANGUAGE; data: Language }
  | { type: StateActionType.ADD_POLL; data: Poll }
  | { type: StateActionType.UPDATE_POLL; data: Poll }
  | { type: StateActionType.SET_ALL_POLLS; data: Poll[] }
  | { type: StateActionType.SET_FOCUS_POLL; data: Poll | undefined }
  | { type: StateActionType.SET_TOKEN; data: string | undefined }
  | { type: StateActionType.SET_USER_ID; data: string | undefined }
  | { type: StateActionType.SET_USER_NAME; data: string | undefined }
  | { type: StateActionType.VOTED_OPTION; data: VoteCreated }
  | { type: StateActionType.SET_FOCUS_POLL_DATA; data: FetchFocusPollData }
  | { type: StateActionType.SET_POLL_IN_EDITING; data: Poll | undefined }

const stateAfterPollCreatedOrEdited = (state: AppState, poll: Poll) => {
  const updatedState = cloneDeep(state)
  updatedState.polls[poll.code] = { ...poll }
  if (poll.token) updatedState.token = poll.token
  if (poll.owner.name) updatedState.userName = poll.owner.name
  if (poll.owner.id) updatedState.userId = poll.owner.id
  return updatedState
}

const stateAfterAllPollsSet = (state: AppState, polls: Poll[]) => {
  const allPolls: Record<string, Poll> = {}
  polls.forEach((poll) => (allPolls[poll.code] = cloneDeep(poll)))
  let token: string | undefined = undefined
  let userName: string | undefined = undefined
  const userId: string | undefined = undefined
  polls.forEach((poll) => {
    if (!token && poll.token) token = poll.token
    if (!userName && poll.owner.name) userName = poll.owner.name
    if (!userId && poll.owner.id) token = poll.owner.id
  })
  const updatedState = { ...state, polls: allPolls, token, userName, userId }
  if (state.pollInEditing && allPolls[state.pollInEditing.code]) {
    updatedState.pollInEditing = cloneDeep(allPolls[state.pollInEditing.code])
  }
  if (state.pollInFocus && allPolls[state.pollInFocus.code]) {
    updatedState.pollInFocus = cloneDeep(allPolls[state.pollInFocus.code])
  }
  return updatedState
}

const stateAfterVotedOption = (state: AppState, voteCreated: VoteCreated) => {
  const updatedState = cloneDeep(state)
  const focusPoll = updatedState.pollInFocus
  if (!focusPoll) return state
  focusPoll.options = focusPoll.options.map((option) => {
    if (option.id === voteCreated.optionId) {
      option.votes.push({ ...voteCreated })
      return option
    }
    return option
  })
  updatedState.polls[focusPoll.code].options = cloneDeep(focusPoll.options)
  return updatedState
}

const stateAfterSetFocusPollData = (state: AppState, data: FetchFocusPollData) => {
  const updatedState = cloneDeep(state)
  updatedState.pollInFocus = data.poll
  if (data.token) updatedState.token = data.token
  if (data.userId) updatedState.userId = data.userId
  if (data.userName) updatedState.userName = data.userName
  return updatedState
}

export const reducer = (state: AppState, action: StateAction) => {
  switch (action.type) {
    case StateActionType.SET_LANGUAGE:
      return { ...state, language: action.data }
    case StateActionType.ADD_POLL:
      return stateAfterPollCreatedOrEdited(state, action.data)
    case StateActionType.UPDATE_POLL:
      return stateAfterPollCreatedOrEdited(state, action.data)
    case StateActionType.SET_ALL_POLLS:
      return stateAfterAllPollsSet(state, action.data)
    case StateActionType.SET_FOCUS_POLL:
      return { ...state, pollInFocus: cloneDeep(action.data) }
    case StateActionType.SET_TOKEN:
      return { ...state, token: action.data }
    case StateActionType.SET_USER_ID:
      return { ...state, userId: action.data }
    case StateActionType.SET_USER_NAME:
      return { ...state, userName: action.data }
    case StateActionType.VOTED_OPTION:
      return stateAfterVotedOption(state, action.data)
    case StateActionType.SET_FOCUS_POLL_DATA:
      return stateAfterSetFocusPollData(state, action.data)
    case StateActionType.SET_POLL_IN_EDITING:
      // Pitääkö state kopioida more deep?
      // Voisiko stateen tallettaa Pollit objekteina?
      return { ...state, pollInEditing: action.data }
    default:
      throw new Error(`${JSON.stringify(action)} should not appear 
        as an action in app state reducer!`)
  }
}
