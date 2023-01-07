import { Language } from '../hooks/use-translation'
import { Poll } from '../types/types'
import { AppState } from './state-context'

export enum AppStateActionEnum {
  SET_LANGUAGE = 'SET_LANGUAGE',
  ADD_POLL = 'ADD_POLL',
  UPDATE_POLL = 'UPDATE_POLL',
  SET_ALL_POLLS = 'SET_ALL_POLLS'
}

export type AppStateAction =
  | { type: AppStateActionEnum.SET_LANGUAGE; data: Language }
  | { type: AppStateActionEnum.ADD_POLL; data: Poll }
  | { type: AppStateActionEnum.UPDATE_POLL; data: Poll }
  | { type: AppStateActionEnum.SET_ALL_POLLS; data: Record<string, Poll> }

const getPollsWithNewPollAdded = (polls: Record<string, Poll>, newPoll: Poll): Record<string, Poll> => {
  const updatedPolls = { ...polls }
  updatedPolls[newPoll.code] = newPoll
  return updatedPolls
}

const getPollsWithOnePollUpdated = (polls: Record<string, Poll>, updatedPoll: Poll): Record<string, Poll> => {
  const updatedPolls = { ...polls }
  updatedPolls[updatedPoll.code] = updatedPoll
  return updatedPolls
}

export const reducer = (state: AppState, action: AppStateAction) => {
  switch (action.type) {
    case AppStateActionEnum.SET_LANGUAGE:
      return { ...state, language: action.data }
    case AppStateActionEnum.ADD_POLL:
      if (state.polls[action.data.code] !== undefined) {
        throw new Error(`Poll with code ${action.data.code} already exists!`)
      }
      return { ...state, polls: getPollsWithNewPollAdded(state.polls, action.data) }
    case AppStateActionEnum.UPDATE_POLL:
      return { ...state, polls: getPollsWithOnePollUpdated(state.polls, action.data) }
    case AppStateActionEnum.SET_ALL_POLLS:
      return { ...state, polls: { ...action.data } }
    default:
      throw new Error(`${JSON.stringify(action)} should not appear as an action in app state reducer!`)
  }
}
