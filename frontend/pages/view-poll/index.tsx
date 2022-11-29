import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'

export const DATA_CY_VIEW_POLL_PAGE = 'view-poll-page'

const ViewPollPage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <div data-cy={DATA_CY_VIEW_POLL_PAGE}>ViewPollPage</div>
    </LayoutWithHeader>
  )
}

export default ViewPollPage
