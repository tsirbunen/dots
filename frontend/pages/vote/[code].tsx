import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'
import Voting from '../../components/voting/voting'
import { useBrowserStorageService } from '../../hooks/use-browser-storage-service'
import { useGraphQLClientService } from '../../hooks/use-graphql-client-service'
import { StateActionType } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import { Poll } from '../../types/types'

export const DATA_CY_VOTE_POLL_PAGE = 'vote_poll_page'

export type FetchFocusPollData = {
  token: string | undefined
  userName: string | undefined
  userId: string
  poll: Poll
}

const VoteInPoll: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { findPollsByCode } = useGraphQLClientService()
  const { retrieveLocalStorageData } = useBrowserStorageService()

  const fetchPolls = useCallback(async (pollCode: string) => {
    const { token, userName, userId } = retrieveLocalStorageData()
    const polls = await findPollsByCode([pollCode], token)

    if (polls && polls.length > 0) {
      const pollWithCode = polls[0]
      dispatch({
        type: StateActionType.SET_FOCUS_POLL_DATA,
        data: { token, userId, userName, poll: pollWithCode }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (code && window) {
      fetchPolls(code as string)
    }
  }, [code, fetchPolls])

  return (
    <LayoutWithHeader>
      <Voting pollInFocus={state?.pollInFocus} code={code as string} />
    </LayoutWithHeader>
  )
}

export default VoteInPoll
