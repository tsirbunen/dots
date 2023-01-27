import { Center, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { Phrase } from '../../localization/translations'
import { Poll, Vote } from '../../types/types'
import { Styles } from './styles'

export const DATA_CY_VOTING_INFO = 'voting_info'

type VotingQuestionProps = {
  poll: Poll
  userId: string
}

export const VotingQuestion = ({ poll, userId }: VotingQuestionProps) => {
  const { translate } = useTranslation()

  const calculateOptionVotesGiven = (optionVotes: Vote[]) => {
    return optionVotes.reduce((acc, curr) => {
      if (curr.voterId === userId) return acc + 1
      return acc
    }, 0)
  }

  const calculateTotalVotesGiven = () => {
    return poll.options.reduce((acc, curr) => {
      return acc + calculateOptionVotesGiven(curr.votes)
    }, 0)
  }

  const totalGiven = calculateTotalVotesGiven()
  const votesLeft = poll.totalVotesCountMax - totalGiven
  const votesLeftText: Phrase = votesLeft === 1 ? 'vote_left' : 'votes_left'

  return (
    <Center data-cy={DATA_CY_VOTING_INFO}>
      <Flex {...Styles.questionContainer}>
        <Flex {...Styles.infoRow}>
          <Text {...Styles.info}>{translate('once_you_click')}</Text>
        </Flex>

        <Flex {...Styles.infoRow}>
          <Text {...Styles.info}>{translate('you_have')}</Text>
          <Text {...Styles.countInfoHighlighted}>{votesLeft}</Text>
          <Text {...Styles.info}>{translate(votesLeftText)}</Text>
        </Flex>

        <Text {...Styles.question}>{poll.question}</Text>
      </Flex>
    </Center>
  )
}
