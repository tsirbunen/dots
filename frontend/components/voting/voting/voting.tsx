import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { useBrowserStorage } from '../../../hooks/use-browser-storage'
import { Styles } from './styles'
import { Question } from './question'
import { OptionsList } from './options-list'
import { Poll } from '../../../types/types'
import { VoterNames } from './voter-names'
import { useGraphQLClient } from '../../../hooks/use-graphql-client'
import { getOptionsWithNewVoteAdded, getVoterNameDotColorPairs } from './helpers'

export type VoteCreated = {
  id: string
  optionId: string
  voterId: string
  name: string
}
type VotingProps = {
  poll: Poll
  userId: string
  userName: string | undefined
}

/**
 * This component handles the voting of one poll. Data is not stored to context
 * but it is only kept in this component's state.
 */
const Voting = ({ poll, userId, userName }: VotingProps) => {
  const { getToken } = useBrowserStorage()
  const { giveAVoteToOption } = useGraphQLClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [optionsWithVotes, setOptionsWithVotes] = useState(poll.options)

  // TODO: Implement here a subscription to fetch data on
  // how other people are voting in real time

  const vote = async (optionId: string) => {
    setIsSubmitting(true)
    const token = getToken()
    const name = userName ?? null
    const voteGiven = await giveAVoteToOption(optionId, userId, name, token)
    if (!voteGiven) return

    setOptionsWithVotes((prevOptions) => {
      return getOptionsWithNewVoteAdded(prevOptions, voteGiven)
    })
    setIsSubmitting(false)
  }

  const voterNameColorPairs = getVoterNameDotColorPairs(optionsWithVotes, userId)

  return (
    <Flex {...Styles.wrapper}>
      <Question
        question={poll.question}
        options={optionsWithVotes}
        userId={userId}
        totalVotesCountMax={poll.totalVotesCountMax}
      />
      <OptionsList
        voterNameColorPairs={voterNameColorPairs}
        options={optionsWithVotes}
        userId={userId}
        userName={userName}
        vote={vote}
        isSubmitting={isSubmitting}
        optionVotesCountMax={poll.optionVotesCountMax}
        totalVotesCountMax={poll.totalVotesCountMax}
        isAnonymous={poll.isAnonymous}
      />
      {!poll.isAnonymous && <VoterNames voterNameColorPairs={voterNameColorPairs} />}
    </Flex>
  )
}

export default Voting
