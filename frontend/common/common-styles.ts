import { SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../theme/theme'

export class commonStyles {
  static get iconButton() {
    return {
      // marginRight: '5px',
      padding: '4px',
      // bg: ThemeColor.SHADE_2,
      bg: 'transparent',
      borderRadius: '25px',
      color: ThemeColor.SHADE_1,
      size: 'md',
      _focus: { outline: 'none' },
      _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
    }
  }

  static get popoverContent() {
    return {
      width: '150px',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      paddingBottom: '5px'
    }
  }

  static get customButtonBox() {
    return {
      margin: '5px'
    }
  }

  static get icon() {
    return {
      fontSize: '1.8em'
    }
  }

  static get button() {
    return {
      size: 'sm',
      variant: 'solid',
      bg: ThemeColor.CONTRAST,
      color: ThemeColor.BACKGROUND,
      _focus: { outline: 'none' },
      _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
    }
  }

  static buttonInverted() {
    return {
      // ...this.button,
      size: 'sm',
      variant: 'solid',
      // bg: ThemeColor.CONTRAST,
      // bg: 'red',
      // color: ThemeColor.BACKGROUND,
      _focus: { outline: 'none' },
      _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND },
      bg: ThemeColor.SHADE_2,
      color: ThemeColor.CONTRAST
    }
  }

  static get pageTitle() {
    return {
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginTop: '20px',
      align: 'center' as SystemProps['textAlign'],
      color: ThemeColor.SHADE_1
    }
  }
}
