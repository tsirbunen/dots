import { Flex } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useBrowserStorageService } from '../../hooks/use-browser-storage-service'
import { useTranslation } from '../../hooks/use-translation'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import { DOT_COLORS } from '../../utils/constant-values'
import { Styles } from './styles'
import { VotingQuestion } from './voting-question'
import { AskForUserName } from './ask-for-user-name'
import { VoteOptionsList } from './vote-options-list'
import { useGraphQLClientService } from './use-graphql-client-service'
import { StateActionType } from '../../state/reducer'
import { Poll } from '../../types/types'
import NotFound from '../widgets/not-found/not-found'
import { ParticipantNames } from './participant-names'

// export const DATA_CY_GIVE_VOTE_CODE = 'give_vote_code'

type VoteContentProps = {
  pollInFocus: Poll | undefined
  code: string
}

export type VoteCreated = {
  id: string
  optionId: string
  voterId: string | null
  name: string | null
}

const Voting = ({ pollInFocus, code }: VoteContentProps) => {
  const { translate } = useTranslation()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { getToken } = useBrowserStorageService()
  const { giveAVoteToOption } = useGraphQLClientService()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [votersWithColors, setVotersWithColors] = useState<Record<string, string>>({})

  const createNameColorPairs = (poll: Poll) => {
    const voterNames = new Set<string>()
    voterNames.add('Matti')
    voterNames.add('Pekka')
    voterNames.add('Kalle')
    voterNames.add('Tiina')
    voterNames.add('Maija')
    voterNames.add('Pauliina')
    voterNames.add('Karoliina')
    poll.options.forEach((option) => {
      option.votes.forEach((vote) => {
        if (vote.voterId !== state.userId && vote.name) voterNames.add(vote.name)
      })
    })
    const voters: Record<string, string> = {}

    Array.from(voterNames).forEach((voterName, index) => {
      const color = DOT_COLORS[index]
      voters[voterName] = color
    })
    setVotersWithColors(voters)
  }

  useEffect(() => {
    if (pollInFocus) {
      createNameColorPairs(pollInFocus)
    }
  }, [pollInFocus])

  const voteOption = async (optionId: string) => {
    if (!state.userId) return

    setIsSubmitting(true)
    const token = getToken()
    const name = pollInFocus?.isAnonymous ? null : state.userName ?? null
    const voteGiven = await giveAVoteToOption(optionId, state.userId, name, token)
    if (voteGiven) {
      dispatch({
        type: StateActionType.VOTED_OPTION,
        data: { ...voteGiven, name }
      })
    }
    setIsSubmitting(false)
  }

  const poll = state.pollInFocus

  if (!poll) {
    return <NotFound textLines={[translate('could_not_find'), `${translate('poll_with_code')} ${code}`]} />
  }

  if (!state.userId) {
    return <NotFound textLines={[translate('something_went_wrong'), translate('go_home')]} />
  }

  return (
    <Flex {...Styles.wrapper}>
      <VotingQuestion poll={poll} userId={state.userId} />
      <AskForUserName askForName={!poll.isAnonymous && !state.userName} />
      <VoteOptionsList
        votersWithColors={votersWithColors}
        poll={poll}
        userId={state.userId}
        userName={state.userName}
        voteOption={voteOption}
        isSubmitting={isSubmitting}
      />
      <ParticipantNames votersWithColors={votersWithColors} isAnonymous={poll.isAnonymous} />
    </Flex>
  )
}

export default Voting
