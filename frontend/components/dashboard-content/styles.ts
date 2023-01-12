import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../theme/theme'

export const iconButtonStyle = {
  padding: '4px',
  bg: ThemeColor.SHADE_2,
  borderRadius: '25px',
  color: ThemeColor.SHADE_1,
  size: 'md',
  _focus: { outline: 'none' },
  _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
}

export const chakraIconStyle = {
  fontSize: '1.5em'
  //   boxSize: 5
}
export const materialsIconStyle = {
  fontSize: '1.6em'
  //   boxSize: 5
}

export const listItemContainer = {
  flex: 1,
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'space-between' as SystemProps['textAlign'],
  //   backgroundColor: 'green',
  backgroundColor: ThemeColor.SHADE_1,
  margin: '15px',
  padding: '10px',
  borderRadius: '6px'
}

export const textContainer = {
  //   flex: 1,
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'flex-start' as SystemProps['textAlign']
}

export const titleStyle = {
  fontWeight: 'bold',
  // color: ThemeColor.ERROR,
  //   marginBottom: '20px',
  fontSize: '1.1em'
}
