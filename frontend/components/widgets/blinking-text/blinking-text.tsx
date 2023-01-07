import { useEffect, useState } from 'react'
import { getBlinkingTextStyle } from './styles'
import { Text } from '@chakra-ui/react'

export const DATA_CY_BLINKING_TEXT = 'blinking_text'

type BlinkingTextProps = {
  text: string
}

export type TextShade = 'pale' | 'dark'

const BlinkingText = ({ text }: BlinkingTextProps) => {
  const [textShade, setTextShade] = useState<TextShade>('dark')

  useEffect(() => {
    const interval = setInterval(() => {
      setTextShade((previousValue) => (previousValue === 'pale' ? 'dark' : 'pale'))
    }, 700)
    return () => clearInterval(interval)
  }, [])

  const blinkingTextStyle = getBlinkingTextStyle(textShade)
  return (
    <Text {...blinkingTextStyle} data-cy={`${DATA_CY_BLINKING_TEXT}-${text}`}>
      {text}
    </Text>
  )
}

export default BlinkingText
