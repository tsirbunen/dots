import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../theme/theme'

export class Styles {
  static get appTitle() {
    return {
      fontSize: '1.2em',
      fontWeight: 'bold',
      align: 'center' as SystemProps['textAlign'],
      color: ThemeColor.SHADE_1
    }
  }

  static get routeText() {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      align: 'center' as SystemProps['textAlign'],
      color: ThemeColor.SHADE_1
    }
  }

  static get hamburgerMenuContainer() {
    return { flexDirection: 'column' as ChakraProps['flexDirection'], alignItems: 'flex-start', marginLeft: '15px' }
  }

  static get headerTitleContainer() {
    return { flexDirection: 'column' as ChakraProps['flexDirection'] }
  }

  static get layoutContainer() {
    return {
      flexDirection: 'row' as ChakraProps['flexDirection'],
      alignItems: 'center',
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '10px',
      justifyContent: 'space-between'
    }
  }
}
