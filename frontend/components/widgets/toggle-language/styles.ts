import { ThemeColor } from '../../../theme/theme'
import { ChakraProps } from '@chakra-ui/react'

export class Styles {
  static iconButton = {
    padding: '4px',
    bg: 'transparent',
    borderRadius: '25px',
    color: ThemeColor.SHADE_1,
    size: 'md',
    _focus: { outline: 'none' },
    _hover: { bg: ThemeColor.CONTRAST, color: ThemeColor.BACKGROUND }
  }

  static icon = {
    fontSize: '1.8em'
  }

  static popoverContent = {
    width: '150px',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingBottom: '5px'
  }

  static buttonContainer = {
    margin: '5px'
  }

  static container = (isRowMode: boolean) => {
    if (isRowMode) return { flexDirection: 'row' as ChakraProps['flexDirection'] }
    return { alignItems: 'flex-end', marginRight: '15px', flexDirection: 'column' as ChakraProps['flexDirection'] }
  }
}
