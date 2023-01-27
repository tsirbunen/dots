/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import EditPollFormWrapper from '../../components/form-components/create-poll-form/edit-poll-form-wrapper'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'
import NotFound from '../../components/widgets/not-found/not-found'
import { useBrowserStorageService } from '../../hooks/use-browser-storage-service'
import { useGraphQLClientService } from '../../hooks/use-graphql-client-service'
import { useTranslation } from '../../hooks/use-translation'
import { StateActionType } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'

export const DATA_CY_EDIT_POLL_PAGE = 'edit_poll_page'

const EditPollPage: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { retrieveLocalStorageData } = useBrowserStorageService()
  const { fetchPollData } = useGraphQLClientService()
  const { translate } = useTranslation()

  const fetchPoll = useCallback(async (pollCode: string) => {
    const { token } = retrieveLocalStorageData()
    const poll = await fetchPollData(pollCode, token)
    if (poll) {
      dispatch({
        type: StateActionType.SET_POLL_IN_EDITING,
        data: poll
      })
    }
  }, [])

  useEffect(() => {
    console.log('running useEffect edit poll')
    if (code && window) {
      fetchPoll(code as string)
    }
  }, [code, fetchPoll])

  if (!state?.pollInEditing) {
    return (
      <LayoutWithHeader>
        <NotFound textLines={[translate('could_not_find'), `${translate('poll_with_code')} ${code}`]} />
      </LayoutWithHeader>
    )
  }

  return (
    <LayoutWithHeader>
      <div data-cy={DATA_CY_EDIT_POLL_PAGE}>{<EditPollFormWrapper poll={state?.pollInEditing} />}</div>
    </LayoutWithHeader>
  )
}

export default EditPollPage
