import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor, ThemeColorCodes } from '../../../theme/theme'

export class Styles {
  static get parameter() {
    return {
      color: ThemeColor.SHADE_1,
      fontSize: '14px'
    }
  }

  static get formQuestion() {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColor.CONTRAST
    }
  }

  static get formOther() {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColor.SHADE_1
    }
  }

  static get errorText() {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColorCodes.ERROR
    }
  }
  static get error() {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColor.ERROR,
      marginLeft: '18px'
    }
  }

  static get blinking() {
    return {
      marginLeft: '18px'
    }
  }

  static get iconButton() {
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

  static get switch() {
    return {
      colorScheme: 'orange',
      size: 'lg',
      focus: { outline: 'none' }
    }
  }

  static get parameterContainer() {
    return {
      marginBottom: '20px'
    }
  }

  static get formInput() {
    return {
      variant: 'filled',
      focusBorderColor: ThemeColorCodes.SHADE_2,
      borderWidth: 2,
      backgroundColor: ThemeColorCodes.CONTRAST,
      borderColor: ThemeColorCodes.SHADE_1,
      color: ThemeColorCodes.BACKGROUND
    }
  }

  static get errorMessage() {
    return {
      fontWeight: 'bold',
      color: ThemeColor.ERROR,
      marginBottom: '20px'
    }
  }

  static get listItemDeletable() {
    return {
      backgroundColor: 'transparent',
      marginLeft: '10px',
      size: 'sm',
      padding: '4px',
      bg: ThemeColor.SHADE_2,
      borderRadius: '25px',
      color: ThemeColor.SHADE_1
    }
  }

  static get deletableListItemContainer() {
    return {
      flexGrow: 1,
      flexDirection: 'row' as ChakraProps['flexDirection'],
      alignItems: 'center' as SystemProps['textAlign'],
      justifyContent: 'flex-start'
    }
  }

  static get deletableListItemText() {
    return {
      marginLeft: '10px',
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColor.CONTRAST
    }
  }

  static get deletableListItemIcon() {
    return {
      boxSize: 5,
      fontSize: '1.8em'
    }
  }

  static get listItemsContainer() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      alignItems: 'flex-start',
      justifyContent: 'center'
    }
  }

  static get listItemsAndEditButtonContainer() {
    return {
      flexDirection: 'row' as ChakraProps['flexDirection'],
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }
}
