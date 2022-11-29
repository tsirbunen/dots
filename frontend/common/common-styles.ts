import { ThemeColor } from '../theme/theme'

export const iconButtonStyle = {
  marginRight: '5px',
  padding: '4px',
  bg: ThemeColor.SHADE_2,
  borderRadius: '25px',
  color: ThemeColor.SHADE_1,
  size: 's',
  _focus: { outline: 'none' },
  _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
}

export const popoverContentStyle = {
  width: '150px',
  backgroundColor: ThemeColor.BACKGROUND,
  borderColor: 'transparent',
  paddingBottom: '5px'
}

export const customButtonBoxStyle = {
  margin: '5px'
}

export const iconStyle = {
  fontSize: '1.5em'
}

export const buttonStyles = {
  size: 'sm',
  variant: 'solid',
  bg: ThemeColor.CONTRAST,
  color: ThemeColor.BACKGROUND,
  _focus: { outline: 'none' },
  _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
}

export const buttonInvertedStyles = {
  ...buttonStyles,
  bg: ThemeColor.SHADE_2,
  color: ThemeColor.CONTRAST
}
