import { ThemeColor } from '../../../theme/theme'

export class Styles {
  static smallButton(noMargin: boolean, isInverted: boolean) {
    const margin = noMargin ? '0px' : '10px'
    return {
      size: 'sm',
      variant: 'solid',
      marginBottom: margin,
      marginLeft: margin,
      marginRight: margin,
      borderRadius: '4px',
      paddingLeft: '5px',
      paddingRight: '5px',
      bg: isInverted ? ThemeColor.SHADE_2 : ThemeColor.SHADE_1,
      color: ThemeColor.BACKGROUND,
      _focus: { outline: 'none' },
      _hover: {
        bg: isInverted ? ThemeColor.SHADE_2 : ThemeColor.CONTRAST,
        color: ThemeColor.BACKGROUND
      }
    }
  }
}
