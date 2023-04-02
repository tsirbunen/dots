import React, { createContext, useReducer } from 'react'
import { Language } from '../hooks/use-translation'
import { Poll } from '../types/types'
import { DispatchAction, reducer } from './reducer'

export type AppStateContextType = {
  state: AppState
  dispatch: React.Dispatch<DispatchAction>
}

export type AppState = {
  language: Language
  polls: Record<string, Poll>
  pollInEditing: Poll | undefined
  userId: string | undefined
  userName: string | undefined
}

const initialAppState = {
  language: 'EN' as Language,
  polls: {},
  pollInEditing: undefined,
  userId: undefined,
  userName: undefined
}

export const AppStateContext = createContext({})

export const AppStateContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState)
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}
