import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'

export const DATA_CY_CREATE_POLL_PAGE = 'create-poll-page'

const CreatePollPage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <div data-cy={DATA_CY_CREATE_POLL_PAGE}>CreatePollPage</div>
    </LayoutWithHeader>
  )
}

export default CreatePollPage
