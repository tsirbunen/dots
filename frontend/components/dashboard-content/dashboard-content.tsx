import { useEffect, useCallback, useContext } from 'react'
import { useBrowserStorageService } from '../../hooks/use-browser-storage-service'
import { AppStateActionEnum } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import DashboardListItem from './dashboard-list-item'
import { useGraphQLClientService } from './use-graphql-client-service'

export const DATA_CY_DASHBOARD_PAGE = 'dashboard_page'

const DashboardContent = () => {
  const { findPollsByCode } = useGraphQLClientService()
  const { getPollCodes, getToken, updateStorageWithRecentPollsData } = useBrowserStorageService()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const fetchPolls = useCallback(async () => {
    const codes = getPollCodes()
    if (codes.length === 0) return

    const storedToken = getToken()
    const allPolls = await findPollsByCode(codes, storedToken)
    updateStorageWithRecentPollsData(allPolls)
    console.log({ allPolls })
    dispatch({ type: AppStateActionEnum.SET_ALL_POLLS, data: allPolls })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (window) {
      fetchPolls()
    }
  }, [fetchPolls])

  return (
    <div data-cy={DATA_CY_DASHBOARD_PAGE}>
      {Object.values(state.polls).map((poll) => (
        <DashboardListItem key={poll.code} poll={poll} />
      ))}
    </div>
  )
}

export default DashboardContent
