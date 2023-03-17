/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '@chakra-ui/react'
import { useEffect, useCallback, useContext } from 'react'
import { useBrowserStorage } from '../../../hooks/use-browser-storage'
import { useGraphQLClient } from '../../../hooks/use-graphql-client'
import { Dispatch } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import ModeSelection from '../../launch/mode-selection'
import NotFound from '../../widgets/not-found/not-found'
import DashboardItem from './dashboard-item'
import { Styles } from './styles'

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
  const { retrieveLocalStorageData } = useBrowserStorage()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const fetchPolls = useCallback(async () => {
    const { userId, pollCodeTokenPairs } = retrieveLocalStorageData()
    // const codes = pollCodeTokenPairs.map((pair) => pair.code)
    // if (codes.length === 0) return

    const allPolls = await findPollsByCode(pollCodeTokenPairs, userId)
    // updateStorageWithPolls(allPolls)
    dispatch({ type: Dispatch.SET_ALL_POLLS, data: allPolls })
  }, [])

  useEffect(() => {
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
    <div>
      {Object.values(state.polls).map((poll) => (
        <DashboardItem key={poll.code} poll={poll} />
      ))}
    </div>
  )
}
