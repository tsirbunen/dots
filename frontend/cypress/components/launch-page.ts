import { DATA_CY_APP_TITLE, DATA_CY_APP_SHORT_DESCRIPTION } from '../../components/launch-page-content/app-title'
import {
  DATA_CY_HOW_DOES_IT_WORK,
  DATA_CY_USE_INSTRUCTION
} from '../../components/launch-page-content/instructions-for-use'
import { DATA_CY_LAUNCH_PAGE } from '../../components/launch-page-content/launch-page-content'
import { DATA_CY_LAUNCH_PAGE_LANGUAGE_TOGGLE } from '../../components/launch-page-content/launch-page-language-toggle'
import { DATA_CY_USE_MODE } from '../../components/launch-page-content/mode-of-use-selection-buttons'
import { DATA_CY_SIMPLE_BUTTON } from '../../components/small-button/simple-button'
import { DATA_CY_LANGUAGE, DATA_CY_LANGUAGE_TOGGLE } from '../../components/toggle-language/toggle-language'
import { Language, TRANSLATIONS } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Base } from './base'

const INSTRUCTIONS_FOR_USE_COUNT = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('use_instruction')).length
const MODES_OF_USE = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_'))
const MODES_OF_USE_COUNT = MODES_OF_USE.length

export class LaunchPage extends Base {
  verifyPageIsVisible() {
    this._verifyPageIsVisible(DATA_CY_LAUNCH_PAGE)
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

  verifyLanguageSelectionButtonsVisibilityType(visibility: string) {
    const languageDataCys = [`${DATA_CY_LANGUAGE}-EN`, `${DATA_CY_LANGUAGE}-FI`]
    languageDataCys.forEach((languageDataCy) => {
      if (visibility === 'invisible') this._verifyDataCyIsNotVisible(languageDataCy)
      else if (visibility === 'visible') this._verifyDataCyIsVisible(languageDataCy)
      else throw new Error('Language button visibility must be invisible or visible!')
    })
  }

  clickLanguageSelectionButton(language: string) {
    const selectionButton = cy.contains(language)
    selectionButton.click()
  }

  clickRouteButton(targetRoute: string) {
    let targetRouteButton
    if (targetRoute.includes('create')) targetRouteButton = this.getTargetRouteButton('create')
    else if (targetRoute.includes('vote')) targetRouteButton = this.getTargetRouteButton('vote')
    else if (targetRoute.includes('view')) targetRouteButton = this.getTargetRouteButton('view')
    else throw new Error(`Target route ${targetRoute} not available on Launch Page!`)
    targetRouteButton.click()
  }

  getTargetRouteButton(mode: string) {
    const searchText = `${DATA_CY_SIMPLE_BUTTON}-${MODES_OF_USE.filter((mode_of_use) => mode_of_use.includes(mode))[0]}`
    return cy.getByDataCy(searchText)
  }
}
