import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import { Styles } from '../../components/dashboard/polls-list/styles'
import LayoutWithHeader from '../../components/layout/layout-with-header'
import NotFound from '../../components/widgets/not-found/not-found'
import { useBrowserStorage } from '../../hooks/use-browser-storage'
import { useGraphQLClient } from '../../hooks/use-graphql-client'
import { useTranslation } from '../../hooks/use-translation'
import { Phrase } from '../../localization/translations'
import { StateActionType } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import { PollState } from '../../types/graphql-schema-types.generated'
import { SinglePoll } from '../../components/dashboard/poll-available-actions/poll-available-actions'

export type ActionButtonData = { phrase: Phrase; cy: string; onClick: (input?: PollState) => void }

/**
 * This page shows actions available for a single poll.
 * The actions that can be performed depend on the state of the poll.
 */
const DashboardPollPage: NextPage = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { retrieveLocalStorageData } = useBrowserStorage()
  const { findPollsByCode } = useGraphQLClient()
  const { translate } = useTranslation()

  const { code } = router.query

  const fetchPolls = useCallback(async () => {
    const { userName, userId, pollCodeTokenPairs } = retrieveLocalStorageData()
    // if (token) dispatch({ type: StateActionType.SET_TOKEN, data: token })
    if (userName) dispatch({ type: StateActionType.SET_USER_NAME, data: userName })
    if (userId) dispatch({ type: StateActionType.SET_USER_ID, data: userId })
    const polls = await findPollsByCode(pollCodeTokenPairs, userId)
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

  if (!poll) {
    return (
      <NotFound textLines={[translate('could_not_find'), `${translate('poll_with_code')} ${code}`]} withLayout={true} />
    )
  }

  return (
    <LayoutWithHeader>
      <SinglePoll poll={poll} />
    </LayoutWithHeader>
  )
}

export default DashboardPollPage
