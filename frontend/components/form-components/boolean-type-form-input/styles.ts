import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor } from '../../../theme/theme'

export class Styles {
  static get inputContainer() {
    return {
      marginBottom: '20px'
    }
  }

  static get titleContainer() {
    return {
      flexDirection: 'row' as ChakraProps['flexDirection'],
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }

  static get title() {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColor.SHADE_1
    }
  }
}
