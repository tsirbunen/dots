import { Flex, Text, Box, Center, Button } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { ThemeColorCodes } from '../../theme/theme'
import { Poll, Vote } from '../../types/types'
import { DOT_COLORS } from '../../utils/constant-values'
import { ParticipantNames } from './participant-names'
import { ParticipantVotesForOption } from './participant-votes-for-option'
import { Styles } from './styles'

export const DATA_CY_VOTE_BUTTON = 'vote_button'

type VoteOptionsListProps = {
  votersWithColors: Record<string, string>
  poll: Poll
  userId: string
  userName?: string
  voteOption: (optionId: string) => void
  isSubmitting: boolean
}

export const VoteOptionsList = ({
  votersWithColors,
  poll,
  userName,
  voteOption,
  isSubmitting,
  userId
}: VoteOptionsListProps) => {
  const { translate } = useTranslation()

  const getUserOptionVotes = (optionVotes: Vote[]) => {
    return optionVotes.reduce((acc, curr) => {
      if (curr.name === userName) return acc + 1
      return acc
    }, 0)
  }
  const getUserTotalVotes = () => {
    return poll.options.reduce((acc, curr) => {
      return acc + getUserOptionVotes(curr.votes)
    }, 0)
  }
  const userTotalVotesCount = getUserTotalVotes()
  const votesLeft = poll.totalVotesCountMax - userTotalVotesCount

  if (!poll.isAnonymous && !userName) return <Box>Puuttuu oma nimi. Pitäisikö hakea?</Box>

  return (
    <Center>
      <Flex style={{ maxWidth: '80%' }}>
        <Flex {...Styles.optionsContainer}>
          {poll.options.map((option) => {
            const userOptionVotesCount = getUserOptionVotes(option.votes)

            const canVote = userOptionVotesCount < poll.optionVotesCountMax && votesLeft > 0

            return (
              <Flex key={option.id} {...Styles.optionsListItem}>
                <Flex {...Styles.optionData}>
                  <Text {...Styles.content}>{option.content}</Text>

                  <ParticipantVotesForOption
                    userId={userId}
                    optionId={option.id}
                    optionVotes={option.votes}
                    showStatusWhenVoting={poll?.showStatusWhenVoting}
                    votersWithColors={votersWithColors}
                  />
                </Flex>
                {canVote && !isSubmitting && (
                  <Flex {...Styles.voteButtonOuter}>
                    <Box {...Styles.buttonBox}>
                      <Button
                        {...Styles.voteButton}
                        data-cy={'äääää'}
                        onClick={() => voteOption(option.id)}
                        type="button"
                        isDisabled={false}
                      >
                        {translate('vote_this').toUpperCase()}
                      </Button>
                    </Box>
                  </Flex>
                )}
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </Center>
  )
}
