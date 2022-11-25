import { Box, Center } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Phrase } from '../../localization/translations'

import SimpleButton from '../small-button/simple-button'
import { modeSelectionButtonsContainerStyle } from './styles'

const ModeSelectionButtons = () => {
  const { translate } = useTranslation()

  const modePhrases = () => {
    const phrases = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_'))
    return phrases as Phrase[]
  }

  return (
    <Box {...modeSelectionButtonsContainerStyle}>
      {modePhrases().map((phrase) => {
        return (
          <Center key={phrase}>
            <Box>
              <SimpleButton text={translate(phrase).toUpperCase()} onClick={() => console.log(phrase)} />
            </Box>
          </Center>
        )
      })}
    </Box>
  )
}

export default ModeSelectionButtons
