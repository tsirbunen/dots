import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor, ThemeColorCodes } from '../../../theme/theme'

export class Styles {
  static get title() {
    return {
      fontSize: '1em',
      fontWeight: 'bold',
      color: ThemeColor.SHADE_1
    }
  }

  static get numberInputContainer() {
    return {
      marginBottom: '20px'
    }
  }

  static get titleContainer() {
    return {
      flexDirection: 'row' as ChakraProps['flexDirection'],
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }

  static get sliderThumb() {
    return {
      boxSize: 6,
      backgroundColor: ThemeColorCodes.CONTRAST
    }
  }

  static get sliderTrack() {
    return {
      backgroundColor: ThemeColorCodes.SHADE_2
    }
  }

  static get sliderFilledTrack() {
    return {
      backgroundColor: ThemeColorCodes.SHADE_1
    }
  }

  static get sliderBox() {
    return {
      color: ThemeColorCodes.BACKGROUND
    }
  }

  static getSlider(value: number, maximum: number) {
    return {
      width: value === maximum ? '60px' : '70px',
      marginRight: value === maximum ? '10px' : '0px'
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
}
