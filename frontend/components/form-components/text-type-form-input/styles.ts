import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor } from '../../../theme/theme'

export class Styles {
  static get textContainer() {
    return {
      flexDirection: 'row' as ChakraProps['flexDirection'],
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }

  static get titleBase() {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColor.CONTRAST
    }
  }

  static get textInputContainer() {
    return {
      marginBottom: '20px'
    }
  }

  static get iconButtonStyle() {
    return {
      padding: '4px',
      bg: ThemeColor.SHADE_2,
      borderRadius: '25px',
      color: ThemeColor.SHADE_1,
      size: 'md',
      _focus: { outline: 'none' },
      _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
    }
  }

  static get icon() {
    return {
      fontSize: '1.8em',
      boxSize: 5
    }
  }
}
