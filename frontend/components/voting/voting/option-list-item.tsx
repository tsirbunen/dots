import { Flex, Text } from '@chakra-ui/react'
import { Vote } from '../../../types/types'
import { VotesGiven } from './votes-given'
import { Styles } from './styles'
import { VoteButton } from './vote-button'
import { useMemo } from 'react'

export const DATA_CY_VOTE_BUTTON = 'vote_button'

type VoteOptionsListProps = {
  voterNameColorPairs: Record<string, string>
  userId: string
  vote: (optionId: string) => void
  isAnonymous: boolean
  index: number
  content: string
  optionId: string
  isSubmitting: boolean
  canVote: boolean
  totalVotesLeft: number
  votes: Vote[]
}

export const OptionsListItem = ({
  index,
  userId,
  content,
  isAnonymous,
  optionId,
  isSubmitting,
  canVote,
  voterNameColorPairs,
  votes,
  vote
}: VoteOptionsListProps) => {
  // Note: both the voting button and the dots showing given votes
  // need to be wrapped in a memo to prevent unnecessary re-renders
  // due to changes in the parent component's state (i.e. every time
  // a vote is given, the parent component's state changes, but we only
  // want to render option's dots if the options' votes actually change).
  const voteButtonMemo = useMemo(() => {
    return (
      <VoteButton
        optionId={optionId}
        vote={() => vote(optionId)}
        count={votes.length}
        isSubmitting={isSubmitting}
        canVote={canVote}
      />
    )
  }, [canVote, isSubmitting, optionId, vote, votes])

  const votesGivenMemo = useMemo(() => {
    return (
      <VotesGiven
        userId={userId}
        optionId={optionId}
        optionVotes={votes}
        showAll={!isAnonymous}
        voterNameColorPairs={voterNameColorPairs}
      />
    )
  }, [isAnonymous, optionId, userId, voterNameColorPairs, votes])

  return (
    <Flex {...Styles.listItemContainer}>
      {index === 0 && <Flex {...Styles.divider} />}
      <Flex {...Styles.optionsListItem}>
        <Flex {...Styles.optionData}>
          <Text {...Styles.content}>{content}</Text>
          {votesGivenMemo}
        </Flex>
        {voteButtonMemo}
      </Flex>
      <Flex {...Styles.divider} />
    </Flex>
  )
}
