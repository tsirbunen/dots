import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor } from '../../../theme/theme'

export const textContainerStyle = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'space-between'
}

export const titleBaseStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  color: ThemeColor.CONTRAST
}

export const textInputContainerStyle = {
  marginBottom: '20px'
}

export const iconButtonStyle = {
  padding: '4px',
  bg: ThemeColor.SHADE_2,
  borderRadius: '25px',
  color: ThemeColor.SHADE_1,
  size: 'md',
  _focus: { outline: 'none' },
  _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
}

export const iconStyle = {
  fontSize: '1.8em',
  boxSize: 5
}
