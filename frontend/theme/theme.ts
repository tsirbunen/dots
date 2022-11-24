import { extendTheme } from '@chakra-ui/react'

export enum ThemeColorCodes {
  BACKGROUND = '#2d232e',
  PAPER = '#756d6e',
  CARDBOARD = '#534b52',
  CONTRAST = '#e0ddcf',
  CONTRAST_ENHANCED = '#f1f0ea',
  SUCCESS = '#8bc34a',
  WARNING = '#ff9800',
  ERROR = '#c90505',
  LOADING = '#29b6f6'
}

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: ThemeColorCodes.BACKGROUND,
        bgGradient: `linear(to-r, ${ThemeColorCodes.BACKGROUND}, ${ThemeColorCodes.CARDBOARD})`
      }
    }
  },
  colors: {
    background: ThemeColorCodes.BACKGROUND,
    paper: ThemeColorCodes.PAPER,
    cardboard: ThemeColorCodes.CARDBOARD,
    contrast: ThemeColorCodes.CONTRAST,
    contrastEnhanced: ThemeColorCodes.CONTRAST_ENHANCED,
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
  PAPER = 'paper',
  CARDBOARD = 'cardboard',
  CONTRAST = 'contrast',
  CONTRAST_ENHANCED = 'contrastEnhanced',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  LOADING = 'loading'
}
