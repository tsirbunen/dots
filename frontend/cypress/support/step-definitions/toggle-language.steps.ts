import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { LaunchPage } from '../../e2e/components/launch-page'

const launchPage = new LaunchPage()

Then('the app language is {string}', (language: string) => {
  launchPage.verifyAppLanguageIsTheGivenLanguage(language)
})

When('one clicks the toggle language icon button', () => {
  launchPage.clickTheLanguageToggle()
})

Then('the language selection buttons become visible', () => {
  launchPage.verifyLanguageSelectionButtonsAreVisible()
})

When('one clicks the selection button with text {word}', (language: string) => {
  launchPage.clickLanguageSelectionButton(language)
})
