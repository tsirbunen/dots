import { Text, Flex, Box } from '@chakra-ui/react'
import { Poll } from '../../types/types'
import { useRouter } from 'next/router'
import SmallButton from '../widgets/small-button/small-button'
import { PollState } from '../../types/graphql-schema-types.generated'
import { useTranslation } from '../../hooks/use-translation'
import { useContext } from 'react'
import { StateActionType } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'

import { Styles } from './styles'
import { MenuRouteTarget } from '../layout-with-header/hamburger-menu'
import { Phrase } from '../../localization/translations'
import { useGraphQLClientService } from '../../hooks/use-graphql-client-service'

export const DATA_CY_INFO_EDIT_POLL = 'edit_poll'
export const DATA_CY_INFO_OPEN_POLL = 'open_poll'
export const DATA_CY_INFO_LEAVE_POLL = 'leave_poll'
export const DATA_CY_INFO_CLOSE_POLL = 'leave_poll'
export const DATA_CY_INFO_VOTE_IN_POLL = 'vote_in_poll'
export const DATA_CY_INFO_VIEW_POLL = 'view_poll'

type PollWhatToDoProps = {
  poll: Poll
}

type ActionButtonData = { phrase: Phrase; cy: string; onClick: (input?: PollState) => void }

const PollWhatToDo = ({ poll }: PollWhatToDoProps) => {
  const { openPoll, closePoll } = useGraphQLClientService()
  const { translate } = useTranslation()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const router = useRouter()

  const openPollForVoting = async () => {
    const isOpen = await openPoll(poll.id, poll.token)
    if (isOpen) {
      dispatch({ type: StateActionType.UPDATE_POLL, data: { ...poll, state: PollState.Vote } })
    }
  }

  const closePollFromVoting = async () => {
    const isClosed = await closePoll(poll.id, poll.token)
    if (isClosed) {
      dispatch({ type: StateActionType.UPDATE_POLL, data: { ...poll, state: PollState.Closed } })
    }
  }

  const continueEditingPoll = () => router.push(`/${MenuRouteTarget.CREATE_POLL}/${poll.code}`)
  const comeBackLater = () => router.push(`/${MenuRouteTarget.DASHBOARD}`)
  const voteInOrViewPoll = () => {
    dispatch({ type: StateActionType.SET_FOCUS_POLL, data: poll })
    router.push(`/${MenuRouteTarget.VOTE}/${poll.code}`)
  }

  const getInfoTexts = () => {
    switch (poll.state) {
      case PollState.Edit:
        return ['open_poll_for_voting', 'can_still_edit_poll', 'come_back_later']
      case PollState.Vote:
        return ['vote_in_poll_info', 'close_poll_from_voting', 'come_back_later']
      case PollState.Closed:
        return ['view_poll_info', 'come_back_later']
      default:
        throw new Error(`Info text not implemented for poll state ${poll.state}`)
    }
  }

  const getInfoTextWidgets = () => {
    const items = getInfoTexts()
    return (
      <Flex {...Styles.container}>
        {items.map((phrase) => {
          return (
            <Text key={`text-${phrase}`} {...Styles.generalInfo}>
              {translate(phrase as Phrase)}
            </Text>
          )
        })}
      </Flex>
    )
  }

  const getActionsData = () => {
    switch (poll.state) {
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
        throw new Error(`Info text not implemented for poll state ${poll.state}`)
    }
  }

  const getActionButtons = () => {
    const items = getActionsData()
    return (
      <Flex {...Styles.container}>
        {items.map((item) => {
          return (
            <Box key={`text-${item.phrase}`} {...Styles.buttonBox}>
              <SmallButton
                text={translate(item.phrase).toUpperCase()}
                type="button"
                dataCyPostfix={item.cy}
                onClick={item.onClick}
              />
            </Box>
          )
        })}
      </Flex>
    )
  }

  return (
    <Flex {...Styles.wrapper}>
      <Box>
        <div>
          <Flex {...Styles.container}>
            <Text {...Styles.generalInfo}>{translate('what_to_do_next')}</Text>
            <Text {...Styles.pollQuestion}>{poll.question}</Text>
          </Flex>
          {getInfoTextWidgets()}
          {getActionButtons()}
        </div>
      </Box>
    </Flex>
  )
}

export default PollWhatToDo
