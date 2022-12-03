import { ThemeColor } from '../../../theme/theme'

export const smallButtonStyles = {
  size: 'sm',
  variant: 'solid',
  marginBottom: '20px',
  marginLeft: '10px',
  marginRight: '10px',
  borderRadius: '4px',
  paddingLeft: '5px',
  paddingRight: '5px',
  bg: ThemeColor.SHADE_1,
  color: ThemeColor.BACKGROUND,
  _focus: { outline: 'none' },
  _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
}
