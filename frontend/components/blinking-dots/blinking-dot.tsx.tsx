import { useEffect, useState } from 'react'

const DOT_SIZE = 18
const DOT_SIZE_SMALL = 12
const DOT_COLORS = [
  '#c37d92',
  '#846267',
  '#ee4266',
  '#ffd23f',
  '#3bceac',
  '#0ead69',
  '#a4243b',
  '#0a9396',
  '#d8c99b',
  '#d8973c',
  '#bd632f',
  '#273e47',
  '#ff595e'
]

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
  const dotSize = isSmall ? `${DOT_SIZE_SMALL}px` : `${DOT_SIZE}px`

  const blinkingDotStyle = {
    backgroundColor: dotColor,
    width: dotSize,
    height: dotSize,
    margin: '5px',
    borderRadius: dotSize
  }

  return <div style={{ ...blinkingDotStyle }} data-cy={`blinking-dot-${dotIndex}`} />
}

export default BlinkingDot
