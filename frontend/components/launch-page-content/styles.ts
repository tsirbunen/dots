import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../theme/theme'

export class Styles {
  static get titleContainer() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      margin: '10px',
      maxWidth: '800px'
    }
  }

  static get appTitle() {
    return {
      fontSize: '3em',
      fontWeight: 'bold',
      align: 'center' as SystemProps['textAlign'],
      color: ThemeColor.SHADE_1
    }
  }

  static get appShort() {
    return { fontSize: '1em', fontWeight: 'normal', align: 'center' as SystemProps['textAlign'] }
  }

  static get howDoesItWork() {
    return {
      fontSize: '1em',
      color: ThemeColor.SHADE_1,
      fontWeight: 'bold',
      align: 'center' as SystemProps['textAlign'],
      marginTop: '50px',
      marginBottom: '10px'
    }
  }

  static get instruction() {
    return {
      fontSize: '1em',
      color: ThemeColor.SHADE_1,
      align: 'center' as SystemProps['textAlign'],
      fontWeight: 'normal'
    }
  }

  static get buttonsContainer() {
    return { flexDirection: 'column' as ChakraProps['flexDirection'], marginTop: '30px' }
  }
}
