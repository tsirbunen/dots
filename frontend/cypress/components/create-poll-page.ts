import { Base } from './base'
import { DATA_CY_CREATE_POLL_PAGE } from '../../pages/create-poll/index'

export class CreatePollPage extends Base {
  verifyPageIsVisible() {
    this._verifyPageIsVisible(DATA_CY_CREATE_POLL_PAGE)
  }
}
