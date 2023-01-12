import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { CreatePollPage } from '../../components/create-poll-page'
import { DATA_CY_CREATE_POLL_FORM_CORE } from '../../../components/form-components/create-poll-form/create-or-edit-poll-form-core'
import {
  DATA_CY_INFO_EDIT_POLL,
  DATA_CY_INFO_OPEN_POLL
} from '../../../components/widgets/poll-created-info/poll-created-info'

const createPollPage = new CreatePollPage()
const app = new App()

Then('the create poll form is visible', () => {
  app.verifyDataCyIsVisible(DATA_CY_CREATE_POLL_FORM_CORE)
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

Given('one has filled in the poll form some data', () => {
  createPollPage.fillInAllRequiredFields()
})

When('one clicks the button to submit poll data', () => {
  createPollPage.submitPollData()
})

Then('poll form is no longer visible', () => {
  app.verifyDataCyDoesNotExist(DATA_CY_CREATE_POLL_FORM_CORE)
})

Then('further editing poll button is visible', () => {
  app.verifyDataCyContains(DATA_CY_INFO_EDIT_POLL)
})

Then('open poll button is visible', () => {
  app.verifyDataCyContains(DATA_CY_INFO_OPEN_POLL)
})
