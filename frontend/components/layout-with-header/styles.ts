import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../theme/theme'

export const appTitleStyle = {
  fontSize: '1.2em',
  fontWeight: 'bold',
  align: 'center' as SystemProps['textAlign'],
  color: ThemeColor.SHADE_1
}

export const routeTextStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  align: 'center' as SystemProps['textAlign'],
  color: ThemeColor.SHADE_1
}

export const hamburgerMenuContainer = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'flex-start',
  marginLeft: '15px'
}

export const headerTitleContainer = {
  flexDirection: 'column' as ChakraProps['flexDirection']
}

export const layoutContainer = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '10px',
  justifyContent: 'space-between'
}
