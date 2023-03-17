import { Language } from '../hooks/use-translation'
import { Poll } from '../types/types'
import { AppState } from './state-context'
import { cloneDeep } from 'lodash'

export enum Dispatch {
  SET_LANGUAGE = 'SET_LANGUAGE',
  ADD_POLL = 'ADD_POLL',
  UPDATE_POLL = 'UPDATE_POLL',
  SET_ALL_POLLS = 'SET_ALL_POLLS',
  SET_USER_ID = 'SET_USER_ID',
  SET_USER_NAME = 'SET_USER_NAME',
  VOTED_OPTION = 'VOTED_OPTION',
  SET_POLL_IN_EDITING = 'SET_POLL_IN_EDITING'
}

export type DispatchAction =
  | { type: Dispatch.SET_LANGUAGE; data: Language }
  | { type: Dispatch.ADD_POLL; data: Poll }
  | { type: Dispatch.UPDATE_POLL; data: Poll }
  | { type: Dispatch.SET_ALL_POLLS; data: Poll[] }
  | { type: Dispatch.SET_USER_ID; data: string | undefined }
  | { type: Dispatch.SET_USER_NAME; data: string | undefined }
  | { type: Dispatch.SET_POLL_IN_EDITING; data: Poll | undefined }

const getStateAfterAllPollsSet = (state: AppState, polls: Poll[]): AppState => {
  const allPolls: Record<string, Poll> = {}
  const pollInEditingCode: string | undefined = state.pollInEditing?.code
  let pollInEditing: Poll | undefined
  polls.forEach((poll) => {
    allPolls[poll.code] = cloneDeep(poll)
    if (pollInEditingCode === poll.code) {
      pollInEditing = cloneDeep(poll)
    }
  })
  return { ...state, polls: allPolls, pollInEditing }
}

const getStateAfterPollCreatedOrEdited = (state: AppState, poll: Poll): AppState => {
  const updatedPolls = cloneDeep(state.polls)
  updatedPolls[poll.code] = { ...poll }
  return { ...state, polls: updatedPolls, pollInEditing: { ...poll } }
}

export const reducer = (state: AppState, action: DispatchAction) => {
  switch (action.type) {
    case Dispatch.SET_LANGUAGE:
      return { ...state, language: action.data }
    case Dispatch.SET_ALL_POLLS:
      return getStateAfterAllPollsSet(state, action.data)
    case Dispatch.SET_USER_ID:
      return { ...state, userId: action.data }
    case Dispatch.SET_USER_NAME:
      return { ...state, userName: action.data }
    case Dispatch.ADD_POLL:
    case Dispatch.UPDATE_POLL:
      return getStateAfterPollCreatedOrEdited(state, action.data)
    case Dispatch.SET_POLL_IN_EDITING:
      return { ...state, pollInEditing: action.data ? { ...action.data } : undefined }
    default:
      throw new Error(`${JSON.stringify(action)} should not appear 
        as an action in app state reducer!`)
  }
}
