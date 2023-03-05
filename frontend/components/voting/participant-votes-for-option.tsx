import { Flex } from '@chakra-ui/react'
import { Vote } from '../../types/types'
import { DATA_CY_CURRENT } from './participant-names'
import { Styles } from './styles'

export const DATA_CY_VOTE_DOTS = 'vote_dots'
export const DATA_CY_VOTE_DOT = 'vote_dot'

type ParticipantVotesForOptionProps = {
  showStatusWhenVoting: boolean
  votersWithColors: Record<string, string>
  userId: string
  optionVotes: Vote[]
  optionId: string
}

export const ParticipantVotesForOption = ({
  votersWithColors,
  showStatusWhenVoting,
  userId,
  optionId,
  optionVotes
}: ParticipantVotesForOptionProps) => {
  const testVotes: Vote[] = [
    { id: '4353344t3', optionId: '98998899898', voterId: null, name: 'Matti' },
    { id: '4353344t3', optionId: '98998899898', voterId: null, name: 'Matti' },
    { id: '4353344t3', optionId: '98998899898', voterId: null, name: 'Timo' },
    { id: '4353344t3', optionId: '98998899898', voterId: null, name: 'Pekka' }
  ]

  const transferRow = () => {
    rows.push([])
    const lastIndex = rows.length - 1
    while (row.length > 0) {
      const popped = row.shift() as JSX.Element
      rows[lastIndex].push(popped)
    }
  }

  const rows: JSX.Element[][] = []
  const row: JSX.Element[] = []

  const arrangeVotes = () => {
    let userVotesCount = 0
    let otherVotersNames: string[] = []
    testVotes.forEach((v) => otherVotersNames.push(v?.name ?? 'dssdssd'))
    optionVotes.forEach((vote) => {
      if (vote.voterId === userId) userVotesCount += 1
      else otherVotersNames.push(vote.name ?? 'dfdsgsfgdss')
    })

    if (!showStatusWhenVoting) otherVotersNames = []

    const index = 0
    while (otherVotersNames.length > 0 || userVotesCount > 0) {
      if (row.length === 15) {
        transferRow()
      }
      if (otherVotersNames.length > 0) {
        const name = otherVotersNames.pop() as string
        row.push(<Flex key={`${index}-${optionId}-${name}`} {...Styles.voteDot(votersWithColors[name], true)} />)
      } else if (userVotesCount > 0) {
        userVotesCount -= 1
        row.push(<Flex key={`${index}-${optionId}-${DATA_CY_CURRENT}`} {...Styles.currentVoterDot(false)} />)
      }
    }
    if (row.length > 0) transferRow()
    return rows
  }

  return (
    <Flex {...Styles.voteDotsContainer} data-cy={DATA_CY_VOTE_DOTS}>
      {arrangeVotes().map((b, index) => {
        return <Flex key={`${index}-${optionId}-${DATA_CY_VOTE_DOT}`}>{b}</Flex>
      })}
    </Flex>
  )
}
