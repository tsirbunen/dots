import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import PollWhatToDo from '../../components/dashboard/poll-what-to-do'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'
import { useBrowserStorageService } from '../../hooks/use-browser-storage-service'
import { useGraphQLClientService } from '../../hooks/use-graphql-client-service'
import { StateActionType } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import { PollState } from '../../types/graphql-schema-types.generated'

export const DATA_CY_DASHBOARD_POLL_PAGE = 'dashboard_poll_page'

const DashboardPollPage: NextPage = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { retrieveLocalStorageData } = useBrowserStorageService()
  const { findPollsByCode } = useGraphQLClientService()

  const { code } = router.query

  const fetchPolls = useCallback(async () => {
    const { token, userName, userId, pollCodes } = retrieveLocalStorageData()
    if (token) dispatch({ type: StateActionType.SET_TOKEN, data: token })
    if (userName) dispatch({ type: StateActionType.SET_USER_NAME, data: userName })
    if (userId) dispatch({ type: StateActionType.SET_USER_ID, data: userId })
    const polls = await findPollsByCode(pollCodes, token)
    if (polls) {
      dispatch({
        type: StateActionType.SET_ALL_POLLS,
        data: polls
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (Object.keys(state.polls).length === 0 && window) {
      fetchPolls()
    }
  }, [fetchPolls])

  const pollCode = code as string
  const poll = state?.polls[pollCode]

  const getPollWidget = () => {
    if (!poll) return <div></div>
    switch (poll.state) {
      case PollState.Edit:
        return <PollWhatToDo poll={poll} />
      case PollState.Vote:
        return <PollWhatToDo poll={poll} />
      case PollState.Closed:
        return <PollWhatToDo poll={poll} />
      default:
        throw new Error(`There is no such poll state as ${poll.state}`)
    }
  }

  return <LayoutWithHeader>{getPollWidget()}</LayoutWithHeader>
}

export default DashboardPollPage
