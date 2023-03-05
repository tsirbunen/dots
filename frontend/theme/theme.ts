import { extendTheme } from '@chakra-ui/react'
import { checkboxTheme } from './checkbox-theme'

export enum ThemeColorCodes {
  BACKGROUND = '#01161e',
  CONTRAST = '#f0ebd8',

  SHADE_1 = '#598392',
  SHADE_2 = '#0e3b43',
  SHADE_3 = '#22333b',
  SHADE_4 = '#90b0bb',
  SHADE_5 = '#1c2a31',

  SUCCESS = '#8bc34a',
  WARNING = '#ff9800',
  ERROR = '#ff8000',
  LOADING = '#29b6f6'
}

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: ThemeColorCodes.BACKGROUND
      }
    }
  },
  colors: {
    background: ThemeColorCodes.BACKGROUND,
    contrast: ThemeColorCodes.CONTRAST,
    shade_1: ThemeColorCodes.SHADE_1,
    shade_2: ThemeColorCodes.SHADE_2,
    shade_3: ThemeColorCodes.SHADE_3,
    shade_4: ThemeColorCodes.SHADE_4,
    shade_5: ThemeColorCodes.SHADE_5,
    success: ThemeColorCodes.SUCCESS,
    warning: ThemeColorCodes.WARNING,
    error: ThemeColorCodes.ERROR,
    loading: ThemeColorCodes.LOADING
  },
  config: {
    useSystemColorMode: false
  },
  components: {
    Checkbox: checkboxTheme
  }
})

export enum ThemeColor {
  BACKGROUND = 'background',
  CONTRAST = 'contrast',
  SHADE_1 = 'shade_1',
  SHADE_2 = 'shade_2',
  SHADE_3 = 'shade_3',
  SHADE_4 = 'shade_4',
  SHADE_5 = 'shade_5',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  LOADING = 'loading'
}
