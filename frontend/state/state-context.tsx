import React, { createContext, useReducer } from 'react'
import { Language } from '../hooks/use-translation'
import { Poll } from '../types/types'
import { AppStateAction, reducer } from './reducer'

export type AppStateContextType = {
  state: AppState
  dispatch: React.Dispatch<AppStateAction>
}

export type AppState = {
  language: Language
  polls: Record<string, Poll>
}

const initialAppState = {
  language: 'EN' as Language,
  polls: {}
}

export const AppStateContext = createContext({})

export const AppStateContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState)
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}
