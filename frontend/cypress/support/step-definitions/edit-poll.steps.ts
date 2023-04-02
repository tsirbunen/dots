import { When, Given } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { CreatePollPage } from '../../components/create-poll-page'
import { DATA_CY_POLL_FORM_CORE } from '../../../components/forms/form-elements/poll-form'
import { DATA_CY_INFO_OPEN_POLL } from '../../../components/dashboard/poll-available-actions/poll-available-actions'
import { DashboardPage } from '../../components/dashboard-page'

const createPollPage = new CreatePollPage()
const dashboardPage = new DashboardPage()
const app = new App()

Given('one has created a poll and is in dashboard page for a single poll', () => {
  createPollPage.fillInAllRequiredFields()
  createPollPage.submitPollData()
  app.verifyDataCyContains(DATA_CY_INFO_OPEN_POLL)
  app.closeSnackbar()
  dashboardPage.clickEditButton()
  app.verifyDataCyIsVisible(DATA_CY_POLL_FORM_CORE)
})

When('one navigates to the poll using the edit button', () => {
  app.verifyDataCyIsVisible(DATA_CY_POLL_FORM_CORE)
})

When('one clicks a delete button to remove option number {word}', (optionIndex: string) => {
  createPollPage.deleteFirstVotingOption(optionIndex)
})
