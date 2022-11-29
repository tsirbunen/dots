import React, { createContext, useReducer } from 'react'
import { Language } from '../hooks/use-translation'
import { reducer } from './reducer'

export type AppState = {
  language: Language
}

const initialAppState = {
  language: 'EN' as Language //Language.EN
}

export const AppStateContext = createContext({})

export const AppStateContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState)
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}
