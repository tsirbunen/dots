import { Language } from '../hooks/use-translation'
import { AppState } from './state-context'

export enum AppStateActionEnum {
  SET_LANGUAGE = 'SET_LANGUAGE'
}

export type AppStateAction = { type: AppStateActionEnum.SET_LANGUAGE; data: Language }

export const reducer = (state: AppState, action: AppStateAction) => {
  switch (action.type) {
    case AppStateActionEnum.SET_LANGUAGE:
      return { ...state, language: action.data }
    default:
      throw new Error(`${JSON.stringify(action)} should not appear as an action in app state reducer!`)
  }
}
