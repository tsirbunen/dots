import type { NextPage } from 'next'
import CreatePollForm from '../../components/forms/form-elements/create-poll-form'
import LayoutWithHeader from '../../components/layout/layout-with-header'

export const DATA_CY_CREATE_POLL_PAGE = 'create_poll_page'

/**
 * When user wants to start creating a totally new poll the user is presented with this page.
 */
const CreatePollPage: NextPage = () => {
  return (
    <LayoutWithHeader dataCy={DATA_CY_CREATE_POLL_PAGE}>
      <CreatePollForm />
    </LayoutWithHeader>
  )
}

export default CreatePollPage
