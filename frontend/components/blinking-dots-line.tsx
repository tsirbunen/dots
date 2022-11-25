import { Center } from '@chakra-ui/react'
import BlinkingDot from './blinking-dot.tsx'

const LINE_LENGTH = 4

const BlinkingDotsLine = () => {
  const dotIndexes = Array.from(Array(LINE_LENGTH).keys())
  return (
    <Center data-cy="blinking-dots-line">
      {dotIndexes.map((dotIndex) => (
        <BlinkingDot key={`blinking_dot_${dotIndex}`} dotIndex={dotIndex} />
      ))}
    </Center>
  )
}

export default BlinkingDotsLine
