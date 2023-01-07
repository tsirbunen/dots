import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../../theme/theme'

export const appTitleContainerStyle = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  margin: '10px',
  maxWidth: '800px'
}

export const appTitleStyle = {
  fontSize: '3em',
  fontWeight: 'bold',
  align: 'center' as SystemProps['textAlign'],
  color: ThemeColor.SHADE_1
}

export const appShortDescriptionStyle = {
  fontSize: '1em',
  fontWeight: 'normal',
  align: 'center' as SystemProps['textAlign']
}

export const howDoesItWorkStyle = {
  fontSize: '1em',
  color: ThemeColor.SHADE_1,
  // fontWeight: 'bold',
  align: 'center' as SystemProps['textAlign'],
  // marginTop: '50px',
  marginBottom: '5px'
}
export const pollQuestionStyle = {
  fontSize: '1.2em',
  color: ThemeColor.CONTRAST,
  fontWeight: 'bold',
  align: 'center' as SystemProps['textAlign'],
  // marginTop: '50px',
  marginBottom: '5px'
}

export const instructionPhraseStyle = {
  fontSize: '1em',
  color: ThemeColor.SHADE_1,
  align: 'center' as SystemProps['textAlign'],
  fontWeight: 'normal'
}

export const modeSelectionButtonsContainerStyle = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  marginTop: '30px'
}

export const buttonsContainer = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  flex: 1,
  alignItems: 'center',
  marginTop: '50px'
}

export const buttonContainer = {
  marginTop: '10px'
}
