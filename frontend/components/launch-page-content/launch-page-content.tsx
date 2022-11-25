import { Box } from '@chakra-ui/react'

import UseInstructions from './use-instructions'
import ModeSelectionButtons from './mode-selection-buttons'
import AppTitle from './app-title'

const LaunchPageContent = () => {
  return (
    <Box>
      <AppTitle />
      <UseInstructions />
      <ModeSelectionButtons />
    </Box>
  )
}

export default LaunchPageContent
