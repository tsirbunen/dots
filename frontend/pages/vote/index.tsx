import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'
import EnterPollCode from '../../components/voting/enter-poll-code'

export const DATA_CY_VOTE_PAGE = 'vote_page'

const VotePage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <EnterPollCode />
    </LayoutWithHeader>
  )
}

export default VotePage
