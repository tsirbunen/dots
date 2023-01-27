import { Flex, Text } from '@chakra-ui/react'
import { Styles } from './styles'

export const DATA_CY_NAME = 'name'
export const DATA_CY_DOT = 'dot'
export const DATA_CY_DOTS_AND_NAMES = 'dots_and_names'
export const DATA_CY_CURRENT = 'current'

type ParticipantNamesProps = {
  votersWithColors: Record<string, string>
  isAnonymous: boolean
}

export const ParticipantNames = ({ votersWithColors, isAnonymous }: ParticipantNamesProps) => {
  if (isAnonymous) return <div></div>

  const rows: JSX.Element[][] = []
  const row: JSX.Element[] = []

  const transferRow = () => {
    rows.push([])
    const indexLast = rows.length - 1
    while (row.length > 0) {
      const item = row.shift() as JSX.Element
      rows[indexLast].push(item)
    }
  }
  const arrangeNameColorPairs = (): JSX.Element[][] => {
    const names = Object.keys(votersWithColors)

    for (let i = 0; i <= names.length; i++) {
      if (row.length === 8) {
        transferRow()
      }
      if (i === names.length) {
        row.push(<Flex key={`${DATA_CY_DOT}-${DATA_CY_CURRENT}`} {...Styles.currentVoterDot(false)} />),
          row.push(
            <Text key={`${DATA_CY_NAME}-${DATA_CY_CURRENT}`} {...Styles.voterNameCurrent}>
              YOU
            </Text>
          )
      } else {
        const voterColor = votersWithColors[names[i]]
        const voterName = names[i]
        row.push(<Flex key={`${DATA_CY_DOT}-${voterColor}`} {...Styles.voteDot(voterColor, false)} />)
        row.push(
          <Text key={`${DATA_CY_NAME}-${voterName}`} {...Styles.voterName(voterColor)}>
            {voterName}
          </Text>
        )
      }
    }
    if (row.length > 0) transferRow()

    return rows
  }

  return (
    <Flex {...Styles.participantNamesContainer} data-cy={DATA_CY_DOTS_AND_NAMES}>
      {arrangeNameColorPairs().map((row, index) => {
        return (
          <Flex key={`${DATA_CY_DOTS_AND_NAMES}-${index}`} {...Styles.participantNamesRow}>
            {row}
          </Flex>
        )
      })}
    </Flex>
  )
}
