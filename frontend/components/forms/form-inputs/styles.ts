import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor, ThemeColorCodes } from '../../../theme/theme'

export class Styles {
  static title = {
    fontSize: '1em',
    fontWeight: 'bold',
    color: ThemeColor.SHADE_1
  }

  static sliderThumb = {
    boxSize: 6,
    backgroundColor: ThemeColorCodes.CONTRAST
  }

  static sliderTrack = {
    backgroundColor: ThemeColorCodes.SHADE_2
  }

  static sliderFilledTrack = {
    backgroundColor: ThemeColorCodes.SHADE_1
  }

  static sliderBox = {
    color: ThemeColorCodes.BACKGROUND
  }

  static slider(value: number, maximum: number) {
    return {
      width: value === maximum ? '60px' : '70px',
      marginRight: value === maximum ? '10px' : '0px'
    }
  }

  static error = (withSpacing = false) => {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColor.ERROR,
      marginLeft: withSpacing ? '18px' : '0px'
    }
  }

  static errorMessage = {
    fontWeight: 'bold',
    color: ThemeColor.ERROR,
    marginBottom: '20px'
  }

  static textContainer = {
    flexDirection: 'row' as ChakraProps['flexDirection'],
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  static titleBase = {
    fontSize: '1em',
    fontWeight: 'bold',
    color: ThemeColor.CONTRAST
  }

  static icon = {
    fontSize: '1.8em',
    boxSize: 5
  }

  static listItemsContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'flex-start',
    justifyContent: 'center'
  }

  static listContainer = {
    flexDirection: 'row' as ChakraProps['flexDirection'],
    justifyContent: 'space-between'
  }

  static listItem = {
    backgroundColor: 'transparent',
    marginLeft: '10px',
    size: 'sm',
    padding: '4px',
    bg: ThemeColor.SHADE_2,
    borderRadius: '25px',
    color: ThemeColor.SHADE_1
  }

  static listItemContainer = {
    flexGrow: 1,
    flexDirection: 'row' as ChakraProps['flexDirection'],
    alignItems: 'center' as SystemProps['textAlign'],
    justifyContent: 'flex-start'
  }

  static listItemText = {
    marginLeft: '10px',
    fontSize: '1em',
    fontWeight: 'bold',
    color: ThemeColor.CONTRAST
  }

  static listItemIcon = {
    boxSize: 5,
    fontSize: '1.8em'
  }

  static iconButton = {
    padding: '4px',
    bg: ThemeColor.SHADE_2,
    borderRadius: '25px',
    color: ThemeColor.SHADE_1,
    size: 'md',
    _focus: { outline: 'none' },
    _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
  }

  static container = {
    marginBottom: '20px'
  }

  static addButtonContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection']
  }

  static textInput = {
    variant: 'filled',
    focusBorderColor: ThemeColorCodes.SHADE_2,
    borderWidth: 2,
    backgroundColor: ThemeColorCodes.CONTRAST,
    borderColor: ThemeColorCodes.SHADE_1,
    color: ThemeColorCodes.BACKGROUND
  }

  static errorMessageContainer = {
    marginTop: '20px'
  }

  static modalContent = (modalWidth: number) => {
    return {
      backgroundColor: ThemeColor.CONTRAST,
      width: `${modalWidth}px`
    }
  }
}
