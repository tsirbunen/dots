import { Box, Center, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { Styles } from './styles'

export const DATA_CY_DOT = 'dot'
export const DATA_CY_DOTS_AND_NAMES = 'dots_and_names'
export const YOU = 'YOU'

type VoterNamesProps = {
  voterNameColorPairs: Record<string, string>
}

export const VoterNames = ({ voterNameColorPairs }: VoterNamesProps) => {
  const arrangeDotsAndNames = () => {
    const names = Object.keys(voterNameColorPairs)
    const elements: JSX.Element[] = names.map((name, index) => {
      const voterColor = voterNameColorPairs[name]
      return (
        <WrapItem key={`${DATA_CY_DOT}-${index}-${name}`} {...Styles.centeredRow}>
          <Box {...Styles.voteDot(voterColor, false)} />
          <Text {...Styles.voterName(voterColor)}>{name}</Text>
        </WrapItem>
      )
    })

    elements.push(
      <WrapItem key={`${DATA_CY_DOT}-${YOU}`} {...Styles.centeredRow}>
        <Box {...Styles.currentUserDot} />
        <Text {...Styles.currentUserName}>{YOU}</Text>
      </WrapItem>
    )
    return elements
  }

  const width = window ? window.innerWidth * 0.7 : 300
  const dotWithNameElements = arrangeDotsAndNames()

  return (
    <Center {...Styles.dotNameContainer}>
      <Center data-cy={DATA_CY_DOTS_AND_NAMES}>
        <Wrap {...Styles.centered(width)}>{dotWithNameElements}</Wrap>
      </Center>
    </Center>
  )
}
