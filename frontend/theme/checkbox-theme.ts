import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    padding: 3,
    borderRadius: 8,
    width: '30px',
    height: '30px',
    borderColor: '#598392',
    backgroundColor: '#0e3b43',
    _checked: {
      color: '#01161e',
      bg: '#f0ebd8',
      borderColor: '#f0ebd8'
    },
    _focus: { outline: 'none' }
  }
})

export const checkboxTheme = defineMultiStyleConfig({ baseStyle })
