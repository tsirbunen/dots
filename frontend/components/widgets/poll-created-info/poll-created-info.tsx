import {
  appTitleContainerStyle,
  pollQuestionStyle,
  howDoesItWorkStyle,
  buttonsContainer,
  buttonContainer
} from './styles'
import { Text, Flex, Box } from '@chakra-ui/react'
import { Poll } from '../../../types/types'
import { useRouter } from 'next/router'
import SmallButton from '../small-button/small-button'
import { PollState } from '../../../types/graphql-schema-types.generated'
import { useGraphQLClientService } from './use-graphql-client-service'
import { useTranslation } from '../../../hooks/use-translation'
import { useContext, useState } from 'react'
import { AppStateActionEnum } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'

export const DATA_CY_INFO_EDIT_POLL = 'edit_poll'
export const DATA_CY_INFO_OPEN_POLL = 'open_poll'

type PollCreatedInfoProps = {
  createdPoll: Poll
}

const PollCreatedInfo = ({ createdPoll }: PollCreatedInfoProps) => {
  const { openPoll } = useGraphQLClientService()
  const { translate } = useTranslation()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const [poll, setPoll] = useState<Poll>(createdPoll)
  const router = useRouter()
  console.log({ poll })

  const openPollForVoting = async () => {
    const isOpen = await openPoll(poll.id, poll.token)
    if (isOpen) {
      dispatch({ type: AppStateActionEnum.UPDATE_POLL, data: { ...poll, state: PollState.Vote } })
      setPoll((previous) => {
        return { ...previous, state: PollState.Vote }
      })
    }
  }

  const continueEditingPoll = () => {
    router.push(`/dashboard/${createdPoll.code}`)
  }

  return (
    <Flex {...appTitleContainerStyle}>
      <Box>
        {poll.state === PollState.Edit ? (
          <div>
            <Flex {...buttonsContainer}>
              <Text {...howDoesItWorkStyle}>{'A new poll was created with title'}</Text>
              <Text {...pollQuestionStyle}>{poll.question}</Text>
            </Flex>
            <Flex {...buttonsContainer}>
              <Text {...howDoesItWorkStyle}>{translate('want_to_edit_poll_further')}</Text>
              <Text {...howDoesItWorkStyle}>{translate('can_still_edit_poll')}</Text>
              <Box {...buttonContainer}>
                <SmallButton
                  text={translate('edit_poll').toUpperCase()}
                  type="button"
                  dataCyPostfix={DATA_CY_INFO_EDIT_POLL}
                  onClick={continueEditingPoll}
                />
              </Box>
            </Flex>
            <Flex {...buttonsContainer}>
              <Text {...howDoesItWorkStyle}>{translate('if_poll_is_ready')}</Text>
              <Text {...howDoesItWorkStyle}>{translate('open_poll_for_voting_info')}</Text>
              <Box {...buttonContainer}>
                <SmallButton
                  text={translate('open_poll_for_voting').toUpperCase()}
                  type="button"
                  dataCyPostfix={DATA_CY_INFO_OPEN_POLL}
                  onClick={openPollForVoting}
                />
              </Box>
            </Flex>
          </div>
        ) : (
          <div>
            <Flex {...buttonsContainer}>
              <Text {...howDoesItWorkStyle}>{'Your poll with title '}</Text>
              <Text {...pollQuestionStyle}>{poll.question}</Text>
              <Text {...howDoesItWorkStyle}>{' is now open for voting.'}</Text>
            </Flex>
            <Flex {...buttonsContainer}>
              <Text {...howDoesItWorkStyle}>{'Participants will need a code to vote.'}</Text>
              <Text {...howDoesItWorkStyle}>{'Distribute this code to all participants'}</Text>
              <Text {...pollQuestionStyle}>{poll.code}</Text>
            </Flex>
          </div>
        )}
      </Box>
    </Flex>
  )
}

export default PollCreatedInfo
