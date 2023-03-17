/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import EditPollForm from '../../components/forms/form-elements/edit-poll-form'
import LayoutWithHeader from '../../components/layout/layout-with-header'
import NotFound from '../../components/widgets/not-found/not-found'
import { useBrowserStorage } from '../../hooks/use-browser-storage'
import { useGraphQLClient } from '../../hooks/use-graphql-client'
import { useTranslation } from '../../hooks/use-translation'
import { Dispatch } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'

export const DATA_CY_EDIT_POLL_PAGE = 'edit_poll_page'

/**
 * When user has created a poll earlier and now wants to edit that poll then
 * the user is presented with this page.
 */
const EditPollPage: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { getPollToken } = useBrowserStorage()
  const { fetchPollData } = useGraphQLClient()
  const { translate } = useTranslation()

  const fetchPoll = useCallback(async (pollCode: string) => {
    const token = getPollToken(pollCode)
    if (!token) return
    const poll = await fetchPollData(pollCode, token)

    if (poll) {
      dispatch({
        type: Dispatch.SET_POLL_IN_EDITING,
        data: poll
      })
    }
  }, [])

  useEffect(() => {
    if (code && window) {
      fetchPoll(code as string)
    }
  }, [code, fetchPoll])

  return (
    <LayoutWithHeader dataCy={DATA_CY_EDIT_POLL_PAGE}>
      {state?.pollInEditing ? (
        <EditPollForm poll={state?.pollInEditing} />
      ) : (
        <NotFound textLines={[translate('could_not_find'), `${translate('poll_with_code')} ${code}`]} />
      )}
    </LayoutWithHeader>
  )
}

export default EditPollPage
