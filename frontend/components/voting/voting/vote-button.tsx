import { Flex, Box, Button, Text } from '@chakra-ui/react'
import { useTranslation } from '../../../hooks/use-translation'
import { Styles } from './styles'

export const DATA_CY_VOTE_BUTTON = 'vote_button'

type VoteButtonProps = {
  optionId: string
  vote: () => void
  isSubmitting: boolean
  count: number
  canVote: boolean
}

export const VoteButton = ({ vote, optionId, isSubmitting, count, canVote }: VoteButtonProps) => {
  const { translate } = useTranslation()

  const buttonText = canVote ? translate('vote_this').toUpperCase() : 'VOTES'
  const buttonStyle = canVote ? Styles.voteButton : Styles.disabledVoteButton

  return (
    <Flex {...Styles.voteButtonOuter}>
      <Box>
        <Button
          {...buttonStyle}
          data-cy={`${DATA_CY_VOTE_BUTTON}-${optionId}`}
          onClick={vote}
          type="button"
          isDisabled={isSubmitting || !canVote}
        >
          {buttonText}
        </Button>
      </Box>
      <Box>
        <Text {...Styles.optionVotesCount}>{count}</Text>
      </Box>
    </Flex>
  )
}
