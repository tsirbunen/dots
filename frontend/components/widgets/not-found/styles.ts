import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor, ThemeColorCodes } from '../../../theme/theme'

export class Styles {
  static get container() {
    return { flexDirection: 'column' as ChakraProps['flexDirection'], alignItems: 'center' }
  }

  static get emoji() {
    return {
      fontSize: '4em',
      color: ThemeColorCodes.SHADE_1
    }
  }

  static get emojiBox() {
    return {
      marginTop: '50px',
      marginBottom: '30px'
    }
  }

  static get oops() {
    return { color: ThemeColor.SHADE_1, fontWeight: 'bold', fontSize: '1.2em', marginBottom: '10px' }
  }

  static get textLine() {
    return { color: ThemeColor.SHADE_1 }
  }
}
