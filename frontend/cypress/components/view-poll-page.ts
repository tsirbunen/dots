import { Base } from './base'
import { DATA_CY_VIEW_POLL_PAGE } from '../../pages/view-poll/index'

export class ViewPollPage extends Base {
  verifyPageIsVisible() {
    this._verifyPageIsVisible(DATA_CY_VIEW_POLL_PAGE)
  }
}
