import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../../theme/theme'

export class Styles {
  static createdContainer = {
    flexDirection: 'row' as ChakraProps['flexDirection'],
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '-3px',
    marginBottom: '5px'
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

  static container = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    flex: 1,
    alignItems: 'center',
    marginTop: '30px'
  }

  static chakraIconStyle = {
    fontSize: '1.8em'
  }

  static listItemCard = {
    flex: 1,
    flexDirection: 'row' as ChakraProps['flexDirection'],
    justifyContent: 'space-between' as SystemProps['textAlign'],
    marginLeft: '10px',
    padding: '10px'
  }

  static textContainer = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    justifyContent: 'flex-start' as SystemProps['textAlign'],
    flex: 1
  }

  static buttonContainer = {
    marginTop: '30px'
  }

  static column = {
    flexDirection: 'column' as ChakraProps['flexDirection']
  }
}
