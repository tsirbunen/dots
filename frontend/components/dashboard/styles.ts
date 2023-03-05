import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../theme/theme'

export class Styles {
  static outerContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    flex: 1,
    alignItems: 'center',
    marginTop: '20px'
  }
  static questionContainer = {
    marginBottom: '10px',
    flexDirection: 'column' as ChakraProps['flexDirection'],
    flex: 1,
    alignItems: 'center'
  }
  static infoLinesContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    flex: 1,
    alignItems: 'flex-start'
    // marginTop: '20px'
  }
  static infoRow = {
    flexDirection: 'roe' as ChakraProps['flexDirection'],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start' as SystemProps['textAlign']
    // marginTop: '20px'
  }

  static infoTitle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: ThemeColor.SHADE_1,
    align: 'center' as SystemProps['textAlign'],
    marginBottom: '5px'
  }

  static dotSize = '8px'

  static dot = {
    backgroundColor: ThemeColor.SHADE_1,
    width: this.dotSize,
    height: this.dotSize,
    borderRadius: this.dotSize,
    marginRight: '10px'
  }

  static itemTextColor = ThemeColor.SHADE_3

  static date = {
    fontSize: '12px',
    fontStyle: 'italic',
    marginLeft: '10px',
    color: this.itemTextColor
  }

  static nextIcon = {
    padding: '4px',
    bg: ThemeColor.SHADE_1,
    borderRadius: '25px',
    color: ThemeColor.SHADE_2,
    size: 'md',
    _focus: { outline: 'none' },
    _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
  }

  static nextIconContainer = {
    marginLeft: '5px',
    marginRight: '5px'
  }

  static createdContainer = {
    flexDirection: 'row' as ChakraProps['flexDirection'],
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '-3px',
    marginBottom: '5px'
  }

  static codeName = {
    fontSize: '12px',
    marginTop: '3px',
    color: ThemeColor.BACKGROUND
  }

  static optionName = {
    fontSize: '12px',
    marginBottom: '-5px',
    color: this.itemTextColor
  }

  static codeValue = {
    fontSize: '13px',
    marginTop: '3px',
    fontWeight: 'bold',
    color: this.itemTextColor
  }

  static optionValue = {
    fontSize: '12px',
    marginBottom: '-5px',
    fontWeight: 'bold',
    color: this.itemTextColor
  }

  static title = {
    fontWeight: 'bold',
    fontSize: '1.em',
    color: this.itemTextColor
  }

  static listItemContainer = {
    backgroundColor: ThemeColor.SHADE_4,
    flex: 1,
    flexDirection: 'row' as ChakraProps['flexDirection'],
    justifyContent: 'space-between' as SystemProps['textAlign'],
    alignItems: 'center',
    marginTop: '15px',
    marginLeft: '15px',
    marginRight: '15px',
    borderRadius: '8px'
  }

  static get container() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      flex: 1,
      alignItems: 'center',
      marginTop: '30px'
    }
  }
  static get wrapper() {
    return { flexDirection: 'column' as ChakraProps['flexDirection'], margin: '10px', maxWidth: '800px' }
  }
  static get generalInfo() {
    return {
      fontSize: '1em',
      color: ThemeColor.SHADE_1,
      align: 'center' as SystemProps['textAlign']
      // marginBottom: '5px'
    }
  }

  static get pollQuestion() {
    return {
      fontSize: '1.2em',
      color: ThemeColor.CONTRAST,
      fontWeight: 'bold',
      align: 'center' as SystemProps['textAlign'],
      marginBottom: '5px'
    }
  }
  static get buttonBox() {
    return { marginTop: '5px' }
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

  static get chakraIconStyle() {
    return {
      fontSize: '1.8em'
    }
  }
  static get materialsIconStyle() {
    return {
      fontSize: '1.6em'
    }
  }

  static get listItemCard() {
    return {
      flex: 1,
      flexDirection: 'row' as ChakraProps['flexDirection'],
      justifyContent: 'space-between' as SystemProps['textAlign'],
      marginLeft: '10px',
      // backgroundColor: ThemeColor.SHADE_1,

      padding: '10px'
      // borderRadius: '6px'
    }
  }

  static get textContainer() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      justifyContent: 'flex-start' as SystemProps['textAlign'],
      flex: 1
    }
  }

  static get appTitleContainerStyle() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      margin: '10px',
      maxWidth: '800px'
    }
  }

  static get appTitleStyle() {
    return {
      fontSize: '3em',
      fontWeight: 'bold',
      align: 'center' as SystemProps['textAlign'],
      color: ThemeColor.SHADE_1
    }
  }

  static get appShortDescriptionStyle() {
    return {
      fontSize: '1em',
      fontWeight: 'normal',
      align: 'center' as SystemProps['textAlign']
    }
  }

  static get howDoesItWorkStyle() {
    return {
      fontSize: '1em',
      color: ThemeColor.SHADE_1,
      // fontWeight: 'bold',
      align: 'center' as SystemProps['textAlign'],
      // marginTop: '50px',
      marginBottom: '5px'
    }
  }
  static get pollQuestionStyle() {
    return {
      fontSize: '1.2em',
      color: ThemeColor.CONTRAST,
      fontWeight: 'bold',
      align: 'center' as SystemProps['textAlign'],
      // marginTop: '50px',
      marginBottom: '5px'
    }
  }

  static get instructionPhraseStyle() {
    return {
      fontSize: '1em',
      color: ThemeColor.SHADE_1,
      align: 'center' as SystemProps['textAlign'],
      fontWeight: 'normal'
    }
  }

  static get modeSelectionButtonsContainerStyle() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      marginTop: '30px'
    }
  }

  static get buttonsContainer() {
    return {
      flexDirection: 'column' as ChakraProps['flexDirection'],
      flex: 1,
      alignItems: 'center',
      marginTop: '50px'
    }
  }

  static get buttonContainer() {
    return {
      marginTop: '30px'
    }
  }

  static get column() {
    return { flexDirection: 'column' as ChakraProps['flexDirection'] }
  }
}

// export const iconButtonStyle = {
//   padding: '4px',
//   bg: ThemeColor.SHADE_2,
//   borderRadius: '25px',
//   color: ThemeColor.SHADE_1,
//   size: 'md',
//   _focus: { outline: 'none' },
//   _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
// }
// export const nextIconButtonStyle = {
//   padding: '4px',
//   bg: 'transparent',
//   borderRadius: '25px',
//   color: ThemeColor.SHADE_1,
//   size: 'md',
//   _focus: { outline: 'none' },
//   _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
// }

// export const chakraIconStyle = {
//   fontSize: '1.8em'
// }
// export const materialsIconStyle = {
//   fontSize: '1.6em'
// }

// export const listItemCard = {
//   flex: 1,
//   flexDirection: 'row' as ChakraProps['flexDirection'],
//   justifyContent: 'space-between' as SystemProps['textAlign'],
//   marginLeft: '10px',
//   // backgroundColor: ThemeColor.SHADE_1,

//   padding: '10px'
//   // borderRadius: '6px'
// }

// export const textContainer = {
//   flexDirection: 'column' as ChakraProps['flexDirection'],
//   justifyContent: 'flex-start' as SystemProps['textAlign'],
//   flex: 1
// }

// export const titleStyle = {
//   fontWeight: 'bold',
//   fontSize: '1.em',
//   color: ThemeColor.CONTRAST
// }

// export const listItemContainer = {
//   flex: 1,
//   flexDirection: 'row' as ChakraProps['flexDirection'],
//   justifyContent: 'space-between' as SystemProps['textAlign'],
//   alignItems: 'center',
//   margin: '15px'
// }

// export const appTitleContainerStyle = {
//   flexDirection: 'column' as ChakraProps['flexDirection'],
//   margin: '10px',
//   maxWidth: '800px'
// }

// export const appTitleStyle = {
//   fontSize: '3em',
//   fontWeight: 'bold',
//   align: 'center' as SystemProps['textAlign'],
//   color: ThemeColor.SHADE_1
// }

// export const appShortDescriptionStyle = {
//   fontSize: '1em',
//   fontWeight: 'normal',
//   align: 'center' as SystemProps['textAlign']
// }

// export const howDoesItWorkStyle = {
//   fontSize: '1em',
//   color: ThemeColor.SHADE_1,
//   // fontWeight: 'bold',
//   align: 'center' as SystemProps['textAlign'],
//   // marginTop: '50px',
//   marginBottom: '5px'
// }
// export const pollQuestionStyle = {
//   fontSize: '1.2em',
//   color: ThemeColor.CONTRAST,
//   fontWeight: 'bold',
//   align: 'center' as SystemProps['textAlign'],
//   // marginTop: '50px',
//   marginBottom: '5px'
// }

// export const instructionPhraseStyle = {
//   fontSize: '1em',
//   color: ThemeColor.SHADE_1,
//   align: 'center' as SystemProps['textAlign'],
//   fontWeight: 'normal'
// }

// export const modeSelectionButtonsContainerStyle = {
//   flexDirection: 'column' as ChakraProps['flexDirection'],
//   marginTop: '30px'
// }

// export const buttonsContainer = {
//   flexDirection: 'column' as ChakraProps['flexDirection'],
//   flex: 1,
//   alignItems: 'center',
//   marginTop: '50px'
// }

// export const buttonContainer = {
//   marginTop: '10px'
// }
