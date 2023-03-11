import { Box, Flex, Wrap, WrapItem } from '@chakra-ui/react'
import { Vote } from '../../../types/types'
import { DATA_CY_DOT, YOU } from './voter-names'
import { Styles } from './styles'

export const DATA_CY_VOTE_DOTS = 'vote_dots'
export const DATA_CY_VOTE_DOT = 'vote_dot'

type VotesGivenProps = {
  voterNameColorPairs: Record<string, string>
  userId: string
  optionVotes: Vote[]
  optionId: string
  showAll: boolean
}

export const VotesGiven = ({ voterNameColorPairs, userId, optionId, optionVotes, showAll }: VotesGivenProps) => {
  const arrangeDots = () => {
    let userVotesCount = 0
    const otherVotersNames: string[] = []
    optionVotes.forEach((vote) => {
      if (vote.voterId === userId) userVotesCount += 1
      else otherVotersNames.push(vote.name ?? '')
    })

    const elements = showAll
      ? otherVotersNames.map((name, index) => {
          const voterColor = voterNameColorPairs[name]
          return (
            <WrapItem key={`${DATA_CY_VOTE_DOT}-${index}-${optionId}`} {...Styles.centeredRow}>
              <Box {...Styles.voteDot(voterColor, true)} />
            </WrapItem>
          )
        })
      : []

    for (let index = 0; index < userVotesCount; index++) {
      elements.push(
        <WrapItem key={`${DATA_CY_DOT}-${index}-${YOU}`} {...Styles.centeredRow}>
          <Box {...Styles.currentUserDot} />
        </WrapItem>
      )
    }
    return elements
  }

  const width = window ? window.innerWidth * 0.45 : 300
  const dotElements = arrangeDots()

  return (
    <Flex {...Styles.dots} data-cy={DATA_CY_VOTE_DOTS}>
      <Wrap {...Styles.onLeft(width)}>{dotElements}</Wrap>
    </Flex>
  )
}
