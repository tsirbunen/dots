import { DATA_CY_INFO_EDIT_POLL } from '../../components/dashboard/poll-available-actions/poll-available-actions'
import { Base } from './base'

export class DashboardPage extends Base {
  clickEditButton() {
    cy.getByDataCy(DATA_CY_INFO_EDIT_POLL).click()
  }
}
