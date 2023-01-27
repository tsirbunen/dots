import React, { createContext, useReducer } from 'react'
import { Language } from '../hooks/use-translation'
import { Poll } from '../types/types'
import { StateAction, reducer } from './reducer'

export type AppStateContextType = {
  state: AppState
  dispatch: React.Dispatch<StateAction>
}

export type AppState = {
  language: Language
  polls: Record<string, Poll>
  pollInFocus: Poll | undefined
  pollInEditing: Poll | undefined
  token: string | undefined
  userId: string | undefined
  userName: string | undefined
}

const initialAppState = {
  language: 'EN' as Language,
  polls: {},
  pollInFocus: undefined,
  pollInEditing: undefined,
  token: undefined,
  userId: undefined,
  userName: undefined
}

export const AppStateContext = createContext({})

export const AppStateContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState)
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}
