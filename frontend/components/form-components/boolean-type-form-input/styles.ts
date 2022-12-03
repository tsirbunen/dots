import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor } from '../../../theme/theme'

export const booleanInputContainerStyle = {
  marginBottom: '20px'
}

export const titleContainerStyle = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'space-between'
}

export const titleStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  color: ThemeColor.SHADE_1
}
