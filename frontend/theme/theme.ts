import { extendTheme } from '@chakra-ui/react'

export enum ThemeColorCodes {
  BACKGROUND = '#01161e',
  CONTRAST = '#f0ebd8',

  SHADE_1 = '#598392',
  SHADE_2 = '#0e3b43',
  SHADE_3 = '#22333b',

  SUCCESS = '#8bc34a',
  WARNING = '#ff9800',
  ERROR = '#c90505',
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
    success: ThemeColorCodes.SUCCESS,
    warning: ThemeColorCodes.WARNING,
    error: ThemeColorCodes.ERROR,
    loading: ThemeColorCodes.LOADING
  },
  config: {
    useSystemColorMode: false
  }
})

export enum ThemeColor {
  BACKGROUND = 'background',
  CONTRAST = 'contrast',
  SHADE_1 = 'shade_1',
  SHADE_2 = 'shade_2',
  SHADE_3 = 'shade_3',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  LOADING = 'loading'
}
