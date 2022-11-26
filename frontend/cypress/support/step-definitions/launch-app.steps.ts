import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'
import { LaunchPage } from '../../e2e/components/launch-page'

const launchPage = new LaunchPage()

Given('one has navigated to the DOTS app url', () => {
  launchPage.visitDotsApp()
  launchPage.verifyLaunchPageIsVisible()
})

Then('the app title is visible', () => {
  launchPage.verifyAppTitleIsVisible()
})

Then('the app short description is visible', () => {
  launchPage.verifyAppShortDescriptionIsVisible()
})

Then('the use instructions is visible', () => {
  launchPage.verifyUseInstructionsAreVisible()
})

Then('the use mode selection buttons are visible', () => {
  launchPage.verifySelectionButtonsForModesOfUseAreVisible()
})
