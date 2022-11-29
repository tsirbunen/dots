import { Base } from './base'
import { DATA_CY_VOTE_IN_POLL_PAGE } from '../../pages/vote-in-poll/index'

export class VoteInPollPage extends Base {
  verifyPageIsVisible() {
    this._verifyPageIsVisible(DATA_CY_VOTE_IN_POLL_PAGE)
  }
}
