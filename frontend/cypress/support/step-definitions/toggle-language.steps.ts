import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { LaunchPage } from '../../components/launch-page'

const launchPage = new LaunchPage()

Then('the app language is {string}', (language: string) => {
  launchPage.verifyAppLanguageIsTheGivenLanguage(language)
})

When('one clicks the toggle language icon button', () => {
  launchPage.clickTheLanguageToggle()
})

Then('the language toggle buttons are {word}', (visibility: string) => {
  launchPage.verifyLanguageSelectionButtonsVisibilityType(visibility)
})

When('one clicks the selection button with text {word}', (language: string) => {
  launchPage.clickLanguageSelectionButton(language)
})
