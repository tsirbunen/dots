import { useEffect, useState } from 'react'
import { DOT_COLORS } from '../../../utils/constant-values'
import { getBlinkingDotStyle } from './styles'

export const DATA_CY_BLINKING_DOT = 'blinking_dot'

type BlinkingDotProps = {
  dotIndex: number
  isSmall: boolean
}

const BlinkingDot = ({ dotIndex, isSmall }: BlinkingDotProps) => {
  const [dotColor, setDotColor] = useState<string>()

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * DOT_COLORS.length)
      const randomColor = DOT_COLORS[randomIndex]
      setDotColor(randomColor)
    }, 300 + dotIndex * 100)
    return () => clearInterval(interval)
  }, [dotIndex])

  const blinkingDotStyle = getBlinkingDotStyle(isSmall, dotColor)
  return <div style={{ ...blinkingDotStyle }} data-cy={`${DATA_CY_BLINKING_DOT}-${dotIndex}`} />
}

export default BlinkingDot
