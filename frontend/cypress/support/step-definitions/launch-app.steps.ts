import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

import { DATA_CY_APP_SHORT_DESCRIPTION, DATA_CY_APP_TITLE } from '../../../components/launch-page-content/app-title'
import {
  DATA_CY_HOW_DOES_IT_WORK,
  DATA_CY_USE_INSTRUCTION
} from '../../../components/launch-page-content/instructions-for-use'
import { DATA_CY_LAUNCH_PAGE } from '../../../components/launch-page-content/launch-page-content'
import { DATA_CY_USE_MODE } from '../../../components/launch-page-content/mode-of-use-selection-buttons'
import { DATA_CY_LANGUAGE_TOGGLE } from '../../../components/widgets/toggle-language/toggle-language'
import { FI_TRANSLATIONS } from '../../../localization/fi'
import { App } from '../../components/app'
import { LaunchPage } from '../../components/launch-page'

const app = new App()
const launchPage = new LaunchPage()

Given('one has navigated to the DOTS app url', () => {
  app.navigateToDotsApp()
  launchPage.verifyDataCyIsVisible(DATA_CY_LAUNCH_PAGE)
})

Then('the app title is visible', () => {
  launchPage.verifyDataCyIsVisible(DATA_CY_APP_TITLE)
})

Then('the app short description is visible', () => {
  launchPage.verifyDataCyIsVisible(DATA_CY_APP_SHORT_DESCRIPTION)
})

Then('the use instructions is visible', () => {
  launchPage.verifyDataCyIsVisible(DATA_CY_HOW_DOES_IT_WORK)
  const instructionsForUseCount = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('use_instruction')).length
  launchPage.verifyDataCyBeginsWithInstancesAreVisible(DATA_CY_USE_INSTRUCTION, instructionsForUseCount)
})

Then('the language toggle is visible', () => {
  launchPage.verifyDataCyIsVisible(DATA_CY_LANGUAGE_TOGGLE)
})

Then('the use mode selection buttons are visible', () => {
  const modesOfUse = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_'))
  launchPage.verifyDataCyBeginsWithInstancesAreVisible(DATA_CY_USE_MODE, modesOfUse.length)
})
