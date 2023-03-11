import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../../theme/theme'
import { DOT_SIZE_SMALL } from '../../../utils/constant-values'

export class Styles {
  static currentUserName = {
    color: ThemeColor.ERROR,
    fontWeight: 'bold',
    fontSize: '11px',
    marginLeft: '3px'
  }

  static optionVotesCount = {
    color: ThemeColor.CONTRAST,
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center' as SystemProps['textAlign']
  }

  static centeredRow = {
    flexDirection: 'row' as ChakraProps['flexDirection'],
    alignItems: 'center'
  }

  static dotNameContainer = {
    marginTop: '20px'
  }

  static centered(width: number) {
    return {
      justify: 'center',
      width: `${width}px`,
      spacing: '2px'
    }
  }

  static onLeft(width: number) {
    return {
      width: `${width}px`,
      spacing: '2px'
    }
  }

  static dots = {
    marginTop: '10px',
    flexDirection: 'column' as ChakraProps['flexDirection']
  }

  static dotSize = `${DOT_SIZE_SMALL}px`

  static currentUserDot = {
    backgroundColor: 'transparent',
    width: this.dotSize,
    height: this.dotSize,
    marginRight: '1px',
    marginLeft: '1px',
    borderRadius: this.dotSize,
    borderWidth: '2.5px',
    borderColor: ThemeColor.ERROR
  }

  static wrapper = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    marginTop: '20px'
  }

  static question = {
    color: ThemeColor.CONTRAST,
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '10px',
    textAlign: 'center' as SystemProps['textAlign']
  }

  static voterName(color: string) {
    return {
      color: color,
      fontSize: '11px',
      marginRight: '5px',
      marginLeft: '3px'
    }
  }

  static optionData = {
    flexDirection: 'column' as ChakraProps['flexDirection']
  }

  static voteButtonOuter = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    margin: '10px'
  }

  static optionsListItem = {
    flex: 1,
    width: '100%',
    flexDirection: 'row' as ChakraProps['flexDirection'],
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  static voteButton = {
    size: 'sm',
    variant: 'solid',
    borderRadius: '25px',
    paddingLeft: '7px',
    paddingRight: '7px',
    bg: ThemeColor.SHADE_1,
    color: ThemeColor.BACKGROUND,
    _focus: { outline: 'none' },
    _hover: {
      bg: ThemeColor.CONTRAST,
      color: ThemeColor.BACKGROUND
    }
  }

  static disabledVoteButton = {
    ...this.voteButton,
    bg: ThemeColor.BACKGROUND,
    color: ThemeColor.SHADE_1,
    _hover: {
      bg: ThemeColor.BACKGROUND,
      color: ThemeColor.SHADE_2
    }
  }

  static divider = {
    height: '1.5px',
    bg: ThemeColor.SHADE_2,
    width: '100%'
  }

  static countInfoHighlighted = {
    color: ThemeColor.CONTRAST,
    marginLeft: '5px',
    marginRight: '5px',
    fontSize: '13px',
    fontWeight: 'bold'
  }

  static info = {
    color: ThemeColor.SHADE_1,
    fontSize: '13px'
  }

  static questionContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'center'
  }

  static content = {
    color: ThemeColor.CONTRAST,
    fontSize: '16px',
    fontWeight: 'bold',
    maxWidth: '90%',
    textOverflow: 'ellipsis',
    noOfLines: 1
  }

  static optionsContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'flex-start',
    width: '100%'
  }

  static listItemContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection'],

    width: '100%'
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
}
