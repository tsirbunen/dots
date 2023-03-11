import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useGraphQLClient } from '../../../hooks/use-graphql-client'
import { Phrase } from '../../../localization/translations'
import { StateActionType } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import { PollState } from '../../../types/graphql-schema-types.generated'
import { Poll } from '../../../types/types'
import { MenuRouteTarget } from '../../layout/navigation-targets'
import { Styles } from './styles'
import { PollActions } from './poll-actions'
import { WhatToDoNextInfo } from './what-to-do-next-info'

export const DATA_CY_DASHBOARD_POLL_PAGE = 'dashboard_poll_page'
export const DATA_CY_INFO_EDIT_POLL = 'edit_poll'
export const DATA_CY_INFO_OPEN_POLL = 'open_poll'
export const DATA_CY_INFO_LEAVE_POLL = 'leave_poll'
export const DATA_CY_INFO_CLOSE_POLL = 'leave_poll'
export const DATA_CY_INFO_VOTE_IN_POLL = 'vote_in_poll'
export const DATA_CY_INFO_VIEW_POLL = 'view_poll'

export type ActionButtonData = { phrase: Phrase; cy: string; onClick: (input?: PollState) => void }
type SinglePollProps = {
  poll: Poll
}

/**
 * This page shows actions available for a single poll.
 * The actions that can be performed depend on the state of the poll.
 */
export const SinglePoll = ({ poll }: SinglePollProps) => {
  const router = useRouter()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { openPoll, closePoll } = useGraphQLClient()

  const openPollForVoting = async () => {
    const openingSucceeded = await openPoll(poll.id, poll.token)
    if (openingSucceeded) {
      dispatch({ type: StateActionType.UPDATE_POLL, data: { ...poll, state: PollState.Vote } })
    }
  }

  const closePollFromVoting = async () => {
    const closingSucceeded = await closePoll(poll.id, poll.token)
    if (closingSucceeded) {
      dispatch({ type: StateActionType.UPDATE_POLL, data: { ...poll, state: PollState.Closed } })
    }
  }

  const continueEditingPoll = () => router.push(`/${MenuRouteTarget.CREATE_POLL}/${poll.code}`)
  const comeBackLater = () => router.push(`/${MenuRouteTarget.DASHBOARD}`)
  const voteInOrViewPoll = () => {
    router.push(`/${MenuRouteTarget.VOTE}/${poll.code}`)
  }

  const getAvailableActions = (pollState: PollState): ActionButtonData[] => {
    switch (pollState) {
      case PollState.Edit:
        return [
          { phrase: 'open_poll', cy: DATA_CY_INFO_OPEN_POLL, onClick: openPollForVoting },
          { phrase: 'edit_poll', cy: DATA_CY_INFO_EDIT_POLL, onClick: continueEditingPoll },
          { phrase: 'leave_poll', cy: DATA_CY_INFO_LEAVE_POLL, onClick: comeBackLater }
        ] as ActionButtonData[]
      case PollState.Vote:
        return [
          { phrase: 'vote_in_poll', cy: DATA_CY_INFO_VOTE_IN_POLL, onClick: voteInOrViewPoll },
          { phrase: 'close_poll', cy: DATA_CY_INFO_CLOSE_POLL, onClick: closePollFromVoting },
          { phrase: 'leave_poll', cy: DATA_CY_INFO_LEAVE_POLL, onClick: comeBackLater }
        ] as ActionButtonData[]
      case PollState.Closed:
        return [
          { phrase: 'view_poll', cy: DATA_CY_INFO_VIEW_POLL, onClick: voteInOrViewPoll },
          { phrase: 'leave_poll', cy: DATA_CY_INFO_LEAVE_POLL, onClick: comeBackLater }
        ] as ActionButtonData[]
      default:
        throw new Error(`Info text not implemented for poll state ${pollState}`)
    }
  }

  const getInfoTextLines = (pollState: PollState): Phrase[] => {
    switch (pollState) {
      case PollState.Edit:
        return ['can_still_edit_poll', 'open_poll_for_voting', 'come_back_later']
      case PollState.Vote:
        return ['vote_in_poll_info', 'close_poll_from_voting', 'come_back_later']
      case PollState.Closed:
        return ['view_poll_info', 'come_back_later']
      default:
        throw new Error(`Info text not implemented for poll state ${pollState}`)
    }
  }

  return (
    <Flex {...Styles.wrapper}>
      <WhatToDoNextInfo pollQuestion={poll.question} infoPhrases={getInfoTextLines(poll.state)} />
      <PollActions availableActions={getAvailableActions(poll.state)} />
    </Flex>
  )
}
