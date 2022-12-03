import { Center } from '@chakra-ui/react'
import BlinkingDot from './blinking-dot.tsx'

export const DATA_CY_BLINKING_DOTS_LINE = 'blinking_dots_line'
const LINE_LENGTH = 4

const BlinkingDotsLine = ({ isSmall }: { isSmall: boolean }) => {
  const dotIndexes = Array.from(Array(LINE_LENGTH).keys())
  return (
    <Center data-cy={DATA_CY_BLINKING_DOTS_LINE}>
      {dotIndexes.map((dotIndex) => (
        <BlinkingDot key={`${DATA_CY_BLINKING_DOTS_LINE}_${dotIndex}`} dotIndex={dotIndex} isSmall={isSmall} />
      ))}
    </Center>
  )
}

export default BlinkingDotsLine
