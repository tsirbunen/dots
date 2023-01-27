import { Center, Flex, Text } from '@chakra-ui/react'
import { Poll, Vote } from '../../types/types'
import { Styles } from './styles'

type CurrentVoterDotsProps = {
  // votesGiven: Record<string, number>
  // optionId: string
  // optionVotes: Vote[]
  userOptionVotesCount: number
}

export const CurrentVoterDots = ({ userOptionVotesCount }: CurrentVoterDotsProps) => {
  // let allUserVotesCount = optionVotes.reduce((acc, curr) => {
  //   if (curr.name === userName) return acc + 1
  //   return acc
  // }, 0)
  return (
    <Flex>
      {userOptionVotesCount > 0 && (
        <Flex style={{ marginTop: '10px', flexDirection: 'row' }}>
          {Array(userOptionVotesCount)
            .fill('0')
            .map((item, index) => {
              return <Flex key={`dot-${index}`} {...Styles.currentVoterDot(false)} />
            })}
        </Flex>
      )}
    </Flex>
  )
}
