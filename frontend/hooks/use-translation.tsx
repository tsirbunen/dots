import { Translations, Phrase } from '../localization/translations'
import { EN_TRANSLATIONS } from '../localization/en'
import { FI_TRANSLATIONS } from '../localization/fi'

export enum Language {
  FI = 'FI',
  EN = 'EN'
}

type UseTranslation = {
  translate: (phrase: Phrase) => string
}

const TRANSLATIONS: Record<Language, Translations> = {
  FI: FI_TRANSLATIONS,
  EN: EN_TRANSLATIONS
}

export const useTranslation = (): UseTranslation => {
  // TODO: Add here retrieving the selected language from State!
  const translate = (phrase: Phrase) => {
    const selectedLanguage = Language.EN
    const translations = TRANSLATIONS[selectedLanguage]
    return translations[phrase]
  }
  return {
    translate
  }
}
