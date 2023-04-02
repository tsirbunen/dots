import { Translations, Phrase } from '../localization/translations'
import { EN_TRANSLATIONS } from '../localization/en'
import { FI_TRANSLATIONS } from '../localization/fi'
import { useContext } from 'react'
import { AppState, AppStateContext } from '../state/state-context'

export enum Language {
  FI = 'FI',
  EN = 'EN'
}

type UseTranslation = {
  translate: (phrase: Phrase) => string
}

export const TRANSLATIONS: Record<Language, Translations> = {
  FI: FI_TRANSLATIONS,
  EN: EN_TRANSLATIONS
}

export const useTranslation = (): UseTranslation => {
  const { state } = useContext(AppStateContext) as { state: AppState }
  const translate = (phrase: Phrase) => {
    const selectedLanguage = state && state.language ? state.language : Language.EN
    const translations = TRANSLATIONS[selectedLanguage]
    return translations[phrase]
  }
  return {
    translate
  }
}
