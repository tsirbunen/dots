import type { NextPage } from 'next'
import CreatePollForm from '../../components/forms/form-elements/create-poll-form'
import LayoutWithHeader from '../../components/layout/layout-with-header'

export const DATA_CY_CREATE_POLL_PAGE = 'create-poll-page'

/**
 * When user wants to start creating a totally new poll the user is presented with this page.
 */
const CreatePollPage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <div data-cy={DATA_CY_CREATE_POLL_PAGE}>
        <CreatePollForm />
      </div>
    </LayoutWithHeader>
  )
}

export default CreatePollPage
