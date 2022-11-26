import { Box, Center } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Phrase } from '../../localization/translations'
import SimpleButton from '../small-button/simple-button'
import { modeSelectionButtonsContainerStyle } from './styles'

export const DATA_CY_USE_MODE = 'use-mode'

const ModeOfUseSelectionButtons = () => {
  const { translate } = useTranslation()

  const modePhrases = () => {
    const phrases = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_'))
    return phrases as Phrase[]
  }

  return (
    <Box {...modeSelectionButtonsContainerStyle}>
      {modePhrases().map((phrase, index) => {
        return (
          <Center key={phrase} data-cy={`${DATA_CY_USE_MODE}-${index}`}>
            <Box>
              <SimpleButton text={translate(phrase).toUpperCase()} onClick={() => console.log(phrase)} />
            </Box>
          </Center>
        )
      })}
    </Box>
  )
}

export default ModeOfUseSelectionButtons
