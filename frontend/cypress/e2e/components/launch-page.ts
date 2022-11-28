import { DATA_CY_APP_TITLE, DATA_CY_APP_SHORT_DESCRIPTION } from '../../../components/launch-page-content/app-title'
import {
  DATA_CY_HOW_DOES_IT_WORK,
  DATA_CY_USE_INSTRUCTION
} from '../../../components/launch-page-content/instructions-for-use'
import { DATA_CY_LAUNCH_PAGE } from '../../../components/launch-page-content/launch-page-content'
import { DATA_CY_LAUNCH_PAGE_LANGUAGE_TOGGLE } from '../../../components/launch-page-content/launch-page-language-toggle'
import { DATA_CY_USE_MODE } from '../../../components/launch-page-content/mode-of-use-selection-buttons'
import { DATA_CY_LANGUAGE, DATA_CY_LANGUAGE_TOGGLE } from '../../../components/toggle-language/toggle-language'
import { Language, TRANSLATIONS } from '../../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../../localization/fi'
import { Base } from './base'

const INSTRUCTIONS_FOR_USE_COUNT = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('use_instruction')).length
const MODES_OF_USE_COUNT = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_')).length

export class LaunchPage extends Base {
  verifyLaunchPageIsVisible() {
    this._verifyDataCyIsVisible(DATA_CY_LAUNCH_PAGE)
  }

  verifyAppTitleIsVisible() {
    this._verifyDataCyIsVisible(DATA_CY_APP_TITLE)
  }

  verifyAppShortDescriptionIsVisible() {
    this._verifyDataCyIsVisible(DATA_CY_APP_SHORT_DESCRIPTION)
  }

  verifyLanguageToggleIsVisible() {
    this._verifyDataCyIsVisible(DATA_CY_LAUNCH_PAGE_LANGUAGE_TOGGLE)
  }

  verifyUseInstructionsAreVisible() {
    this._verifyDataCyIsVisible(DATA_CY_HOW_DOES_IT_WORK)
    this._verifyDataCyBeginsWithInstancesAreVisible(DATA_CY_USE_INSTRUCTION, INSTRUCTIONS_FOR_USE_COUNT)
  }

  verifySelectionButtonsForModesOfUseAreVisible() {
    this._verifyDataCyBeginsWithInstancesAreVisible(DATA_CY_USE_MODE, MODES_OF_USE_COUNT)
  }

  verifyAppLanguageIsTheGivenLanguage(language: string) {
    assert(Object.keys(Language).includes(language))
    const exampleElementTextInLanguage = TRANSLATIONS[language]['how_does_it_work']
    cy.contains(exampleElementTextInLanguage)
  }

  clickTheLanguageToggle() {
    const toggleButton = cy.getByDataCy(DATA_CY_LANGUAGE_TOGGLE)
    toggleButton.click()
  }

  verifyLanguageSelectionButtonsAreVisible() {
    this._verifyDataCyIsVisible(`${DATA_CY_LANGUAGE}-EN`)
    this._verifyDataCyIsVisible(`${DATA_CY_LANGUAGE}-FI`)
  }

  clickLanguageSelectionButton(language: string) {
    const selectionButton = cy.contains(language)
    selectionButton.click()
  }
}
