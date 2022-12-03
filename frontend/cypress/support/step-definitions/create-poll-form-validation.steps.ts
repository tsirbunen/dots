import { Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { CreatePollPage } from '../../components/create-poll-page'
import { EN_TRANSLATIONS } from '../../../localization/en'

const createPollPage = new CreatePollPage()

Then('warning due to missing poll question is displayed', () => {
  cy.contains(EN_TRANSLATIONS.set_voting_question)
})

Then('warning due to missing voting options is displayed', () => {
  cy.contains(EN_TRANSLATIONS.set_min_voting_options)
})

Then(
  '{word} button {string}',
  (button: 'reset' | 'submit' | 'addVotingOption', disabled: 'is disabled' | 'is not disabled') => {
    createPollPage.verifyButtonIsDisabled(button, disabled === 'is disabled')
  }
)

Then('{string} button {string}', (button: 'modal add', status: 'is visible' | 'is not visible' | 'does not exist') => {
  createPollPage.verifyButtonStatus(button, status)
})

Then('warning that at least one more voting option is required is displayed', () => {
  cy.contains(EN_TRANSLATIONS.too_little_options)
})

Given('one has added max allowed number of voting options', () => {
  createPollPage.giveMaxAllowedCountOfVotingOptions()
})

Then('the add voting option button is disabled', () => {
  createPollPage.verifyButtonIsDisabled('addVotingOption', true)
})

Given(
  'one has typed {string} text to {string} input field',
  (invalidInput: 'too short' | 'too long', targetField: 'poll question' | 'voting option') => {
    switch (invalidInput) {
      case 'too short':
        createPollPage.enterTooShortTextToTargetInputField(targetField)
        break
      case 'too long':
        createPollPage.enterTooLongTextToTargetInputField(targetField)
        break
      default:
        throw new Error(`Invalid input of type ${invalidInput} has not been implemented!`)
    }
  }
)

Then('a warning is displayed that the input is {string}', (errorType: 'too short' | 'too long' | 'required') => {
  switch (errorType) {
    case 'too short':
      cy.contains(EN_TRANSLATIONS.too_short)
      break
    case 'too long':
      cy.contains(EN_TRANSLATIONS.too_long)
      break
    case 'required':
      cy.contains(EN_TRANSLATIONS.required)
      break
    default:
      throw new Error(`Input error of type ${errorType} has not been implemented!`)
  }
})

Given('one has cleared the text from {string} input field', (targetField: 'poll question' | 'voting option') => {
  createPollPage.enterTextAndClearTextFromTargetInputField(targetField)
})

Given('one has added some voting option twice', () => {
  createPollPage.giveSameVotingOptionTwice()
})

Then('a warning is displayed that voting options must be unique', () => {
  cy.contains(EN_TRANSLATIONS.options_must_be_unique)
})

// deletoi vastauksia
// vaihtele muita ominaisuuksia, katso arvot
// miten tutkia, mitä on submitissa?
