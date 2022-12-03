import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor, ThemeColorCodes } from '../../../theme/theme'

export const textInputAddButtonContainer = {
  flexDirection: 'column' as ChakraProps['flexDirection']
}

export const textInputStyles = {
  variant: 'filled',
  focusBorderColor: ThemeColorCodes.SHADE_2,
  borderWidth: 2,
  backgroundColor: ThemeColorCodes.CONTRAST,
  borderColor: ThemeColorCodes.SHADE_1,
  color: ThemeColorCodes.BACKGROUND
}

export const errorMessageAndButtonContainer = {
  marginTop: '20px'
}

export const parameterStyle = {
  color: ThemeColor.SHADE_1,
  fontSize: '14px'
}

export const formQuestion = {
  fontSize: '1em',
  fontWeight: 'bold',
  color: ThemeColor.CONTRAST
}

export const formOther = {
  fontSize: '1em',
  fontWeight: 'bold',
  color: ThemeColor.SHADE_1
}

export const questionPlaceholder = {
  fontSize: '1em',
  fontWeight: 'bold',
  color: ThemeColor.SHADE_2
}
export const atLeastAnotherRequiredErrorStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  color: ThemeColor.ERROR,
  marginLeft: '18px'
}

export const iconButtonStyle = {
  padding: '4px',
  bg: ThemeColor.SHADE_2,
  borderRadius: '25px',
  color: ThemeColor.SHADE_1,
  size: 'md',
  _focus: { outline: 'none' },
  _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
}

export const iconStyle = {
  fontSize: '1.8em'
}

export const switchStyle = {
  colorScheme: 'orange',
  size: 'lg',
  focus: { outline: 'none' }
}

export const parameterContainerStyle = {
  marginBottom: '20px'
}

export const errorMessageStyle = {
  fontWeight: 'bold',
  color: ThemeColor.ERROR,
  marginBottom: '20px'
}

export const listItemDeletableStyle = {
  backgroundColor: 'transparent',
  marginLeft: '10px',
  size: 'sm',
  padding: '4px',
  bg: ThemeColor.SHADE_2,
  borderRadius: '25px',
  color: ThemeColor.SHADE_1
}

export const deletableListItemContainerStyle = {
  flexGrow: 1,
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center' as SystemProps['textAlign'],
  justifyContent: 'flex-start'
}

export const deletableListItemTextStyle = {
  marginLeft: '10px',
  fontSize: '1em',
  fontWeight: 'bold',
  color: ThemeColor.CONTRAST
}

export const deletableListItemIconStyle = {
  boxSize: 5,
  fontSize: '1.8em'
}

export const getModalContentStyle = (modalWidth: number) => {
  return {
    backgroundColor: ThemeColor.CONTRAST,
    width: `${modalWidth}px`
  }
}

export const dataTypeSelectorContainerStyle = {
  marginBottom: '20px'
}

export const getBorderStyle = (isSelected: boolean) => {
  return {
    borderWidth: `${isSelected ? 6 : 2}px`
  }
}
