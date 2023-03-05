import { Flex } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useBrowserStorage } from '../../../hooks/use-browser-storage'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import { DOT_COLORS } from '../../../utils/constant-values'
import { Styles } from '../styles'
import { Question } from './question'
import { VoteOptionsList } from '../vote-options-list'

import { StateActionType } from '../../../state/reducer'
import { Poll, Option } from '../../../types/types'
import { ParticipantNames } from '../participant-names'
import { useGraphQLClient } from '../../../hooks/use-graphql-client'

type VoteContentProps = {
  pollInFocus: Poll
  userId: string
}

export type VoteCreated = {
  id: string
  optionId: string
  voterId: string | null
  name: string | null
}

const Voting = ({ pollInFocus, userId }: VoteContentProps) => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { getToken } = useBrowserStorage()
  const { giveAVoteToOption } = useGraphQLClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getVoterNameDotColorPairs = (optionsWithVotes: Option[]): Record<string, string> => {
    const voterNames = new Set<string>()
    voterNames.add('Matti')
    voterNames.add('Pekka')
    voterNames.add('Kalle')
    voterNames.add('Tiina')
    voterNames.add('Maija')
    voterNames.add('Pauliina')
    voterNames.add('Karoliina')

    optionsWithVotes.forEach((option) => {
      option.votes.forEach((vote) => {
        if (vote.voterId !== state.userId && vote.name) voterNames.add(vote.name)
      })
    })
    const voters: Record<string, string> = {}

    Array.from(voterNames).forEach((voterName, index) => {
      const color = DOT_COLORS[index]
      voters[voterName] = color
    })
    return voters
  }

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

  const poll = pollInFocus

  const votersWithColors = getVoterNameDotColorPairs(poll.options)

  return (
    <Flex {...Styles.wrapper}>
      <Question poll={poll} userId={userId} />
      <VoteOptionsList
        votersWithColors={votersWithColors}
        poll={poll}
        userId={userId}
        userName={state.userName}
        voteOption={voteOption}
        isSubmitting={isSubmitting}
      />
      <ParticipantNames votersWithColors={votersWithColors} isAnonymous={poll.isAnonymous} />
    </Flex>
  )
}

export default Voting
