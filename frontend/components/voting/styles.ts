import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor } from '../../theme/theme'
import { DOT_SIZE_SMALL } from '../../utils/constant-values'

export class Styles {
  static get wrapper() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      marginTop: '20px'
    }
  }

  static get instruction() {
    return {
      color: ThemeColor.SHADE_1,
      marginBottom: '5px'
    }
  }

  static get question() {
    return {
      color: ThemeColor.CONTRAST,
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '10px'
    }
  }
  static voterName(color: string) {
    return {
      color: color,
      fontSize: '11px',
      marginRight: '5px',
      marginLeft: '3px'
    }
  }

  static get setNameBox() {
    return {
      marginTop: '30px'
    }
  }

  static get notAnonymousInfo() {
    return {
      color: ThemeColor.SHADE_1,
      fontSize: '13px',
      textAlign: 'center'
    }
  }

  static get voteDotsContainer() {
    return { marginTop: '10px', flexDirection: 'column' as ChakraProps['flexDirection'] }
  }
  static get voterNameCurrent() {
    return {
      color: ThemeColor.CONTRAST,
      fontWeight: 'bold',
      fontSize: '11px',
      marginRight: '5px',
      marginLeft: '3px'
    }
  }
  static get info() {
    return {
      color: ThemeColor.SHADE_1,
      fontSize: '13px'
    }
  }
  static get optionData() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection']
      // backgroundColor: 'orange'
    }
  }

  static get voteButtonOuter() {
    return { flexDirection: 'column' as ChakraProps['flexDirection'], margin: '10px' }
  }

  static get participantNamesContainer() {
    return {
      flex: 1,
      width: '100%',
      marginTop: '30px',
      marginBottom: '20px',
      flexDirection: 'column' as ChakraProps['flexDirection'],
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  static get participantNamesRow() {
    return { flexDirection: 'row' as ChakraProps['flexDirection'], alignItems: 'center' }
  }

  static get optionsListItem() {
    return {
      margin: '10px',
      flex: 1,
      width: '100%',
      flexDirection: 'row' as ChakraProps['flexDirection'],
      alignItems: 'center',
      justifyContent: 'space-between'
      // backgroundColor: 'pink'
    }
  }

  static get voteButton() {
    return {
      width: '50px',
      height: '50px',
      borderRadius: '25px',
      backgroundColor: ThemeColor.SHADE_2,
      color: ThemeColor.SHADE_1
    }
  }

  static get countInfoHighlighted() {
    return {
      color: ThemeColor.CONTRAST,
      marginLeft: '5px',
      marginRight: '5px',
      fontSize: '13px',
      fontWeight: 'bold'
    }
  }
  static get countInfo() {
    return {
      color: ThemeColor.SHADE_1,
      marginLeft: '5px',
      marginRight: '5px',
      fontSize: '13px',
      fontWeight: 'bold'
    }
  }
  static get questionContainer() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      alignItems: 'center'
    }
  }
  static get infoRow() {
    return {
      flexDirection: 'row' as ChakraProps['flexDirection'],
      alignItems: 'center'
    }
  }
  static get input() {
    return {
      variant: 'filled',
      backgroundColor: ThemeColor.SHADE_2,
      color: ThemeColor.CONTRAST,
      fontWeight: 'bold',
      focusBorderColor: ThemeColor.SHADE_1,
      width: '60%',
      _focus: { outline: 'red' }
    }
  }

  static get buttonBox() {
    return {
      // marginTop: '30px'
    }
  }

  static get buttonContainer() {
    return {
      marginTop: '30px'
    }
  }

  static get iconButton() {
    return {
      padding: '4px',
      // bg: 'transparent',
      bg: ThemeColor.SHADE_2,
      borderRadius: '25px',
      color: ThemeColor.SHADE_1,
      size: 'lg',
      _focus: { outline: 'none' },
      _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
    }
  }

  static get icon() {
    return {
      fontSize: '1.5em'
    }
  }

  static get content() {
    return {
      color: ThemeColor.CONTRAST,
      fontSize: '16px',
      fontWeight: 'bold'
    }
  }

  static get optionsContainer() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      alignItems: 'flex-start',
      width: '100%'
    }
  }

  static voteDot(dotColor: string | undefined, noMargin: boolean) {
    const color = dotColor ?? ThemeColor.SHADE_1
    const dotSize = `${DOT_SIZE_SMALL}px`

    return {
      backgroundColor: color,
      width: dotSize,
      height: dotSize,
      marginRight: noMargin === true ? '1px' : '5x',
      marginLeft: noMargin === true ? '1px' : '5x',
      borderRadius: dotSize
    }
  }

  static currentVoterDot(withMargin: boolean) {
    const dotSize = `${DOT_SIZE_SMALL}px`

    return {
      // backgroundColor: ThemeColor.SHADE_1,
      backgroundColor: 'transparent',
      width: dotSize,
      height: dotSize,
      // marginLeft: withMargin ? '5px' : '0px',',
      marginRight: '3px',
      marginLeft: '3px',
      borderRadius: dotSize,
      borderWidth: '2.5px',
      borderColor: ThemeColor.CONTRAST
    }
  }
}
