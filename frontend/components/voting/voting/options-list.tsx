import { Flex, Center } from '@chakra-ui/react'
import { Option } from '../../../types/types'
import { Styles } from './styles'
import { calculateTotalVotesLeft, calculateOptionVotesGiven } from './helpers'
import { OptionsListItem } from './option-list-item'

export const DATA_CY_VOTE_BUTTON = 'vote_button'

type VoteOptionsListProps = {
  voterNameColorPairs: Record<string, string>
  options: Option[]
  userId: string
  userName?: string
  vote: (optionId: string) => void
  isSubmitting: boolean
  optionVotesCountMax: number
  totalVotesCountMax: number
  isAnonymous: boolean
}

export const OptionsList = ({
  voterNameColorPairs,
  options,
  vote,
  isSubmitting,
  userId,
  optionVotesCountMax,
  totalVotesCountMax,
  isAnonymous
}: VoteOptionsListProps) => {
  const totalVotesLeft = calculateTotalVotesLeft(options, userId, totalVotesCountMax)

  return (
    <Center>
      <Flex style={{ maxWidth: '400px' }}>
        <Flex {...Styles.optionsContainer}>
          {options.map((option, index) => {
            const userOptionVotesCount = calculateOptionVotesGiven(option.votes, userId)
            const canVote = userOptionVotesCount < optionVotesCountMax && totalVotesLeft > 0

            return (
              <OptionsListItem
                key={option.id}
                voterNameColorPairs={voterNameColorPairs}
                userId={userId}
                vote={() => vote(option.id)}
                isAnonymous={isAnonymous}
                index={index}
                content={option.content}
                optionId={option.id}
                canVote={canVote}
                totalVotesLeft={totalVotesLeft}
                votes={option.votes}
                isSubmitting={isSubmitting}
              />
            )
          })}
        </Flex>
      </Flex>
    </Center>
  )
}
