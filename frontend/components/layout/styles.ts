import { ChakraProps, SystemProps } from '@chakra-ui/react'
import { ThemeColor } from '../../theme/theme'

export class Styles {
  static appTitle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    align: 'center' as SystemProps['textAlign'],
    color: ThemeColor.SHADE_1
  }

  static routeText = {
    fontSize: '1em',
    fontWeight: 'bold',
    align: 'center' as SystemProps['textAlign'],
    color: ThemeColor.SHADE_1
  }

  static hamburgerMenu = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'flex-start',
    marginLeft: '15px'
  }

  static titleContainer = { flexDirection: 'column' as ChakraProps['flexDirection'] }

  static layout = {
    flexDirection: 'row' as ChakraProps['flexDirection'],
    alignItems: 'center',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    justifyContent: 'space-between'
  }

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

  static popover = {
    width: '150px',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingBottom: '5px'
  }

  static buttonContainer = {
    margin: '5px'
  }
}
