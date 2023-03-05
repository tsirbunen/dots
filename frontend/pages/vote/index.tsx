import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout/layout-with-header'
import EnterPollCode from '../../components/voting/enter-code/enter-poll-code'

export const DATA_CY_VOTE_PAGE = 'vote_page'

/**
 * This page will ask user for poll code so that user can vote in that poll.
 */
const VotePage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <EnterPollCode />
    </LayoutWithHeader>
  )
}

export default VotePage
