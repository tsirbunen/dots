/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '@chakra-ui/react'
import { useEffect, useCallback, useContext } from 'react'
import { useBrowserStorage } from '../../../hooks/use-browser-storage'
import { useGraphQLClient } from '../../../hooks/use-graphql-client'
import { StateActionType } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import ModeSelection from '../../launch/mode-selection'
import NotFound from '../../widgets/not-found/not-found'
import DashboardItem from './dashboard-item'
import { Styles } from './styles'

export const DATA_CY_DASHBOARD_PAGE = 'dashboard_page'
export const DATA_CY_NO_POLLS = 'no_polls'

/**
 * The dashboard shows a list of users own polls and also polls created by
 * other users for which the user has given the poll code.
 * Polls are "remembered" by storing poll codes in browser local storage.
 * Poll data can be fetched from server using poll codes (and possible
 * user id also stored in browser local storage).
 */
export const PollsList = () => {
  const { findPollsByCode } = useGraphQLClient()
  const { getPollCodes, getToken, updateStorageWithPolls } = useBrowserStorage()
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
        <DashboardItem key={poll.code} poll={poll} />
      ))}
    </div>
  )
}
