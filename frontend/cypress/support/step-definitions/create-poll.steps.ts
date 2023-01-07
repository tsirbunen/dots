import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { CreatePollPage } from '../../components/create-poll-page'
import { DATA_CY_CREATE_POLL_FORM } from '../../../components/form-components/create-poll-form/create-or-edit-poll-form-core'

const createPollPage = new CreatePollPage()
const app = new App()

Then('the create poll form is visible', () => {
  app.verifyDataCyIsVisible(DATA_CY_CREATE_POLL_FORM)
})

When('one clicks the button to start setting the poll question', () => {
  createPollPage.clickProperAddTextModalOpen('poll question')
})

Then('a modal to enter the poll question is opened', () => {
  createPollPage.verifySetPollQuestionModalVisibility(true)
})

When('one enters the {string}', (pollQuestion: string) => {
  createPollPage.typePollQuestionToInputField(pollQuestion)
})

When('one clicks the add button in the modal', () => {
  createPollPage.clickModalAddButton()
})

Then('the entered {string} is visible in the form as the poll question', (pollQuestion: string) => {
  createPollPage.verifyTextIsVisible(pollQuestion)
})

Then('the modal is no longer open', () => {
  createPollPage.verifySetPollQuestionModalVisibility(false)
})

When('one clicks the button to start adding a voting option', () => {
  createPollPage.clickProperAddTextModalOpen('voting option')
})

Then('a modal to enter a voting option is opened', () => {
  createPollPage.verifyAddVotingOptionModalVisibility(true)
})

When('one enters a {string}', (votingOption: string) => {
  createPollPage.typeVotingOptionToInputField(votingOption)
})

Then('the entered {string} is visible in the form as a voting option', (votingOption: string) => {
  createPollPage.verifyTextIsVisible(votingOption)
})
