import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'

export const DATA_CY_VOTE_IN_POLL_PAGE = 'vote-in-poll-page'

const VoteInPollPage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <div data-cy={DATA_CY_VOTE_IN_POLL_PAGE}>VoteInPollPage</div>
    </LayoutWithHeader>
  )
}

export default VoteInPollPage
