import { Flex } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Styles } from './styles'
import { Question } from './question'
import { OptionsList } from './options-list'
import { Poll } from '../../../types/types'
import { VoterNames } from './voter-names'
import { useGraphQLClient } from '../../../hooks/use-graphql-client'
import {
  addSubscribedVoteToOptions,
  checkIfIsMyVote,
  checkIfVoteAlreadyAdded,
  getOptionsWithNewVoteAdded,
  getVoterName,
  getVoterNameDotColorPairs
} from './helpers'

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

export type SubscribedVote = {
  id: string
  optionId: string
  voteId: string
  pollId: string
  voterId: string
  voterName?: string | null
}

/**
 * This component handles the voting of one poll. Data is not stored to context
 * but it is only kept in this component's state. This component also subscribes
 * to new votes being added to the poll by other voters.
 */
const Voting = ({ poll, userId, userName }: VotingProps) => {
  const { giveAVoteToOption, subscribeToMessages } = useGraphQLClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [optionsWithVotes, setOptionsWithVotes] = useState(poll.options)

  const handleAddNewVote = useCallback(
    (newVote: SubscribedVote) => {
      const voteAlreadyAdded = checkIfVoteAlreadyAdded(optionsWithVotes, newVote)
      if (voteAlreadyAdded) return
      const voterName = newVote.voterName ?? getVoterName(optionsWithVotes, newVote)
      const updatedOptions = addSubscribedVoteToOptions(optionsWithVotes, newVote, voterName)
      setOptionsWithVotes(updatedOptions)
    },
    [optionsWithVotes]
  )

  useEffect(() => {
    const subscription = subscribeToMessages(poll.id)
    subscription.subscribe({
      next: ({ data }) => {
        if (data?.messageAdded) {
          const newVote = data.messageAdded as SubscribedVote
          const isMyVote = checkIfIsMyVote(newVote, userId)
          if (isMyVote) return
          handleAddNewVote(newVote)
        }
      },
      error: (error) => {
        console.log('error', error)
      }
    })
  }, [handleAddNewVote, poll.id, subscribeToMessages, userId])

  const vote = async (optionId: string) => {
    setIsSubmitting(true)
    const name = userName ?? null
    const voteGiven = await giveAVoteToOption(optionId, userId, name, poll.id)
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
