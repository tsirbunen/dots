import { Center, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from '../../../hooks/use-translation'
import { Phrase } from '../../../localization/translations'
import { Option } from '../../../types/types'
import { Styles } from './styles'
import { calculateTotalVotesLeft } from './helpers'

export const DATA_CY_VOTING_INFO = 'voting_info'

type VotingQuestionProps = {
  question: string
  options: Option[]
  userId: string
  totalVotesCountMax: number
}

export const Question = ({ question, options, userId, totalVotesCountMax }: VotingQuestionProps) => {
  const { translate } = useTranslation()

  const votesLeft = calculateTotalVotesLeft(options, userId, totalVotesCountMax)
  const votesLeftText: Phrase = votesLeft === 1 ? 'vote_left' : 'votes_left'

  return (
    <Center data-cy={DATA_CY_VOTING_INFO}>
      <Flex {...Styles.questionContainer}>
        <Flex {...Styles.centeredRow}>
          <Text {...Styles.info}>{translate('once_you_click')}</Text>
        </Flex>
        <Flex {...Styles.centeredRow}>
          <Text {...Styles.info}>{translate('you_have')}</Text>
          <Text {...Styles.countInfoHighlighted}>{votesLeft}</Text>
          <Text {...Styles.info}>{translate(votesLeftText)}</Text>
        </Flex>

        <Text {...Styles.question}>{question}</Text>
      </Flex>
    </Center>
  )
}
