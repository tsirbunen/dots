import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Styles } from '../../components/voting/voting/styles'
import LayoutWithHeader from '../../components/layout/layout-with-header'
import { AskForUserName } from '../../components/voting/ask-user-name/ask-for-user-name'
import { Question } from '../../components/voting/voting/question'
import Voting from '../../components/voting/voting/voting'
import NotFound from '../../components/widgets/not-found/not-found'
import { useBrowserStorage } from '../../hooks/use-browser-storage'
import { useGraphQLClient } from '../../hooks/use-graphql-client'
import { useTranslation } from '../../hooks/use-translation'
import { Dispatch } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import { Poll } from '../../types/types'
import { DATA_CY_VOTE_PAGE } from '.'

export const DATA_CY_VOTE_POLL_PAGE = 'vote_poll_page'

export type FetchFocusPollData = {
  token: string | undefined
  userName: string | undefined
  userId: string
  poll: Poll
}

/**
 * This page will show the desired poll and enable voting.
 * If the voting is not anonymous and user's name cannot be found in browser
 * local storage, user is first asked to give a name.
 */
const VoteInPoll: NextPage = () => {
  const [poll, setPoll] = useState<Poll | undefined>(undefined)
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { fetchPollData } = useGraphQLClient()
  const { retrieveLocalStorageData } = useBrowserStorage()
  const { translate } = useTranslation()
  const router = useRouter()
  const { code } = router.query

  const fetchPoll = useCallback(async (pollCode: string) => {
    const { userId, userName } = retrieveLocalStorageData()
    const pollByCode = await fetchPollData(pollCode, undefined, userId)

    if (pollByCode) {
      setPoll(pollByCode)
      dispatch({
        type: Dispatch.SET_USER_ID,
        data: userId
      })
      dispatch({
        type: Dispatch.SET_USER_NAME,
        data: userName
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (code && window) {
      fetchPoll(code as string)
    }
  }, [code, fetchPoll])

  const userId = state?.userId

  if (!poll) {
    return (
      <NotFound textLines={[translate('could_not_find'), `${translate('poll_with_code')} ${code}`]} withLayout={true} />
    )
  }

  if (!userId) {
    return <NotFound textLines={[translate('something_went_wrong'), translate('go_home')]} withLayout={true} />
  }

  const userNameIsMissing = !poll.isAnonymous && !state.userName
  if (userNameIsMissing) {
    return (
      <LayoutWithHeader dataCy={DATA_CY_VOTE_PAGE}>
        <Flex {...Styles.wrapper}>
          <Question
            question={poll.question}
            userId={userId}
            totalVotesCountMax={poll.totalVotesCountMax}
            options={poll.options}
          />
          <AskForUserName />
        </Flex>
      </LayoutWithHeader>
    )
  }

  return (
    <LayoutWithHeader dataCy={DATA_CY_VOTE_PAGE}>
      <Voting poll={poll} userId={userId} userName={state?.userName} />
    </LayoutWithHeader>
  )
}

export default VoteInPoll
