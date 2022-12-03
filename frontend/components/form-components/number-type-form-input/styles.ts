import { ChakraProps } from '@chakra-ui/react'
import { ThemeColor, ThemeColorCodes } from '../../../theme/theme'

export const titleStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  color: ThemeColor.SHADE_1
}

export const numberInputContainerStyle = {
  marginBottom: '20px'
}

export const titleContainerStyle = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'space-between'
}

export const sliderThumbStyle = {
  boxSize: 6,
  backgroundColor: ThemeColorCodes.CONTRAST
}

export const sliderTrackStyle = {
  backgroundColor: ThemeColorCodes.SHADE_2
}

export const sliderFilledTrackStyle = {
  backgroundColor: ThemeColorCodes.SHADE_1
}

export const sliderBoxStyle = {
  color: ThemeColorCodes.BACKGROUND
}

export const getSliderStyle = (value: number, maximum: number) => {
  return {
    width: value === maximum ? '60px' : '70px',
    marginRight: value === maximum ? '10px' : '0px'
  }
}
