import type { NextPage } from 'next'
import CreatePollFormWrapper from '../../components/form-components/create-poll-form/create-poll-form-wrapper'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'

export const DATA_CY_CREATE_POLL_PAGE = 'create-poll-page'

const CreatePollPage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <div data-cy={DATA_CY_CREATE_POLL_PAGE}>
        <CreatePollFormWrapper />
      </div>
    </LayoutWithHeader>
  )
}

export default CreatePollPage
