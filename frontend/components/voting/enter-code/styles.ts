import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor } from '../../../theme/theme'

export class Styles {
  static instruction = {
    color: ThemeColor.SHADE_1,
    marginBottom: '5px'
  }

  static input = {
    variant: 'filled',
    backgroundColor: ThemeColor.SHADE_2,
    color: ThemeColor.CONTRAST,
    fontWeight: 'bold',
    focusBorderColor: ThemeColor.SHADE_1,
    width: '60%',
    _focus: { outline: 'red' }
  }

  static buttonBox = {
    marginTop: '30px'
  }

  static wrapper = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    marginTop: '20px'
  }
}
