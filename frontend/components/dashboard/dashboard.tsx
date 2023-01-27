/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '@chakra-ui/react'
import { useEffect, useCallback, useContext } from 'react'
import { useBrowserStorageService } from '../../hooks/use-browser-storage-service'
import { useGraphQLClientService } from '../../hooks/use-graphql-client-service'
import { StateActionType } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import ModeSelection from '../launch-page-content/mode-selection'
import NotFound from '../widgets/not-found/not-found'
import DashboardListItem from './dashboard-item'
import { Styles } from './styles'

export const DATA_CY_DASHBOARD_PAGE = 'dashboard_page'
export const DATA_CY_NO_POLLS = 'no_polls'

const Dashboard = () => {
  const { findPollsByCode } = useGraphQLClientService()
  const { getPollCodes, getToken, updateStorageWithPolls } = useBrowserStorageService()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const fetchPolls = useCallback(async () => {
    const codes = getPollCodes()
    if (codes.length === 0) return
    const storedToken = getToken()
    const allPolls = await findPollsByCode(codes, storedToken)
    updateStorageWithPolls(allPolls)
    dispatch({ type: StateActionType.SET_ALL_POLLS, data: allPolls })
  }, [])

  useEffect(() => {
    console.log('Running useEffect in dashboard')
    if (window) {
      fetchPolls()
    }
  }, [fetchPolls])

  if (Object.keys(state.polls).length === 0) {
    return (
      <Flex {...Styles.container} data-cy={DATA_CY_NO_POLLS}>
        <NotFound textLines={['Seems that there are no polls']} />
        <Flex {...Styles.buttonContainer}>
          <ModeSelection />
        </Flex>
      </Flex>
    )
  }

  return (
    <div data-cy={DATA_CY_DASHBOARD_PAGE}>
      {Object.values(state.polls).map((poll) => (
        <DashboardListItem key={poll.code} poll={poll} />
      ))}
    </div>
  )
}

export default Dashboard
