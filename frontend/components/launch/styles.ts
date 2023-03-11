import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../theme/theme'

export class Styles {
  static titleContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    margin: '10px',
    maxWidth: '800px'
  }

  static title = {
    fontSize: '3em',
    fontWeight: 'bold',
    align: 'center' as SystemProps['textAlign'],
    color: ThemeColor.SHADE_1
  }

  static appShort = {
    fontSize: '1em',
    fontWeight: 'normal',
    align: 'center' as SystemProps['textAlign']
  }

  static howDoesItWork = {
    fontSize: '1em',
    color: ThemeColor.SHADE_1,
    fontWeight: 'bold',
    align: 'center' as SystemProps['textAlign'],
    marginTop: '30px',
    marginBottom: '10px'
  }

  static instruction = {
    fontSize: '1em',
    color: ThemeColor.SHADE_1,
    align: 'center' as SystemProps['textAlign'],
    fontWeight: 'normal'
  }

  static buttons = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    marginTop: '10px'
  }
}
