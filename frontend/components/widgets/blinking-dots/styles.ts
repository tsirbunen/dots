import { ThemeColorCodes } from '../../../theme/theme'
import { DOT_SIZE, DOT_SIZE_SMALL } from '../../../utils/constant-values'

export const getBlinkingDotStyle = (isSmall: boolean, dotColor: string | undefined) => {
  const color = dotColor ?? ThemeColorCodes.SHADE_1
  const dotSize = isSmall ? `${DOT_SIZE_SMALL}px` : `${DOT_SIZE}px`

  return {
    backgroundColor: color,
    width: dotSize,
    height: dotSize,
    margin: '5px',
    borderRadius: dotSize
  }
}
